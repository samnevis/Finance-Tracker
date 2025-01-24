import { useFinancesContext } from "../hooks/useFinancesContext"
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const FinanceDetails = ({ finance }) => {
  const { dispatch } = useFinancesContext()

  const handleClick = async () => {
    const response = await fetch("/api/finances/" + finance._id, {
      method: "DELETE"
    })
    const json = await response.json()
    if (response.ok) {
      dispatch({ type: "DELETE_FINANCE", payload: json })
    }
  }

  return (
    <div className="finance-details">
      <h4>{finance.title}</h4>
      <p><strong>Amount ($): </strong>{finance.amount}</p>
      <p><strong>Category: </strong>{finance.category}</p>
      <p>{formatDistanceToNow(finance.createdAt, { addSuffix: true})}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default FinanceDetails