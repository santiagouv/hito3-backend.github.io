const express = require('express');
const { set } = require('express/lib/application');
const { Client } = require('pg'); // Importar el cliente de PostgreSQL
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Middleware para manejar cuerpos de solicitudes JSON
app.use(express.json());
app.use(cors());
const corsOptions = {
  origin: 'http://74.242.171.91'
};


app.use(cors(corsOptions));
function setCorsHeaders(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}

app.use(setCorsHeaders);

// Configuración de la conexión a PostgreSQL
const client = new Client({
    user: 'prueba',
    host: '74.242.171.91',
    database: 'prueba',
    password: 'prueba123',
    port: 5432,
});

// Conectar a la base de datos
client.connect()
    .then(() => console.log('Conectado a PostgreSQL'))
    .catch(err => console.error('Error de conexión', err.stack));


app.get('/apiSanti', (req, res) => {
    res.send('Hello, World!');
});

app.get('/', (req, res) => {
    res.send('inicio api');
});

app.post('/api/carrito', (req, res) => {
    //console.log(req.body);
    const body = req.body;
    var sql_id = 0;
    var keys = Object.keys(body);
    var randdetalle = Math.floor(Math.random() * 1000000);
    var sql_insert = "INSERT INTO compra (detalle) VALUES ('"+randdetalle+"')";
    client.query(sql_insert);
    client.query('SELECT * FROM compra where detalle = $1', [randdetalle])
        .then(response => {
            console.log('select');
            sql_id = response.rows[0].id;
            console.log(response.rows[0].id);
            for(var i = 0; i < keys.length; i++) 
                {
                    var key = keys[i];

                    var id = body[key].id;
                    var titulo = body[key].titulo;
                    var precio = body[key].precio;
                    var cantidad = body[key].cantidad;
                    var imagen = body[key].imagen;
                    var categoria = body[key].categoria.nombre;  
                    console.log(randdetalle);
                    var sqlid = sql_id;
                    console.log(sqlid);
                    //insert en tabla producto postgresql
        
                    var query ="INSERT INTO producto (compra_id, product_id,nombre,img,categoria, precio, cantidad) VALUES ("+sqlid+",'"+id+"','"+titulo+"','"+imagen+"','"+categoria+"',"+precio+","+cantidad+")";            
                    console.log(query);
                   client.query(query).then(response => {console.log('insertado')}).catch(err => {console.error(err);});
                    
                }
		//		client.end();
            
        })
        .catch(err => {
            console.error(err);
          //  client.end();
        });

    


   
    res.send("JSON recibido e impreso en la consola");

});

app.get('/status', (req, res) => {
    const status = {
        "Status": "Running"
    };

    res.send(status);
});

// Nueva ruta POST que recibe un JSON y lo imprime en la consola
app.post('/api/printjson', (req, res) => {
    console.log(req.body);
    res.send("JSON recibido e impreso en la consola");
});

// Ruta de prueba para consultar la base de datos
app.get('/dbtest', async (req, res) => {
    try {
        const result = await client.query('SELECT NOW()');
        res.send(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al consultar la base de datos');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
