import React from 'react'
import { ListGroup, Button } from "react-bootstrap"
import Loan from './Loan'
class LoanList extends React.Component {
    constructor(props) {
        super(props)
        this.idCounter = 1
        // Maybe change this to map of maps in the future?
        this.state = {
            loanInfo: [{
                id: { data: this.idCounter, errors: new Set(), visited: false },
                loanName: { data: 1, errors: new Set(), visited: false },
                principal: { data: '', errors: new Set(), visited: false },
                interest: { data: '', errors: new Set(), visited: false },
                interestRate: { data: '', errors: new Set(), visited: false },
                term: { data: '', errors: new Set(), visited: false },
                monthlyPayment: { data: '', errors: new Set(), visited: false }
            },
            ]
        }
        this.idCounter++;
        this.handleAddLoan = this.handleAddLoan.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleRemoveLoan = this.handleRemoveLoan.bind(this)
    }

    handleAddLoan(event) {
        event.currentTarget.blur()
        const loans = this.state.loanInfo.slice()
        this.setState({
            loanInfo: loans.concat({
                id: { data: this.idCounter, errors: new Set(), visited: false },
                loanName: { data: loans.length + 1, errors: new Set(), visited: false },
                principal: { data: '', errors: new Set(), visited: false },
                interest: { data: '', errors: new Set(), visited: false },
                interestRate: { data: '', errors: new Set(), visited: false },
                term: { data: '', errors: new Set(), visited: false },
                monthlyPayment: { data: '', errors: new Set(), visited: false }
            })
        })
        this.idCounter++
    }

    handleRemoveLoan(id) {
        let loans = this.state.loanInfo.slice()
        loans = loans.filter(loan => loan.id.data !== id)

        for (let i = 1; i <= loans.length; i++) {
            loans[i - 1].loanName.data = i;
        }
        this.setState({ loanInfo: loans })
    }

    handleInputChange(event, id) {
        const target = event.target
        const value = target.value
        const name = target.name;

        const loans = this.state.loanInfo.slice()

        loans.every((loan) => {
            if (loan.id.data === id) {
                loan[name]['data'] = value
                loan[name]['visited'] = true
                if (this.validateLoan(loan) === true) {
                    loan['monthlyPayment']['data'] = this.monthlyPayment(loan['principal']['data'], loan['interestRate']['data'], loan['term']['data'])
                } else {
                    loan['monthlyPayment']['data'] = ''
                }
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
        return (principal * ((interestRate * Math.pow(1 + interestRate, term * 12)) / ((Math.pow(1 + interestRate, term * 12) - 1)))).toFixed(2)
    }

    // If every required field has not been touched, return false
    // If there is invalid data in any of the fields, return false
    // TODO: This smells bad, opportunity for code reuse in the future. Refactor
    // Returns boolean: true if valid, false otherwise
    validateLoan(loan) {
        let loanValid = true
        // Validate principal
        // If principal has not been visited, there is no reason to check if the data in it is valid
        // Clear the previous errors if there are any
        loan['principal']['errors'].clear()
        if (!loan['principal']['visited']) {
            loanValid = false
        } else {
            // Must be whole number > 0 | NOT_INTEGER, LESS_THAN_1, EMPTY, IS_NAN, OUT_OF_RANGE
            // Required
            let princNum = Number(loan['principal']['data'])
            if (!loan['principal']['data'] || loan['principal']['data'].trim() === "") {
                loanValid = false
                loan['principal']['errors'].add('EMPTY')
            } else if (Number.isNaN(princNum)) {
                loanValid = false
                loan['principal']['errors'].add('IS_NAN')
            } else if (!Number.isInteger(princNum)) {
                loanValid = false
                loan['principal']['errors'].add("NOT_INTEGER")
            } else if (Number.isInteger(princNum) && !Number.isSafeInteger(princNum)) {
                loanValid = false
                loan['principal']['errors'].add("OUT_OF_RANGE")
            } else if (princNum < 1) {
                loanValid = false
                loan['principal']['errors'].add("LESS_THAN_1")
            }
        }

        // Validate interest
        // Since interest isn't a required field, the loan isn't necessarily invalid if it hasn't been visited, but we do need to check the case when it has been
        // Clear the previous errors if there are any
        loan['interest']['errors'].clear()
        // Not Required: Skip validation if empty
        if (loan['interest']['visited'] && (loan['interest']['data'] || loan['interest']['data'].trim() !== "")) {
            // Must be whole number > 0 | NOT_INTEGER, LESS_THAN_1, IS_NAN, OUT_OF_RANGE
            let interestNum = Number(loan['interest']['data'])
            if (Number.isNaN(interestNum)) {
                loanValid = false
                loan['interest']['errors'].add('IS_NAN')
            } else if (!Number.isInteger(interestNum)) {
                loanValid = false
                loan['interest']['errors'].add("NOT_INTEGER")
            } else if (Number.isInteger(interestNum) && !Number.isSafeInteger(interestNum)) {
                loanValid = false
                loan['interest']['errors'].add("OUT_OF_RANGE")
            } else if (interestNum < 1) {
                loanValid = false
                loan['interest']['errors'].add("LESS_THAN_1")
            }
        }

        // Validate interestRate
        //  If interestRate has not been visited, we do not validate, but the loan is not valid
        // Clear the previous errors if there are any
        loan['interestRate']['errors'].clear()
        if (!loan['interestRate']['visited']) {
            loanValid = false
        } else {
            // Must be decimal > 0 | NOT_DECIMAL, LESS_THAN_1, EMPTY, IS_NAN
            // Required
            let interestRateNum = Number(loan['interestRate']['data'])
            if (!loan['interestRate']['data'] || loan['interestRate']['data'].trim() === "") {
                loanValid = false
                loan['interestRate']['errors'].add('EMPTY')
            } else if (Number.isNaN(interestRateNum)) {
                loanValid = false
                loan['interestRate']['errors'].add('IS_NAN')
            } else if (!Number.isFinite(interestRateNum)) {
                loanValid = false
                loan['interestRate']['errors'].add("NOT_DECIMAL")
            } else if (interestRateNum < 1) {
                loanValid = false
                loan['interestRate']['errors'].add("LESS_THAN_1")
            }
        }

        // Validate term
        // If term has not been visited, we do not validate, but the loan is not valid
        // Clear the previous errors if there are any
        loan['term']['errors'].clear()
        if (!loan['term']['visited']) {
            loanValid = false
        } else {
            // Must be whole number > 0 | NOT_WHOLE_NUMBER, LESS_THAN_1, NOT_EMPTY
            // Required
            let termNum = Number(loan['term']['data'])
            if (!loan['term']['data'] || loan['term']['data'].trim() === "") {
                loanValid = false
                loan['term']['errors'].add('EMPTY')
            } else if (Number.isNaN(termNum)) {
                loanValid = false
                loan['term']['errors'].add('IS_NAN')
            } else if (!Number.isInteger(termNum)) {
                loanValid = false
                loan['term']['errors'].add("NOT_INTEGER")
            } else if (Number.isInteger(termNum) && !Number.isSafeInteger(termNum)) {
                loanValid = false
                loan['term']['errors'].add("OUT_OF_RANGE")
            } else if (termNum < 1) {
                loanValid = false
                loan['term']['errors'].add("LESS_THAN_1")
            }
        }
        return loanValid
    }

    render() {
        const loans = this.state.loanInfo.map((element) =>
            <ListGroup.Item style={{ paddingLeft: '0px', paddingRight: '0px' }} key={element.id.data}>
                <Loan
                    handleInputChange={this.handleInputChange}
                    handleRemoveLoan={this.handleRemoveLoan}
                    loanInfo={element}></Loan></ListGroup.Item>
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