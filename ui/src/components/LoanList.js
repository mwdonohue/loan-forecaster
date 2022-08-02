import React from 'react'
import { ListGroup, Button } from "react-bootstrap"
import Loan from './Loan'

class LoanList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loanInfo: [{ loanNumber: 1, principal: '', interest: '', interestRate: '', term: '', monthlyPayment: '' }] }
        this.handleAddLoan = this.handleAddLoan.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleRemoveLoan = this.handleRemoveLoan.bind(this)
    }

    handleAddLoan(event) {
        event.currentTarget.blur()
        const loans = this.state.loanInfo.slice()
        this.setState({ loanInfo: loans.concat({ loanNumber: loans.length + 1, principal: '', interest: '', interestRate: '', term: '', monthlyPayment: '' }) })
    }

    handleRemoveLoan(loanNumber) {
        let loans = this.state.loanInfo.slice()

        loans = loans.filter(loan => loan.loanNumber !== loanNumber)

        for (let i = 1; i <= loans.length; i++) {
            loans[i - 1].loanNumber = i;
        }

        this.setState({ loanInfo: loans })
    }

    handleInputChange(event, loanNumber) {
        const target = event.target
        const value = target.value
        const name = target.name;

        const loans = this.state.loanInfo.slice()

        loans[loanNumber - 1][name] = value
        loans[loanNumber - 1]['monthlyPayment'] = this.monthlyPayment(loans[loanNumber - 1]['principal'], loans[loanNumber - 1]['interestRate'], loans[loanNumber - 1]['term'])

        this.setState({ loanInfo: loans })
    }

    monthlyPayment(principal, interestRate, term) {
        interestRate /= 12
        interestRate /= 100
        return principal * ((interestRate * Math.pow(1 + interestRate, term * 12)) / ((Math.pow(1 + interestRate, term * 12) - 1)))
    }

    render() {
        const loans = this.state.loanInfo.map((element) =>
            <ListGroup.Item style={{ paddingLeft: '0px', paddingRight: '0px' }} key={element.loanNumber}>
                <Loan
                    handleInputChange={this.handleInputChange}
                    handleRemoveLoan={this.handleRemoveLoan}
                    loanNumber={element.loanNumber}
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