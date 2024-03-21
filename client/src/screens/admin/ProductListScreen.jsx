import React from "react";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Row, Col, Button, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { LinkContainer } from "react-router-bootstrap";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: isLoadingCreateProduct }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: isLoadingDeleteProduct }] =
    useDeleteProductMutation();

  const createProductHandler = async (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to add product")) {
      try {
        await createProduct();
        refetch();
        toast.success("product added succesfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteProductHandler = async (productId) => {
    if (window.confirm("Are you sure you want to add product")) {
      try {
        await deleteProduct(productId).unwrap();
        refetch();
        toast.success("Product deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="my-3">
        <Col md={10}>
          <h5>Products</h5>
        </Col>
        <Col md={2}>
          <Button onClick={createProductHandler} variant="secondary">
            Create Product
          </Button>
        </Col>
      </Row>
      {isLoadingCreateProduct && <Loader />}
      {isLoadingDeleteProduct && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light">
                      <CiEdit />
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="light"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <RiDeleteBin2Fill />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
