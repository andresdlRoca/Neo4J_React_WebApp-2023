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
          <Route path="/person/add_user" element={<Register />} />
          <Route path="/dog/add" element={<RegisterPet />} />
          <Route path="/race/add" element={<AvailablePets />} />
          <Route path="/shelter/add" element={<OtherOwners />} />   
          <Route path="/update_info/" element={<OtherOwners />}/>
          <Route path="/delete_info/" element={<OtherOwners />} />
          <Route path="/search_dog/" element={<OtherOwners />} />
          <Route path="/available_dogs" element={<OtherOwners />} />
          <Route path="/other_users" element={<OtherOwners />} />
          <Route path="/recommend_dogs" element={<OtherOwners />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
