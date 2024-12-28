import { cn } from "@/lib/utils";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

const Carousel = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );

    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const onPrevButtonClick = useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const onNextButtonClick = useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const onSelect = useCallback((api: EmblaCarouselType) => {
      setPrevBtnDisabled(!api.canScrollPrev());
      setNextBtnDisabled(!api.canScrollNext());
    }, []);

    useEffect(() => {
      if (!api) return;

      onSelect(api);
      api.on("reInit", onSelect).on("select", onSelect);
    }, [api, onSelect]);

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
          prevBtnDisabled,
          nextBtnDisabled,
        }}
      >
        <section className="embla">
          <div className={cn("embla__viewport", className)} ref={carouselRef}>
            {children}
          </div>
          <PrevButton className="text-black"><p>asdfasd</p></PrevButton>
          <NextButton className="text-black">asasdfasdfdf</NextButton>
        </section>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div className={cn("embla__container w-full", className)} {...props}></div>
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
      className={cn("embla__slide", className)}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

type PropType = ComponentPropsWithRef<"button">;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  const { onPrevButtonClick, prevBtnDisabled } = useCarousel();

  return (
    <button
      className="embla__button embla__button--prev"
      type="button"
      disabled={  prevBtnDisabled}
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

export { type CarouselApi, Carousel, CarouselContent, CarouselItem };
