import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import NavigationBar from "./components/Navbar";
import HomeScreen from "./screens/HomeScreen";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
    </>
  );
};

export default App;
