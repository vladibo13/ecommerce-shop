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
import Rating from "../components/Rating";
import { LinkContainer } from "react-router-bootstrap";
import {
  useCreateReviewMutation,
  useGetProductQuery,
} from "../slices/productsApiSlice";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    refetch,
    isLoading,
    e,
  } = useGetProductQuery(productId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createReview, { isLoadingCreateReview }] = useCreateReviewMutation();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("review added");
      setRating("");
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
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
            <Meta title={product.name} />
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
            <Row>
              <Col className="mt-5" md={9}>
                <Message variant="light">Reviews</Message>
                <ListGroup>
                  {!product.reviews.length ? (
                    <p>No Reviews</p>
                  ) : isLoadingCreateReview ? (
                    <Loader />
                  ) : (
                    <>
                      {product.reviews.map((p) => (
                        <ListGroup.Item>
                          <strong>{p.name}</strong>
                          <Rating value={p.rating} />
                          <p>{p.createdAt.substring(0, 10)}</p>
                          <p>{p.comment}</p>
                        </ListGroup.Item>
                      ))}
                    </>
                  )}
                  <span className="border-bottom shadow my-3"></span>
                  <Form>
                    <Form.Group>
                      <Message variant="light">Write a Customer Review</Message>
                      <Form.Label>Rating</Form.Label>
                      <Form.Select
                        aria-label="reviews"
                        required
                        value={rating}
                        onChange={(e) => {
                          setRating(e.target.value);
                        }}
                      >
                        <option>Select Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="comment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary" onClick={onSubmit}>
                      Submit
                    </Button>
                  </Form>
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
