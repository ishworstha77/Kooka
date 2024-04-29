"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { signOut, useSession } from "next-auth/react";

export const SignoutButton = () => {
  const { data } = useSession();
  return (
    <Button
      onClick={() => {
        signOut().then(() => {
          toast({
            title: "Success",
            description: "User successfully logged out",
          });
        });
      }}
    >
      Sign Out
    </Button>
  );
};
