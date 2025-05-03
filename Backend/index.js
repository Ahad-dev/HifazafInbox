const express = require("express")
const app = express()
const cors = require("cors")

const authRoute = require("./routes/auth.route")    
const userRoute = require("./routes/user.route")
const adminRoute = require("./routes/admin.route")


const connectDB = require("./conf/connectDB")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
dotenv.config()

connectDB();


const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/admin",adminRoute)

app.listen(PORT,async ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
