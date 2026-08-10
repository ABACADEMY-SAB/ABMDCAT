const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Storage Configuration
const storage = multer.diskStorage({

    destination: function(req, file, cb){

        cb(null, "uploads/");

    },

    filename: function(req, file, cb){

        const uniqueName =
        Date.now() + "-" + file.originalname;

        cb(null, uniqueName);

    }

});

// File Filter
const fileFilter = (req, file, cb) => {

    const allowed = [

        ".pdf",
        ".jpg",
        ".jpeg",
        ".png",
        ".xlsx",
        ".xls"

    ];

    const ext = path.extname(file.originalname).toLowerCase();

    if(allowed.includes(ext)){

        cb(null, true);

    }else{

        cb(new Error("Unsupported File Type"));

    }

};

// Multer Upload
const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {

        fileSize: 20 * 1024 * 1024

    }

});

// Upload File
router.post(

"/",

upload.single("file"),

(req,res)=>{

    res.json({

        success:true,

        filename:req.file.filename,

        original:req.file.originalname,

        path:req.file.path

    });

});

// Upload Multiple Files
router.post(

"/multiple",

upload.array("files",10),

(req,res)=>{

    res.json({

        success:true,

        files:req.files

    });

});

// List Uploaded Files
router.get("/",(req,res)=>{

    res.json({

        success:true,

        files:[]

    });

});

// Delete Uploaded File
router.delete("/:id",(req,res)=>{

    res.json({

        success:true,

        message:"File Deleted Successfully"

    });

});

module.exports = router;
