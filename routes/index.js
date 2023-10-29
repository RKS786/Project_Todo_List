const express = require('express');
const router = express.Router();

console.log('router loaded');

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

router.post('/create_todo',homeController.createTodo) //controller for creating todo list
router.post('/delete_todo',homeController.deleteTodo) // controller for deleting the todo list

module.exports = router;