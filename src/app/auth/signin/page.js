"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signinSchema } from "@/lib/validations_zod/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const ERROR_MESSAGES = {
    Signin: "Try signing in with a different account.",
    OAuthSignin: "OAuth sign in failed.",
    OAuthCallback: "OAuth callback error.",
    CredentialsSignin: "Invalid email or password.",
    default: "Sign in failed.",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    const result = signinSchema.safeParse({ email, password });

    if (!result.success) {
      const errors = JSON.parse(result.error.message);
      setErr(errors[0].message || "Invalid input");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("signIn result:", res);

    if (res?.error) {
      const msg = ERROR_MESSAGES[res.error] || ERROR_MESSAGES.default;
      setErr(msg);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>Welcome back! Please sign in.</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {err && <p className="text-sm text-red-500 text-center">{err}</p>}

            <Button type="submit" className="w-full">
              Sign in
            </Button>

            <p className="mt-2 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="font-medium text-primary underline-offset-2 hover:underline"
                onClick={() => router.push("/auth/signup")}
              >
                Sign up
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
