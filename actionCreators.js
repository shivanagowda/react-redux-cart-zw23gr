
import PRODUCTS from "./Data";

const removeFromCart = product => {
  return {
    type: 'REMOVE_FROM_CART',
    product
  }
}

const updateCart = product => {
  return {
    type: 'UPDATE_CART',
    product
  }
}

const increaseProductQuantity = product => {
  return {
    type: 'INCREASE_QUANTITY',
    product
  }
}

const descreseProductQuantity = product => {
  return {
    type: 'DECREASE_QUANTITY',
    product
  }
}

const updateProductQuantity = product => {
  return {
    type: 'UPDATE_QUANTITY',
    product
  }
}


const loadProducts = () => {
  let products = PRODUCTS;
  return {
    type: 'LOAD_PRODUCTS',
    cart: products,
  };
}


export { removeFromCart, updateCart, increaseProductQuantity, descreseProductQuantity, updateProductQuantity, loadProducts };