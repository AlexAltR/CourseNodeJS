const Application = require('./framework/Application')//Импортируем класс Application()
const userRouter = require('./src/user-router')
const jsonParser = require('./framework/parseJson')
const parseUrl = require('./framework/parseUrl')
const mongoose = require('mongoose')//-- Импортируем mongoose
const dotenv = require("dotenv");
dotenv.config() //-- Импортируем модуль для работы с переменными из окружения

const PORT = process.env.PORT || 5000;



 //-- Создание фреймворка по типу Express.js

    //-- Создаем класс

    
// Создаем объект класса Application() 
const app = new Application();

app.use(jsonParser)
app.use(parseUrl('http://localhost:5000'))

//Добавляем роутеры в приложение
app.addRouter(userRouter)




//-- Создаем функцию для работы с БД mongoDB
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://user:123@coursenodejs.2hbce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Server started on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()