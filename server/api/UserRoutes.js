const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
router.post("/signinuser", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        where: {
            email: email
        }
    }).then(result => {
        bcrypt.compare(password, result.toJSON().password, (err, result_2) => {
            
            if (err) {
                res.sendStatus("er");
            }
            if (result_2) {
                console.log(result.toJSON().userRole)
                const type = result.toJSON().userRole;
                const payload = {
                    userId: result.toJSON().userId,
                    password: result.toJSON().password,
                    time: new Date()

                };
                const secretKey = 'Avishka';
                const token = jwt.sign(payload, secretKey, { expiresIn: '10h' });
                const response = { type, token };
                res.sendStatus(response);
            } else {
                res.sendStatus("200");
            }
        });

    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);
    });
})
router.post("/registeruser", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const userRole = req.body.userRole;
    const contactNo = req.body.contactNo;
    // const profilePicture=req.body.profilePicture;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.sendStatus("unsuccessful");
        } else {
            User.create({ 
                email: email,
                 password: hash ,
                firstName:firstName,
                lastName:lastName,
                age:age,
                userRole:userRole,
                contactNo:contactNo});
                   
            res.sendStatus("successful");
          
                
}
       
       
    }
);
});
module.exports = router;
