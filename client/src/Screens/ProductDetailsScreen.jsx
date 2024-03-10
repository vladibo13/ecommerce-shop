import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import products from "../products";
import Rating from "../components/Rating";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { useGetProductQuery } from "../slices/productsApiSlice";

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, e } = useGetProductQuery(productId);

  // request without redux
  // const [product, setProduct] = useState({});

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`);
  //     setProduct(data);
  //   };

  //   fetchProduct();
  // }, [productId]);

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : e ? (
        <div>{e?.data?.message || e.error}</div>
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
                  <ListGroup.Item>
                    <Button
                      variant="secondary"
                      disabled={product.countInStock === 0}
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
