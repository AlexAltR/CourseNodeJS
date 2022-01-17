const http = require('http')
const EventEmitter = require('events')

module.exports = class Application {
    constructor(){
        this.emitter = new EventEmitter();
        this.server = this._createServer()
        this.middlewares = []
    }

    //-- Создаем метод с помощью которого будем добавлять middlewear
    use(middleware) {
        this.middlewares.push(middleware);
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
                this.emitter.on(this._getRouteMask(path, method), (req, res) =>{
                    const handler = endpoint[method];
                    
                    handler(req, res)
                })
            })
        })
    }

    //-- Приватный метод по созданию сервера
    _createServer(){
        return http.createServer((req, res) => {
            let body = "";

            req.on('data', (chunk) => {
                body += chunk;
            })
            req.on('end', () =>{
                if(body){
                    req.body = JSON.parse(body);
                }
                this.middlewares.forEach(middleware => middleware(req, res))
                
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res)
                if (!emitted) {
                    res.end()
                }
            })
            
            
        });
    }

    //-- Приватный метод по созданию маски пути
    _getRouteMask(path, method){
        return `[${path}]:[${method}]`  
    }

}