"use client";

import { signOut } from "next-auth/react";

export default function Pending() {
  return (
    <div>
      Awaiting admin approval
      <button type="button" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
}
