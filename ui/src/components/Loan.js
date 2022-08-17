import React from 'react'
import { Card, Container, Row, Col, Form, InputGroup, Button, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { getErrorMessage } from './LoanErrors'
class Loan extends React.Component {
    render() {
        return (
            <Card>
                <Card.Header>Loan {this.props.loanInfo.loanName.data}
                    <Button onClick={() => this.props.handleRemoveLoan(this.props.loanInfo.id.data)}
                        variant="link" style={{ position: 'absolute', right: '20px', top: '1px' }}>
                        <FontAwesomeIcon style={{ color: 'red' }} icon={faTrash} size="lg"></FontAwesomeIcon>
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Label htmlFor="principal"><div style={{ color: 'red', display: 'inline' }}>*</div> Principal</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control isInvalid={this.props.loanInfo.principal.errors.size > 0} name="principal" id="principal"
                                        onChange={(e) => this.props.handleInputChange(e, this.props.loanInfo.id.data)}></Form.Control>
                                    <InputGroup.Text>.00</InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                            {[...this.props.loanInfo.principal.errors].map((element) => <li key={element}>
                                                {getErrorMessage("Principal", element)}
                                            </li>)}
                                        </ul>
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="interest">Interest</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control isInvalid={this.props.loanInfo.interest.errors.size > 0} name="interest" id="interest"
                                        onChange={(e) => this.props.handleInputChange(e, this.props.loanInfo.id.data)}></Form.Control>
                                    <InputGroup.Text>.00</InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                            {[...this.props.loanInfo.interest.errors].map((element) => <li key={element}>
                                                {getErrorMessage("Interest", element)}
                                            </li>)}
                                        </ul>
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="interestRate"><div style={{ color: 'red', display: 'inline' }}>*</div> Interest Rate</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control isInvalid={this.props.loanInfo.interestRate.errors.size > 0} name="interestRate" id="interestRate"
                                        onChange={(e) => this.props.handleInputChange(e, this.props.loanInfo.id.data)}></Form.Control>
                                    <InputGroup.Text>%</InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                            {[...this.props.loanInfo.interestRate.errors].map((element) => <li key={element}>
                                                {getErrorMessage("Interest Rate", element)}
                                            </li>)}
                                        </ul>
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="term"><div style={{ color: 'red', display: 'inline' }}>*</div> Term</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control isInvalid={this.props.loanInfo.term.errors.size > 0} name="term" id="term"
                                        onChange={(e) => this.props.handleInputChange(e, this.props.loanInfo.id.data)}></Form.Control>
                                    <InputGroup.Text>years</InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">
                                        <ul style={{ listStyleType: 'none', paddingLeft: '0px' }}>
                                            {[...this.props.loanInfo.term.errors].map((element) => <li key={element}>
                                                {getErrorMessage("Term", element)}
                                            </li>)}
                                        </ul>
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="monthlypayment">Monthly Payment</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control id="monthlypayment" disabled defaultValue={this.props.loanInfo.monthlyPayment.data} />
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