const express = require("express")
const { 
    createFinance,
    getFinances,
    getFinance,
    deleteFinance,
    updateFinance,
 } = require("../controllers/financeController")

const router = express.Router()

router.get("/", getFinances)

router.get("/:id", getFinance)

router.post("/", createFinance)

router.delete("/:id", deleteFinance)

router.patch("/:id", updateFinance)

module.exports = router