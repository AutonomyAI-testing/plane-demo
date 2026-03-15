import { Avatar } from "@plane/ui";

interface IDesktopProps {
  /**
   * Avatar source URL
   */
  src?: string;
  /**
   * Display name for the avatar tooltip
   */
  name?: string;
  /**
   * Fallback background color (hex or color name)
   */
  fallbackBackgroundColor?: string;
  /**
   * Fallback text color (hex or color name)
   */
  fallbackTextColor?: string;
  /**
   * Fallback text to display if image fails to load
   */
  fallbackText?: string;
  /**
   * Custom class names
   */
  className?: string;
}

/**
 * Desktop component displays a user avatar in a circular container with border styling.
 * Used for desktop environments to show user profile information.
 */
export const Desktop = ({
  src,
  name,
  fallbackBackgroundColor = "#028375",
  fallbackTextColor = "#ffffff",
  fallbackText,
  className = "",
}: IDesktopProps) => {
  return (
    <div className={`flex items-center justify-center p-6 ${className}`}>
      {/* Circular avatar container with gradient border */}
      <div className="relative flex items-center justify-center rounded-full w-80 h-80 bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-500 p-2">
        {/* Inner avatar container */}
        <div className="w-full h-full rounded-full bg-canvas overflow-hidden flex items-center justify-center">
          <Avatar
            src={src}
            name={name}
            fallbackBackgroundColor={fallbackBackgroundColor}
            fallbackTextColor={fallbackTextColor}
            fallbackText={fallbackText}
            shape="circle"
            size={280}
            showTooltip={true}
          />
        </div>
      </div>
    </div>
  );
};

Desktop.displayName = "Desktop";
