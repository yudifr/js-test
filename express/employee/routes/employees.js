const express = require('express');
const router = express.Router();

const Employee = require('../models/employee')

//get
router.get('/', (req, res) => {
    Employee.find({})
        .then(employ => {

            res.render('./index', {
                employee: employ
            });
        })


})
router.get('/employee/new', (req, res) => {
    res.render('./new');
})
router.get('/employee/search', (req, res) => {
    
    if (req.query.name) {
        Employee.findOne({
                name: req.query.name
            })
            .then(employ => {
                res.render('search', {
                    employee: employ
                })
            })
            .catch(err => {
                console.log(err)
            })
    } else {

        res.render('./search', {
            employee: ""
        });
    }
})

router.get('/edit/:id',(req,res)=>{
    
    Employee.findOne({id:req.query.id})
    .then(employee=>{
        res.render('edit',{employee:employee})
    })
    .catch(err=>{
        console.log(err)
    })
})

//put
router.put('/edit/:id',(req,res)=>{
   
    Employee.updateOne({_id : req.params.id},{$set:{
        name : req.body.name,
        salary : req.body.salary,
        position : req.body.position

    }})
    .then(employ=>{
        res.redirect('/')
    })
    .catch(err=>{
        console.log(err)
    })
})
//post
router.post('/employee/new', (req, res) => {

    let newEmployee = {
        name: req.body.name,
        salary: req.body.salary,
        position: req.body.position
    }

    Employee.create(newEmployee)
        .then(karyawan => {
            res.redirect('/')
        })
        .catch(error => {
            console.log(error);
        })
})

//delete
router.delete('/delete/:id',(req,res)=>{
    Employee.deleteOne({_id : req.params.id})
    .then(employ=>{
        res.redirect('/')
    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = router;