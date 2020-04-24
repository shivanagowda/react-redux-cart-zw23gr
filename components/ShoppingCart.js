import React, { Component } from 'react';
import { Panel, Table, Button } from 'react-bootstrap';
import store from '../store';
import {
  removeFromCart,
  increaseProductQuantity,
  descreseProductQuantity,
  updateProductQuantity
} from '../actionCreators';
import { connect } from 'react-redux';

const ShoppingCart = (props) => {

  const incremtntQuantity = (productData) => {
    props.increaseProductQuantity(productData)
  }
  const decrementQuantity = (productData) => {
    props.descreseProductQuantity(productData)
  }
  const handleChange = (e, productData) => {
    productData.p_quantity = parseInt(e.target.value)
    props.updateProductQuantity(productData)
  }
  const handleState = (e, productData) => {
    handleChange(e, productData)
  }
  const checkNan = (product) => {
    return Number.isNaN(product.p_price * product.p_quantity)
  }
  return (
    <Panel>
      <p>If the cart is completely empty we shall add back again the products for you</p>
      <Table fill>
        <thead>
          <tr>
            <th >4 Items</th>
            <th ></th>
            <th >Size</th>
            <th >Qty</th>
            <th >Price</th>
          </tr>
        </thead>
        <tbody>
          {props.cart.map(product =>
            <tr key={product.p_id}>
              <td className="thumbnail-img"><img className="img-style" src={product.p_image} alt={product.p_name} /></td>
              <td><h4 className="f3 mb2">{product.p_name}</h4>
                <h5 className="f5 fw4 gray mt0">Style: {product.p_style}</h5>
                <h6 className="f5 fw4 gray mt1 color-diplaystyle">Color: <strong>{product.p_selected_color.name}</strong></h6>
                <p>
                  <a onClick={() => props.showModal(product)}>Edit</a> |
                  <a onClick={() => props.removeFromCart(product)}> X Remove</a> |
                  <a> Save For Later</a>
                </p></td>
              <td>
                {product.p_available_options.sizes.map(size => product.p_selected_size.name === size.name && size.code.toUpperCase())
                }
              </td>
              <td>

                <Button className="qty-styles" onClick={() => incremtntQuantity(product)}> + </Button>&nbsp;
               <input type="number" className="inputne inputQty-style" value={product.p_quantity}
                  onChange={(event) => handleState(event, product)} min="1" />
                {/*<CartQuantity productProp={product} handleChange={handleChange} />*/}&nbsp;
  
              <Button className="qty-styles" disabled={product.p_quantity <= 1} onClick={() => decrementQuantity(product)}> -</Button>
              </td>
              <td >${!checkNan(product) && product.p_price * product.p_quantity}</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="12" className="footer-style text-right">
              Estimated Total: ${props.cart.reduce((sum, product) => sum + (!checkNan(product) && product.p_price * product.p_quantity), 0)}
            </td>
          </tr>
        </tfoot>
      </Table>

    </Panel>
  )
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart(product) {
      dispatch(removeFromCart(product));
    },
    increaseProductQuantity(product) {
      dispatch(increaseProductQuantity(product));
    },
    descreseProductQuantity(product) {
      dispatch(descreseProductQuantity(product));
    },
    updateProductQuantity(product) {
      dispatch(updateProductQuantity(product));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
