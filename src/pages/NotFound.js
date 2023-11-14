import { Link } from "react-router-dom";
import { INDEX } from "../routes/route";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const NotFound = () => {
  useDocumentTitle("Synk Out");
  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center bg-not-found bg-cover">
        <span className="text-8xl mb-2 animated-text">🚀</span>
        <h1 className="text-9xl text-white font-extrabold transform">404.</h1>
        <p className="mb-4 text-white text-xl text-clip max-w-lg text-center">
          Hey there! It looks like you're accessing a page which appears to have
          been moved, deleted, or doesn't exist. We apologize for the
          inconveniences.
        </p>
        <Link
          to={INDEX}
          className="bg-primary-600 hover:bg-primary-700 text-white p-3"
        >
          Take me back to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
