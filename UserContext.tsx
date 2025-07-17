import { signIn as googleSignIn, signOut as googleSignOut, signInSilently } from "@/auth";
import { createContext, useContext, useEffect, useState } from "react";

type User = any;

type UserContextType = {
  user: User | null | undefined;
  signIn: () => void;
  signOut: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const fetchUser = async () => {
    try {
      const current = await signInSilently();
      if (current) {
        setUser(current);
      } else {
        setUser(null);
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
    setUser(user);
  };

  const signOut = async () => {
    await googleSignOut();
    setUser(null);
  };

  return <UserContext.Provider value={{ user, signIn, signOut }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};