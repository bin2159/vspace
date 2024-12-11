const {attachAI} = require('../pins/ai');
exports.attach = (req, res, next) => {
  attachAI(req)
  next()
}
