import Register from "./pages/Register";
import RegisterPet from "./pages/RegisterPet";
import AvailablePets from "./pages/AvailablePets";
import OtherOwners from "./pages/OtherOwners";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function LikeButton() {
  const handleLike = () => {};

  return (
    <>
      <Button variant="primary" onClick={handleLike}>
        Like
      </Button>{" "}
    </>
  );
}

export default LikeButton;
