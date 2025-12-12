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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/dashboard");
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
    style={{
      backgroundImage: "url('/background.jpg')",
    }}
    {...props}
  >
    
    <div className="h-full flex items-center pl-24  pt-20">
     
      <Card className="w-[460px] min-h-[500px] p-8 shadow-xl rounded-3xl font-kaisei bg-[#f1f2eb]">
        <CardHeader>
          <CardTitle className="text-3xl flex justify-center items-center text-[#3a3c4e]">Login</CardTitle>
          <CardDescription   className="flex  items-center justify-center text-[#3a3c4e] text-md pb-4">
            A calm  mind learns best-welcome.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 rounded-full ">
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
                  className="p-8 rounded-full border border-[#5f6172]  font-semibold text-[#3a3c4e]"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex items-center">
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline font-bold"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full  bg-[#b2d3be]  hover:bg-[#94c8a7] text-[#3a3c4e] font-bold border border-[#9fb6a4] text-xl rounded-full p-8" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don’t have an account?{" "}
              <Link href="/auth/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
);
}