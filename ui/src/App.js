import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoanList from './components/LoanList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import MonthlyPayment from './components/MonthlyPayment';
class App extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col lg={11}>
            <Row>
              <Col lg={2}>
                <MonthlyPayment></MonthlyPayment>
              </Col>
            </Row>
            <Row>
              <LoanList></LoanList>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}
export default App;
