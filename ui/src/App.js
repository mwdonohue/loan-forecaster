import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoanList from './components/LoanList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
class App extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col lg={10}>
            <LoanList></LoanList>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}
export default App;
