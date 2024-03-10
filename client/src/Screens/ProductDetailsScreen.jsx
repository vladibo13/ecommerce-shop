import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import products from "../products";
import Rating from "../components/Rating";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { useGetProductQuery } from "../slices/productsApiSlice";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Loader from "../components/Loader";

const ProductDetailsScreen = () => {
  // request without redux
  // const [product, setProduct] = useState({});

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`);
  //     setProduct(data);
  //   };

  //   fetchProduct();
  // }, [productId]);

  const { id: productId } = useParams();
  const { data: product, isLoading, e } = useGetProductQuery(productId);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : e ? (
        <Message variant="danger">{e?.data?.message || e.error}</Message>
      ) : (
        <>
          <Container>
            <LinkContainer to="/">
              <Button className="my-2" variant="outline-secondary">
                Go Back
              </Button>
            </LinkContainer>
            <Row>
              <Col sm={5}>
                <Image src={product.image} fluid />
              </Col>
              <Col sm={4}>
                <ListGroup>
                  <ListGroup.Item>
                    <h4>{product.name}</h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price {product.price}$</ListGroup.Item>
                  <ListGroup.Item>{product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={3}>
                <ListGroup>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Status:{" "}
                    {product.countInStock === 0 ? "Out Of Stock" : "Available"}
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (c) => (
                                <option key={c + 1} value={c + 1}>
                                  {c + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      variant="secondary"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default ProductDetailsScreen;
