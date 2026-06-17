import { FaLink } from "react-icons/fa6";
import { useNavigate } from "react-router";

function BrandLogo({ className = "", label = "ShortLink" }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className={`inline-flex h-6 min-w-12 items-center justify-center rounded-full bg-blue-100 px-3 text-blue-700 hover:cursor-pointer ${className}`.trim()}
      aria-label={label}
    >
      <FaLink />
    </div>
  );
}

export default BrandLogo;
