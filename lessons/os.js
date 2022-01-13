const os = require('os')
//--Импортируем модуль, котрый позволяет использовать возможности многоядерных систем в Node.js
const cluster = require('cluster')

// console.log(os.platform()) //--Возвращает операционную систему

// console.log(os.arch()) //-- Возвращает архитектуру

// console.log(os.cpus()) //-- Возвращает массив, элемент описывает свойства ядра процессора

// console.log(os.cpus().length) //-- Возвращает количество ядер

// console.log(os.cpus()) //-- Возвращает массив, элемент описывает свойства ядра процессора

//-- Запускаем процессы в зависимости от кол-ва ядер



if(cluster.isMaster){ //-- Проверяем главный ли процесс
    for(let i = 0; i < os.cpus().length - 2; i++) {//--Оставляем два ядра под нужды ОС
        cluster.fork()

        cluster.on('exit', (worker) => {
            console.log(`Воркер с pid= ${worker.process.pid} умер`)
            cluster.fork()
        })
    }
} else{
    console.log(`Воркер с pid= ${process.pid} запущен`)

    setInterval(() => {

        console.log(`Воркер с pid= ${process.pid} еще работает`)
    }, 5000)
}

