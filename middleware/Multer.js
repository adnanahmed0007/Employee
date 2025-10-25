import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads folder exists
const uploadFolder = "uploads";
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// Configure disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder); // files saved in "uploads" folder
    },
    filename: (req, file, cb) => {
        // Use timestamp + original name to avoid conflicts
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

// File type filter (PDF or DOCX)
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
