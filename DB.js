/* eslint-disable max-len */

/**
 * @see {@link https://www.npmjs.com/package/promise-mysql}
 */
const mysql = require('promise-mysql');


/**
 * Bring DB config in from separate file
 * to keep logic clean.
 */
const conf = require('./config.js');

/**
 * A DB connection with the needed queries
 */
class DB {
  /**
   * Creates a connection if one does not already exist
   * @return {Promise} the connection object
 */
  async createConnection() {
    if (this.conn) return this.conn;
    this.conn = await mysql.createConnection(conf);
    return this.conn;
  }

  /**
 * Reads all items from the auctions table
 * @return {Promise}
 */
  async getAllItems() {
    return this.conn.query(
        'SELECT item_name, category, starting_bid, highest_bid FROM auctions'
    );
  }

  /**
 * Reads one item from the auctions table
 * @param {string} name
 * @return {Promise}
 */
  async getItemByName(name) {
    return this.conn.query(
        'SELECT item_name, category, starting_bid, highest_bid FROM auctions WHERE ?',
        {
          item_name: itemName,
        }
    );
  }

  /**
 * Adds an item to the auctions table
 * @param {string} name the product name
 * @param {number} startingBid the product's starting bid
 * @return {Promise}
 */
  createProduct(name, startingBid) {
    return this.conn.query(
        'INSERT INTO auctions SET ?',
        {
          item_name: name,
          starting_bid: startingBid,
        });
  }

  /**
 * Updates an item in the auctions table with a new highest bid
 * @param {string} itemName
 * @param {number} bid
 * @return {Promise}
 */
  updateItemWithBid(itemName, bid) {
    return this.conn.query(
        'UPDATE auctions SET ? WHERE ?',
        [
          {
            highest_bid: bid,
          },
          {
            item_name: itemName,
          },
        ]);
  }
}

module.exports = DB;


