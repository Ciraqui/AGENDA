const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./configs/swaggerConfig')
const env = require('dotenv').config();
const app = express();
app.use(express.json());

const usuarioRoutes = require("./src/routes/usuario")
const remedioRoutes = require("./src/routes/remedio")
const historicoRoutes = require("./src/routes/historico")
const prescricaoRoutes = require("./src/routes/prescricao")
const authRoutes = require('./src/routes/auth');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/usuario", usuarioRoutes);

app.use("/remedio", remedioRoutes);

app.use("/historico", historicoRoutes);

app.use("/prescricao", prescricaoRoutes);

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});