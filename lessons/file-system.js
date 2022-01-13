const fs = require('fs')
const path = require('path')
const dotenv = require("dotenv")
dotenv.config()
const fsPromise = require('fs/promises') //Подключаем модуль для использования промиссов


//--Создание папки (Синхронный вариант)
// fs.mkdirSync(path.resolve(__dirname, 'dir', 'dir2', 'dir3'), {recursive: true}) //Создание рекурсивных папок


//--Проверка на асинхронность
// console.log('START')

//--Создание папки (Асинхронный вариант)
// fs.mkdir(path.resolve(__dirname, 'dir'), (err) => {
//     if(err){
//         console.log(err)
//         return
//     }
//     console.log('Папка создана')
// }) //Создание рекурсивных папок


//--Проверка на асинхронность
// console.log('END')



//--Удаление папок (Асинхронный вариант)
// fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
//     if(err){
//         throw err;
//     }
// })


//--Создаем файл и записываем в него данные

// fs.writeFile(path.resolve(__dirname, 'test.txt'), 'Hello, I am Sasha. This is funny', (err) => {
//     if(err){
//         throw err;
//     }
//     console.log('Файл записан!')
// })


//--Создаем файл и ДОБАВЛЯЕМ в него данные

// fs.appendFile(path.resolve(__dirname, 'test.txt'), '\nДобавляем данные', (err) => {
//     if(err){
//         throw err;
//     }
//     console.log('В файл добавлены данные')
// })


//-- Функция для записи файла на диск с помощью Promise

const writeFileAsync = async (path, data) => {
    return new Promise ((resolve, reject) => fs.writeFile(path, data, (err) => {
        if (err){
            return reject(err.message)
        }

        resolve()

    }))
}

//-- Продублировали функцию и изменили ее на добавление записей в файл
const appendFileAsync = async (path, data) => {
    return new Promise ((resolve, reject) => fs.appendFile(path, data, (err) => {
        if (err){
            return reject(err.message)
        }

        resolve()

    }))
}

//-- Функция для чтения файла
const readFileAsync = async (path) => {
    return new Promise ((resolve, reject) => fs.readFile(path, {encoding: 'utf-8'}, (err, data) => {
        if (err){
            return reject(err.message)
        }

        resolve(data)

    }))
}

//-- Функция для удаления файла
const removeFileAsync = async (path) => {
    return new Promise ((resolve, reject) => fs.rm(path, (err) => {
        if (err){
            return reject(err.message)
        }

        resolve()

    }))
}



//-- Применение Promise

// writeFileAsync(path.resolve(__dirname, 'test.txt'), 'data')
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '123'))
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '456'))
//     .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), '789'))
//     .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
//     .then(data => console.log(data))
//     .catch(err => console.log(err))


// removeFileAsync(path.resolve(__dirname, 'test.txt'))
//     .then(() => console.log('file was remove'))


/* Через перменную окружения передать строку, записать ее в файл 
    прочитать файл, посчитать кол-во слов в файле и записать
    их в новый файла count.txt, затем удалить первый файл
*/


let text = process.env.TEXT || '1 2 3 4E';


writeFileAsync(path.resolve(__dirname, 'task.txt'), text)
    .then(() => readFileAsync(path.resolve(__dirname, 'task.txt')))
    .then(data => data.split(' ').length)
    .then(count => writeFileAsync(path.resolve(__dirname, 'count.txt'), `Количество слов ${count}`))
    .then(() => removeFileAsync(path.resolve(__dirname, 'task.txt')))
    .catch(err => console.log(err)) 