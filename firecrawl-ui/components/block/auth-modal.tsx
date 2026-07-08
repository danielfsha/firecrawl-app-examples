"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Corner } from "../ui/corner";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs-01";

export function AuthModal() {
  const [tab, setTab] = useState("login");

  return (
    <div className="grid w-full grid-cols-[0px_1fr_0px] lg:grid-cols-[1fr_400px_1fr]">
      {/* first row */}
      <div className="border-r relative border-b">
        <Corner position={"bottom-right"} />
      </div>
      <div className="h-20 relative border-b">
        <Corner position={"bottom-right"} />
        <Corner position={"bottom-left"} />
      </div>
      <div className="border-l relative border-b">
        <Corner position={"bottom-left"} />
      </div>

      {/* Tabs row */}
      <div className="border-r relative border-b">
        <Corner position={"top-right"} />
        <Corner position={"bottom-right"} />
      </div>
      <div className="p-3 flex items-center justify-center relative border-b">
        <Corner />
        <Corner position={"top-right"} />
        <Corner position={"bottom-right"} />
        <Corner position={"bottom-left"} />
        <Tabs defaultValue="login" onValueChange={(v) => setTab(v)}>
          <TabsList>
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="border-l relative border-b">
        <Corner position={"top-left"} />
        <Corner position={"bottom-left"} />
      </div>

      {/* Form row */}
      <div className="border-r relative border-b">
        <Corner position={"top-right"} />
        <Corner position={"bottom-right"} />
      </div>
      <div className="flex items-center justify-center relative border-b">
        <Corner />
        <Corner position={"top-right"} />
        <Corner position={"bottom-right"} />
        <Corner position={"bottom-left"} />

        <Card className="w-full bg-transparent shadow-none border-none py-6">
          <CardContent>
            <form>
              <div className="flex flex-col gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                {tab === "signup" && (
                  <div className="grid gap-2">
                    <Label htmlFor="confirm">Confirm Password</Label>
                    <Input id="confirm" type="password" placeholder="••••••••" required />
                  </div>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-3 pt-2">
            <Button size={"lg"} type="submit" className="w-full rounded-full">
              {tab === "login" ? "Sign in" : "Create Account"}
            </Button>
            {tab === "login" && (
              <div className="flex items-center gap-4">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot your password?
                </a>
                <a href="#" className="text-sm text-primary hover:underline">
                  Sign in via magic link
                </a>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
      <div className="border-l relative border-b">
        <Corner position={"top-left"} />
        <Corner position={"bottom-left"} />
      </div>

      {/* OAuth row */}
      <div className="border-r relative">
        <Corner position={"top-right"} />
        <Corner position={"bottom-right"} />
      </div>
      <div className="p-4 flex items-center justify-center relative ">
        <Corner />
        <Corner position={"top-right"} />
        <Corner position={"bottom-right"} />
        <Corner position={"bottom-left"} />
        <div className="flex flex-col gap-3 w-full">
          <Button
            variant="tertiary"
            className="w-full rounded-full"
            size={"lg"}
          >
            <svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="#ffffff"
              />
            </svg>
            Continue with GitHub
            <span className="text-xs opacity-60 ml-2">Last used</span>
          </Button>
          <Button
            variant="tertiary"
            className="w-full rounded-full"
            size={"lg"}
          >
            <svg fill="white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full"
            size={"lg"}
          >
            Continue with SSO
          </Button>
        </div>
      </div>
      <div className="border-l relative ">
        <Corner position={"top-left"} />
        <Corner position={"bottom-left"} />
      </div>

      {/* Footer row */}
      <div className="border-r relative border-t">
        <Corner position={"top-right"} />
      </div>
      <div className="relative border-t py-6 flex items-center justify-center">
        <Corner position={"top-right"} />
        <Corner position={"top-left"} />
        <p className="text-center font-sans text-sm text-(--fc-black-alpha-48)">
          <a href="#" className="hover:underline">Privacy Policy</a>
          {" · "}
          <a href="#" className="hover:underline">Terms of Service</a>
        </p>
      </div>
      <div className="border-l relative border-t">
        <Corner position={"top-left"} />
      </div>
    </div>
  );
}
