"use client";
import * as React from "react";
// import { authenticate } from '@/app/lib/actions';
import Image from "next/image";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { createUser } from "@/utils/apiFunctions";
interface I {
  name: string;
  password: string;
  email: string;
  confirmPassword: string;
}
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I>();

  const loginHandler = async (data: I) => {
    setIsLoading(true);
    const loginData = await createUser({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (loginData?.error) {
      console.log(loginData?.error);
    } else {
      setIsLoading(false);

      router?.push("/");
      router.refresh();
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form
          className="mx-auto grid w-[350px] gap-6"
          onSubmit={handleSubmit(loginHandler)}
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to register to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Full name</Label>
              <Input
                id="fullname"
                type="text"
                placeholder="John smith"
                {...register("name", { required: "Required" })}
              />
              {!!errors?.name?.message && (
                <p className="text-red-500 text-xs">{errors.name?.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@gmail.com"
                required
                {...register("email", { required: "Required" })}
              />
              {!!errors?.email?.message && (
                <p className="text-red-500 text-xs">{errors.email?.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                type="password"
                required
                {...register("password", {
                  required: "Required",
                  validate: (d, all) =>
                    all.confirmPassword === d ||
                    "Password and Confirm Password should be same",
                })}
              />
              {!!errors?.password?.message && (
                <p className="text-red-500 text-xs">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Input
                id="confirmPassword"
                type="password"
                required
                {...register("confirmPassword", { required: "Required" })}
              />
              {!!errors?.confirmPassword?.message && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full hover:bg-black">
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/story/kooka-story.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
export default Register;
