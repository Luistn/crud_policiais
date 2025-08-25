const { app } = require('./db');
const policiaisRoutes = require('./rotas/policiais');

app.use('/', policiaisRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});