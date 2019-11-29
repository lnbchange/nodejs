module.exports=(...arg)=>{
    return arg.reduce((prev,next)=>{
        return prev+next
    })
}