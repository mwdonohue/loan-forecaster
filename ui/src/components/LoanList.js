import React from 'react'
import { ListGroup, Button } from "react-bootstrap"
import Loan from './Loan'
class LoanList extends React.Component {
    render() {
        const loans = this.props.loanInfo.map((element) =>
            <ListGroup.Item style={{ padding: '12px', border: '0px' }} key={element.id.data}>
                <Loan
                    handleInputChange={this.props.handleInputChange}
                    handleRemoveLoan={this.props.handleRemoveLoan}
                    loanInfo={element}></Loan></ListGroup.Item>
        )
        return (
            <div>
                <ListGroup style={{ border: '1px solid rgba(0,0,0,0.250)', }}>{loans}</ListGroup>
                <Button style={{ marginBottom: '8px' }} className="mt-2" type='submit' variant="outline-primary" onClick={this.props.handleAddLoan}>Add Loan</Button>
            </div>
        )
    }
}
export default LoanList