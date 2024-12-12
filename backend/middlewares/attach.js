const {initAI} = require('../pins/ai');
exports.attach = (req, res, next) => {
  initAI(req)
  next()
}
