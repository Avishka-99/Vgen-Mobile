const express = require('express');
const app = express();
app.get("/api/get", (req, res) => {
    //const name = req.body.movie;
    //const review = req.body.review;
    res.send("Hellooo there");
    //res.send("hello")
})
app.listen(5000, () => { console.log("Serve listening on port 5000") })
