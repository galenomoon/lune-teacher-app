"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          console.log(
            "Service Worker registrado com sucesso:",
            registration
          );
        })
        .catch((error) => {
          console.error("Erro ao registrar Service Worker:", error);
        });
    }
  }, []);

  return null;
}
