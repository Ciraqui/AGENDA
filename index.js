const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./configs/swaggerConfig')
const env = require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const usuarioRoutes = require("./src/routes/usuario")
const remedioRoutes = require("./src/routes/remedio")
const historicoRoutes = require("./src/routes/historico")
const prescricaoRoutes = require("./src/routes/prescricao")
const authRoutes = require('./src/routes/auth');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/usuario", usuarioRoutes);

app.use("/api/remedio", remedioRoutes);

app.use("/api/historico", historicoRoutes);

app.use("/api/prescricao", prescricaoRoutes);

app.use('/api/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});