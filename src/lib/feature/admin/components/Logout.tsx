"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export const Logout = () => {
  return (
    <DropdownMenuItem
      onClick={() => {
        signOut({ callbackUrl: "/", redirect: true });
      }}
    >
      Logout
    </DropdownMenuItem>
  );
};
