import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import HomePage from "./pages/home";
import AboutUs from "./pages/About";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-[8ch]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
