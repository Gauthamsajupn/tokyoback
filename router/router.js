const express = require('express');
const router = express.Router();
// const app = express();
const multer = require("multer");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      cb(null, 'uploads/')
    } catch (error) {
      console.log("Multer destination error");
      console.log(error);
    }
  },
  filename: function (req, file, cb) {
    try {
      const uniqueSuffix = req.body.iD + "." + file.originalname.split('.')[1]
      cb(null, uniqueSuffix)
    } catch (error) {

      console.log("Multer filename error");
      console.log(error);
    }
  }
});

const upload = multer({ storage: storage })




const user = require("../Routes/userRouter");
const items = require("../Routes/materialRouter");
const admin = require("../Routes/admin");
const order = require("../Routes/order")
// const cart = require("../Routes/cart");

router.post("/signup", user.create);
router.post("/login", user.login);
router.get("/listUser", user.list);

router.post("/addItem", upload.single('image'), items.addItem);
router.get("/viewItem", items.viewItem);
router.get("/getItemById", items.getItemById);
router.put("/status", items.status);
router.get("/getByCategory", items.getByCategory);
router.put("/editProduct/:iD",upload.single('image'),items.editProduct);


// router.post("/addToCart",cart.addCart);
router.post("/addAdmin",admin.createAdmin);
router.post("/adminLogin",admin.adminLogin);
router.get("/listAdmin",admin.listAdmin);
router.post("/addOrder",order.addOrder);
router.get("/listOrder",order.listOrder);

module.exports = router;
