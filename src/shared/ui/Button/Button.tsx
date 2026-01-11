import "./Button.scss";

type ButtonVariant = "primary" | "outlined" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  color?: string;
  "aria-current"?: "page";
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
  onClick,
  color,
  "aria-current": ariaCurrent,
}: ButtonProps) => {
  const classes = [
    "button",
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? "button--full" : "",
    disabled ? "button--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-current={ariaCurrent}
      style={
        color
          ? ({ "--button-accent": color } as React.CSSProperties)
          : undefined
      }
    >
      <span className="button__label">{children}</span>
    </button>
  );
};

export default Button;
