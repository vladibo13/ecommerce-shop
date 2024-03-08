import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Product = ({ product }) => {
  return (
    <Card className="my-2">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title as="h6">{product.name}</Card.Title>
        <Card.Text>{product.price}$</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
