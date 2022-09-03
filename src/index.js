require('dotenv').config();
const { client } = require('./database');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
   res.status(200).json({
      msg: 'Welcome to API - Hoteles Xamarin'
   });
});

app.get('/api', async (req, res) => {
   const strQuery = 'SELECT * FROM hoteles';

   try {
      const resp = await client.query(strQuery);
      
      if (resp.length > 0) {
         res.status(200).json(resp);
      } else {
         res.status(408).json({
            msg: 'No hay datos de las habitaciones reservadas...'
         });
      }
   } catch (err) {
      console.log(err.stack);

      res.status(500).json({
         msg: 'Error con el server x_x.'
      });
   }
});

app.post('/api', async (req, res) => {
   const {
      Cedula: cedula, 
      NameCompleto: nameCompleto, 
      Fecha: fecha, 
      NumPersonas: numPersonas, 
      TipoHabitacion: tipoHabitacion, 
      NumHabitacion: numHabitacion, 
      Lugar: lugar, 
      PrecioDia: precioDia,
      DiasEstadia: diasEstadia
   } = req.body;
   
   const strQuery = 'INSERT INTO hoteles SET ?';

   const values = {
      cedula, 
      nameCompleto, 
      fecha, 
      numPersonas, 
      tipoHabitacion, 
      numHabitacion, 
      lugar,
      precioDia,
      diasEstadia, 
      precioReserva: precioDia * diasEstadia
   };

   try {
      const resp = await client.query(strQuery, [values]);
      
      if (resp.affectedRows > 0) {
         res.status(200).json({
            msg: 'Reserva de habitación registrada con éxito...'
         });
      } else {
         res.status(408).json({
            msg: 'No se ha podido reservar la habitación...'
         });
      }
   } catch (err) {
      console.log(err.stack);

      res.status(500).json({
         msg: 'Error con el server x_x.'
      });
   }
});

app.delete('/api/:id', async (req, res) => {
   const {
      id
   } = req.params;

   const strQuery = 'DELETE FROM hoteles WHERE id = ?';

   try {
      const resp = await client.query(strQuery, id);
      
      if (resp.affectedRows > 0) {
         res.status(200).json({
            msg: 'Reserva eliminada con éxito...'
         });
      } else {
         res.status(408).json({
            msg: 'Reserva no eliminada...'
         });
      }
   } catch (err) {
      console.log(err.stack);

      res.status(500).json({
         msg: 'Error con el server x_x.'
      });
   }
});

app.get('/api/:id', async (req, res) => {
   const {
      id
   } = req.params;

   const strQuery = 'SELECT * FROM hoteles WHERE id = ?';

   try {
      const resp = await client.query(strQuery, id);
      
      if (resp.length > 0) {
         res.status(200).json(resp[0]);
      } else {
         res.status(408).json({
            msg: 'Reserva no encontrada...'
         });
      }
   } catch (err) {
      console.log(err.stack);

      res.status(500).json({
         msg: 'Error con el server x_x.'
      });
   }
});

app.put('/api', async (req, res) => {
   const {
      Id: id,
      Cedula: cedula, 
      NameCompleto: nameCompleto, 
      Fecha: fecha, 
      NumPersonas: numPersonas, 
      TipoHabitacion: tipoHabitacion, 
      NumHabitacion: numHabitacion, 
      Lugar: lugar, 
      PrecioDia: precioDia,
      DiasEstadia: diasEstadia
   } = req.body;

   const strQuery = 'UPDATE hoteles SET ? WHERE id = ?';

   const values = {
      cedula,
      nameCompleto, 
      fecha, 
      numPersonas, 
      tipoHabitacion, 
      numHabitacion, 
      lugar,
      precioDia,
      diasEstadia, 
      precioReserva: precioDia * diasEstadia
   };

   try {
      const resp = await client.query(strQuery, [values, id]);
      
      if (resp.affectedRows > 0) {
         res.status(200).json({
            msg: 'Empleado actualizado con éxito...'
         });
      } else {
         res.status(408).json({
            msg: 'Empleado no actualizado...'
         });
      }
   } catch (err) {
      console.log(err.stack);

      res.status(500).json({
         msg: 'Error con el server x_x.'
      });
   }
});

app.listen(app.get('port'), () => {
   console.log(
      `[${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}] - Servidor en el puerto ${app.get('port')}`
   );
});
