import { FaPlay } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type PlayButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const PlayButton = ({ className, ...props }: PlayButtonProps) => {
  return (
    <button
      className={twMerge(
        ` opacity-0  rounded-full bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110 active:bg-green-600 transition `,
        className
      )}
      {...props}
    >
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
