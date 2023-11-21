"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "../supabase-db";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
type SupabaseProviderProps = {
  children: React.ReactNode;
};
const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
