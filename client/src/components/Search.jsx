import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form inline="true" onSubmit={submitHandler}>
      <Row>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Search"
            className=" mr-sm-2"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col xs="auto">
          <Button type="submit">Search</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;
