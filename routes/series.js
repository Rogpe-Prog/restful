/*

GET /series == retorna todas as series
POST /series == crio uma nova serie
GET /series/id == retorna uma serie
DELETE /series/id == excluo uma series
PUT /serie/is == altero uma serie

*/


const express = require('express')
const router = express.Router()
const Serie = require('../models/serie')


router.get('/', async(req, res)=> {
    const series = await Serie.find({})
    res.send(series)
})
router.post('/', async (req, res) => {
    const serie = new Serie(req.body)
    try{
        await serie.save()
        res.send(serie)
    }catch(e){
        res.send({
            success: false,
            errors: Object.keys(e.errors)
        })
    }
})
router.delete('/:id', async(req, res)=> {
    await Serie.deleteOne({ _id: req.params.id })
    res.send({
        succes: true
    })
})
router.get('/:id', async (req, res) => {
    const serie = await Serie.findById({ _id: req.params.id })
    res.send(serie)
})
router.put('/:id', async(req, res)=> {
    await Serie.findByIdAndUpdate({ _id: req.params.id }, req.body, (err)=> {
        if(err){
            console.log(err)
        }else{
            res.send({
                success: true
            })
        }
    })

    // const serie = await Serie.findOne({ _id: req.params.id })
    // serie.name = req.body.name
    // serie.status = req.body.status
    // try{
    //     await serie.save()
    //     res.send(serie)
    // }catch(e){
    //     res.send({
    //         success: false,
    //         errors: Object.keys(e.errors)
    //     })
    // }
})


module.exports = router