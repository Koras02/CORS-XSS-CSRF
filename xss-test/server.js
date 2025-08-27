const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
     <form method="POST" action="/echo">
        <input name="msg" />
        <button>전송</button>
     </form>      
  `);
});

const escapeHtml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

app.post("/echo", (req, res) => {
  const msg = escapeHtml(req.body.msg);
  // 필터링 없이 바로 출력 -> 취약점, => 방어적용후 <script>alert("XSS")</script>
  res.send(`<h1>입력 메시지: </h1><p>${msg}</p>`);
});

app.listen(4001, () => console.log("XSS Test Server running on port 4001"));
