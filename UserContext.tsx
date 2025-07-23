import { getUserFromSupabase, signIn as googleSignIn, signOut as googleSignOut } from "@/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

type User = any;

type AuthStatus = "loading" | "unauthenticated" | "authenticated";

type UserContextType = {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  status: AuthStatus;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
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

   const {data, error} = await supabase.from("movies").select();
      console.log(data.length);
      const current = await getUserFromSupabase();
      setAuth(current);
    } catch (err) {
      console.error("Failed to get current user:", err);
      
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signIn = async () => {
    const user = await googleSignIn();
    if (user) setAuth(user);
  };

  const signOut = async () => {
    await googleSignOut();
    setAuth(null);
  };

  return <UserContext.Provider value={{ user, signIn, signOut, status }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};


