import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import NavigationBar from "./components/Navbar";
import HomeScreen from "./Screens/HomeScreen";

const App = () => {
  return (
    <>
      <NavigationBar />
      <main>
        <Container>
          <HomeScreen />
          <Footer />
        </Container>
      </main>
    </>
  );
};

export default App;
