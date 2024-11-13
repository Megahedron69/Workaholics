import { useState, useEffect } from "react";
import { checkAuthStatus } from "../Auth/auth";

export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const checkStatus = async () => {
      const result = await checkAuthStatus();
      setIsAuthenticated(result.status);
    };
    checkStatus();
  }, []);
  return isAuthenticated;
};
