import { Container } from "react-bootstrap";
import planday from "../assets/planda.gif"


const LoadingScreen = () => {
  return (

      <div className="planday">
        <img
          src={planday}
          alt="planday logo"
        />
    </div>

  );
};

export default LoadingScreen;
