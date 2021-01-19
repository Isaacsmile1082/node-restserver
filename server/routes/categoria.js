const express = require('express');
const Categoria = require('../models/categoria');
let { verificaToken, verificarAdminRole } = require('../middlewares/autenticacion');

let app = express();


// ============================
// Mostrar todas las categorias
// ============================
app.get('/categoria', (req, res) => {

    Categoria.find({}, (err, categoryDB)  => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoryDB
        })
    })
});


// ========================
// Mostrar categoria por ID
// ========================
app.get('/categoria/:id', (req, res) => {

    let id = req.params.id;
    console.log(id);
    Categoria.findById(id, (err, categoriaDB) => {
        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })
})


// ========================
// Crear categoria
// ========================
app.post('/categoria', verificaToken, (req, res) => {

    // regresa la nueva categoria
    // req.usuario._id
    let { nombre } = req.body;

    let categoria = new Categoria({
        nombre
    });

    categoria.save( (err, categoriaDB) => {

        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
    
})


// ========================
// Actualizar categoria
// ========================
app.put('/categoria', verificaToken, (req, res) => {
    
    let { nombre, id } = req.body;

    Categoria.findByIdAndUpdate({_id: id}, {nombre} , { new: true, runValidators: true, useFindAndModify: false  }, (err, categoryUpdated) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                res: err
            })
        }

        res.json({
            ok: true,
            category: categoryUpdated
        })

    })
    
})

// ========================
// Borrar categoria
// ========================
app.delete('/categoria/:id', [verificaToken, verificarAdminRole], (req, res) => {
    // Solo un administrador puede borrar categoria
    // 
    let { id } = req.params;

    Categoria.findByIdAndDelete( id, (err, deletedCategory) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                res: err
            })
        }

        res.json({
            ok: true,
            category: deletedCategory
        });
        
    })


    
})

module.exports = app;