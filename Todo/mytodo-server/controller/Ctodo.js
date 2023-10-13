const {Todo}=require('../models')

//main 페이지 랜더
const main=(req,res)=>{
    res.json({result:true, message:'랜더링 완료'})
}

//데이터 삽입
const createnewtodo=async (req,res)=>{
    console.log('dsf')
    try {
        const {title,done}=req.body
        const createTodo=await Todo.create({
            title,
            done
        })
        if(createTodo){
            res.json({result:true,message:'데이터 삽입완료',data:createTodo})
        }else{
            res.json({result:false,message:'데이터 삽입실패'})
        }
        
    } catch (error) {
        console.log(error)
    }
}
//데이터 수정
const edittodo=async(req,res)=>{
    try {
        const {todoId}=req.params
        const {title,done}=req.body
        const updateTodo=await Todo.update({
            title,
            done,
        },{where:{id: Number(todoId)}})
        if(updateTodo){
            res.json({result:true,message:'수정 완료',data:title})
        }else{
            res.json({result:false,message:'수정실패'})
        }
        
    } catch (error) {
        console.log(error)
    }
}
//데이터 삭제
const deletetodo=async (req,res)=>{
    try {
        const {todoId}=req.params
        const destroyTodo=await Todo.destroy({
            where:{id:Number(todoId)}
        })
        if(destroyTodo){
            res.json({result:true,message:'삭제 완료'})
        }else{
            res.json({result:false,message:'삭제 실패'})
        }
        
    } catch (error) {
        console.log(error)
    }
}



module.exports={
    main,
    createnewtodo,
    edittodo,
    deletetodo
}