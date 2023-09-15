require('dotenv').config()
const mysql = require('mysql2')
import { Request, Response } from "express";
import { RowDataPacket } from "mysql2";
const { v4: uuidv4 } = require("uuid");

/* Get All Items */
const checkoutCart = async (req: Request, res: Response) => {

const { fname,lname,address,email,cardNumber,expiry,cart } = req.body;

//SQL Data for Customers
const insertCustomer = `INSERT INTO customers (id, firstName, lastName, address, email, cardNumber, expiry)
VALUES (?, ?, ?, ?, ?, ?, ?)`;

//SQL Data for Orders
const insertItems = `INSERT INTO orders (orderId, itemId, customerId, quantity, price)
VALUES (?,?, ?, ?, ?)`;


/* Function to modify QUANTITY in INVENTORY items */
const changeQuantity = async (itemId: number, quantity: number) => {

  const sql = 'UPDATE items SET numInStock = numInStock - ? WHERE id = ?';
  const values = [quantity,itemId];

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    connection.query(sql,values, (_err:Error, rows: any) => {
      if(_err) {
        console.log(_err);
      } else { 
        console.log(rows)
      }
    });
    connection.end()
    console.log("Connection Ended")
  } catch (err) {
    console.log(err)
  }
}


//Check if existing existing user with Email, if Not Write it on the DB;
try {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  connection.query(`SELECT * FROM customers WHERE email = "${email}"`, (_err:Error, rows:RowDataPacket[]) => {

    //If customer exist, add order to the DB with current customer ID
    if(rows.length > 0) {
    
    const queryPromises = [];
    const createOrderId = uuidv4();

    //loop through the cart
    for(let i=0;i<cart.length;i++) {
      const valuesItems = [createOrderId,cart[i].id,rows[0].id,cart[i].quantity,cart[i].price];
  // Create a promise for each query.
  const queryPromise = new Promise((resolve, reject) => {
    connection.query(insertItems, valuesItems, (err: Error, insertRow: RowDataPacket[]) => {
      if (err) {
        reject(err);
      } else {
        changeQuantity(cart[i].id,cart[i].quantity)
        resolve(insertRow);
      }
    });
  });
  queryPromises.push(queryPromise);
  }
  // Execute all queries and handle the results.
  Promise.all(queryPromises)
  .then(() => {
    res.status(200).json({ status: 200,orderId: createOrderId, message: "Orders added" });
    connection.end();
  })
  .catch((err) => {
    res.status(500).json({ status: 500, err: err, message: "Error adding orders" });
    connection.end();
  });


  //If customer doesn't exist, add customer then add order with customer ID
    } else { 

      const valuesCustomer = [uuidv4(), fname, lname, address, email, cardNumber, expiry];

      connection.query(insertCustomer,valuesCustomer, (_err:Error, insertCustomerRow:RowDataPacket[]) => {
        if (_err) {
          res.status(500).json({ status: 500, message: "Error adding customer" });
          connection.end()
        } else {

          const queryPromises = [];
          const createOrderId = uuidv4();

          //loop through the cart
          for(let i=0;i<cart.length;i++) {
          const valuesItems = [createOrderId,cart[i].id,valuesCustomer[0],cart[i].quantity,cart[i].price];
      
        // Create a promise for each query.
        const queryPromise = new Promise((resolve, reject) => {
          connection.query(insertItems, valuesItems, (err: Error, insertRow: RowDataPacket[]) => {
            if (err) {
              reject(err);
            } else {
              changeQuantity(cart[i].id,cart[i].quantity)
              resolve(insertRow);
            }
          });
        });
        queryPromises.push(queryPromise);
        }
        // Execute all queries and handle the results.
        Promise.all(queryPromises)
        .then(() => {
          res.status(200).json({ status: 200,orderId: createOrderId, message: "Orders & Customer added" });
          connection.end();
        })
        .catch((err) => {
          res.status(500).json({ status: 500, err: err, message: "Error adding orders" });
          connection.end();
        });
        }
    })}
  });
  console.log("Connection Ended")
} catch (err) {
  console.log(err)
}
    };


/* Get Order By ID */
const getOrderById = async (req: Request, res: Response) => {

  const { orderId } = req.params;

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    connection.query(`SELECT * FROM orders WHERE orderId = "${orderId}"`, (_err:Error, rows:RowDataPacket[]) => {
      if(_err) {
        res.status(500).json({ status: 500, message: `error: ${_err.message}` });
      } else { 
        res.status(200).json({status:200,rows:rows,message:"success"})
      }
    });
    connection.end()
    console.log("Connection Ended")
  } catch (err) {
    console.log(err)
  }
}



  module.exports = {
        checkoutCart, getOrderById
        };