//Типы СТРИМОВ
/*
Readable - чтение
Writable - запись
Duplex - для чтения и записи Readable + Writable
Transform - такой же как Duplex, но может изменить данные по мере чтения
*/

const fs = require('fs')
const path = require('path')

//-- Чтение файла с помощью модуля по работе с файловой системой
// fs.readFile(path.resolve(__dirname, 'test.txt'), (err, data) => {
//     if(err){
//         throw err;
//     } 
//     console.log(data);
// })

//-- Чтение файла с помощью СТРИМОВ

const stream = fs.createReadStream(path.resolve(__dirname, 'test.txt'))
//-- Стримы работают по определенным событиями

stream.on('data', (chunk) => {
    console.log(chunk)
})

// stream.on('end', () => console.log('Закончили читать'))
// stream.on('open', () => console.log('Начали читать'))
// stream.on('error', (e) => console.log(e))

//-- Запись файла с помощью СТРИМОВ
const writableStream = fs.createWriteStream(path.resolve(__dirname, 'test2.txt'))

for (let i = 0; i < 20; i++) {
    writableStream.write(i + '\n');
}
writableStream.end();


//-- Работа с HTTP-сервером

const http = require('http')

http.createServer((req, res) => { //-- req и res являются стримами //req - readable stream //res - writable stream
    const stream = fs.createReadStream(path.resolve(__dirname, 'test.txt')) //-- Создаем стрим на чтение
    //-- Стрим закончит читать раньше, чем пользователь скачает
    stream.pipe(res)
    

})  