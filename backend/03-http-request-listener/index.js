const fs = require("fs");
const http = require("http");

const server = http.createServer((request, response) => {
    let body = [];

    request
        .on("data", (chunk) => {
            console.log("[data]", chunk);
            body.push(chunk);
        })
        .on("end", () => {
            body = Buffer.concat(body).toString();

            const { method, url, headers } = request;

            console.log({ method, url, headers });

            switch (method) {
                case "GET":
                case "HEAD":
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "text/html");
                    if (method === "GET") {
                        response.write(`
                    <!doctype html>
                    <html>
                    <title>Hello World!</title>
                    <p>Hello World!</p>
                    </html>
                    `);
                    }
                    break;
                case "POST":
                    console.log({ body });
                    response.statusCode = 302;
                    response.setHeader("Location", "/");

                    break;
                default:
                    response.statusCode = 405;
                    break;
            }
            response.end();
        });

    request.on("error", (error) => {
        console.log("error on incoming request", error);
    });

    response.on("error", (error) => {
        console.log("error on outgoing response", error);
    });
});

const PORT = process.env.PORT || 3004;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
