import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoanList from './components/LoanList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import MonthlyPayment from './components/MonthlyPayment';
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { totalPayment: 0 }
    this.handleTotalPaymentInputChange = this.handleTotalPaymentInputChange.bind(this)
    this.updateTotalPayment = this.updateTotalPayment.bind(this)
  }

  // Input handler in the Monthly Payment Component
  // TODO: Will need to update to do data validation
  handleTotalPaymentInputChange(event) {
    this.setState({ totalPayment: event.target.value })
  }

  // This one updates
  updateTotalPayment(val) {
    this.setState({ totalPayment: val })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col lg={11}>
            <Row>
              <Col>
                <MonthlyPayment totalPayment={this.state.totalPayment} handleTotalPaymentInputChange={this.handleTotalPaymentInputChange}></MonthlyPayment>
              </Col>
              <Col>
              </Col>
            </Row>
            <Row>
              <LoanList totalPayment={this.state.totalPayment} updateTotalPayment={this.updateTotalPayment}></LoanList>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}
export default App;
