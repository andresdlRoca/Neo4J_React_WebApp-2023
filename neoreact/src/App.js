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
          <Route
            path="/person/:nameParam/dog/:dogParam"
            element={<Recomendation />}
          />
          <Route
            path="/dog/:dogParam/rescued_by/person/:nameParam"
            element={<CheckPets />}
          />
          <Route
            path="/dog/:dogParam/assigned_to/person/:nameParam"
            element={<RegisterRace />}
          />
          <Route
            path="/dog/:dogParam/shelter/:nameParam"
            element={<RegisterShelter />}
          />
          <Route
            path="/dog/:dogParam/race/:race_nameParam"
            element={<RegisterShelter />}
          />
          <Route path="/person/:nameParam" element={<OtherOwners />} />
          <Route
            path="/person/:nameParam/label/:labelParam"
            element={<OtherOwners />}
          />
          <Route path="/dog/:dogParam" element={<OtherOwners />} />
          <Route path="/shelter/:nameParam" element={<OtherOwners />} />
          <Route
            path="/picked_up/person/:nameParam/dog/:dogParam"
            element={<OtherOwners />}
          />
          <Route
            path="/update/staff_ratio/shelter/:nameParam/dog/:dogParam"
            element={<OtherOwners />}
          />
          <Route
            path="/update/dog/:dogParam/shelter/:nameParam"
            element={<OtherOwners />}
          />
          <Route
            path="/update/shelter/:nameParam/dog/:dogParam"
            element={<OtherOwners />}
          />
          <Route path="/deletePerson/:nameParam" element={<OtherOwners />} />
          <Route path="/deleteDog/:nameParam" element={<OtherOwners />} />
          <Route path="/deleteShelter/:nameParam" element={<OtherOwners />} />
          <Route
            path="/deleteAdopted/:nameParam/:dogParam"
            element={<OtherOwners />}
          />
          <Route
            path="/deleteIsIn/:nameParam/:dogParam"
            element={<OtherOwners />}
          />
          <Route
            path="/deleteLikes/:nameParam/:dogParam"
            element={<OtherOwners />}
          />
          <Route
            path="/deleteDislikes/:nameParam/:dogParam"
            element={<OtherOwners />}
          />
          <Route
            path="/deleteAssignedTo/:nameParam/:dogParam"
            element={<OtherOwners />}
          />
          <Route
            path="/deletePersonProperties/:nameParam"
            element={<OtherOwners />}
          />
          <Route
            path="/deleteDogProperties/:nameParam"
            element={<OtherOwners />}
          />
          <Route
            path="/deleteAdoptedProperties/:nameParam/:dogParam"
            element={<OtherOwners />}
          />
          <Route
            path="/deleteIsInProperties/:nameParam/:dogParam"
            element={<OtherOwners />}
          />
          <Route path="/dog/:dogParam" element={<OtherOwners />} />
          <Route path="/available_dogs" element={<OtherOwners />} />
          <Route path="/other_users" element={<OtherOwners />} />
          <Route path="/recommend_dogs/:nameParam" element={<OtherOwners />} />
          <Route
            path="/recommend_dogs_age/:nameParam"
            element={<OtherOwners />}
          />
          <Route
            path="/recommend_dogs_location/:nameParam"
            element={<OtherOwners />}
          />
          <Route
            path="/recommend_dogs_size/:nameParam"
            element={<OtherOwners />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
