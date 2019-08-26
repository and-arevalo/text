import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import TextEditor from './TextEditor';

import './App.css';

const App = () => (
  <Container>
    <Row>
      <Col>
        <h1>Convert Text</h1>
      </Col>
    </Row>
    <TextEditor />
  </Container>
);

export default App;
