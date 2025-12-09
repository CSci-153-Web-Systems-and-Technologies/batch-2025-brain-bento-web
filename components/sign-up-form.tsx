"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-cover bg-center bg-no-repeat",
        className
      )}
      style={{ backgroundImage: "url('/background.jpg')" }}
      {...props}
    >
      <div className="h-full flex items-center pl-24 pt-10">
        <Card className="w-[460px] min-h-[580px] p-8 shadow-xl rounded-3xl font-kaisei bg-[#f1f2eb]">
          <CardHeader>
            <CardTitle className="text-3xl flex justify-center items-center text-[#3a3c4e]">
              Sign Up
            </CardTitle>
            <CardDescription className="flex items-center justify-center text-[#3a3c4e] text-md pb-4">
              Create a new account and start learning
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="p-8 rounded-full font-semibold text-[#3a3c4e] border border-[#5f6172]"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="p-8 rounded-full border border-[#5f6172] font-semibold text-[#3a3c4e]"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Input
                    id="repeat-password"
                    type="password"
                    placeholder="Repeat Password"
                    className="p-8 rounded-full border border-[#5f6172] font-semibold text-[#3a3c4e]"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button
                  type="submit"
                  className="w-full bg-[#b2d3be] hover:bg-[#94c8a7] text-[#3a3c4e] font-bold border border-[#9fb6a4] text-xl rounded-full p-8"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
