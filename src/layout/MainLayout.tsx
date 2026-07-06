import Navbar from "../shared/components/Navbar.tsx";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="bg-white-50 relative flex flex-col">
      <Navbar />
      <div className="flex-1">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
