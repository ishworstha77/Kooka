"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={() => {
        router?.push("/login");
      }}
    >
      Login
    </DropdownMenuItem>
  );
};
