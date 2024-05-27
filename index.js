/* simples middleware em express para remover o erro CORS */
// Autor : Maycon Arruda
// Data : 27/05/2024

// include dependencies
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const app = express();

/* 
aqui foi adicionando o CORS para concertar o erro na hora deconsultar a api de cnpj
*/

app.use(cors());

// create the proxy
/** @type {import('http-proxy-middleware/dist/types').RequestHandler<express.Request, express.Response>} */
const exampleProxy = createProxyMiddleware({
  /* colocando o caminho path do site da api */
  target: "https://receitaws.com.br/", // target host with the same base path
  changeOrigin: true, // needed for virtual hosted sites
});

// mount `exampleProxy` in web server

const port = process.env.PORT || 8000;


// const watiing =() =>{
//   setTimeout(() => {
    
//   }, 15000);
// }

// app.use('/', (req, res, next) =>{
//   console.log('before timeout');
//   setTimeout(() => {
//     console.log('in timeout');
//     next()
//   }, 15000);
// })
app.use("/", exampleProxy);

app.listen(port, () => {
  console.log('Após alguns percalços, aqui estamos');
  console.log("running in " + port);
});
