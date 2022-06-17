const path = require("path");
const fs = require("fs");
const marked = require("marked");
const express = require("express");

const indexContents = marked.parse(fs.readFileSync("README.md", "utf-8"));

const app = express();

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (request, response) =>
    response.send(`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>SPICED Activities</title>
    <link rel="stylesheet" href="/style.css"/>
</head>
<body>
	${indexContents}
</body>
</html>
`)
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
