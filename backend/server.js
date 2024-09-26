const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const index = require("./routes/index.js");
const user = require("./routes/user.js");
const cors = require('cors')
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use("/employeelist", index);
app.use("/users", user);
app.listen(PORT, () => {
  console.log("backend start");
});
