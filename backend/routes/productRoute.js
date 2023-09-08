const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  deleteReview,
} = require("../controllers/productController");
const { isAuthanticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/product").get(getAllProducts);
router.route("product/:id").get(getSingleProduct);
router.route("/admin/product/new").post(isAuthanticatedUser, createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthanticatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/admin/product/:id")
  .delete(isAuthanticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthanticatedUser, createProductReview);

router.route("/delete").delete(isAuthanticatedUser, deleteReview);
module.exports = router;
