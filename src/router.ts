import { Router } from "express"

const router = Router()

// Routing 
router.get("/", (req, res) => {
    res.send('Desde GET')
})

router.post("/", (req, res) => {
    res.send('Desde POS')
})

router.put("/", (req, res) => {
    res.send('Desde PUT')
})

router.patch("/", (req, res) => {
    res.send('Desde PATCH')
})

router.delete("/", (req, res) => {
    res.send('Desde DELETE')
})

export default router
