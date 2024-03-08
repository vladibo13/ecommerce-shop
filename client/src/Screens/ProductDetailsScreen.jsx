import React from "react";
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import products from "../products";
import Rating from "../components/Rating";
import { LinkContainer } from "react-router-bootstrap";

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const product = products.find((p) => p._id === productId);
  return (
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
            <ListGroup.Item>
              <Button variant="secondary" disabled={product.countInStock === 0}>
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsScreen;
