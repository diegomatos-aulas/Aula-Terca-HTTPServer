// Criando um servidor
const http = require("http");
const fs = require("fs");
const path = require("path")

const url = path.join(__dirname, "public")

const server = http.createServer((requisicao, resposta) => {
  if (requisicao.url === "/"){
    // resposta.write("Ol&aacute; mundo !")
    fs.readFile(`${url}/index.html`, (err, data) => {
      if (err){
        console.log(err);
        resposta.writeHead(500, {"Content-Type" : "application/json"})
        resposta.write({Mensagem:"Ocorreu um error: " + err});
        return;
      }

      resposta.writeHead(200, {"Content-Type" : "text/html"})
      resposta.write(data);
      resposta.end();
    })
  }

  if(requisicao.url === "/todosOsBairrosDoBrasil") {
    fs.readFile(`${url}/listaDeEstadosReworked.json`, (err, data) => {
      if (err){
        console.log(err);
        resposta.writeHead(500, {"Content-Type" : "application/json"})
        resposta.write({Mensagem:"Ocorreu um error: " + err});
        return;
      }

      resposta.writeHead(200, {"Content-Type" : "application/json"})
      resposta.write(data);
      resposta.end();
    })
  }
});

server.listen(80, () => console.log("Servidor está sendo executado !"));