import Carousel from "react-bootstrap/Carousel";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel data-bs-theme="dark" className="my-3">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <div className="d-flex justify-content-center align-items-center">
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </Carousel.Caption>
            </Link>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
