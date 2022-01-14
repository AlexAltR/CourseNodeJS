const http = require('http')
const EventEmitter = require('events')

module.exports = class Application {
    constructor(){
        this.emitter = new EventEmitter();
        this.server = this._createServer() 
    }

    //Метод по запуску сервера
    listen(port, callback){
        this.server.listen(port, callback)
    }



    //-- Метод который будет добовлять роутеры
    addRouter(router){
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                const handler = endpoint[method];
                this.emitter.on(this._getRouteMask(req.url, req.method), (req, res) =>{
                    handler(req, res)
                })
            })
        })
    }

    //-- Приватный метод по созданию сервера
    _createServer(){
        return http.createServer((req, res) => {
            const emitted = this.emitter.emit(this._getRouteMask(req.url, req.method), req, res)
            if (!emitted) {
                res.end()
            }
            
        });
    }

    //-- Приватный метод по созданию маски пути
    _getRouteMask(path, method){
        return `[${path}]:[${method}]`  
    }

}