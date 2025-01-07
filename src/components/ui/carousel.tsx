"use client"

import { cn } from "@/lib/utils";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Circle } from "lucide-react";
import {
  ComponentPropsWithRef,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
  onDotButtonClick: (index: number) => void;
  selectedIndex: number;
  prevBtnDisabled: boolean;
  scrollSnaps: number[];
  nextBtnDisabled: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
};

const Carousel = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      plugins,
      className,
      children,
    },
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const onPrevButtonClick = useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const onDotButtonClick = useCallback(
      (index: number) => {
        api?.scrollTo(index);
      },
      [api]
    );

    const onInit = useCallback((api: EmblaCarouselType) => {
      setScrollSnaps(api.scrollSnapList());
    }, []);

    const onNextButtonClick = useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const onSelect = useCallback((api: EmblaCarouselType) => {
      setPrevBtnDisabled(!api.canScrollPrev());
      setNextBtnDisabled(!api.canScrollNext());
      setSelectedIndex(api?.selectedScrollSnap());
    }, []);

    useEffect(() => {
      if (!api) return;

      onInit(api);
      onSelect(api);
      api.on("reInit", onSelect).on("select", onSelect).on("reInit", onInit);
    }, [api, onSelect, onInit]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          onPrevButtonClick,
          onNextButtonClick,
          onDotButtonClick,
          selectedIndex,
          scrollSnaps,
          prevBtnDisabled,
          nextBtnDisabled,
        }}
      >
        <section className={cn("overflow-hidden", className)}>{children}</section>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }) => {
  const { carouselRef } = useCarousel();

  return (
    <div className={cn("", className)} ref={carouselRef}>
      <div className={cn("flex w-full h-full")} {...props}></div>
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  const { onPrevButtonClick, prevBtnDisabled } = useCarousel();

  return (
    <button
      className="embla__button embla__button--prev"
      type="button"
      disabled={prevBtnDisabled}
      onClick={onPrevButtonClick}
      {...restProps}
    >
      <ArrowLeft />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  const { onNextButtonClick, nextBtnDisabled } = useCarousel();

  return (
    <button
      className="embla__button embla__button--next"
      type="button"
      disabled={nextBtnDisabled}
      onClick={onNextButtonClick}
      {...restProps}
    >
      <ArrowRight />
      {children}
    </button>
  );
};

const DotButton: React.FC<PropType> = ({className, ...restProps }) => {
  const { onDotButtonClick, selectedIndex, scrollSnaps } = useCarousel();

  return (
    <div className={cn("embla__dots", className)}>
      {scrollSnaps.map((_, index) => (
        <button
          type="button"
          {...restProps}
          className={cn(
          )}
          key={index}
          onClick={() => onDotButtonClick(index)}
        >
          <Circle color={selectedIndex === index ? "blue" : "black"} size={10} className="mx-1" strokeWidth={3} />
        </button>
      ))}
    </div>
  );
};

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, DotButton };
