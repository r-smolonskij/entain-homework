import { useEffect, useState } from "react";
import "./ImageModal.scss";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

type ImageModalProps = {
  isOpen: boolean;
  src: string;
  alt?: string;
  onClose: () => void;
};

const ImageModal = ({
  isOpen,
  src,
  alt = "Expanded image",
  onClose,
}: ImageModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
  }, [isOpen, src]);

  const handleImageDone = () => setIsLoading(false);

  if (!isOpen) return null;

  return (
    <div className="image-modal" role="dialog" aria-modal="true">
      <button
        className="image-modal__backdrop"
        type="button"
        onClick={onClose}
      />
      <div className="image-modal__content">
        <div
          className={`image-modal__media${
            isLoading ? " image-modal__media--loading" : ""
          }`}
        >
          {isLoading && (
            <div className="image-modal__loader">
              <Loader size="lg" label="Loading image..." />
            </div>
          )}
          <img
            className={`image-modal__img${
              isLoading ? " image-modal__img--loading" : ""
            }`}
            src={src}
            alt={alt}
            onLoad={handleImageDone}
            onError={handleImageDone}
          />
        </div>
        <Button
          className="image-modal__close"
          color="var(--color-error)"
          onClick={onClose}
        >
          X
        </Button>
      </div>
    </div>
  );
};

export default ImageModal;
