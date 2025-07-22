import { signIn as googleSignIn, signOut as googleSignOut, signInSilently } from "@/auth";
import { createContext, useContext, useEffect, useState } from "react";

type User = any;

type AuthStatus = "loading" | "unauthenticated" | "authenticated";

type UserContextType = {
  user: User | null | undefined;
  signIn: () => void;
  signOut: () => void;
  status: AuthStatus;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const[status, setStatus] = useState<AuthStatus>("loading");

  const fetchUser = async () => {
    try {
      const current = await signInSilently();
      if (current) {
        setUser(current);
        setStatus("authenticated");
      } else {
        setUser(null);
        setStatus("unauthenticated");

      }
    } catch (err) {
      console.error("Failed to get current user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signIn = async () => {
    const user = await googleSignIn();
    if(user){
        setUser(user);
        setStatus("authenticated");

    }
  
  };

  const signOut = async () => {
    await googleSignOut();
    setUser(null);
    setStatus("unauthenticated");
  };

  return <UserContext.Provider value={{ user, signIn, signOut, status }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};