require("express-async-errors")

const routes = require("./routes/index")

const database = require("./database/sqlite/index")

database()

const AppError = require("./utils/AppError")

const express = require("express");

const app = express();

const PORT = 2000;

app.use(express.json())

app.use(routes)

app.listen(PORT, () => {
    console.log(`${PORT} start`)
})


app.use((error, request, response, next) => {
    if(error instanceof AppError){
    return response.status(error.statusCode).json({
            status : "error",
            message : error.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "server error"
    })
})