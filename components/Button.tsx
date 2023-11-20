import { twMerge } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button: React.FC<ButtonProps> = ({
  className,
  children,
  disabled,
  type,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      {...props}
      className={twMerge(
        `w-full rounded-full bg-green-500 border border-transparent py-2 px-4 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
