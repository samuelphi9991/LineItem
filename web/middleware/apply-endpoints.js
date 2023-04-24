import { QRCodesDB } from "../qr-codes-db.js"

import express from "express";

import shopify from "../shopify.js";

// Copy over applyQrCodeEndpoints template here

export default function applyQrCodeApiEndpoints(app) {
    app.use(express.json());

    app.post("/api/lineitemimages", async (req, res) => {
      try {
        const query = `
          SELECT * FROM merchant_info;
        `; 
        const rawCodeData = await QRCodesDB.__query(query);
  
        res.status(200).send(rawCodeData);
      } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
    });
  
    app.patch("/api/lineitemimages/:id", async (req, res) => {
      try {
        const query = `
          SELECT * FROM merchant_info;
        `; 
        const rawCodeData = await QRCodesDB.__query(query);
  
        res.status(200).send(rawCodeData);
      } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
    });
  
    app.get("/api/lineitemimages", async (req, res) => {
      try {
        const query = `
          SELECT * FROM merchant_info;
        `; 
        const rawCodeData = await QRCodesDB.__query(query);
        console.log("SUCCESS!")
        console.log(rawCodeData);
        res.status(200).send(rawCodeData);
      } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
    });
  
    app.delete("/api/lineitemimages/:id", async (req, res) => {
      try {
        const query = `
          SELECT * FROM merchant_info;
        `; 
        const rawCodeData = await QRCodesDB.__query(query);
  
        res.status(200).send(rawCodeData);
      } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
    });
  }