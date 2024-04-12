"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export const SignoutButton = () => {
  // const { data } = useSession();
  return <Button onClick={() => signOut()}>Sign Out</Button>;
};
