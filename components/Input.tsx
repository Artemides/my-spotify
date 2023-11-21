import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement>;
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={twMerge(
          `
            flex
            w-full
            rounded-md
            bg-neutral-900
            border border-transparent
            p-3
            text-sm
            file:border-0
            file:bg-transparent
            file:font-medium
            file:cursor-pointer
            placeholder:text-neutral-400
            disabled:cursor-not-allowed
            focus:outline-none
        `,
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
