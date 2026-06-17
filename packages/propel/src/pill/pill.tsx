import * as React from "react";
import { cn } from "../utils";

export enum EPillVariant {
  DEFAULT = "default",
  PRIMARY = "primary",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}

export enum EPillSize {
  SM = "sm",
  MD = "md",
  LG = "lg",
  XS = "xs",
}

export enum ERadius {
  SQUARE = "square",
  CIRCLE = "circle",
}

export type TRadius = ERadius.SQUARE | ERadius.CIRCLE;

export type TPillVariant =
  | EPillVariant.DEFAULT
  | EPillVariant.PRIMARY
  | EPillVariant.SUCCESS
  | EPillVariant.WARNING
  | EPillVariant.ERROR
  | EPillVariant.INFO;
export type TPillSize = EPillSize.SM | EPillSize.MD | EPillSize.LG | EPillSize.XS;

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TPillVariant;
  size?: TPillSize;
  className?: string;
  children: React.ReactNode;
  radius?: TRadius;
}

const pillVariants = {
  [EPillVariant.DEFAULT]: "bg-surface-2 text-tertiary border border-subtle-1",
  [EPillVariant.PRIMARY]: "bg-accent-primary/10 text-accent-primary border border-accent-strong/20",
  [EPillVariant.SUCCESS]: "bg-success-subtle text-success-primary border border-success-subtle",
  [EPillVariant.WARNING]: "bg-warning-subtle text-warning-primary border border-warning-subtle",
  [EPillVariant.ERROR]: "bg-danger-subtle text-danger-primary border border-danger-subtle",
  [EPillVariant.INFO]: "bg-label-indigo-bg/40 text-label-indigo-text border border-label-indigo-border/30",
};

const pillSizes = {
  [EPillSize.XS]: "px-1.5 py-0.5 text-11",
  [EPillSize.SM]: "px-2 py-0.5 text-11",
  [EPillSize.MD]: "px-2.5 py-1 text-13",
  [EPillSize.LG]: "px-3 py-1.5 text-14",
};

const pillRadius = {
  [ERadius.SQUARE]: "rounded",
  [ERadius.CIRCLE]: "rounded-full",
};

// Status dot colors - visual indicator that reinforces the pill variant semantically
const pillDotColors = {
  [EPillVariant.DEFAULT]: "bg-label-grey-bg-strong",
  [EPillVariant.PRIMARY]: "bg-accent-primary",
  [EPillVariant.SUCCESS]: "bg-success-primary",
  [EPillVariant.WARNING]: "bg-warning-primary",
  [EPillVariant.ERROR]: "bg-danger-primary",
  [EPillVariant.INFO]: "bg-label-indigo-bg-strong",
};

const Pill = React.forwardRef(function Pill(
  {
    variant = EPillVariant.DEFAULT,
    size = EPillSize.MD,
    radius = ERadius.CIRCLE,
    className,
    children,
    ...props
  }: PillProps,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  return (
    <span
      ref={ref}
      className={cn(
        // Base styles with gap-1.5 for comfortable spacing between status dot and text
        "inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap gap-1.5",
        // Variant styles
        pillVariants[variant],
        // Size styles
        pillSizes[size],
        // Radius styles
        pillRadius[radius],
        className
      )}
      {...props}
    >
      {/* Status indicator dot - 1.5x1.5 (6px) circular dot that matches the variant color */}
      <span className={cn("rounded-full flex-shrink-0 size-1.5", pillDotColors[variant])} />
      {children}
    </span>
  );
});

Pill.displayName = "Pill";

export { Pill };
