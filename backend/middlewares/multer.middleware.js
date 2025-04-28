import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

export const singleUpload = upload.single("profileImage"); 

export const multipleUpload = upload.fields([
  { name: "featureImage", maxCount: 1 }
]); 
export default upload;
