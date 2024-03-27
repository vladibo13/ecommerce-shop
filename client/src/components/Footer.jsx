import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Row>
        <Col className="text-center mt-3 py-2 bg-body-tertiary ">
          <p>eCommerce Shop &copy; {currentYear}</p>
        </Col>
      </Row>
    </footer>
  );
};
export default Footer;
