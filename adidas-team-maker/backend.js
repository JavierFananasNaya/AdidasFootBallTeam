const PORT = 8000

const express = require('express')
const cors = require('cors')
const axios = require('axios')

require('dotenv').config()

const app = express()

app.get('/', (req,res) => {
    res.json('hi')
})

app.use(cors())

app.get('/teams', (req,res) => {

    const options = {
        method: "GET",
        url: 'https://api.football-data.org/v2/teams',
        headers: { "X-Auth-Token": process.env.REACT_APP_API_KEY }
      };

      axios.request(options).then((response) => {
          res.json(response.data);
      }).catch((error) => {
          console.log(error);
      })
})

app.get('/teamInfo', (req,res) => {
    const id = req.query.id;
    console.log(id)
    const options = {
        method: "GET",
        url: `https://api.football-data.org/v2/teams/${id}`,
        headers: { "X-Auth-Token": process.env.REACT_APP_API_KEY }
      };

      axios.request(options).then((response) => {
          res.json(response.data);
      }).catch((error) => {
          console.log(error);
      })
})

app.listen(8000, () => console.log(`server is running on port ${PORT}`))