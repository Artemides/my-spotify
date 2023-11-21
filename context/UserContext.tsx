import { Subscription, UserDetails } from "@/types/types";
import { User, useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { createContext, useEffect, useState } from "react";

type UserCotext = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserCotext | undefined>(undefined);

type Props = {
  [prop: string]: any;
};

const UserProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient,
  } = useSessionContext();
  const user = useUser();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userSubscription, setUserSubscription] = useState<UserDetails | null>(
    null
  );

  const getUserDetails = () =>
    supabaseClient.from("users").select("*").single();

  const getUserSubscription = () =>
    supabaseClient
      .from("subscriptions")
      .select("*,prices(*,products(*))")
      .in("status", ["trialing", "active"])
      .single();

  const accessToken = session?.access_token ?? null;

  useEffect(() => {
    if (isLoadingData || isLoadingUser) return;

    if (user && !userDetails && !userSubscription) {
      setIsLoadingData(true);
    }
  }, [isLoadingData, isLoadingUser]);

  return <UserContext.Provider value={} {...props} />;
};
