const Emitter = require('events') //-- Импорт модуля по работе с событиями
const dotenv = require("dotenv")
dotenv.config() //-- Импортируем модуль для работы с переменными из окружения


const emitter = new Emitter;

emitter.on('message', (data, second, third) =>{
    console.log('Вы прислали сообщение ' + data);
    console.log('Второй аргумент ' + second);
})


const MESSAGE = process.env.MESSAGE || ' ';

if (MESSAGE) {
    emitter.emit('message', MESSAGE, 123)
} else{
    emitter.emit('message', "Вы не указали сообщение")
}


/* Когда удобно использовать?
HTTP
WebSocket
long pulling
clusters
*/