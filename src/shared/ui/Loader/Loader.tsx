import "./Loader.scss";

type LoaderSize = "sm" | "md" | "lg";

type LoaderProps = {
  size?: LoaderSize;
  label?: string;
};

const Loader = ({ size = "md", label = "Loading" }: LoaderProps) => {
  return (
    <div className={`loader loader--${size}`} role="status">
      <div className="loader__ring" />
      <i className="loader__label">{label}</i>
    </div>
  );
};

export default Loader;
