import express from "express";

import { generateImg } from "../controller/dalle.js";

const router = express.Router();

/* router.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from DALL-E" });
});
 */
router.post("/", generateImg);

export default router;
