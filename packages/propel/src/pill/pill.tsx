import * as React from "react";
import { X } from "lucide-react";
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
  onRemove?: () => void;
  disabled?: boolean;
}

// Variant styles map for semantic color and border combinations
const pillVariants = {
  [EPillVariant.DEFAULT]: "bg-surface-2 text-secondary border border-subtle-1",
  [EPillVariant.PRIMARY]: "bg-accent-primary/10 text-accent-primary border border-accent-strong/20",
  [EPillVariant.SUCCESS]: "bg-green-50 text-success-primary border border-success-subtle",
  [EPillVariant.WARNING]: "bg-amber-50 text-amber-700 border border-amber-200",
  [EPillVariant.ERROR]: "bg-red-50 text-danger-primary border border-danger-subtle",
  [EPillVariant.INFO]: "bg-blue-50 text-blue-700 border border-blue-200",
  [EPillVariant.MUTED]: "bg-neutral-100 text-neutral-400 border border-neutral-200",
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
    onRemove,
    disabled = false,
    ...props
  }: PillProps,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  // Stop event propagation to prevent parent click handlers from firing when removing
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <span
      ref={ref}
      className={cn(
        // Base layout and typography
        "inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap gap-1",
        // Variant styles
        pillVariants[variant],
        // Size styles
        pillSizes[size],
        // Radius styles
        pillRadius[radius],
        // Disabled state prevents interaction and reduces opacity
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="inline-flex items-center justify-center shrink-0" style={{ fontSize: "14px", lineHeight: 1 }}>
          {icon}
        </span>
      )}
      <span>{children}</span>
      {count !== undefined && <span className="opacity-70 font-normal">{count}</span>}
      {/* Remove button only visible when onRemove is provided and pill is not disabled */}
      {onRemove && !disabled && (
        <button
          type="button"
          onClick={handleRemove}
          className="inline-flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity ml-0.5"
          aria-label="Remove"
        >
          <X size={10} strokeWidth={2.5} />
        </button>
      )}
    </span>
  );
});

Pill.displayName = "Pill";

export { Pill };
