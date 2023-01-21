import express from "express";
import { singUp,singIn } from "./controllers/singControllers.js";
import { insert, list } from "./controllers/transationsControllers.js";
import { singMiddleware } from "./middleware/singMiddleware.js";
import { transactionsMiddleware } from "./middleware/transactionsMiddleware.js";

const router=express.Router();

router.post('/cadastro', singUp);
router.post('/', singIn);

router.post('/transactions', singMiddleware, transactionsMiddleware, insert);
router.get('/transactions', singMiddleware, list);


export default router;