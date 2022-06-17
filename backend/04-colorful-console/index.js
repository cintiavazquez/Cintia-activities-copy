const express = require("express");
const chalk = require("chalk");

const app = express();

app.use(express.urlencoded({ extended: true }));

const colors = ["red", "blue", "green", "yellow", "gray", "magenta", "cyan"];

const form = `
<form action="/" method="POST">
    <input name="text" placeholder="Your message" required>
    <select name="color">
        ${colors.map((color) => `<option>${color}</option>`)}
    </select>
    <button>Send</button>
</form>
`;

const DEFAULT_COLOR = colors[0];

app.get("/", (request, response) => response.send(form));
app.post("/", (request, response) => {
    const { text, color } = request.body;

    console.log(chalk[color || DEFAULT_COLOR](text));

    response.send(`
<!doctype html>
<html>
<title>${text}</title>
<a href="/" style="color:${color}">${text}</a>
</html>    
    `);
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
