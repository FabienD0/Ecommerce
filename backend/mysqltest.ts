require('dotenv').config()
const mysql = require('mysql2')

const connection = mysql.createConnection(process.env.DATABASE_URL);

const test = async (req: Request, res: Response) => {
    const connection = mysql.createConnection(process.env.DATABASE_URL)
    console.log('Connected to PlanetScale!')
    connection.end()
  };


module.exports = {
    test
  };