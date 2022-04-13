import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import Home from "./components/Home";
import LoadingScreen from "./components/LoadingView";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  useEffect(() => {
    if (localStorage.getItem('items')) localStorage.removeItem('items')
    localStorage.setItem('items', JSON.stringify(require('./data/data.json')))
    return () => {}
  }, [])
  return (
    <Container>
      <Row className="d-flex">{!loading ? <Home /> : <LoadingScreen />}</Row>
    </Container>
  );
}

export default App;
