'use client';

import { UserButton } from '@clerk/nextjs';

export default function TopBar() {
  return (
    <div className="flex justify-between items-center border-b p-4">
      <h1 className="font-bold text-lg">Dashboard</h1>
      <UserButton />
    </div>
  );
}
