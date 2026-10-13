function getRegister(req, res) {
  res.render('register');
}

function postRegister(req, res) {
  res.render('register');
}

function getLogin(req, res) {
  return res.render('login');
}

function postLogin(req, res) {
  return res.render('login');
}

function getNewMessage(req, res) {
  return res.render('newMessage');
}

function postNewMessage(req, res) {
  //todo
}

export default {
  getRegister,
  postRegister,

  getLogin,
  postLogin,

  getNewMessage,
  postNewMessage,
};
