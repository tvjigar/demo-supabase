const { supabase } = require("../config/supabase");

const addProduct = async (req, res, next) => {
  try {
    const { name, quantity, price, rating } = req.body;

    const { data, error } = await supabase
      .from("products")
      .insert({ name, quantity, price, rating })
      .select();
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res
      .status(200)
      .json({ message: "Product add successfully!!", products: data });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id, name, quantity, price, rating } = req.body;

    const { data, error } = await supabase
      .from("products")
      .update({ name, quantity, price, rating })
      .eq("id", Number(id))
      .select();

    if (error) {
      return res.status(401).json({ error: error.message });
    }
    return res.status(200).json({ message: "update product successful", data });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("id", req.params.id);
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    return res
      .status(200)
      .json({ message: "Product get Successfully!!", data });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("products").select();

    if (error) {
      return res.status(401).json({ error: error.message });
    }
    return res
      .status(200)
      .json({ message: "Product get Successfully!!", data });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", req.params.id);
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    return res.status(200).json({ message: "Product delete Successfully!!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
