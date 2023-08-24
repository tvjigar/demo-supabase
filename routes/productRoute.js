const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct,
} = require("../controllers/productController");

router
  .post("/", auth(), addProduct)
  .get("/", auth(), getProducts)
  .get("/:id", auth(), getProduct)
  .patch("/", auth(), updateProduct)
  .delete("/:id", auth(), deleteProduct);

module.exports = {
  routes: router,
};
