// const port = process.env.PORT || 3000,
//     http = require('http'),
//     fs = require('fs'),
//     html = fs.readFileSync('index.html');

// const log = function(entry) {
//     fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
// };

// const server = http.createServer(function (req, res) {
//     if (req.method === 'POST') {
//         let body = '';

//         req.on('data', function(chunk) {
//             body += chunk;
//         });

//         req.on('end', function() {
//             if (req.url === '/') {
//                 log('Received message: ' + body);
//             } else if (req.url = '/scheduled') {
//                 log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
//             }

//             res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
//             res.end();
//         });
//     } else {
//         res.writeHead(200);
//         res.write(html);
//         res.end();
//     }
// });

// // Listen on port 3000, IP defaults to 127.0.0.1
// server.listen(port);

// // Put a friendly message on the terminal
// console.log('Server running at http://127.0.0.1:' + port + '/');

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const config = require('./config.json');
const app = express();

// Define un puerto para tu servidor
const port = process.env.PORT || 8080;

// app.use('/', createProxyMiddleware({
//     target: config.chatService.url,
//     changeOrigin: true,
//     pathRewrite: {
//       '^/chat': ''
//     }
//   }))

// Ruta para gestionar usuarios

app.use('/users', createProxyMiddleware({
    target: config.usersService.url,
    changeOrigin: true,
    pathRewrite: {
      '^/users': ''
    }
  }))


// Ruta para el servicio de chat
app.use('/chat', createProxyMiddleware({
    target: config.chatService.url,
    changeOrigin: true,
    pathRewrite: {
      '^/chat': ''
    }
  }))


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
