const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//schema
const schemaData = mongoose.Schema({
    id : Number,
    name: String,
    email: String,
    dept: String,
    position: String,
    salary: Number,
},{
    timestamps: true
})

const userModel = mongoose.model("user",schemaData)

//      Read data
//      http://localhost:8080/
app.get("/", async (req, res) => {
    try {
        const data = await userModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to retrieve data", error: error.message });
    }
});

//      Create data
//      http://localhost:8080/create
//      {
//       "id": 102,
//       "name": "Neelam",
//       "email": "neelam_102@pvgcoet.ac.in",
//       "dept": "ADBMS mom",
//       "position": "manger",
//       "salary": 999999
//      }

app.post("/create", async (req, res) => {
    try {
        console.log(req.body);
        const newData = new userModel(req.body);
        const savedData = await newData.save();
        res.status(201).json({ success: true, message: "Data saved successfully", data: savedData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to save data", error: error.message });
    }
});

//      update user
//      http://localhost:8080/update
// {
//     "id": "6540c4210277ff01b7767bf8",
//     "dept": "Rajat's mom",
//     "salary": 303030
// }

app.put("/update", async (req, res) => {
    try {
        console.log(req.body)
        const { _id, ...rest } = req.body;

        console.log(rest)
        const updatedData = await userModel.updateOne({ _id : _id },rest);

        if (updatedData) {
            res.status(200).json({ success: true, message: "Data updated successfully", data: updatedData });
        } else {
            res.status(404).json({ success: false, message: "Data not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update data", error: error.message });
    }
});

//      delete
//      http://localhost:8080/delete/6540c4210277ff01b7767bf8
app.delete("/delete/:ID", async (req, res) => {
    try {
        const ID = req.params.ID;
        console.log(ID)
        const deletedData = await userModel.findByIdAndRemove(ID);

        if (deletedData) {
            res.status(200).json({ success: true, message: "Data deleted successfully", data: deletedData });
        } else {
            res.status(404).json({ success: false, message: "Data not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete data", error: error.message });
    }
});


mongoose.connect("mongodb://localhost:27017/Employee_crud")
.then(()=>{
    console.log("connect to DB");
    app.listen(PORT,()=>console.log("Server is running in 8080"))
})
.catch((err)=>{
    console.log(err)
    console.log("Error in connection with db and server")
})

//     http://localhost:8080