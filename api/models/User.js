import { ObjectId } from "mongodb";
import { getDB } from "../utils/database";

// TODO: if no work /// evry user must have Cart
export default class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {items:[]}
    this._id = id;
  }
  save() {
    const db = getDB();
    // db.collection('users').insertOne({name:'Lukasz',age:22})

    console.log("NEW !!!!!!");
    return db
      .collection("users")
      .insertOne(this)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    const db = getDB();
    const cartProductIndex = this.cart.items.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );

    let newAmount = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
      newAmount = this.cart.items[cartProductIndex].amount + 1;
      updatedCartItems[cartProductIndex].amount = newAmount;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        amount: newAmount,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDB();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => console.log(err));
  }

  getCart() {
    const db = getDB();
    const productIds = this.cart.items.map((i) => i.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) =>
        products.map((p) => ({
          ...p,
          amount: this.cart.items.find(
            (i) => i.productId.toString() === p._id.toString()
          ).amount,
        }))
      );
  }

  deleteItemFromCart(productId) {
    const db = getDB();
    //   const product = cart.products.find((prod) => prod.id === id);
    //   if (!product) return;
    //   if (product.amount > 1) {
    //     product.amount -= 1;
    //     cart.totalPrice -= productPrice;
    //   } else {
    //     cart.products = cart.products.filter((prod) => prod.id !== id);
    //   }

    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );
    console.log("updatedCartItems");
    console.log(updatedCartItems);
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDB();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            username: this.username,
          },
        };
        return db.collection("orders").insertOne(order);
      })
      .then((res) => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  fetchOrders() {
    console.log("fetchOrders");
    const db = getDB();
    return db
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray();
  }
}
