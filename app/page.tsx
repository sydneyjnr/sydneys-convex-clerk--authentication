"use client";

import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import Link from "next/link";
import { SignIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        <span className="font-bold">
          SYDNEY&apos;S CLERK AUTHENTICATION
        </span>

        <Authenticated>
          <UserButton />
        </Authenticated>
      </header>

      <main className="p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          SYDNEY&apos;S CLERK AUTHENTICATION
        </h1>

        <Authenticated>
          <Content />
        </Authenticated>

        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  );
}

function SignInForm() {
  return (
    <div className="flex justify-center">
      <SignIn
        routing="hash"
        signUpUrl="#/sign-up"
        afterSignInUrl="/"
        afterSignUpUrl="/"
      />
    </div>
  );
}

function Content() {
  const result = useQuery(api.myFunctions.listNumbers, { count: 10 });
  const addNumber = useMutation(api.myFunctions.addNumber);

  if (!result) {
    return (
      <div className="mx-auto">
        <p>Loading...</p>
      </div>
    );
  }

  const { viewer, numbers } = result;

  return (
    <div className="flex flex-col gap-8 max-w-lg mx-auto">
      <p className="text-lg">
        Welcome <span className="font-bold">{viewer ?? "User"}</span>!
      </p>

      <p>
        Click the button below and open this page in another window — this data
        is persisted in the Convex cloud database.
      </p>

      <button
        className="bg-foreground text-background text-sm px-4 py-2 rounded-md w-fit"
        onClick={() => {
          void addNumber({ value: Math.floor(Math.random() * 10) });
        }}
      >
        Add a random number
      </button>

      <p>
        Numbers:{" "}
        {numbers.length === 0
          ? "Click the button!"
          : numbers.join(", ")}
      </p>

      <p>
        Edit{" "}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          convex/myFunctions.ts
        </code>{" "}
        to change your backend
      </p>

      <p>
        Edit{" "}
        <code className="text-sm font-bold font-mono bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded-md">
          app/page.tsx
        </code>{" "}
        to change your frontend
      </p>

      <p>
        See the{" "}
        <Link href="/server" className="underline hover:no-underline">
          /server route
        </Link>{" "}
        for a server component example
      </p>
    </div>
  );
}
