require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGODB_URI);

const Internship = mongoose.model("Internship", {
    Student_ID: Number,
    Name: String,
    Company: String,
    Duration: String,
    Status: String
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/add", async (req, res) => {
    await Internship.create(req.body);
    res.send("Internship details inserted");
});

app.get("/find", async (req, res) => {
    const data = await Internship.find({ Company: req.query.Company });
    res.json(data);
});

app.get("/infosys", async (req, res) => {
    const data = await Internship.find({ Company: "Infosys" });
    res.json(data);
});

app.put("/complete/:id", async (req, res) => {
    await Internship.updateOne(
        { Student_ID: req.params.id },
        { $set: { Status: "Completed" } }
    );
    res.send("Internship status updated");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});