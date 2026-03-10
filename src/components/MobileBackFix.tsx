"use client";

import { useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function MobileBackHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleBackForward = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handleBackForward);

    return () => {
      window.removeEventListener("popstate", handleBackForward);
    };
  }, [pathname, searchParams]);

  return null;
}

export default function MobileBackFix() {
  return (
    <Suspense fallback={null}>
      <MobileBackHandler />
    </Suspense>
  );
}
