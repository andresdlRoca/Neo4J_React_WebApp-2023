
import Figure from 'react-bootstrap/Figure';
//import pic from "/nino-feliz-con-su-perro.jpeg"


function MainPage() {
  return (
    <>
      <Figure>
        <Figure.Image
          width={800}
          src="/nino-feliz-con-su-perro.jpeg"
        />
        <Figure.Caption>
          Mas de 100000 usuarios felices con sus nuevas mascotas en todo el mundo!
        </Figure.Caption>
      </Figure>
    </>
  );
}

export default MainPage;