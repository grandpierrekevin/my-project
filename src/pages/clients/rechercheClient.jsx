import { useState, useEffect } from "react"; // ⚡ Ajout de useEffect qui manquait
import { fakeClients } from "@/services/clientsData";
import { DataTable } from "@/components/ui/DataTable";
import { RecherchePanel } from "@/components/ui/RecherchePanel";
import ClientsLoader from "@/components/loaders/ClientsLoader"; // ✅ Loader 3D clients

export default function RechercheClientPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClients(fakeClients); 
      setIsLoading(false); // 🔥 Une fois chargé on affiche
    }, 1500); // ⏳ Simulation de chargement 3 secondes

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query) => {
    const filtered = fakeClients.filter((client) =>
      [client.nom, client.prenom, client.entreprise]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setClients(filtered);
  };

  const columns = [
    { header: "Nom", accessorKey: "nom" },
    { header: "Prénom", accessorKey: "prenom" },
    { header: "Entreprise", accessorKey: "entreprise" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <ClientsLoader /> 
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Recherche Clients</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* DataTable */}
        <div className="flex-1 bg-gray-200 rounded-lg shadow overflow-auto p-5">
          <DataTable columns={columns} data={clients} />
        </div>

        {/* Panneau Recherche */}
        <div className="w-full lg:w-1/4">
          <RecherchePanel onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}
