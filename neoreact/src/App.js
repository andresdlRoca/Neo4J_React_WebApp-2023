import Register from "./pages/Register";
import RegisterPet from "./pages/RegisterPet";
import MainPage from "./pages/MainPage";
import AvailablePets from "./pages/AvailablePets";
import OtherOwners from "./pages/OtherOwners";
import RecommendDog from "./pages/RecommendDog";
import CheckPets from "./pages/CheckPets";
import RegisterRace from "./pages/RegisterRace";
import RegisterShelter from "./pages/RegisterShelter";
import UpdateInfo from "./pages/UpdateInfo";
import DeleteInfo from "./pages/DeleteInfo";

import AppBar from "./AppBar";
import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
      <AppBar />
      <Container className="mt-3 mb-3">
        <Routes>
          <Route path="/" element={<MainPage />} /> {/* MainPage */}
          <Route path="/person/add_user" element={<Register />} />
          <Route path="/dog/add" element={<RegisterPet />} />
          <Route path="/race/add" element={<RegisterRace />} />
          <Route path="/shelter/add" element={<RegisterShelter />} />
          <Route path="/update_info/" element={<UpdateInfo />} />
          <Route path="/delete_info/" element={<DeleteInfo />} />
          <Route path="/search_dog/" element={<CheckPets />} />
          <Route path="/available_dogs" element={<AvailablePets />} />
          <Route path="/other_users" element={<OtherOwners />} />
          <Route path="/recommend_dogs" element={<RecommendDog />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
