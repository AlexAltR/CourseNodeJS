const path = require('path'); //модуль для взаимодействия с путями в файловой системе


console.log("Склеить участки пути", path.join('first', 'second', 'third')) // склеивание пути для любой ОС

console.log("Получить абсолютный путь", path.resolve(__dirname,'first','second', 'third')) // всегда возвращает абсолютный путь

const fullpath = path.resolve(__dirname,'first','second', 'third.js')

console.log("Парсинг пути", path.parse(fullpath)) // распарсим строку

console.log("Разделитель в ОС" ,path.sep)

console.log("Проверка на абсолютный путь", path.isAbsolute(fullpath))

console.log("Название файла" ,path.basename(fullpath))

console.log("Расширение файла" ,path.extname(fullpath))

console.log("Разделитель в ОС" ,path.sep)


// -------------------------------------

//Работа с URL

const siteURL = 'http://localhost:8080/users?id=5123'

const url = new URL(siteURL); // распарсили 'siteURL'

console.log(url)



