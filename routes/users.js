const router = require("express").Router();
const User = require("../models/user");
const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// File upload configuration
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

// Check file type
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new user
router.post("/add", (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      try {
        const { name, email, password, confirm_password, gender } = req.body;
        const file = req.file.filename;
        const user = new User({
          name,
          email,
          password,
          confirm_password,
          gender,
          file,
        });
        const newUser = await user.save();
        res.json({ message: "User added!" });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  });
});

module.exports = router;
