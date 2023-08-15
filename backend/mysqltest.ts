require('dotenv').config()
const mysql = require('mysql2')
import { RowDataPacket } from "mysql2";


const test = async (req: Request, res: Response) => {
  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connected to PlanetScale!');
    connection.query('SELECT * FROM companies', (_err:Error, rows:RowDataPacket[]) => {
      if(_err) {
        console.log(_err)
      } else { 
        console.log(rows[0])
        console.log(rows[1])
      }
    });
    connection.end()
  } catch (err) {
    console.log(err)
  }
  };


module.exports = {
    test
  };