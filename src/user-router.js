const Router = require('../framework/Router')
const controller = require('./user-controller')
const router = new Router()

const users = [
    {id: 1, name: 'Ulbu tv'},
    {id: 2, name: 'Vasya'},
]


router.get('/users', controller.getUsers)

router.post('/users', controller.createUser)

module.exports = router