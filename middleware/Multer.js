import multer from "multer";
import path from "path";
import fs from "fs";
 
const uploadFolder = "uploads";
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);  
    },
    filename: (req, file, cb) => {
        
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

 
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF or DOCX files are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });
export default upload;
