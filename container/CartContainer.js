import React, { Component } from 'react';
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';
import ShoppingCart from '../components/ShoppingCart';
import store from '../store';
import { connect } from 'react-redux';
import { updateCart } from '../actionCreators';

class CartContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalShow: false,
      productData: '',
      selectedColor: '',
      selectedSize: '',
    }
  }

  setModalShow(product) {
    this.setState({ modalShow: !this.state.modalShow, productData: product })
  }
  setHideModal(event) {
    this.setState({ modalShow: !this.state.modalShow, productData: '' })
    event.stopPropagation()
  }
  handleUpdate(event) {
    let updateProduct = this.state.productData
    const sizes = this.state.selectedSize
    const color = this.state.selectedColor
    updateProduct.p_selected_size = sizes
    updateProduct.p_selected_color = color
    this.props.updateCart(updateProduct)
    this.setState({ modalShow: !this.state.modalShow, productData: '' })
    event.stopPropagation()
  }
  getColor(colors) {
    const selectColor = colors
    this.setState({ selectedColor: { name: selectColor[0], code: selectColor[1] } })
  }
  sizeSelect(e) {
    const selectSize = e.target.value.split(',')
    this.setState({ selectedSize: { name: selectSize[0], code: selectSize[1] } })
  }
  render() {
    const handleShow = (product) => this.setModalShow(product);
    const hideModal = (event) => this.setHideModal(event);
    const handleUpdate = (event) => this.handleUpdate(event);
    const imgBorder = this.state.selectedColor.code

    return (
      <div>
        {/** Cart component ***/}
        <ShoppingCart showModal={handleShow} />

        {/** Modal code goes here Faced some Issue with making as component ***/}
        <Modal show={this.state.modalShow} animation={false}>
          <Modal.Header>
            <Modal.Title>Modal heading </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid>
              <Row>
                <Col sm={6}>
                  <Col sm={6}>
                    <h4 className="f3 mb2">{this.state.productData.p_name}</h4>
                    <p>${this.state.productData.p_price}</p>
                    <h5 className="f5 fw4 gray mt0">Style: {this.state.productData.p_style}</h5>
                    <div className="specifications">
                      {
                        this.state.productData && <ul className="list-styles"><li ><label for="sel1">Colors: {this.state.selectedColor.name}</label></li>
                          {
                            this.state.modalShow &&
                            this.state.productData.p_available_options.colors.map((colorList) => {
                              const isSelected = this.state.selectedColor.code === colorList.hexcode && 'isSelected'
                              return <li title={colorList.name} className="list-styles" ><span onClick={() => this.getColor([colorList.name, colorList.hexcode])} className={"colors-style " + isSelected} style={{ backgroundColor: colorList.hexcode }}></span></li>
                            })
                          }
                        </ul>
                      }
                    </div>
                    <div className="specifications">
                      {
                        this.state.productData && <ul className="list-styles"><li ><label for="sel1">Sizes: {this.state.selectedSize.name}</label></li>
                          <select class="form-control" id="sel1" onChange={(e) => this.sizeSelect(e)}>
                            {
                              this.state.modalShow &&
                              this.state.productData.p_available_options.sizes.map((sizeList) => {
                                return <option value={[sizeList.name, sizeList.code]}>{sizeList.name}</option>
                              })
                            }
                          </select>
                        </ul>
                      }
                    </div>
                  </Col>
                  <Col sm={6}>


                    <img className="img-style" style={{ boxShadow: "-5px 2px 10px 5px " + imgBorder }} src={this.state.productData.p_image} alt={this.state.productData.p_name} />
                  </Col>
                </Col>
              </Row>
            </Grid>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideModal}>Close</Button>
            <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateCart(product) { dispatch(updateCart(product)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);


