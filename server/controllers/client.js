import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(20);

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find();
        productId: product._id;

        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" })
      .select("-password")
      .limit(20);
    res.status(200).json(customers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().limit(20);
    res.status(200).json(transactions);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
