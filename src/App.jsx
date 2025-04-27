import { useRoutes, useLocation } from "react-router-dom";
import routes from "~react-pages";
import MainLayout from "@/components/layout/MainLayout";

export default function App() {
  const element = useRoutes(routes);
  const location = useLocation();

  const isLoginPage = location.pathname === "/"; // si on est sur / (login)

  if (isLoginPage) {
    // Login page sans layout
    return (
        element
    );
  }

  // Toutes les autres pages avec sidebar
  return (
    <MainLayout>
        {element}
    </MainLayout>
  );
}
