import { createContext, useContext, useState, useEffect } from "react";
import { signIn as googleSignIn, signOut as googleSignOut, getUserFromSupabase } from "@/lib/auth";

type User = any;

type AuthStatus = "loading" | "unauthenticated" | "authenticated";

type AuthContextType = {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  status: AuthStatus;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const setAuth = (user: User) => {
    if (user) {
      setUser(user);
      setStatus("authenticated");
    } else {
      setUser(null);
      setStatus("unauthenticated");
    }
  };

  const fetchUser = async () => {
   try {
      const user = await getUserFromSupabase();
      setAuth(user);
    } catch (e) {
      console.error("Failed to get current user:", e);
    }
  };

  const signIn = async () => {
    const user = await googleSignIn();
    if (user) setAuth(user);
  };

  const signOut = async () => {
    await googleSignOut();
    setAuth(null);
  };

  useEffect(() => {
    try {
      fetchUser();
    } catch (err) {
      console.error("Failed to get current user:", err);
    }
    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, signIn, signOut, status }}>{children}</AuthContext.Provider>;
};

  export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;

};