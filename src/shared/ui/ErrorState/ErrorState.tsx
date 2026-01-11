import "./ErrorState.scss";

type ErrorStateProps = {
  title?: string;
  message?: string | null;
  actions?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
};

const ErrorState = ({
  title = "Something went wrong",
  message = "",
  actions,
  className = "",
  icon,
}: ErrorStateProps) => {
  return (
    <div className={`error-state ${className}`} role="alert">
      <div className="error-state__icon" aria-hidden="true">
        {icon ?? "!"}
      </div>
      <div className="error-state__body">
        <p className="error-state__title">{title}</p>
        <p className="error-state__message">{message}</p>
      </div>
      {actions && <div className="error-state__actions">{actions}</div>}
    </div>
  );
};

export default ErrorState;
