import { Container } from "react-bootstrap";
import planday from "../assets/planda.gif"


const LoadingScreen = () => {
  return (
    // <Container className="mt-auto mb-auto mr-auto ml-auto">
      <div className="mt-auto mb-auto mr-auto ml-auto">
        <img
          src={planday}
          alt="planday logo"
        />
    </div>
    //   </Container>
  );
};

export default LoadingScreen;
