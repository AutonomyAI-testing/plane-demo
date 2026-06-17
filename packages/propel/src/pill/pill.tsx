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

// Background, text, and border colors for each pill variant
const pillVariants = {
  [EPillVariant.DEFAULT]: "bg-surface-2 text-secondary border border-subtle-1",
  [EPillVariant.PRIMARY]: "bg-accent-primary/10 text-accent-primary border border-accent-strong/20",
  [EPillVariant.SUCCESS]: "bg-success-subtle text-success-primary border border-success-subtle",
  [EPillVariant.WARNING]: "bg-warning-subtle text-warning-primary border border-warning-subtle",
  [EPillVariant.ERROR]: "bg-danger-subtle text-danger-primary border border-danger-subtle",
  [EPillVariant.INFO]: "bg-label-indigo-bg text-label-indigo-text border border-label-indigo-bg-strong/30",
};

// Status dot colors for each variant — provides visual categorization at a glance
const dotVariants = {
  [EPillVariant.DEFAULT]: "bg-inverse",
  [EPillVariant.PRIMARY]: "bg-accent-primary",
  [EPillVariant.SUCCESS]: "bg-success-primary",
  [EPillVariant.WARNING]: "bg-warning-primary",
  [EPillVariant.ERROR]: "bg-danger-primary",
  [EPillVariant.INFO]: "bg-label-indigo-bg-strong",
};

// Padding, text size, and gap between dot and label for each size
const pillSizes = {
  [EPillSize.XS]: "px-1.5 py-0.5 text-11 gap-1",
  [EPillSize.SM]: "px-2 py-0.5 text-11 gap-1",
  [EPillSize.MD]: "px-2.5 py-1 text-13 gap-1.5",
  [EPillSize.LG]: "px-3 py-1.5 text-14 gap-2",
};

// Status dot dimensions scaled to match pill size
const dotSizes = {
  [EPillSize.XS]: "w-1 h-1",
  [EPillSize.SM]: "w-1.5 h-1.5",
  [EPillSize.MD]: "w-1.5 h-1.5",
  [EPillSize.LG]: "w-2 h-2",
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
        className
      )}
      {...props}
    >
      {/* Status indicator dot */}
      <span className={cn("rounded-full shrink-0 inline-block", dotSizes[size], dotVariants[variant])} />
      {children}
    </span>
  );
});

Pill.displayName = "Pill";

export { Pill };
