# HTTP Request Listener

**Important:** one of the core concepts we insist on, ist that of "exit points", that should be executed / defined in all locations of the code that require to do so - e.g. a pure function with return statements has those as exit points. A `Promise` has the calls of the `resolve` or `reject` function as exit points.

The process for checking this should be objective and mechanical, and should be among the first things to try if things don't go as expected.

For example:

```js
function canPersonDrive(person) {
	if (person.age < 18) {
		return false;
	}
	if (!person.hasLicense) {
		return false;
	}
	if (person.isDrunk) {
		return false;
	}
}
```

This function is broken, because we forgot the final exit point! A `return true` at the end allows John Doe to drive his car to work (so he can pay the car he bought to go to work).

Likewise, HTTP request handlers in node have the call of `response.end()` as exit point:

```js
const server = http.createServer((request, response) => {
	if (response.method === 'POST') {
		response.statusCode = 302;
		response.setHeader('Location', '/');
		return;
	}
	response.end('Hello World');
});
```

The `POST` scenario is broken, because the response is not ended.

---

## Lesson

First create an HTTP server via the `http` node module:

```js
const http = require("http");

const server = http.createServer((request, response) => {
	console.log("incoming request");
});

server.listen(8080);
```

If you point your browser to http://localhost:8080, you should see a spinning loader (in the browser) and a log statement (in the terminal, from the server). Good, the two sides have estabilished a connection!

Let's access some request information:

```js
const http = require("http");

const server = http.createServer((request, response) => {
	// you can access the request information
	const { url, method, headers } = request;

	// headers is an object - since many headers contain a - character, you need to access them via the bracket notation:
	const userAgent = headers["user-agent"];
});

server.listen(8080);
```

Keep an eye on the network tab of your browser to see the outgoing headers, and see how they match with your logs!

---

### Sending our first response

Let's send a default response (ignoring the request for a moment):

```js
const http = require("http");

const server = http.createServer((request, response) => {
	response.write("Hello!");
	response.end();
});

server.listen(8080);
```

You should see Hello! on your browser after visiting http://localhost:8080.

You can set the HTTP code and/or some headers on the response:

```js
const http = require("http");

const server = http.createServer((request, response) => {
	response.statusCode = 404;
	response.setHeader("Content-type", "text/html");
	response.write("<strong>Resource not found!</strong>");
	response.end();
});

server.listen(8080);
```

---

### Putting everything together

```js
const http = require("http");

const server = http.createServer((request, response) => {
	const { url, method, headers } = request;

	if (method === POST) {
		// let's not allow POST request
		response.statusCode = 405;
	}

	response.setHeader("Content-type", "text/html");
	response.write("<strong>Resource not found!</strong>");
	response.end();
});

server.listen(8080);
```

---

### Accessing the request body

Requests and responses are streams, i.e. they are not monolithic entities but flow of data. They emit events every time a new chunk (unofficial but wide used term!) is sent.

```js
const http = require("http");

const server = http.createServer((request, response) => {
	let body = [];
	// the event is called data, not chunk!
	request.on("data", (chunk) => {
		console.log("[data]", chunk);
		body.push(chunk);
	});
	request.on("end", () => {
		body = Buffer.concat(body).toString();
		console.log("[request body]", body);

		// ** important: **
		// since your response may depend on the incoming request body,
		// you have to put all your request.write / request.end / etc... statements here!
		// welcome to callback hell.
	});
	// ** do not write anything here! **
});

server.listen(8080);
```

In case your client/server implementation does not send you a Buffer but already a string, concatenate the chunks like:

```js
let body = "";
// the event is called data, not chunk!
request.on("data", (chunk) => {
	console.log("[data]", chunk);
	body += chunk;
});
request.on("end", () => {
	// you need no toString operation here
	console.log("[request body]", body);
});
```

---

### Bonus: `appendFile`

```js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "logs.txt");

function logStuff(stuff) {
	// manipulate stuff here if needed
	fs.appendFile(filePath, `${stuff}\n`, (error) => {
		if (error) {
			console.log("[error writing file]", error);
			return;
		}
		console.log("[write success!]");
	});
}
```

---

Once they have seen this, they should be able to do the exercise, basically doing this in the `end` handler:

```js
const { method, url, headers } = request;

console.log({ method, url, headers });

// if statements work too
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
```