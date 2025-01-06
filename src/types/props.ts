import { cva, VariantProps } from "class-variance-authority";

export const iconVariants = cva("", {
  variants: {
    variant: {
      default: "",
      destructive:
        "",
      outline:
        "",
      secondary:
        "",
      ghost: "",
      link: "",
    },
    size: {
      default: "h-5 w-5",
      sm: "h-4 h-4",
      lg: "h-8",
      icon: "h-13",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface IconProps extends VariantProps<typeof iconVariants> {}