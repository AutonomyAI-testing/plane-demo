import * as React from "react";
import { cn } from "../utils";

export enum EPillVariant {
  DEFAULT = "default",
  PRIMARY = "primary",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
  MUTED = "muted",
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
  | EPillVariant.INFO
  | EPillVariant.MUTED;
export type TPillSize = EPillSize.SM | EPillSize.MD | EPillSize.LG | EPillSize.XS;

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TPillVariant;
  size?: TPillSize;
  className?: string;
  children: React.ReactNode;
  radius?: TRadius;
  icon?: React.ReactNode;
  count?: number | string;
  removable?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
}

const pillVariants = {
  [EPillVariant.DEFAULT]: "bg-surface-2 text-secondary border border-subtle-1",
  [EPillVariant.PRIMARY]: "bg-accent-primary/10 text-accent-primary border border-accent-strong/20",
  [EPillVariant.SUCCESS]: "bg-success-subtle text-success-primary border border-success-subtle",
  [EPillVariant.WARNING]: "bg-warning-subtle text-warning-primary border border-warning-subtle",
  [EPillVariant.ERROR]: "bg-danger-subtle text-danger-primary border border-danger-subtle",
  [EPillVariant.INFO]: "bg-accent-subtle text-accent-primary border border-accent-strong/20",
  [EPillVariant.MUTED]: "bg-surface-1 text-tertiary border border-subtle-1/50",
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
    className,
    children,
    icon,
    count,
    removable,
    onRemove,
    disabled,
    ...props
  }: PillProps,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  // Stop event propagation to prevent triggering parent click handlers when removing
  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <span
      ref={ref}
      className={cn(
        // Base styles
        "inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap gap-1",
        // Variant styles
        pillVariants[variant],
        // Size styles
        pillSizes[size],
        // Radius styles
        pillRadius[radius],
        // Disabled styles
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      {icon && <span className="size-3 flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
      {/* Count appears with reduced opacity to distinguish it from the main label */}
      {count !== undefined && <span className="text-current opacity-60 ml-1 font-normal">{count}</span>}
      {/* Removable button allows dismissing the pill without submitting forms */}
      {removable && (
        <button
          type="button"
          onClick={handleRemoveClick}
          className="size-3 flex items-center justify-center hover:opacity-70 ml-1"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
});

Pill.displayName = "Pill";

export { Pill };
