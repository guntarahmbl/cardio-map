"use client";

import { useEffect, useState } from "react";

export function DeviceSelection({ children }) {
  // Get window width
  const [windowWidth, setWindowWidth] = useState();

  // Listen for window resize
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mobile
  if (windowWidth && windowWidth < 1024) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
        <h1 className="text-center text-2xl font-bold">
          Please use Desktop devices to use this app.
        </h1>
      </main>
    );
  }

  // Desktop
  return <>{children}</>;
}