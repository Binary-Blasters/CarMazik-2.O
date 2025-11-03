import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsedCarsPage from "./pages/UsedCarsPage";
import CarDetailsPage from "./pages/CarDetailsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/used-cars" element={<UsedCarsPage />} />
          <Route path="/car/:id" element={<CarDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
