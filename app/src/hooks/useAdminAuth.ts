import { useState, useCallback, useEffect } from "react";
import { trpc } from "@/providers/trpc";

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null
  );
  const [loginError, setLoginError] = useState<string | null>(null);
  const utils = trpc.useUtils();

  const meQuery = trpc.adminAuth.me.useQuery(undefined, {
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Sync token state with localStorage changes
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "admin_token") {
        setToken(e.newValue);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const loginMutation = trpc.adminAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("admin_token", data.token);
      setToken(data.token);
      setLoginError(null);
      utils.adminAuth.me.invalidate();
    },
    onError: (error) => {
      // Extract clean error message from tRPC error
      const message = error.message;
      try {
        // Try to parse if it's a JSON error
        const parsed = JSON.parse(message);
        setLoginError(
          parsed[0]?.message ||
          parsed.message ||
          "Invalid credentials. Please try again."
        );
      } catch {
        // If not JSON, use the message directly
        setLoginError(
          message.includes("UNAUTHORIZED")
            ? "Invalid email or password."
            : message || "Login failed. Please try again."
        );
      }
    },
  });

  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setLoginError(null);
    utils.invalidate();
  }, [utils]);

  // Clear error when token changes (on logout)
  useEffect(() => {
    if (!token) {
      setLoginError(null);
    }
  }, [token]);

  const isAuthenticated = !!meQuery.data?.email;
  const isLoading = meQuery.isLoading && !!token;

  return {
    isAuthenticated,
    isLoading,
    admin: meQuery.data,
    login: loginMutation.mutateAsync,
    logout,
    isLoggingIn: loginMutation.isPending,
    loginError,
  };
}
