import { SidebarRoute } from "@/types/types";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type SidebarItemProps = SidebarRoute;

const SidebarItem: React.FC<SidebarItemProps> = ({
  active,
  href,
  label,
  icon: Icon,
}) => {
  return (
    <Link
      className={twMerge(
        `h-auto w-full flex items-center gap-x-4 font-medium cursor-pointer text-neutral-400 hover:text-white p-3 `,
        active && "text-white"
      )}
      href={href}
    >
      <Icon size={20} />
      <p className="flex-1">{label}</p>
    </Link>
  );
};

export default SidebarItem;
