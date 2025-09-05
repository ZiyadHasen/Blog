"use client";

import { SignInForm, SignInFormValues } from "@/components/signinForm";
import { toast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (values: SignInFormValues) => {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
    }, {
      onRequest: () => {
        setIsLoading(true);
      },
      onResponse: () => {
        setIsLoading(false);
      },
      onSuccess: () => {
        router.push(`/`);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <SignInForm onSubmit={handleSignIn} />
    </main>
  );
} 