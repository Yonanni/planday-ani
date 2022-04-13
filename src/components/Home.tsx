



import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import  data  from "../data/data.json";
import Notfound from "../assets/notFound.gif";
import Pagination from "./Pagination";
import SingleCard, { SingleCardMobile } from "./SingleCard";
import styles from "./styles.module.scss";
import TileForm from "./TileForm";
import { Item } from "./typing";



function Home() {
    const dataS: string | null = localStorage.getItem("items");
  const parsedData = dataS ? JSON.parse(dataS) : data;

  const [items, setItems] = useState<Item[]>(parsedData);
  const [limit, setLimit] = React.useState<number>(3);
  const [title, setTitle] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [match, setMatch] = useState(
    window.matchMedia("(min-width: 500px)").matches
  );
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const start = 0;
  const stop = limit;

  const handleLimit = () => {
    if (title) {
      if (limit + 3 >= mobFilter.length) {
        setLimit(mobFilter.length);
      } else {
        setLimit(limit + 3);
      }
    } else {
      if (limit + 3 >= parsedData.length) {
        setLimit(parsedData.length);
      } else {
        setLimit(limit + 3);
      }
    }
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
  };
  const filtered = items.filter((info) =>
    info.title.toLowerCase().includes(title)
  );
  const mobFilter = parsedData.filter((info: Item) =>
    info.title.toLowerCase().includes(title)
  );

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => setMatch(e.matches);
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <>
      <TileForm show={show} handleClose={handleClose} />
      <Container>
        <Form onSubmit={onSearch}>
          <Row className="d-flex justify-content-between p-4 mb-4">
            <Col xs={12} md={6} lg={8} className="mb-2">
              <FloatingLabel label="Search by title">
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value.toLowerCase())
                  }
                />
              </FloatingLabel>
            </Col>

            <Col
              xs={12}
              md={3}
              lg={2}
              className="d-grid"
              style={{ maxHeight: "58px" }}
            >
              <Button
                className="background-gradient"
                variant="outline-dark"
                type="submit"
                onClick={handleShow}
              >
                Create
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container className="mb-3">
        <Row>
          {!match && filtered.length == 0 ? (
            <div>
              <img
                src={Notfound}
                alt="Result Not Found"
                className="d-none d-md-block"
                style={{ height: "80%", width: "100%" }}
              />
            </div>
          ) : (
            filtered.map((info, i) => <SingleCard info={info} />)
          )}
          <>
            {/* {match && mobFilter.slice(start, stop).map((info, i) => (
              <SingleCardMobile info={info} />
            ))} */}
            {match && mobFilter.length == 0 ? (
              <div>
                <img
                  src={Notfound}
                  alt="Result Not Found"
                  className="d-block d-md-none mx-auto"
                  style={{ height: "80%", width: "100%" }}
                />
              </div>
            ) : (
              match &&
              mobFilter
                .slice(start, stop)
                .map((info: Item, i: number) => <SingleCardMobile info={info} />)
            )}
            {limit !== parsedData.length && limit !== mobFilter.length  && (
              <Button
                className=" d-block d-md-none my-4"
                variant="secondary"
                onClick={handleLimit}
              >
                See More
              </Button>
            )}
          </>
        </Row>
      </Container>

      {filtered.length !== 0 && (
        <Pagination items={parsedData as never[]} onChangePage={(a) => setItems(a)} />
      )}
    </>
  );
}

export default Home;