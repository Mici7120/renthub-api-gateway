const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')
const config = require('./config.json');
const app = express();

// Define un puerto para tu servidor
const port = process.env.PORT || 8080;

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
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
