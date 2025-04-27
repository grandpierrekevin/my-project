import { useState, useEffect } from "react";
import VentesLoader from "@/components/loaders/VentesLoader";

export default function VentesPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // 🔥 Une fois chargé on affiche
    }, 1500); // ⏳ Simulation de chargement 3 secondes

    return () => clearTimeout(timer);
  }, []);
  return (
      <>
        {isLoading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <VentesLoader isActive={true} />
          </div>
        ) : (
          <div className="p-6">
            <h1 className="text-3xl font-bold">Ventes</h1>
          </div>
        )}
      </>
    );
  }
