import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useGetOrderByIdQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Col, Image, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderByIdQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const [deliverOrder, { isLoading: isLoadingDeliver }] =
    useDeliverOrderMutation(orderId);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  async function onApproveTest() {
    try {
      await payOrder({ orderId, details: { payer: {} } });
      refetch();

      toast.success("Order is paid");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (e) {
      toast.error(e?.data?.message || e.message);
    }
  };

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <>
          <h2 className="mb-3">Order : {order._id}</h2>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h5>Shipping</h5>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    {order.user.email}
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      delivered at {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">not delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="mt-2">
                  <h5>Payment Method</h5>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">paid at {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">not paid</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="mt-2">
                  <h5 className="mb-3">Order Items: </h5>
                  {!order.orderItems.length ? (
                    <Message>no items</Message>
                  ) : (
                    <>
                      {order.orderItems.map((item, index) => (
                        <Row key={index}>
                          <Col md={2}>
                            <Image fluid src={item.image} />
                          </Col>
                          <Col md={6}>
                            <Link to>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      ))}
                    </>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>
                  <h5>Order Summary </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p className="fw-light">Items Price: {order.itemsPrice}</p>
                  <p className="fw-light">
                    Shipping Price: {order.shippingPrice}
                  </p>
                  <p className="fw-light">Tax Price: {order.taxPrice}</p>
                  <p className="fw-light">Total Price: {order.totalPrice}</p>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}

                    {isPending ? (
                      <Loader />
                    ) : (
                      <div>
                        {/* THIS BUTTON IS FOR TESTING */}
                        <Button
                          style={{ marginBottom: "10px" }}
                          onClick={onApproveTest}
                        >
                          Test Pay Order
                        </Button>

                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      </div>
                    )}
                  </ListGroup.Item>
                )}
                {isLoadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
