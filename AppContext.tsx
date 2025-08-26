import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/AuthContext";
import { getConnections } from "@/lib/api";

type User = any;

type AppContextType = {
  user: User | null;
  loaded: boolean;
  connections: any;
  refreshConnections: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [connections, setConnections] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { user: authUser, status } = useAuth();

  useEffect(() => {
    if (status !== "authenticated") {
      setUser(null);
      setLoaded(false);
      return;
    }

    load();
  }, [status]);

  const refreshConnections = async () => {
    const connections = await getConnections();
    setConnections(connections);
  };

  const load = async () => {
    refreshConnections();
    setUser(authUser);
    setLoaded(true);
  };

  return <AppContext.Provider value={{ user, loaded, connections, refreshConnections }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};