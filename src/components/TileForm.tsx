import { ChangeEvent, FormEvent, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { Item } from "./typing";

interface Props {
  show: boolean;
  handleClose: () => void;
}


const TileForm = ({ show, handleClose }: Props) => {
  const [details, setDetails] = useState<Item>({
    title: "",
    description: "",
    imagePath: "",
  });

  const CreateNewItem = (e: FormEvent) => {
    e.preventDefault();
    if (
      details.title.trim() == "" ||
      details.description.trim() == "" ||
      details.imagePath.trim() == ""
    )
      return;
    else {
      try {
        let data: string | null = localStorage.getItem("items");
        if (data) {
          let parsedData: Item[] = JSON.parse(data);
          parsedData.push(details);
          let parsedDataString = JSON.stringify(parsedData);
          localStorage.setItem("items", parsedDataString);
        } else throw new Error("Fetch the Data Error !");

        setDetails({
          title: "",
          description: "",
          imagePath: "",
        });
        handleClose()
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create your own Tile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={CreateNewItem}>
          <FloatingLabel
            controlId="floatingTitle"
            label="Title"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Title name"
              value={details.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDetails({ ...details, title: e.target.value })
              }
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingDescription"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Description"
              value={details.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDetails({ ...details, description: e.target.value })
              }
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingImage"
            label="Image Link"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Image link"
              value={details.imagePath}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDetails({ ...details, imagePath: e.target.value })
              }
            />
          </FloatingLabel>
          <Button variant="primary" type="submit" className="">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      
    </Modal>
  );
};
export default TileForm;
