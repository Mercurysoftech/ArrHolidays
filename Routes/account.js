const express = require("express")
const accountRoutes = express.Router();
const fs = require('fs');

const dataPath = './Details/useraccount.json' 

const dataPathcountry = './Details/countries.json' 

const dataPathcities = './Details/cities.json' 

// util functions 

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}


const saveAccountData1 = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(dataPathcountry, stringifyData)
}

const getAccountData1 = () => {
  const jsonData = fs.readFileSync(dataPathcountry)
  return JSON.parse(jsonData)    
}

const saveAccountData2 = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(dataPathcities, stringifyData)
}

const getAccountData2 = () => {
  const jsonData = fs.readFileSync(dataPathcities)
  return JSON.parse(jsonData)    
}

// reading the data
accountRoutes.get('/account', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  accountRoutes.get('/api/country/getAllCountries', (req, res) => {
    fs.readFile(dataPathcountry, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

  accountRoutes.get('/api/city/getAllCities', (req, res) => {
    fs.readFile(dataPathcities, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });


  accountRoutes.post('/account/addaccount', (req, res) => {
   
    var existAccounts = getAccountData()
    const newAccountId = Math.floor(100000 + Math.random() * 900000)
   
    existAccounts[newAccountId] = req.body
     
    console.log(existAccounts);

    saveAccountData(existAccounts);
    res.send({success: true, msg: 'account data added successfully'})
})

// Read - get all accounts from the json file
accountRoutes.get('/account/list', (req, res) => {
  const accounts = getAccountData()
  res.send(accounts)
})

// Update - using Put method
accountRoutes.put('/account/:id', (req, res) => {
   var existAccounts = getAccountData()
   fs.readFile(dataPath, 'utf8', (err, data) => {
    const accountId = req.params['id'];
    existAccounts[accountId] = req.body;

    saveAccountData(existAccounts);
    res.send(`accounts with id ${accountId} has been updated`)
  }, true);
});

//delete - using delete method
accountRoutes.delete('/account/delete/:id', (req, res) => {
   fs.readFile(dataPath, 'utf8', (err, data) => {
    var existAccounts = getAccountData()

    const userId = req.params['id'];

    delete existAccounts[userId];  
    saveAccountData(existAccounts);
    res.send(`accounts with id ${userId} has been deleted`)
  }, true);
})
module.exports = accountRoutes