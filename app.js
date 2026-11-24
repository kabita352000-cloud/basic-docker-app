const express = require("express")
const app = express()
app.use(express.json())
let users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" }
]
app.get("/get-users", (req, res) => {
    res.send(200).json({
        message: "Users fetched successfully",
        data: users,

    })
})

app.post("/create-user", (req, res) => {
    const user = req.body
    res.send(201).json({
        message: `User ${user.name} added`,
        user
    })
})

app.put("/update-user/:id", (req, res) => {
    const { id } = req.params
    const user = req.body
    res.send(200).json({
        message: `User with id ${id} updated`,
        user
    })
})
app.delete("/delete-user/:id", (req, res) => {  
    const { id } = req.params
    res.send(200).json({
        message: `User with id ${id} deleted`
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})  