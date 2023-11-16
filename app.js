
const  express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const port= 3000;
//Conexion a la Base de datos

const user='jose';
const password='tuki';
const dbname='Company';

const uri = `mongodb+srv://${user}:${password}@cluster0.dnpqkpu.mongodb.net/${dbname}`;

//Comprobamos si nos conectamos 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch(error => {
    console.error('Error de conexión a MongoDB:', error);
  })

  //Motor de plantillas

app.set('view engine', 'ejs');
app.set('views',__dirname +'/views');
app.use(express.static(__dirname +"/public"));

/*app.use('/',require('./router/RutasWeb'));
app.use('/mascotas',require('./router/Mascotas'));*/
app.use((req,res, next )=>{
    res.status(400).render("404",{
        titulo: "404",
        descripcion: "titulo del sitio web"
    } )
})
// Ruta específica para "/404"
app.get('/404', (req, res) => {
    res.render("404", {
      titulo: "404",
      descripcion: "Página no encontrada"
    });
  });
  
  // Middleware de error genérico
  app.use((req, res, next) => {
    res.status(404).render("404", {
      titulo: "404",
      descripcion: "Página no encontrada"
    });
  });


  app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
  });