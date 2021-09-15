import Product from "../models/product";

export const postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, price, description);
  console.log("product");
  console.log(product);
  product.save();
  res.send({ product });
};

export const getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  console.log("params productId");
  console.log(productId);
  const editMode = req.query.edit;
  if (!editMode) return;
  Product.findById(productId, (product) => {
    console.log("admin po product");
    console.log(product);
    res.send({ product });
  });
};

export const postEditProduct = (req, res, next) => {
  const { id, title, imageUrl, price, description } = { ...req.body };

  const updatedProduct = new Product(id, title, imageUrl, price, description);
  updatedProduct.save();
  console.log("post Edit title");
  console.log(updatedProduct);
  res.send({ redirect: "/" });
};
