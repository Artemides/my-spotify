"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import Button from "./Button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import SearchBar from "./Searchbar";

type HeaderProps = {
  children?: React.ReactNode;
  className?: string;
  withSearch?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  children,
  className,
  withSearch = false,
}) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      toast.error(`Error ${error}`);
      return;
    }

    router.refresh();
    toast.success("Logged out");
  };
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
      <div className="flex justify-between gap-x-2">
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
          {withSearch && <SearchBar />}
        </div>

        <div className="sm:hidden flex gap-x-2 items-center">
          <button className="rounded-full bg-black/50 hover:bg-black/75 transition-all p-1">
            <HiHome size={24} />
          </button>
          <button className="rounded-full bg-black/50 hover:bg-black/75 transition-all p-1">
            <BiSearch size={24} />
          </button>
        </div>
        {user ? (
          <div className="flex gap-x-2 items-center">
            <Button
              onClick={handleLogout}
              className="bg-transparent text-neutral-300 font-medium whitespace-nowrap"
            >
              Log out
            </Button>
            <Button className="bg-white p-2">
              <FaUserAlt />
            </Button>
          </div>
        ) : (
          <div className="flex gap-x-2 items-center">
            <Button
              onClick={onOpen}
              className="bg-transparent text-neutral-300 font-medium whitespace-nowrap"
            >
              Sign up
            </Button>
            <Button onClick={onOpen} className="bg-white">
              Log in
            </Button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Header;
