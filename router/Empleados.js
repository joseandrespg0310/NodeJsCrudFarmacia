const express = require ('express');
const router = express.Router();

const Empleado = require('../models/empleado');
router.get('/',async (req, res)=>{

    try{
        const arrayEmpleadoDB= await Empleado.find()
        console.log(arrayEmpleadoDB)
        res.render("empleados",{
        arrayEmpleado: arrayEmpleadoDB 
    })

    }catch (error){
        console.log(error)
    }
})

router.get('/crear',(req,res) =>{
    res.render('crear')
})
router.post('/',async(req, res)=>{
    const body = req.body
    try{
      
      await Empleado.create(body)
      res.redirect('/empleados')
    }catch(error){
        console.log(error)
    }
})

router.get('/:id',async(req, res)=>{
    const id= req.params.id;
    try{
        const empleadoDB =await Empleado.findOne({_id: id})
        console.log(empleadoDB)
        res.render('detalle', {
            empleado: empleadoDB,
            error:false
        })

    } catch (error) {
        console.log(error)
        res.render('detalle', {
            error:true,
            mensaje:'Nose encuentra el id seleccionado'
        })
    }
})
router.delete('/:id',async (req, res)=>{
    const id = req.params.id
    try {
        const empleadoDB = await Empleado.findByIdAndDelete({_id: id})
        if(empleadoDB){
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })

        }else{
            res.json({
                estado: false,
                mensaje: 'eliminado!'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res)=>{
    const id = req.params.id
    const body= req.body
    try {
        const empleadoDB= await Empleado.findByIdAndUpdate( id, body,{ useFindAndModify:false})
        console.log(empleadoDB)
        res.json({
            estado:true,
            mensaje:'Editado'
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            estado:false,
            mensaje:'FALLAMOS'
        })
    }
})    
module.exports= router;