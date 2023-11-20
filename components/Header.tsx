"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const handleNext = () => {
    router.forward();
  };

  const handlePrev = () => {
    router.back();
  };
  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-neutral-700 p-4",
        className
      )}
    >
      <div className="flex justify-between">
        <div className="hidden sm:flex gap-x-2 items-center">
          <button
            className="rounded-full bg-black/50 hover:bg-black/75 transition-all"
            onClick={handlePrev}
          >
            <RxCaretLeft size={32} />
          </button>
          <button
            className="rounded-full bg-black/50 hover:bg-black/75 transition-all"
            onClick={handleNext}
          >
            <RxCaretRight size={32} />
          </button>
        </div>
        <div className="sm:hidden flex gap-x-2 ">
          <button className="rounded-full bg-black/50 hover:bg-black/75 transition-all p-1">
            <HiHome size={24} />
          </button>
          <button className="rounded-full bg-black/50 hover:bg-black/75 transition-all p-1">
            <BiSearch size={24} />
          </button>
        </div>
        <div className="flex gap-x-2 items-center">
          <Button className="bg-transparent text-neutral-300 font-medium whitespace-nowrap">
            Sign up
          </Button>
          <Button className="bg-white">Log in</Button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
