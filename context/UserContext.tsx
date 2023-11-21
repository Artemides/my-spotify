import { Subscription, UserDetails } from "@/types/types";
import { User } from "@supabase/auth-helpers-react";
import { createContext } from "react";

type UserCotext = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  userSubscription: Subscription | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserCotext | undefined>(undefined);
