import React, { Component } from 'react';
import { Navbar, Grid, Row, Col } from 'react-bootstrap';
import CartContainer from './container/CartContainer';
import './App.css'; 

class App extends Component { 
  render() {   
    return (
      <div>
        <Navbar inverse staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Your Shopping Cart</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col sm={12}>
              <CartContainer /> 
            </Col>
          </Row>
        </Grid>  
      </div>
    );
  }
} 

export default App


