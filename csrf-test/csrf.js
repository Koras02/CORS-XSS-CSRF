const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const csrf = require("csurf"); // yarn add csurf && npm install csurf
app.use(cookieParser());
app.use(csrf({ cookie: true }));

// 로그인 상태 가정
app.get("/login", (req, res) => {
  res.cookie("auth", "123");
  res.send("로그인 완료");
});

// 취약한 이메일 변경
app.post("/change-email", (req, res) => {
  const newEmail = req.body.email;
  // CSRF 취약: auth 쿠키 체크만, 쿠키 X
  res.send(`이메일이 ${newEmail}로 변경되었습니다.`);
});

// 방어 적용
app.get("/change-email-form", (req, res) => {
  res.send(`
         <form method="POST" action="/change-email">
           <input name="email" />
           <input type="hidden" name="_csrf" value="${req.csrfToken()}" />
           <button>이메일 변경</button>
         </form>
        `);
});

// 취약한 이메일 변경
app.post("/change-email", (req, res) => {
  const newEmail = req.body.email;
  // CSRF 취약: auth 쿠키 체크만, 쿠키 X
  res.send(`이메일이 ${newEmail}로 변경되었습니다.`);
});
app.listen(4003, () =>
  console.log("CSRF Email Test Server is running on port 4003")
);
