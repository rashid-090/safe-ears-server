const Product = require("../../model/productModel");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
    try {


        const products = await Product.find(
            {
                status: { $in: ["in stock", "low quantity"] },

            },
            {
                name: 1,
                imageURL: 1,
                salePrice: 1,
                mrpPrice: 1,
                status: 1,
                rating: 1,
                offer: 1,
            }
        )


        const totalAvailableProducts = await Product.countDocuments({
            status: { $in: ["in stock", "low quantity"] },

        });

        res.status(200).json({ products, totalAvailableProducts });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw Error("Invalid ID!!!");
        }

        const product = await Product.findOne({ _id: id });

        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    getProducts,
    getProduct,
};
