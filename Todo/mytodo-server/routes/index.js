const express=require('express')
const router=express.Router()
const controller=require('../controller/Ctodo')

router.get('/todos',controller.main);
router.post('/todo',controller.createnewtodo)
router.patch('/todo/:todoId',controller.edittodo)
router.delete('/todo/:todoId',controller.deletetodo)



module.exports=router;