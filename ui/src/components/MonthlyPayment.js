import React from 'react'
import { Form, InputGroup, Row, Col, Container } from 'react-bootstrap'

class MonthlyPayment extends React.Component {
    render() {
        return (
            <Container style={{}}>
                <Row >
                    <Col lg={4}>
                        <Form.Label htmlFor="totalMonthlyPayment">Total Monthly Payment</Form.Label>
                    </Col>
                    <Col lg={5}>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control value={this.props.totalPayment} onChange={this.props.handleTotalPaymentInputChange} name="totalMonthlyPayment" id="totalMonthlyPayment"></Form.Control>
                        </InputGroup>
                    </Col>

                </Row>
            </Container>

        )
    }
}
export default MonthlyPayment