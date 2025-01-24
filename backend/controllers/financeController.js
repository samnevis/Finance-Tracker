const Finance = require("../models/financeModel")
const mongoose = require("mongoose")

// get all finances
const getFinances = async(req, res) => {

    const Finances = await Finance.find({}).sort({createdAt: -1})
    res.status(200).json(Finances)
    
}


// get a single finance
const getFinance = async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such finance'})
    }
    const finance = await Finance.findById(id);

    if (!finance) {
        return res.status(404).json({error: "No such finance"})
    }

    res.status(200).json(finance)

}




// create a new finance
const createFinance = async (req, res) => {
    const {title, amount, category} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push("title")
    }
    if (!amount) {
        emptyFields.push("amount")
    }
    if (!category) {
        emptyFields.push("category")
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please provide a valid input for all fields', emptyFields})
    }

    try {
        const finance = await Finance.create({title, amount, category})
        res.status(200).json(finance)
    } catch (error) {
        res.status(400).json({error: error.message})
    }




}

// delete an finance
const deleteFinance = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such finance'})
    }

    const finance = await Finance.findOneAndDelete({_id: id})

    if (!finance) {
        return res.status(400).json({error: "No such finance"})
    }

    res.status(200).json(finance)
}
// update an finance
const updateFinance = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such finance'})
    }

    const finance = await Finance.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!finance) {
        return res.status(400).json({error: "No such finance"})
    }

    res.status(200).json(finance)
}



module.exports = {
    createFinance,
    getFinances,
    getFinance,
    deleteFinance,
    updateFinance,
}