interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  title?: string;
}

export default function Button({ onClick, children, type = "button", className = "", title }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-secondary text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-colors min-w-[144px] h-[40px] flex items-center justify-center ${className}`}
    >
      {title || children}
    </button>
  );
}
