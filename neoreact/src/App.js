import Register from "./pages/Register";
import RegisterPet from "./pages/RegisterPet";
import MainPage from "./pages/MainPage";
import AvailablePets from "./pages/AvailablePets";
import OtherOwners from "./pages/OtherOwners";
import Recomendation from "./pages/Recomendation";
import CheckPets from "./pages/CheckPets";
import RegisterRace from "./pages/RegisterRace";
import RegisterShelter from "./pages/RegisterShelter";

import AppBar from "./AppBar";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
      <AppBar />
      <Container className="mt-3 mb-3">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-pet" element={<RegisterPet />} />
          <Route path="/available-pets" element={<AvailablePets />} />
          <Route path="/other-owners" element={<OtherOwners />} />
          <Route path="/recomendation" element={<Recomendation />} />
          <Route path="/check" element={<CheckPets />} />
          <Route path="/f" element={<RegisterRace />} />
          <Route path="/s" element={<RegisterShelter />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
