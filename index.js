const http = require('http');
const EventEmitter = require('events');
const Router = require('./framework/Router') //Импортируем класс Router()
const Application = require('./framework/Application')//Импортируем класс Application()
const dotenv = require("dotenv");
dotenv.config() //-- Импортируем модуль для работы с переменными из окружения

const PORT = process.env.PORT || 5000;

const emitter = new EventEmitter();

 //-- Создание фреймворка по типу Express.js

    //-- Создаем класс

    
// Создаем объект класса Application() 
const app = new Application();
app.listen(PORT, () => console.log(`Server started on ${PORT}`))


// Создаем объект класса Router() 
const router = new Router();

router.get('/users', (req, res) => {
    res.end('YOU SEND REQUEST TO /USERS')
})

router.get('/posts', (req, res) => {
    res.end('YOU SEND REQUEST TO /POSTS')
})
//Добавляем роутеры в приложение
app.addRouter(router)