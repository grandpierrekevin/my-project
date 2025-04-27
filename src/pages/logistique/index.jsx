import { useState, useEffect } from "react";
import LogistiqueLoader from "@/components/loaders/LogistiqueLoader";
export default function LogistiquePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // 🔥 Une fois chargé on affiche
    }, 6000); // ⏳ Simulation de chargement 3 secondes

    return () => clearTimeout(timer);
  }, []);

  return (
      <>
            {isLoading ? (
              <div className="flex items-center justify-center h-[80vh]">
                <LogistiqueLoader isActive={true} />
              </div>
            ) : (
              <div className="p-6">
                <h1 className="text-3xl font-bold">Clients</h1>
              </div>
            )}
          </>
        );
      }