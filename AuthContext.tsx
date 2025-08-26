import { createContext, useContext, useState, useEffect } from "react";
import { signIn as googleSignIn, signOut as googleSignOut, getUserFromSupabase } from "@/lib/auth";

type User = any;

type AuthStatus = "loading" | "unauthenticated" | "authenticated";
type Phase = "idle" | "logging-in" | "logged-in";

type AuthContextType = {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  status: AuthStatus;
  phase: Phase;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [phase, setPhase] = useState<Phase>("idle");

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
    try {
      setPhase("logging-in");
      const user = await googleSignIn();
      setPhase("logged-in");
      if (user) setAuth(user);
    } catch (e) {
      setPhase("idle");
      throw e;
    }
  };

  const signOut = async () => {
    await googleSignOut();
    setAuth(null);
    setPhase("idle");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, signIn, signOut, status, phase }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};