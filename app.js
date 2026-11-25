
const express = require("express");
const { redisClient, connectRedis } = require("./redis");

const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" }
];

// GET USERS - Redis Cache
app.get("/get-users", async (req, res) => {
    try {
        // Check Redis cache
        const cachedUsers = await redisClient.get("users");

        if (cachedUsers) {
            return res.status(200).json({
                message: "Data from Redis",
                data: JSON.parse(cachedUsers)
            });
        }

        // Fetch data
        const userData = users;

        // Store data in Redis for 60 seconds
        await redisClient.setEx(
            "users",
            60,
            JSON.stringify(userData)
        );

        res.status(200).json({
            message: "Data from database",
            data: userData
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// CREATE USER
app.post("/create-user", async (req, res) => {
    try {
        const user = {
            id: Date.now(),
            name: req.body.name
        };

        users.push(user);

        // Clear old cache
        await redisClient.del("users");

        res.status(201).json({
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE USER
app.put("/update-user/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.name = req.body.name;

        // Clear old cache
        await redisClient.del("users");

        res.status(200).json({
            message: "User updated successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE USER
app.delete("/delete-user/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const deletedUser = users.splice(userIndex, 1);

        // Clear old cache
        await redisClient.del("users");

        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser[0]
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Connect Redis first, then start server
async function startServer() {
    try {
        await connectRedis();

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

    } catch (error) {
        console.log("Redis connection failed:", error);
        process.exit(1);
    }
}

startServer();
