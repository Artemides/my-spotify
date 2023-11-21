"use client";

import { UserContext } from "@/context/UserContext";
import { Subscription, UserDetails } from "@/types/types";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { useCallback, useEffect, useState } from "react";

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient,
  } = useSessionContext();
  const user = useUser();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userSubscription, setUserSubscription] = useState<Subscription | null>(
    null
  );

  const getUserDetails = useCallback(
    () => supabaseClient.from("users").select("*").single(),
    [supabaseClient]
  );

  const getUserSubscription = useCallback(
    () =>
      supabaseClient
        .from("subscriptions")
        .select("*,prices(*,products(*))")
        .in("status", ["trialing", "active"])
        .single(),
    [supabaseClient]
  );

  const accessToken = session?.access_token ?? null;

  useEffect(() => {
    if (isLoadingData || isLoadingUser) return;

    if (user && !userDetails && !userSubscription) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDetails(), getUserSubscription()]).then(
        (res) => {
          const [userDetailsPromise, userSubscriptionPromise] = res;
          if (userDetailsPromise.status === "fulfilled") {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }

          if (userSubscriptionPromise.status === "fulfilled") {
            setUserSubscription(
              userSubscriptionPromise.value.data as Subscription
            );
          }

          setIsLoadingData(false);
        }
      );
    }
  }, [
    getUserDetails,
    getUserSubscription,
    isLoadingData,
    isLoadingUser,
    user,
    userDetails,
    userSubscription,
  ]);

  const value = {
    accessToken,
    user,
    userDetails,
    userSubscription,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
