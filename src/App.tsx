import MainLayout from "./layout/MainLayout.tsx";
import HomeContainer from "./feature/home/container/HomeContainer.tsx";

const App = () => {
  return (
    <MainLayout>
      <HomeContainer />
    </MainLayout>
  );
};

export default App;
