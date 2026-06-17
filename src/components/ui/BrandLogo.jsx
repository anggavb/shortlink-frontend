import { useNavigate } from "react-router";

function BrandLogo({ className = "", label = "ShortLink" }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      className={`text-center text-2xl font-extrabold tracking-normal text-[#1c1f24] transition hover:cursor-pointer hover:text-blue-700 focus:ring-4 focus:ring-blue-100 focus:outline-none ${className}`.trim()}
      aria-label={label}
    >
      {label}
    </button>
  );
}

export default BrandLogo;
