var express = require('express');
var router = express.Router();

/** 실습용 계정 정보 */
const practiceUser = {
  id: 'testuser1',
  pwd: '1q2w3e4r',
};

/* GET home page. */
router.get('/', function(req, res, next) {
  // 사용자의 홈 페이지 접속 횟수를 상태로서 세션에 저장
  if (req.session.num === undefined) req.session.num = 1;
  else req.session.num += 1;

  res.render('index', { 
    title: 'Express',
  count: req.session.num,
isSigned: req.session.isSigned,
 });
});

/* 로그인 */
router.post('/', function (req, res, next) {
  const { id, pwd } = req.body;

  if (id === practiceUser.id && pwd === practiceUser.pwd) {
    req.session.isSigned = true;
    res.status(200).redirect('/');
  } else {
    req.session.isSigned = false;
    res.status(401).redirect('/');
  }
});

/* 로그아웃 */
router.post('/logout', function (req, res, next) {
  req.session.isSigned = false;
  res.status(200).redirect('/');
});

/* 권한이 있어야 접근 가능한 리소스 */
router.get('/secret', function (req, res, next) {
  if (!req.session.isSuperUser) res.status(403).send('YOU SHELL NOT PASS!');
  else res.status(200).send('💎');
});

module.exports = router;