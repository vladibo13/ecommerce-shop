import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
// import products from "../products";
import Product from "../components/Product";
import axios from "axios";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  // ------------request without redux----------
  // const [products, setProducts] = useState([{ id: 1, name: "test" }]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("/api/products");
  //     console.log(data);
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);

  const { data: products, isLoading, e } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : e ? (
        <Message variant="danger">{e?.data?.message || e.error}</Message>
      ) : (
        <>
          <h2 className="my-2">Latest Products</h2>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
