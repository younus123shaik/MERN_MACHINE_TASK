const express = require("express");
const db = require("./database.js");
const multer = require('multer');
const router = express.Router();
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"./");
  },
  filename : function(req,file,cb){
    const ext = file.mimetype.split("/")[1];
    cb(null,`uploads/${file.originalname}-${Date.now()}.${ext}`)
  }
})
const upload = multer({ storage : storage});

async function getEmployee(req,res) {
  try {
    const {uniqueid} = req.params
    const [rows] = await db.query(
      "SELECT uniqueid, name, email, mobile, designation, gender, course, DATE_FORMAT(createdat, '%d-%b-%y') AS created_date , image FROM employeelist where uniqueid = ?",[uniqueid]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function getEmployees(res) {
  try {
    const [rows] = await db.query(
      "SELECT uniqueid, name, email, mobile, designation, gender, course, DATE_FORMAT(createdat, '%d-%b-%y') AS created_date , image FROM employeelist"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
async function updateEmployee(req, res) {
  try {
    const { uniqueid } = req.params;
    const { name, email, mobile, designation, gender, course ,image} = req.body;
    
    // Convert course array to comma-separated string if it's not already a string
    const courseString = Array.isArray(course) ? course.join(',') : course;
    console.log(req.body);
    let imagePath = req.file && req.file.filename ;
    if(imagePath == null) {
      imagePath = image
    }
    console.log(imagePath); 
    console.log([name , email , mobile]); 
    console.log(designation); 
    const query = `
      UPDATE employeelist
      SET name = ?, email = ?, mobile = ?, designation = ?, gender = ?, course = ?, createdat = ?, image = ?
      WHERE uniqueid = ?
    `;
    const timestamp = new Date();
    const [result] = await db.query(query, [
      name,
      email,
      parseInt(mobile),
      designation,
      gender,
      courseString, // Save the course as a string
      timestamp,
      imagePath, // Updated image path or the existing one
      uniqueid,
    ]);

    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const createEmployee = async (req, res) => {
  try {
      const { name, email, mobile, designation, gender, course } = req.body;
      const imagePath = req.file.filename ;
      console.log(imagePath);

      const checkQuery = "SELECT * FROM employeelist WHERE email = ?";
      const [existingEmail] = await db.query(checkQuery, [email]);

      if (existingEmail.length > 0) {
          return res.json({ message: "Email already exists" });
      }

      const query = `INSERT INTO employeelist (name, email, mobile, designation, gender, course, image) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await db.query(query, [
          name,
          email,
          mobile,
          designation,
          gender,
          course,
          imagePath, // Include the image path in the database
      ]);

      res.json({ message: "Employee added successfully" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};



async function deleteEmployee(req,res) {
  try {
    const {uniqueid} = req.params
    console.log(uniqueid)
    const [result] = await db.query("delete from employeelist where uniqueid = ?",[uniqueid]);
    res.json({message:"Employee Deleted successfully"});
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}
router.get("/show", (req, res) => {
  getEmployees(res);
});
router.get("/get/:uniqueid", (req, res) => {
  getEmployee(req,res);
});

router.post('/create', upload.single('image'), (req,res)=>{
  createEmployee(req,res)
});

router.put("/update/:uniqueid", upload.single('image'), (req, res) => {
  updateEmployee(req, res);
});
router.delete("/delete/:uniqueid",(req,res)=>{
  deleteEmployee(req,res);
})
module.exports = router;
