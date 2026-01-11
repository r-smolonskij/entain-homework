import { useNavigate } from "react-router-dom";
import Button from "../../shared/ui/Button/Button";
import ErrorState from "../../shared/ui/ErrorState/ErrorState";
import "./NotFoundPage.scss";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="not-found">
      <ErrorState
        title="Page not found"
        message="The page you are looking for does not exist or was moved."
        icon="404"
        actions={<Button onClick={() => navigate("/")}>Go home</Button>}
      />
    </section>
  );
};
