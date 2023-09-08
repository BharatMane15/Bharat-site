const ApiFeatures = require("../utils/apiFeatures");

//create Product
exports.createProduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get all Product
 * @param {*} req
 * @param {*} res
 */
exports.getAllProducts = async (req, res) => {
  try {
    let resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    let product = await apiFeature.query;
    res.status(200).json({ success: true, product, productCount });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    // Use the productId to find the corresponding product
    let product = await Product.findById(req.params.id);
    if (!product) {
      // Handle the case where the product is not found
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // Return the found product
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    // Handle any errors that occur during the retrieval
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update Product
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        status: false,
        message: "product not found",
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }

  await product?.remove();
  res.status(200).json({
    success: true,
    Mymessage: "product deleted successfully",
  });
};

//create new review and update the review

exports.createProductReview = async (req, res, next) => {
  try {
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };

    const product = await Product.findById(req.body.productId);

    const isReviewed = product.reviews?.find(
      (rev) => rev.user === req.user._id
    );
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user === req.user._id)
          (rev.rating = req.body.rating), (rev.comment = req.body.comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all review of product

exports.getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    return res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//delete a review

exports.deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id
    );

    let avg = 0;

    reviews.forEach((rev) => {
      avg += avg.rating;
    });

    const ratings = avg / reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
