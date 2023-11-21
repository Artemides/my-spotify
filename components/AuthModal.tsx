import React, { useEffect } from "react";
import Modal from "./Modal";
import { Auth } from "@supabase/auth-ui-react";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

const AuthModal = () => {
  const router = useRouter();
  const { session } = useSessionContext();
  const supabaseClient = useSupabaseClient();
  const { isOpen, onClose } = useAuthModal();

  useEffect(() => {
    if (!session) return;

    router.refresh();
    onClose();
  }, [onClose, router, session]);

  const handleCloseModa = (open: boolean) => !open && onClose();

  return (
    <Modal
      description="Auth"
      title="Auth"
      isOpen={isOpen}
      onChange={handleCloseModa}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={["github"]}
        magicLink
        theme="dark"
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: "#404040", brandAccent: "#22c55e" } },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
