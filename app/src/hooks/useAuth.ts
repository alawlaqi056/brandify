import { trpc } from "@/providers/trpc";

interface AuthUser {
  name: string;
  email: string;
  avatar?: string | null;
}

export function useAuth() {
  const utils = trpc.useUtils();

  // Brandify uses admin auth via useAdminAuth
  // This hook provides a compatible interface for AuthLayout
  return {
    user: null as AuthUser | null,
    isLoading: false,
    isAdmin: false,
    logout: () => {
      localStorage.removeItem("admin_token");
      utils.invalidate();
    },
  };
}
