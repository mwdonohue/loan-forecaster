import React from 'react'
import { Container } from 'react-bootstrap'

class TimeSimulation extends React.Component {
    getTimeRemaining() {
        let months = 0
        let simulationLoanInfo = structuredClone(this.props.loanInfo)

        // Sort by highest interest rate descending
        simulationLoanInfo.sort((l1, l2) => (l1.interestRate.data > l2.interestRate.data) ? -1 : 1)
        let self = this
        // Bind pay and ellapse to each loan
        simulationLoanInfo.forEach((loan) => {
            loan.pay = self.pay
            loan.ellapse = self.ellapse
            if (Number.isNaN(loan.interest.data)) {
                loan.interest.data = 0
            }
            loan.active = Number.isNaN(loan.monthlyPayment.data) || loan.monthlyPayment.data <= 0 ? false : true
        })
        while (simulationLoanInfo.some((loan) => loan.active === true)) {
            // Copy value of total payment
            let totalPayment = this.props.totalPayment

            // Make the minimum payment for every loan, adding the remainder back to the total payment
            simulationLoanInfo.forEach((loan) => {
                // Subtract monthly payment for each loan from totalPayment
                totalPayment -= loan.monthlyPayment.data
                // If there is a remainder from the payment (meaning the loan is now inactive), add it back to the totalPayment figure
                let remainder = loan.pay(loan.monthlyPayment.data)
                totalPayment += remainder
            })
            // If there is a remaining totalPayment (prepayment + whatever was overpaid on inactive), put towards highest active loan
            while (totalPayment > 0 && simulationLoanInfo.some((loan) => loan.active === true)) {
                let tpcop = totalPayment
                totalPayment = 0
                totalPayment += simulationLoanInfo.find((loan) => loan.active === true).pay(tpcop)
            }

            // Ellapse each loan
            simulationLoanInfo.forEach((loan) => {
                loan.ellapse()
            })
            months++
        }
        return months
    }

    pay(payment) {
        // Put payment towards interest first
        if (this.interest.data > 0) {
            this.interest.data -= payment
            payment = Math.max(0, -this.interest.data)
        }
        // If there is a payment left, put it towards the principal
        if (payment > 0) {
            this.interest.data = 0
            if (this.principal.data > 0) {
                this.principal.data -= payment
                payment = Math.max(0, -this.principal.data)
            }
        }
        // If the principal + the interest <= 0, set to inactive
        if ((this.principal.data + this.interest.data) <= 0) {
            this.active = false
        }
        return Number(payment)
    }

    ellapse() {
        this.interest.data += Number(((this.interestRate.data / 12) / 100) * this.principal.data)
    }

    render() {
        return (
            <Container>
                <p>Remaining Time: {this.getTimeRemaining()} months</p>
            </Container>
        )
    }
}

export default TimeSimulation