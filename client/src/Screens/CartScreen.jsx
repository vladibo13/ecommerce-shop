import React from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Message from "../components/Message";

const CartScreen = () => {
  const stateCart = useSelector((state) => state.cart);
  const { cartItems, totalPrice } = stateCart;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateQtyHandler = (item, e) => {
    const qty = Number(e.target.value);
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHanlder = (id) => {
    console.log(id);
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      {!cartItems.length ? (
        <Message>
          no items in cart <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <>
          <h4 className="my-3">Shopping Cart</h4>
          <Row>
            <Col sm={8}>
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item className="mb-2">
                    <Row>
                      <Col md={3}>
                        <Image src={item.image} fluid />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                        <span>${item.price}</span>
                      </Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) => updateQtyHandler(item, e)}
                        >
                          {[...Array(item.countInStock).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="danger"
                          type="button"
                          onClick={(e) => removeFromCartHanlder(item._id)}
                        >
                          <FaRegTrashAlt />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col sm={4}>
              <ListGroup>
                <ListGroup.Item>
                  <h5>
                    Subtotal ({cartItems.reduce((a, i) => a + i.qty, 0)}) items
                  </h5>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    variant="primary"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default CartScreen;
