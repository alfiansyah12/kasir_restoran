const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('../config')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//GET meja
app.get("/", (req,res) => {
    let sql = "select * from meja"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else {
            let response = {
                count: result.length,
                meja: result
            }
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})

//POST SAVE meja
app.post("/save", (req,rest) => {
    let data = {
        id_meja: req.body.id_meja,
        nomor_meja: req.body.nomor_meja
    }
    let message = ""

    let sql = "insert into meja set ?"
    db.query(sql, data, (err, result) => {
        if(err) {
            message = err.message
        }
        else {
            message = result.affectedRows + "row inserted"
        }

        let response = {
            message: message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

//POST UPDATE meja
app.post("/update", (req,res) => {
    let data = [{
        id_meja: req.body.id_meja,
        nomor_meja: req.body.nomor_meja
    }, req.body.id_meja]
    let message = ""

    let sql = "update meja set ? where id_meja = ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row updated"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// DELETE: /meja/:id_meja --> end point untuk hapus data meja
app.delete("/:id_meja", (req,res) => {
    let data = {
        id_meja : req.params.id_meja
    }
    let message = ""
    let sql = "delete from meja where ?"
    db.query(sql, data, (err,result) => {
        if (err) {
            message = err.message
        } else {
            message = result.affectedRows + " row deleted"
        }

        let response = {
            message : message
        }
        res.setHeader("Content-Type","application/json")
        res.send(JSON.stringify(response))
    })
})

// POST: /meja --> end point untuk pencarian data meja
app.post("/", (req,res) => {
    let find = req.body.find
    let sql = "select * from meja where id_meja like '%"+find+"%' or nama_pelanggan like '%"+find+"%' or alamat like '%"+find+"%'"
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        } else {
            let response = {
                count: result.length,
                meja: result
            }
        
            res.setHeader("Content-Type","application/json")
            res.send(JSON.stringify(response))
        }
    })
})



module.exports = app