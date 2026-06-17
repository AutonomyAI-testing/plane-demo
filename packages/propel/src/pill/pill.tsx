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
  /** Callback when remove button is clicked. Renders an X button when provided. */
  onRemove?: () => void;
  /** Optional icon to display before the label text */
  icon?: React.ReactNode;
  /** Optional count badge displayed after the label text */
  count?: number | string;
  /** Disables interaction and applies reduced opacity */
  disabled?: boolean;
}

const pillVariants = {
  [EPillVariant.DEFAULT]: "bg-surface-2 text-secondary border border-subtle-1",
  [EPillVariant.PRIMARY]: "bg-accent-primary/10 text-accent-primary border border-accent-strong/20",
  [EPillVariant.SUCCESS]: "bg-green-50 text-success-primary border border-success-subtle",
  [EPillVariant.WARNING]: "bg-amber-50 text-amber-700 border border-amber-200",
  [EPillVariant.ERROR]: "bg-red-50 text-danger-primary border border-danger-subtle",
  [EPillVariant.INFO]: "bg-blue-50 text-blue-700 border border-blue-200",
  [EPillVariant.MUTED]: "bg-surface-1 text-tertiary border border-subtle-1",
};

const pillSizes = {
  [EPillSize.XS]: "px-1.5 py-0.5 text-11 gap-1",
  [EPillSize.SM]: "px-2 py-0.5 text-11 gap-1",
  [EPillSize.MD]: "px-2.5 py-1 text-13 gap-1.5",
  [EPillSize.LG]: "px-3 py-1.5 text-14 gap-2",
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
    onRemove,
    icon,
    count,
    disabled = false,
    ...props
  }: PillProps,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent event from bubbling to parent elements (e.g., if pill is in a clickable list item)
    e.stopPropagation();
    // Only trigger onRemove if the pill is not disabled
    if (!disabled && onRemove) {
      onRemove();
    }
  };

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
        // Disabled styles
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
      {...props}
    >
      {icon && <span className="inline-flex items-center justify-center size-3">{icon}</span>}
      <span>{children}</span>
      {count !== undefined && <span className="opacity-70">{count}</span>}
      {onRemove && (
        <button
          type="button"
          onClick={handleRemoveClick}
          disabled={disabled}
          className="inline-flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none focus:ring-1 focus:ring-offset-1 rounded-full"
          aria-label="Remove"
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  );
});

Pill.displayName = "Pill";

export { Pill };
