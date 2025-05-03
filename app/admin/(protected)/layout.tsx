"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isSessionValid, clearAdminSession } from "@/lib/auth/session";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const valid = isSessionValid();

    if (!valid) {
      clearAdminSession();
      router.replace("/admin/login");
    } else {
      setIsReady(true);
    }
  }, [router]);

  if (!isReady) return null;

  return <>{children}</>;
}
