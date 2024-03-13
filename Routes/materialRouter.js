const Material = require("../model/material");
const fs = require("fs");
const path = require("path");

module.exports={
addItem: async (req,res)=>{
  try{
    const result= await Material.create({
      iD: req.body.iD,
      clothName: req.body.clothName,
      material: req.body.material,
      color: req.body.color,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      size: req.body.size,  
      });
      res.status(201).json(result)
      console.log("DONE CREATE");
  }catch(error){
    console.log("Error at Routes/materialRouter.js create ::::", error);
            res.status(400).send(error.message);
  }
},
viewItem: async(req,res)=>{
  try {
    console.log(req.query);
    let result = [];
    if (req.query.status) {
        const status = req.query.status
        result = await Material.find({ status: status });
    } else {
        result = await Material.find({});
    }

    console.log(result);
    const array = [];
    for (let ele in result) {
        let obj = {};
        const picName = `${result[ele].iD}.jpg`;
        const path = `${__dirname.split('Routes')[0]}uploads\\${picName}`;
        const image = fs.readFileSync(path);
        obj._id = result[ele]._id;
        obj.iD = result[ele].iD;
        obj.clothName = result[ele].clothName;
        obj.material = result[ele].material;
        obj.color = result[ele].color;
        obj.description = result[ele].description;
        obj.price = result[ele].price;
        obj.category=result[ele].category;
        obj.size=result[ele].size;
        obj.status=result[ele].status;
        obj.image = image;
        array.push(obj);
    };
    // console.log({array});
    res.status(201).json(array);
} catch (error) {
    console.log("Error at controller/destination.js list ::::", error);
    res.status(400).send(error.message);
}
},

getItemById: async (req,res)=>{
  try {
    let obj = {}
    console.log("Id:",req.query.iD);
    const iD = req.query.iD;
    let result = await Material.findOne({ iD });
    const picName = `${iD}.jpg`;
    const path = `${__dirname.split('Routes')[0]}uploads\\${picName}`;
    const image = fs.readFileSync(path);
    obj.iD=result.iD;
    obj.clothName = result.clothName;
    obj.material = result.material;
    obj.color = result.color;
    obj.description = result.description;
    obj.price = result.price;
    obj.size = result.size;
    obj.category = result.category;
    obj.image = image;
    console.log({ obj });
    res.status(201).json(obj);
} catch (error) {
    console.log("Error at Routes/materialRouter.js getItemById ::::", error);
    res.status(400).send(error.message);
}
},
status: async (req, res) => {
  console.log('Request Body:', req.body);
  const { _id, status } = req.body;
  // const { _id, action}=req.params;
  console.log('_id:', _id);
  console.log('status:', status);

  try {
      let statusType;

      statusType = await Material.findByIdAndUpdate(
          _id,
          { $set: { status } },
          { new: true }
      );
      res.json(statusType);

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error:::" });
  }
},

editProduct: async (req,res)=>{
  try {
    console.log("iD:", req.params.iD);
    console.log({ params: req.params, body: req.body, file: req.file });

    const iD = req.params.iD;
    const clothName = req.body?.clothName;
    const material = req.body?.material;
    const color = req.body?.color;
    const description = req.body?.description;
    const price = req.body?.price;
    const category = req.body?.category;
    const size = req.body?.size;

    // Check if there's a file uploaded
    if (req.file) {
        // Construct the file path for the existing image
        const imagePath = path.join(__dirname, '..', 'uploads', `${iD}.jpg`);

        // Read the new image file
        const newImageData = fs.readFileSync(req.file.path);

        // Write the new image data to the existing image file (overwrite)
        fs.writeFileSync(imagePath, newImageData);
    };
      const result = await Material.findOneAndUpdate(
        { iD: iD },
        {  $set: { clothName, material, color, description, price,category,size } },
        { new: true }
    );

    res.json(result);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error at editProduct:::::" });
}
},


getByCategory: async (req, res) => {
  try {
    console.log(req.query);
    let result = [];
    if (req.query.category) {
      const category = req.query.category;
      result = await Material.find({ category: category });
    } else {
      result = await Material.find({});
    }

    console.log(result);
    const array = [];
    for (let ele in result) {
      let obj = {};
      const picName = `${result[ele].iD}.jpg`;
      const path = `${__dirname.split('Routes')[0]}uploads\\${picName}`;
      const image = fs.readFileSync(path);
      obj._id = result[ele]._id;
      obj.iD = result[ele].iD;
      obj.clothName = result[ele].clothName;
      obj.material = result[ele].material;
      obj.color = result[ele].color;
      obj.description = result[ele].description;
      obj.price = result[ele].price;
      obj.category = result[ele].category;
      obj.size = result[ele].size;
      obj.status = result[ele].status;
      obj.image = image;
      array.push(obj);
    };
    // console.log({array});
    res.status(201).json(array);
  } catch (error) {
    console.log("Error at controller/destination.js list ::::", error);
    res.status(400).send(error.message);
  }
}


}

















// // materialRouter.js

// const express = require('express');
// const router = express.Router();
// const Material = require('../model/material'); // Adjust the path accordingly

// // Handle POST request to add a new material
//     router.post('/add', async (req, res) => {
//         try {
//             const { clothName,
//                 material,
//                 color,
//                 size,
//                 price,
//                 description,
//                 category,
//                 images } = req.body;
//             const newMaterial = new Material({
//                 clothName,
//                 material,
//                 color,
//                 size,
//                 price,
//                 description,
//                 category,
//                 images
//             });
//             console.log(req.body)
//             const savedMaterial = await newMaterial.save();
//             res.status(201).json(savedMaterial);
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     });

//     router.get('/getproductbyid', async (req, res) => {
//       const { productId } = req.body;
//       try {
//         const product = await Material.findById(productId);
//         if (!product) {
//           return res.status(404).json({ error: 'Product not found' });
//         }
//         res.json(product);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//     });

//     router.get('/getallproducts', async (req, res) => {
//       try {
//           const products = await Material.find();
//           console.log('Products:', products); // Log the fetched products
//           res.json(products);
//       } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: 'Internal server error' });
//       }
//   });
  

//       router.put('/updateproduct/:id', async (req, res) => {
//         const productId = req.params.id;
//         const updatedProductData = req.body; // This will contain the updated product data
        
//         try {
//           // Find the product by ID and update its data
//           const updatedProduct = await Material.findByIdAndUpdate(productId, updatedProductData, { new: true });
      
//           if (!updatedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//           }
      
//           res.status(200).json(updatedProduct); // Return the updated product
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: 'Internal server error' });
//         }
//       });

// module.exports = router;
