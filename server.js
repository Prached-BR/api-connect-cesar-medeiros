const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API de Usuários operacional',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Recurso não encontrado',
    path: req.originalUrl,
    method: req.method
  });
});

app.use((err, req, res, next) => {
  console.error('[ERRO INTERNO]', err);
  res.status(500).json({
    status: 'error',
    code: 500,
    message: 'Erro interno do servidor'
  });
});

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`  API de Gerenciamento de Usuários (MVP)`);
  console.log(`========================================`);
  console.log(`  Servidor rodando em: http://localhost:${PORT}`);
  console.log(`  Health check:      http://localhost:${PORT}/api/health`);
  console.log(`  Endpoint usuários: http://localhost:${PORT}/api/users`);
  console.log(`========================================`);
});

module.exports = app;
