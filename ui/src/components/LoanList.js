import React from 'react'
import { ListGroup, Button } from "react-bootstrap"
import Loan from './Loan'

class LoanList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loanInfo: [{ loanNumber: 1, principal: '', interest: '', interestRate: '', term: '', monthlyPayment: '' }] }
        this.handleAddLoan = this.handleAddLoan.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleAddLoan(event) {
        event.currentTarget.blur()
        const loans = this.state.loanInfo.slice()
        this.setState({ loanInfo: loans.concat({ loanNumber: loans.length + 1, principal: '', interest: '', interestRate: '', term: '', monthlyPayment: '' }) })
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
        const loans = this.state.loanInfo.map((element, idx) =>
            <ListGroup.Item style={{ paddingLeft: '0px', paddingRight: '0px' }} key={idx}><Loan handleInputChange={this.handleInputChange} loanNumber={element.loanNumber} monthlyPayment={element.monthlyPayment}></Loan></ListGroup.Item>
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