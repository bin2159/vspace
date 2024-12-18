import express from 'express'
import CodeExecutor from '../controller/exec.js'
const router = express.Router()

router.post('/code',async (req, res, next) => {
  const codeExecutor = new CodeExecutor()
  const result = await codeExecutor.execute(req.body.code)
  res.json(result)
});

export default router