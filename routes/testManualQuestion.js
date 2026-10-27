
const express = require("express");
const router = express.Router();

const controller = require("../controllers/testManualQuestionController");

router.get("/test/:testId", controller.getByTestId);
router.post("/test/:testId", controller.add);
router.delete("/:id", controller.delete);

module.exports = router;
