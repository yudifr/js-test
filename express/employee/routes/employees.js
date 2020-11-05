const express = require('express');
const router = express.Router();

const Employee = require('../models/employee');

//get
router.get('/', (req, res) => {
    Employee.find({})
        .then(employ => {

            res.render('./index', {
                employee: employ
            });
        });


});
router.get('/employee/new', (req, res) => {
    res.render('./new');
});
router.get('/employee/search', (req, res) => {
    
    if (req.query.name) {
        Employee.findOne({
                name: req.query.name
            })
            .then(employ => {
                res.render('search', {
                    employee: employ
                });
            })
            .catch(err => {
                console.log(err);
            });
    } else {

        res.render('./search', {
            employee: ""
        });
    }
});

router.get('/edit/:id',(req,res)=>{
    
    Employee.findOne({id:req.query.id})
    .then(employee=>{
        res.render('edit',{employee:employee});
    })
    .catch(err=>{
        req.flash('error_msg','error : '+err);
    });
});

//put
router.put('/edit/:id',(req,res)=>{
   
    Employee.updateOne({_id : req.params.id},{$set:{
        name : req.body.name,
        salary : req.body.salary,
        position : req.body.position

    }})
    .then(employ=>{
        req.flash('success_msg','Updated Successfully');

        res.redirect('/');
    })
    .catch(err=>{
        req.flash('error_msg','error : '+err);
    });
});
//post
router.post('/employee/new', (req, res) => {

    let newEmployee = {
        name: req.body.name,
        salary: req.body.salary,
        position: req.body.position
    };

    Employee.create(newEmployee)
        .then(karyawan => {
            req.flash('success_msg','Successfully added new data');
            res.redirect('/');
        })
        .catch(error => {
            req.flash('error_msg','error : '+err);
        });
});

//delete
router.delete('/delete/:id',(req,res)=>{
    Employee.deleteOne({_id : req.params.id})
    .then(employ=>{
        req.flash('success_msg','Success deleted');
        res.redirect('/');
    })
    .catch(err=>{
        req.flash('error_msg','error : '+err);
        res.redirect('/');
    });
});
router.get('*',(req,res)=>{
    res.sendStatus(404);
    // res.status(404).render('error404')
});
module.exports = router;