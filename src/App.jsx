import { BrowserRouter } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;
