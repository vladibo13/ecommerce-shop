import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import NavigationBar from "./components/Navbar";
import HomeScreen from "./screens/HomeScreen";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <NavigationBar />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
