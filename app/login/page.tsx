"use client";

import Image from "next/image";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { Check } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen max-w-6xl px-6 mx-auto items-center justify-center">
      
      {/* LEFT SIDE IMAGE */}
      <Link
        href="/"
        className="flex-1 hidden md:flex items-center justify-center"
        title="Go back to home"
      >
        <Image
          src="/assets/login-page-image.png"
          alt="Login illustration"
          width={500}
          height={500}
          className="max-h-[420px] w-auto"
        />
      </Link>

      {/* RIGHT SIDE AUTH */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="md:w-96 w-full flex flex-col items-center">

          <h2 className="text-4xl font-medium text-gray-900">
            Sign in
          </h2>
          <p className="text-sm text-gray-500 mt-3 text-center">
            Welcome back! Please sign in to continue
          </p>

          {/* CLERK SIGN IN */}
          <div className="mt-8 w-full">
            <SignIn
              routing="hash"
              afterSignInUrl="/dashboard"
              afterSignUpUrl="/dashboard"
              appearance={{
                elements: {
                  card: "shadow-none border-none",
                },
              }}
            />
          </div>

          {/* OPTIONAL UI TEXT */}
          <div className="flex items-center gap-2 mt-6 text-sm text-gray-500">
            <Check className="size-4 text-gray-700" />
            Secured authentication powered by Clerk
          </div>
        </div>
      </div>
    </div>
  );
}
