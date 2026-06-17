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
  /**
   * Controls whether a status indicator dot is shown before the label.
   * Defaults to true to emphasize status semantics in most use cases.
   */
  showDot?: boolean;
}

const pillVariants = {
  [EPillVariant.DEFAULT]: "bg-surface-2 text-secondary border border-subtle-1",
  [EPillVariant.PRIMARY]: "bg-accent-primary/10 text-accent-primary border border-accent-strong/20",
  [EPillVariant.SUCCESS]: "bg-green-50 text-success-primary border border-success-subtle",
  [EPillVariant.WARNING]: "bg-amber-50 text-amber-700 border border-amber-200",
  [EPillVariant.ERROR]: "bg-red-50 text-danger-primary border border-danger-subtle",
  [EPillVariant.INFO]: "bg-blue-50 text-blue-700 border border-blue-200",
};

// Dot colors match the semantic meaning of each variant for visual consistency
const dotColorVariants = {
  [EPillVariant.DEFAULT]: "bg-secondary",
  [EPillVariant.PRIMARY]: "bg-accent-primary",
  [EPillVariant.SUCCESS]: "bg-success-primary",
  [EPillVariant.WARNING]: "bg-amber-500",
  [EPillVariant.ERROR]: "bg-danger-primary",
  [EPillVariant.INFO]: "bg-blue-500",
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

const Pill = React.forwardRef(function Pill(
  {
    variant = EPillVariant.DEFAULT,
    size = EPillSize.MD,
    radius = ERadius.CIRCLE,
    showDot = true,
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
        // Base styles
        "inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap",
        // Variant styles
        pillVariants[variant],
        // Size styles
        pillSizes[size],
        // Radius styles
        pillRadius[radius],
        // Add gap only when dot is present to prevent extra spacing
        showDot && "gap-1.5",
        className
      )}
      {...props}
    >
      {showDot && (
        <span className={cn("inline-block flex-shrink-0 w-1.5 h-1.5 rounded-full", dotColorVariants[variant])} />
      )}
      {children}
    </span>
  );
});

Pill.displayName = "Pill";

export { Pill };
