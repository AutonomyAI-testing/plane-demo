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
  /** Visual style variant for different semantic meanings */
  variant?: TPillVariant;
  /** Size preset that controls padding and text size */
  size?: TPillSize;
  className?: string;
  children: React.ReactNode;
  /** Border radius style - circle (default) or square */
  radius?: TRadius;
  /** Optional icon to display before the label */
  icon?: React.ReactNode;
  /** Optional count or badge value to display after the label */
  count?: number | string;
  /** Whether to show a remove button */
  removable?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
  /** When true, applies reduced opacity and prevents interaction */
  disabled?: boolean;
}

const pillVariants = {
  [EPillVariant.DEFAULT]: "bg-surface-2 text-secondary border border-subtle-1",
  [EPillVariant.PRIMARY]: "bg-accent-primary/10 text-accent-primary border border-accent-strong/20",
  [EPillVariant.SUCCESS]: "bg-green-50 text-success-primary border border-success-subtle",
  [EPillVariant.WARNING]: "bg-amber-50 text-amber-700 border border-amber-200",
  [EPillVariant.ERROR]: "bg-red-50 text-danger-primary border border-danger-subtle",
  [EPillVariant.INFO]: "bg-blue-50 text-blue-700 border border-blue-200",
  [EPillVariant.MUTED]: "bg-surface-1 text-disabled border border-subtle-1",
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

/**
 * RemoveIcon - X icon for the removable pill button
 */
const RemoveIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M1 1L9 9M1 9L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
        // Disabled state
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {icon && <span className="shrink-0 leading-none">{icon}</span>}
        {children}
        {count !== undefined && <span className="ml-1 font-semibold tabular-nums">{count}</span>}
        {/* Removable button - only renders when both removable and onRemove are provided */}
        {removable && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              // Prevent click from bubbling to parent pill container
              e.stopPropagation();
              onRemove();
            }}
            disabled={disabled}
            aria-label="Remove"
            className="inline-flex items-center justify-center w-3.5 h-3.5 ml-0.5 rounded-full opacity-60 hover:opacity-100 hover:bg-black/10 transition-opacity cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-current"
          >
            <RemoveIcon />
          </button>
        )}
      </span>
    </span>
  );
});

Pill.displayName = "Pill";

export { Pill };
