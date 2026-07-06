import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout.tsx";
import HomeContainer from "../feature/home/container/HomeContainer.tsx";
import ProfilContainer from "../feature/profil/container/ProfilContainer.tsx";
import VisiMisiContainer from "../feature/visi-misi/container/VisiMisiContainer.tsx";
import PerangkatContainer from "../feature/perangkat/container/PerangkatContainer.tsx";
import LembagaContainer from "../feature/lembaga/container/LembagaContainer.tsx";
import PotensiContainer from "../feature/potensi/container/PotensiContainer.tsx";
import ProgramContainer from "../feature/program/container/ProgramContainer.tsx";
import KontakContainer from "../feature/kontak/container/KontakContainer.tsx";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomeContainer />,
      },
      {
        path: "/profil/profil-desa",
        element: <ProfilContainer />,
      },
      {
        path: "/profil/visi-misi",
        element: <VisiMisiContainer />,
      },
      {
        path: "/perangkat",
        element: <PerangkatContainer />,
      },
      {
        path: "/lembaga",
        element: <LembagaContainer />,
      },
      {
        path: "/potensi",
        element: <PotensiContainer />,
      },
      {
        path: "/program",
        element: <ProgramContainer />,
      },
      {
        path: "/kontak",
        element: <KontakContainer />,
      },
    ],
  },
]);
