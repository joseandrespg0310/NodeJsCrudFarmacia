const express = require ('express');
const router = express.Router();

router.get ('/',(req, res)=>{
    res.render("index",{titulo:"mi titulo dinamico"})
})


router.get ('/servicios',(rep,res)=>{
    res.render("servicios",{tituloServicios:"Estemensaje es un mensaje dinamico de servicio" })
})

module.exports= router;