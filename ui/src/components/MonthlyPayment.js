import React from 'react'
import { Form, InputGroup } from 'react-bootstrap'

class MonthlyPayment extends React.Component {

    render() {
        return (
            <div>
                <Form.Label htmlFor="totalMonthlyPayment">Total Monthly Payment</Form.Label>
                <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control name="totalMonthlyPayment" id="totalMonthlyPayment"></Form.Control>
                    <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
            </div>
        )
    }
}
export default MonthlyPayment