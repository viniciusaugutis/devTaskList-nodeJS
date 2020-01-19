import app from './app';

console.log(`Servidor no ar na porta' ${process.env.PORT}`);
app.listen(process.env.PORT || 3333);
