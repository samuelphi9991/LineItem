/*
  This file interacts with the app's database and is used by the app's REST APIs.
*/

import sqlite3 from "sqlite3";
import path from "path";
import shopify from "./shopify.js";

const DEFAULT_DB_FILE = path.join(process.cwd(), "database.sqlite");
const DEFAULT_PURCHASE_QUANTITY = 1;

export const QRCodesDB = {
    qrCodesTableName: "merchant_info",
    db: null,
    ready: null,

    /* Private */

    /*
      Used to check whether to create the database.
      Also used to make sure the database and table are set up before the server starts.
    */

    __hasQrCodesTable: async function () {
        const query = `

            SELECT name FROM sqlite_schema
            WHERE
                type = 'table' AND
                name = ?;
            `;
        const rows = await this.__query(query, [this.qrCodesTableName]);
        return rows.length === 1;
    },

    read: async function () {
        await this.ready;
        const query = `
          SELECT * FROM ${this.qrCodesTableName};
        `;
        const rows = await this.__query(query);
        //if (!Array.isArray(rows) || rows?.length !== 1) return undefined;
        console.log("Values from 'read:' function: " + String.toString(rows));
        return rows;
    },

    /* Initializes the connection with the app's sqlite3 database */
    init: async function () { // Stopped working after deleting DB file, didi not do this before?!?!

        /* Initializes the connection to the database */
        this.db = this.db ?? new sqlite3.Database(DEFAULT_DB_FILE);

        const hasQrCodesTable = await this.__hasQrCodesTable();

        if (hasQrCodesTable) {
            this.ready = Promise.resolve();
            console.log("Found database table.")
            /* Create the QR code table if it hasn't been created */
        } else {
            console.log("Making database table.")
            const query = `
        CREATE TABLE ${this.qrCodesTableName} (
            image_url VARCHAR(511) NOT NULL
            product_id VARCHAR(511) NOT NULL
        )
      `;

        /* Tell the various CRUD methods that they can execute */
        this.ready = this.__query(query);
        }
    },

    /* Perform a query on the database. Used by the various CRUD methods. */
    __query: function (sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },
};