import { useState } from "react"
import  {useFinancesContext}  from "../hooks/useFinancesContext.js"

const FinanceForm = () => {
    const{ dispatch } = useFinancesContext()

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const finance = {title, amount, category}

        const response = await fetch("api/finances", {
            method: "POST",
            body: JSON.stringify(finance),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } 
        if (response.ok) {
            setTitle("")
            setAmount("")
            setCategory("")
            setError(null)
            setEmptyFields([])
            console.log("new entry added", json)
            dispatch({type: "CREATE_FINANCE", payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Entry</h3>

            <label>Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />
            <label>Amount ($):</label>
            <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className={emptyFields.includes("amount") ? "error" : ""}
            />
            <label>Category:</label>
            <input
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className={emptyFields.includes("category") ? "error" : ""}
            />
            <button>Add Entry</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default FinanceForm