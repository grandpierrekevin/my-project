import { FaHome, FaUsers, FaShoppingCart, FaTruck, FaSearch, FaFileInvoice } from "react-icons/fa";

export const sidebarConfig = [
  {
    path: "/home",
    icon: <FaHome />,
    label: "Accueil",
  },
  {
    path: "/clients",
    icon: <FaUsers />,
    label: "Clients",
    children: [
      { path: "/clients/rechercheClient", icon: <FaSearch />, label: "Recherche clients" },
    ],
  },
  {
    path: "/ventes",
    icon: <FaShoppingCart />,
    label: "Ventes",
    children: [
      { path: "/ventes/commandes", icon: <FaShoppingCart />, label: "Commandes" },
      { path: "/ventes/factures", icon: <FaFileInvoice />, label: "Factures" },
    ],
  },
  {
    path: "/logistique",
    icon: <FaTruck />,
    label: "Logistique",
    children: [
      { path: "/logistique/expeditions", icon: <FaTruck />, label: "Expéditions" },
    ],
  },
];
