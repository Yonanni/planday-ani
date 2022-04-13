import { Card, Col } from "react-bootstrap";
import { Item } from "./typing";

interface Props {
  info: Item
  
}

const SingleCard = ({ info }: Props) => {
  return (
    <Col className="web d-none d-md-block">
      <Card style={{ width: "16rem" }}>
        <Card.Img
          variant="top"
          src={info.imagePath}
          style={{ height: "20rem", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{info.title}</Card.Title>
          <Card.Text>{info.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};
export const SingleCardMobile = ({ info }: Props) => {
  return (
    <>
      <Col className="mobile d-block d-md-none mx-auto my-3" >
        <Card style={{ minWidth: "16rem" }}>
          <Card.Img
            variant="top"
            src={info.imagePath}
            style={{ height: "20rem", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{info.title}</Card.Title>
            <Card.Text>{info.description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      
    </>
  );
};
export default SingleCard;
