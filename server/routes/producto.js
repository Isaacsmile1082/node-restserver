const express = require('express');
const app = express();
const Producto = require('../models/producto');
const { verificaToken, verificarAdminRole } = require('../middlewares/autenticacion');
/*
===========================
Mostrar todos los productos
===========================
*/

app.get('/producto', (req, res) => {

    Producto.find( (err, productosDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                message: err
            })
        }
    
        return res.json({
            ok: true,
            message: productosDB
        });
    })
    
});


/*
========================
Mostrar un solo producto
========================
*/

app.get('/producto', (req, res) => {

    let { id } = req.query;

    Producto.findById(id, (err, productoDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                message: err
            })
        }
    
        return res.json({
            ok: true,
            message: productoDB
        });

    })
});

/*
=====================
Mostrar por categoria
=====================
*/

app.get('/producto/:categoria', (req, res) => {

    let categoria = req.params;
    console.log(categoria)
    Producto.find(categoria, (err, productosDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                message: err
            })
        }

        
    
        return res.json({
            ok: true,
            message: productosDB
        });
    })
});

/*
===================
Agregar un producto
===================
*/


app.post('/producto', verificaToken , (req, res) => {

  let body = req.body;

  let producto = new Producto({
      nombre: body.nombre,
      precioUni: parseInt(body.precioUnitario),
      descripcion: body.descripcion,
      categoria: body.categoria,
      usuario: body.usuario
  });

  producto.save( (err, productDB) => {
      
    if(err){
        return res.status(400).json({
            ok: false,
            message: err
        })
    }

    return res.json({
        ok: true,
        message: productDB
    });

  })
});

/*
======================
Actualizar un producto
======================
*/

app.put('/producto', verificaToken, (req, res) => {

    let body = req.body;


    Producto.findByIdAndUpdate({_id : body.id}, { 
        nombre: body.nombre,
        precioUni: parseInt(body.precioUnitario),
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: body.usuario
     }, { new: true, runValidators: true, useFindAndModify: false }, (err, productDB) =>{

        if(err){
            return res.status(400).json({
                ok: false,
                message: err
            })
        }
    
        return res.json({
            ok: true,
            message: productDB
        });
     })
});



/*
====================
Eliminar un producto
====================
*/

app.delete('/producto/:id', [verificaToken, verificarAdminRole], (req, res) => {

    let { id } = req.params;
    console.log(id);
    Producto.findByIdAndUpdate( { _id: id }, { disponible: false }, { new: true, runValidators: true, useFindAndModify: false } , (err, productDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                message: err
            })
        }
    
        return res.json({
            ok: true,
            message: productDB
        });
    })

})

module.exports = app;