import React from 'react'
import { Card, Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Loan extends React.Component {
    render() {
        return (
            <Card>
                <Card.Header>Loan {this.props.loanNumber}
                    <Button onClick={() => this.props.handleRemoveLoan(this.props.loanNumber)} variant="link" style={{ position: 'absolute', right: '20px', top: '1px' }}>
                        <FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} size="lg"></FontAwesomeIcon>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Label htmlFor="principal">Principal</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control name="principal" id="principal" onChange={(e) => this.props.handleInputChange(e, this.props.loanNumber)}></Form.Control>
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="interest">Interest</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control name="interest" id="interest" onChange={(e) => this.props.handleInputChange(e, this.props.loanNumber)}></Form.Control>
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="interestRate">Interest Rate</Form.Label>
                                <InputGroup>
                                    <Form.Control name="interestRate" id="interestRate" onChange={(e) => this.props.handleInputChange(e, this.props.loanNumber)}></Form.Control>
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="term">Term</Form.Label>
                                <InputGroup>
                                    <Form.Control name="term" id="term" onChange={(e) => this.props.handleInputChange(e, this.props.loanNumber)}></Form.Control>
                                    <InputGroup.Text>years</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="monthlypayment">Monthly Payment</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control id="monthlypayment" disabled defaultValue={this.props.monthlyPayment} />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        )
    }
}
export default Loan