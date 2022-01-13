const http = require('http')
const dotenv = require("dotenv")
dotenv.config() //-- Импортируем модуль для работы с переменными из окружения

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    //-- Отправляем данные в формате JSON
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    if(req.url === '/users'){
        return res.end(JSON.stringify([{
            id: 2, name: 'Ulbi tv'
        }]))
    }
    if(req.url === '/posts'){
        return res.end('POSTS')
    }
    res.end(req.url)
});

server.listen(PORT, () => console.log(`Server started on ${PORT}`))