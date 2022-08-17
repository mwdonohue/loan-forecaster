import React from 'react'
import { ListGroup, Button } from "react-bootstrap"
import Loan from './Loan'

class LoanList extends React.Component {
    constructor(props) {
        super(props)
        this.idCounter = 1
        // Maybe change this to map of maps in the future?
        // TODO: [{fieldname: {data: {}, errors: []}]
        this.state = { loanInfo: [{ id: this.idCounter, loanName: 1, principal: '', interest: '', interestRate: '', term: '', monthlyPayment: '' }] }
        this.idCounter++;
        this.handleAddLoan = this.handleAddLoan.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleRemoveLoan = this.handleRemoveLoan.bind(this)
    }

    handleAddLoan(event) {
        event.currentTarget.blur()
        const loans = this.state.loanInfo.slice()
        this.setState({ loanInfo: loans.concat({ id: this.idCounter, loanName: loans.length + 1, principal: '', interest: '', interestRate: '', term: '', monthlyPayment: '' }) })
        this.idCounter++
    }

    handleRemoveLoan(id) {
        let loans = this.state.loanInfo.slice()
        loans = loans.filter(loan => loan.id !== id)

        for (let i = 1; i <= loans.length; i++) {
            loans[i - 1].loanName = i;
        }
        this.setState({ loanInfo: loans })
    }

    // Principal:
    // Must be whole number > 0 | NOT_WHOLE_NUMBER, LESS_THAN_1
    // Cannot be empty

    // Interest:
    // Must be whole number > 0 | NOT_WHOLE_NUMBER, LESS_THAN_1
    // Can be empty

    // Interest Rate:
    // Must be whole number > 0 | NOT_WHOLE_NUMBER, LESS_THAN_1
    // Cannot be empty

    // Term:
    // Must be whole number > 0 | NOT_WHOLE_NUMBER, LESS_THAN_1
    // Cannot be empty
    handleInputChange(event, id) {
        const target = event.target
        const value = target.value
        const name = target.name;

        const loans = this.state.loanInfo.slice()

        loans.every((loan) => {
            if (loan.id === id) {
                loan[name] = value
                loan['monthlyPayment'] = this.monthlyPayment(loan['principal'], loan['interestRate'], loan['term'])
                return false;
            }
            else {
                return true;
            }
        })

        this.setState({ loanInfo: loans })
    }

    monthlyPayment(principal, interestRate, term) {
        interestRate /= 12
        interestRate /= 100
        return principal * ((interestRate * Math.pow(1 + interestRate, term * 12)) / ((Math.pow(1 + interestRate, term * 12) - 1)))
    }

    render() {
        const loans = this.state.loanInfo.map((element) =>
            <ListGroup.Item style={{ paddingLeft: '0px', paddingRight: '0px' }} key={element.id}>
                <Loan
                    handleInputChange={this.handleInputChange}
                    handleRemoveLoan={this.handleRemoveLoan}
                    id={element.id}
                    loanName={element.loanName}
                    monthlyPayment={element.monthlyPayment}></Loan></ListGroup.Item>
        )
        return (
            <div>
                <ListGroup variant="flush">{loans}</ListGroup>
                <Button className="mt-2" type='submit' variant="outline-primary" onClick={this.handleAddLoan}>Add Loan</Button>
            </div>
        )
    }
}
export default LoanList