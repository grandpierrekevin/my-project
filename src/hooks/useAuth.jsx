import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider"; // Importe le contexte

export function useAuth() {
  return useContext(AuthContext);
}
