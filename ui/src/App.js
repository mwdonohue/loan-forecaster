import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import LoanList from './components/LoanList';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import MonthlyPayment from './components/MonthlyPayment';
import TimeSimulation from './components/TimeSimulation';
import { v4 as uuidv4 } from 'uuid';
import { Form } from 'react-bootstrap';
import { Container } from 'react-bootstrap'
class App extends React.Component {

  constructor(props) {
    super(props)
    this.handleTotalPaymentInputChange = this.handleTotalPaymentInputChange.bind(this)
    this.updateTotalPayment = this.updateTotalPayment.bind(this)

    // Loan List state
    // Maybe change this to map of maps in the future?
    this.state = {
      loanInfo: [{
        id: { data: uuidv4(), errors: [], visited: false },
        loanName: { data: 1, errors: [], visited: false },
        principal: { data: '', errors: [], visited: false },
        interest: { data: '', errors: [], visited: false },
        interestRate: { data: '', errors: [], visited: false },
        term: { data: '', errors: [], visited: false },
        monthlyPayment: { data: '', errors: [], visited: false },
      },
      ],
      totalPayment: 0,
      browserStorage: false,
    }
    this.handleAddLoan = this.handleAddLoan.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRemoveLoan = this.handleRemoveLoan.bind(this)
    this.handleBrowserStorageChange = this.handleBrowserStorageChange.bind(this)
  }

  componentDidMount() {
    // Set loan info upon load if switch is set
    let shouldLoadLoans = JSON.parse(localStorage.getItem('browserStorage'))
    if (shouldLoadLoans === true) {
      this.setState({ browserStorage: JSON.parse(localStorage.getItem('browserStorage')) })
    }
    if (localStorage.getItem('loanInfo') && shouldLoadLoans) {
      this.setState({ loanInfo: JSON.parse(localStorage.getItem('loanInfo')) })
      this.setState({ totalPayment: JSON.parse(localStorage.getItem('totalPayment')) })
    }
  }

  componentDidUpdate() {
    localStorage.setItem('browserStorage', JSON.stringify(this.state.browserStorage))
    // Save data if toggled
    if (this.state.browserStorage === true) {
      localStorage.setItem('loanInfo', JSON.stringify(this.state.loanInfo))
      localStorage.setItem('totalPayment', JSON.stringify(this.state.totalPayment))
    }

  }


  handleAddLoan(event) {
    event.currentTarget.blur()
    const loans = this.state.loanInfo.slice()
    this.setState({
      loanInfo: loans.concat({
        id: { data: uuidv4(), errors: [], visited: false },
        loanName: { data: loans.length + 1, errors: [], visited: false },
        principal: { data: '', errors: [], visited: false },
        interest: { data: '', errors: [], visited: false },
        interestRate: { data: '', errors: [], visited: false },
        term: { data: '', errors: [], visited: false },
        monthlyPayment: { data: '', errors: [], visited: false }
      })
    })
  }

  handleRemoveLoan(id) {
    let loans = this.state.loanInfo.slice()
    let oldMonthlyPayment = this.state.totalPayment
    let loanMonthlyPayment = Number(loans.find(loan => loan.id.data === id).monthlyPayment.data)

    if (!Number.isNaN(loanMonthlyPayment)) {
      this.updateTotalPayment(oldMonthlyPayment - loanMonthlyPayment)
    }
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
        let oldMonthlyPayment = Number(this.state.totalPayment)
        if (!Number.isNaN(loan['monthlyPayment']['data'])) {
          oldMonthlyPayment -= Number(loan['monthlyPayment']['data'])
        }
        if (this.validateLoan(loan) === true) {
          loan['monthlyPayment']['data'] = this.monthlyPayment(loan['principal']['data'], loan['interestRate']['data'], loan['term']['data'])
        } else {
          loan['monthlyPayment']['data'] = ''
        }
        if (!Number.isNaN(loan['monthlyPayment']['data'])) {
          oldMonthlyPayment += Number(loan['monthlyPayment']['data'])
        }
        this.updateTotalPayment((oldMonthlyPayment).toFixed(0))
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
    return (principal * ((interestRate * Math.pow(1 + interestRate, term * 12)) / ((Math.pow(1 + interestRate, term * 12) - 1)))).toFixed(0)
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
    loan['principal']['errors'] = []
    if (!loan['principal']['visited']) {
      loanValid = false
    } else {
      // Must be whole number > 0 | NOT_INTEGER, LESS_THAN_1, EMPTY, IS_NAN, OUT_OF_RANGE
      // Required
      let princNum = Number(loan['principal']['data'])
      if (!loan['principal']['data'] || loan['principal']['data'].trim() === "") {
        loanValid = false
        loan['principal']['errors'].push('EMPTY')
      } else if (Number.isNaN(princNum)) {
        loanValid = false
        loan['principal']['errors'].push('IS_NAN')
      } else if (!Number.isInteger(princNum)) {
        loanValid = false
        loan['principal']['errors'].push("NOT_INTEGER")
      } else if (Number.isInteger(princNum) && !Number.isSafeInteger(princNum)) {
        loanValid = false
        loan['principal']['errors'].push("OUT_OF_RANGE")
      } else if (princNum < 1) {
        loanValid = false
        loan['principal']['errors'].push("LESS_THAN_1")
      }
    }

    // Validate interest
    // Since interest isn't a required field, the loan isn't necessarily invalid if it hasn't been visited, but we do need to check the case when it has been
    // Clear the previous errors if there are any
    loan['interest']['errors'] = []
    // Not Required: Skip validation if empty
    if (loan['interest']['visited'] && (loan['interest']['data'] || loan['interest']['data'].trim() !== "")) {
      // Must be whole number > 0 | NOT_INTEGER, LESS_THAN_1, IS_NAN, OUT_OF_RANGE
      let interestNum = Number(loan['interest']['data'])
      if (Number.isNaN(interestNum)) {
        loanValid = false
        loan['interest']['errors'].push('IS_NAN')
      } else if (!Number.isInteger(interestNum)) {
        loanValid = false
        loan['interest']['errors'].push("NOT_INTEGER")
      } else if (Number.isInteger(interestNum) && !Number.isSafeInteger(interestNum)) {
        loanValid = false
        loan['interest']['errors'].push("OUT_OF_RANGE")
      } else if (interestNum <= 0) {
        loanValid = false
        loan['interest']['errors'].push("LESS_THAN_0")
      }
    }

    // Validate interestRate
    //  If interestRate has not been visited, we do not validate, but the loan is not valid
    // Clear the previous errors if there are any
    loan['interestRate']['errors'] = []
    if (!loan['interestRate']['visited']) {
      loanValid = false
    } else {
      // Must be decimal > 0 | NOT_DECIMAL, LESS_THAN_1, EMPTY, IS_NAN
      // Required
      let interestRateNum = Number(loan['interestRate']['data'])
      if (!loan['interestRate']['data'] || loan['interestRate']['data'].trim() === "") {
        loanValid = false
        loan['interestRate']['errors'].push('EMPTY')
      } else if (Number.isNaN(interestRateNum)) {
        loanValid = false
        loan['interestRate']['errors'].push('IS_NAN')
      } else if (!Number.isFinite(interestRateNum)) {
        loanValid = false
        loan['interestRate']['errors'].push("NOT_DECIMAL")
      } else if (interestRateNum <= 0) {
        loanValid = false
        loan['interestRate']['errors'].push("LESS_THAN_0")
      }
    }

    // Validate term
    // If term has not been visited, we do not validate, but the loan is not valid
    // Clear the previous errors if there are any
    loan['term']['errors'] = []
    if (!loan['term']['visited']) {
      loanValid = false
    } else {
      // Must be whole number > 0 | NOT_WHOLE_NUMBER, LESS_THAN_1, NOT_EMPTY
      // Required
      let termNum = Number(loan['term']['data'])
      if (!loan['term']['data'] || loan['term']['data'].trim() === "") {
        loanValid = false
        loan['term']['errors'].push('EMPTY')
      } else if (Number.isNaN(termNum)) {
        loanValid = false
        loan['term']['errors'].push('IS_NAN')
      } else if (!Number.isInteger(termNum)) {
        loanValid = false
        loan['term']['errors'].push("NOT_INTEGER")
      } else if (Number.isInteger(termNum) && !Number.isSafeInteger(termNum)) {
        loanValid = false
        loan['term']['errors'].push("OUT_OF_RANGE")
      } else if (termNum < 1) {
        loanValid = false
        loan['term']['errors'].push("LESS_THAN_1")
      }
    }
    return loanValid
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

  handleBrowserStorageChange() {
    let toggle = this.state.browserStorage
    this.setState({ browserStorage: !toggle })
  }

  render() {
    return (
      <Container fluid style={{ paddingTop: '8px' }}>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <Row>
              <Col>
                <MonthlyPayment totalPayment={this.state.totalPayment}
                  handleTotalPaymentInputChange={this.handleTotalPaymentInputChange}></MonthlyPayment>
              </Col>
              <Col>
                <TimeSimulation
                  loanInfo={this.state.loanInfo}
                  totalPayment={this.state.totalPayment}>
                </TimeSimulation>
              </Col>
            </Row>
            <Row>
              <LoanList loanInfo={this.state.loanInfo}
                handleInputChange={this.handleInputChange}
                handleRemoveLoan={this.handleRemoveLoan}
                handleAddLoan={this.handleAddLoan}
              ></LoanList>
            </Row>
          </Col>
          <Col lg={2}>
            <Row>
              {/* Automatically saves and loads loan data if toggled */}
              <Form.Check type="switch" label="Autosave Loan Data" checked={this.state.browserStorage} onChange={this.handleBrowserStorageChange}></Form.Check>
            </Row>
          </Col>
        </Row>

      </Container>


    )
  }
}
export default App;
