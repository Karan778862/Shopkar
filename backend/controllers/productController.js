import Product from "../model/productModel.js"

 export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, brand, stock, images } = req.body;

        // ✅ Check if all required fields are present
        if (!name || !description || !price || !category || !brand || !stock || !images) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        // ✅ New Product Create & Save in Database
        const product = new Product({
            name,
            description,
            price,
            category,
            brand,
            stock,
            images
        });

        const savedProduct = await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            product: savedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

//getAllproducts

export const getAllProducts = async (req, res) => {
    try {
        // ✅ Database se saare products fetch karo
        const products = await Product.find({});

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};


//single product get 

export const sinngleProduct = async (req, res) =>{
    try {
        const id= req.params.id;
        console.log(id)
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
        res.json({ success: true, product });
      } catch (error) {
        res.status(500).json({ message: "Server Error", error });
      }
}


//update product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // ✅ URL se product ID nikal rahe hain
        const updatedData = req.body; // ✅ Request body se naye data le rahe hain

        // ✅ Product update kar rahe hain
        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};



//delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // ✅ URL se product ID nikal rahe hain

        // ✅ Product find aur delete kar rahe hain
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};


//search product
export const searchProducts = async (req, res) => {
    try {
        let { keyword, category, brand, minPrice, maxPrice } = req.query;
        let filter = {};

        // ✅ Keyword-based search (Name aur Description me search karega)
        if (keyword) {
            filter.$or = [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ];
        }

        // ✅ Category filter
        if (category) {
            filter.category = category;
        }

        // ✅ Brand filter
        if (brand) {
            filter.brand = brand;
        }

        // ✅ Price range filter
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice); // Greater than or equal
            if (maxPrice) filter.price.$lte = Number(maxPrice); // Less than or equal
        }

        // ✅ Filter applied
        const products = await Product.find(filter);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};