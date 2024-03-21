import React from "react";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderScreenList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger"> {error?.data?.message || error.error}</Message>
  ) : (
    <Table className="mt-5" striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Date</th>
          <th>Total</th>
          <th>Paid</th>
          <th>Delivered</th>
          <th>Order Info</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr>
            <td>{order._id}</td>
            <td>{order.user?.name}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>{order.totalPrice}</td>
            <td>{order.isPaid ? "paid" : "not paid"}</td>
            <td>
              {order.isDelivered
                ? order.deliveredAt.substring(0, 10)
                : "not delivered"}
            </td>
            <td>
              <Link to={`/order/${order._id}`}>Order Info</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OrderScreenList;
