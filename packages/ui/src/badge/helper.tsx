export type TBadgeVariant =
  | "primary"
  | "accent-primary"
  | "outline-primary"
  | "neutral"
  | "accent-neutral"
  | "outline-neutral"
  | "success"
  | "accent-success"
  | "outline-success"
  | "warning"
  | "accent-warning"
  | "outline-warning"
  | "destructive"
  | "accent-destructive"
  | "outline-destructive";

export type TBadgeSizes = "sm" | "md" | "lg" | "xl";

export interface IBadgeStyling {
  [key: string]: {
    default: string;
    hover: string;
    disabled: string;
  };
}

// TODO: convert them to objects instead of enums
enum badgeSizeStyling {
  sm = `px-2.5 py-1 font-medium text-11 rounded-sm flex items-center gap-1.5 whitespace-nowrap transition-all justify-center inline`,
  md = `px-4 py-1.5 font-medium text-13 rounded-sm flex items-center gap-1.5 whitespace-nowrap transition-all justify-center inline`,
  lg = `px-4 py-2 font-medium text-13 rounded-sm flex items-center gap-1.5 whitespace-nowrap transition-all justify-center inline`,
  xl = `px-5 py-3 font-medium text-13 rounded-sm flex items-center gap-1.5 whitespace-nowrap transition-all justify-center inline`,
}

// TODO: convert them to objects instead of enums
enum badgeIconStyling {
  sm = "h-3 w-3 flex justify-center items-center overflow-hidden flex-shrink-0",
  md = "h-3.5 w-3.5 flex justify-center items-center overflow-hidden flex-shrink-0",
  lg = "h-4 w-4 flex justify-center items-center overflow-hidden flex-shrink-0",
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  xl = "h-4 w-4 flex justify-center items-center overflow-hidden flex-shrink-0",
}

export const badgeStyling: IBadgeStyling = {
  primary: {
    default: `text-on-color bg-accent-primary`,
    hover: `hover:bg-accent-primary/80`,
    disabled: `cursor-not-allowed !bg-custom-primary-60 hover:bg-custom-primary-60`,
  },
  "accent-primary": {
    default: `bg-accent-subtle text-accent-primary`,
    hover: `hover:bg-custom-primary-20 hover:text-accent-secondary`,
    disabled: `cursor-not-allowed !text-accent-primary/60`,
  },
  "outline-primary": {
    default: `text-accent-primary bg-surface-1 border border-accent-strong`,
    hover: `hover:border-accent-strong-80 hover:bg-accent-subtle`,
    disabled: `cursor-not-allowed !text-accent-primary/60 !border-accent-strong-60 `,
  },

  neutral: {
    default: `text-custom-background-100 bg-layer-1 border border-subtle`,
    hover: `hover:bg-layer-1`,
    disabled: `cursor-not-allowed bg-subtle-1 !text-placeholder`,
  },
  "accent-neutral": {
    default: `text-secondary bg-layer-1`,
    hover: `hover:bg-subtle-1 hover:text-primary`,
    disabled: `cursor-not-allowed !text-placeholder`,
  },
  "outline-neutral": {
    default: `text-secondary bg-surface-1 border border-subtle`,
    hover: `hover:text-primary hover:bg-subtle-1`,
    disabled: `cursor-not-allowed !text-placeholder`,
  },

  success: {
    default: `text-on-color bg-success-primary`,
    hover: `hover:bg-green-600`,
    disabled: `cursor-not-allowed !bg-green-300`,
  },
  "accent-success": {
    default: `text-success-primary bg-green-50`,
    hover: `hover:bg-green-100 hover:text-success-primary`,
    disabled: `cursor-not-allowed text-success-secondary!`,
  },
  "outline-success": {
    default: `text-success-primary bg-surface-1 border border-success-strong`,
    hover: `hover:text-success-primary hover:bg-green-50`,
    disabled: `cursor-not-allowed text-success-secondary! border-success-subtle`,
  },

  warning: {
    default: `text-on-color bg-warning-primary`,
    hover: `hover:bg-amber-600`,
    disabled: `cursor-not-allowed !bg-amber-300`,
  },
  "accent-warning": {
    default: `text-amber-500 bg-amber-50`,
    hover: `hover:bg-amber-100 hover:text-amber-600`,
    disabled: `cursor-not-allowed !text-amber-300`,
  },
  "outline-warning": {
    default: `text-amber-500 bg-surface-1 border border-amber-500`,
    hover: `hover:text-amber-600 hover:bg-amber-50`,
    disabled: `cursor-not-allowed !text-amber-300 border-amber-300`,
  },

  destructive: {
    default: `text-on-color bg-danger-primary`,
    hover: `hover:bg-red-600`,
    disabled: `cursor-not-allowed !bg-red-300`,
  },
  "accent-destructive": {
    default: `text-danger-primary bg-red-50`,
    hover: `hover:bg-red-100 hover:text-danger-primary`,
    disabled: `cursor-not-allowed text-danger-secondary!`,
  },
  "outline-destructive": {
    default: `text-danger-primary bg-surface-1 border border-danger-strong`,
    hover: `hover:text-danger-primary hover:bg-red-50`,
    disabled: `cursor-not-allowed text-danger-secondary! border-danger-subtle`,
  },
};

export const getBadgeStyling = (variant: TBadgeVariant, size: TBadgeSizes, disabled: boolean = false): string => {
  const currentVariant = badgeStyling[variant];
  const variantClasses = `${currentVariant.default} ${disabled ? currentVariant.disabled : currentVariant.hover}`;
  const sizeClasses = badgeSizeStyling[size];

  return `${variantClasses} ${sizeClasses}`;
};

export const getIconStyling = (size: TBadgeSizes): string => {
  return badgeIconStyling[size];
};

// Map each badge variant to its corresponding status dot color.
// Solid variants use translucent white for contrast against colored backgrounds,
// while accent/outline variants match their semantic color tokens.
const DOT_COLOR_MAP: Record<TBadgeVariant, string> = {
  // Solid variants use translucent white dot for contrast
  primary: "bg-white/70",
  success: "bg-white/70",
  warning: "bg-white/70",
  destructive: "bg-white/70",
  // Accent variants use semantic colors
  "accent-primary": "bg-accent-primary",
  "accent-neutral": "bg-inverse",
  "accent-success": "bg-success-primary",
  "accent-warning": "bg-warning-primary",
  "accent-destructive": "bg-danger-primary",
  // Outline variants use semantic colors
  "outline-primary": "bg-accent-primary",
  "outline-neutral": "bg-inverse",
  "outline-success": "bg-success-primary",
  "outline-warning": "bg-warning-primary",
  "outline-destructive": "bg-danger-primary",
  // Neutral variant
  neutral: "bg-inverse",
};

export const getDotColor = (variant: TBadgeVariant): string => {
  return DOT_COLOR_MAP[variant];
};
