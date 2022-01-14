module.exports = class Router {
    constructor(){
        this.endpoints={}
    }
    request(method = "GET", path, handler){
        if (!this.endpoints[path]) {
            this.endpoints[path] = {}
            }
    //-- Для разных путей, разные методы //-- /users [GET, POST, PUT] /posts [GET, POST, PUT, DELETE]
        const endpoint = this.endpoints[path];
        //-- Делаем проверку на путь
        if (endpoint[method]) {
            throw new Error(`[${method}] по адресу [${path}] уже существует маршрут`)
            }

        endpoint[method] = handler
        }
    

    //-- Делаем абстракции методов (оболочки для вызова функции request())
    get(path, handler) {
        this.request('GET', path, handler)
    }
    post(path, handler) {
        this.request('POST', path, handler)
    }
    put(path, handler) {
        this.request('PUT', path, handler)
    }
    delete(path, handler) {
        this.request('DELETE', path, handler)
    }
}