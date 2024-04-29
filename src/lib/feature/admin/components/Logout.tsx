"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { signOut } from "next-auth/react";

export const Logout = () => {
  return (
    <DropdownMenuItem
      onClick={() => {
        signOut({ callbackUrl: "/", redirect: true }).then(() => {
          toast({
            title: "Success",
            description: "User successfully logged out",
          });
        });
      }}
    >
      Logout
    </DropdownMenuItem>
  );
};
