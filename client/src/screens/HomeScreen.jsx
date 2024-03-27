import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
// import products from "../products";
import Product from "../components/Product";
import axios from "axios";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

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
  const { pageNumber } = useParams();
  const { data, isLoading, e } = useGetProductsQuery(pageNumber);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : e ? (
        <Message variant="danger">{e?.data?.message || e.error}</Message>
      ) : !data.products.length ? (
        <p>No Products</p>
      ) : (
        <>
          <Meta title="eCommerceShop" />
          <h2 className="my-2">Latest Products</h2>
          <ProductCarousel />
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
