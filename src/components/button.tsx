


interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset'; // Tipos de botão que você pode usar
  disabled?: boolean; // Se o botão deve ser desabilitado
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${className} bg-secondary font-bold rounded-md w-full h-10 text-lg rounded-md`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
