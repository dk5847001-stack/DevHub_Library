import KineticGrid from "./components/KineticGrid";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Product from "./pages/Products";
import Signup from "./pages/Signup";
import Support from "./pages/Support";

function App() {
    return (
        <div className="app-container relative min-h-screen text-white">

            {/* =========================
                ANIMATED BACKGROUND
            ========================== */}
            <div
                className="kinetic-background fixed inset-0 z-0 pointer-events-none"
                aria-hidden="true"
            >
                <KineticGrid />
            </div>

            {/* =========================
                MAIN APPLICATION
            ========================== */}
            <div className="app-content relative z-10 min-h-screen">

                {/* Navbar */}
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/contact" element={<Contact/>} />
                  <Route path="/about" element={<About/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/pricing" element={<Pricing/>} />
                  <Route path="/products" element={<Product/>} />
                  <Route path="/signup" element={<Signup/>} />
                  <Route path="/support" element={<Support/>} />
                </Routes>
            </div>

        </div>
    );
}

export default App;