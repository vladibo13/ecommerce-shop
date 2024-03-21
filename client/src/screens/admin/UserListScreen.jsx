import React from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import { FcApproval } from "react-icons/fc";
import { TiDeleteOutline } from "react-icons/ti";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const deleteUserHandler = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      refetch();
      toast.success("user deleted");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger"> {error?.data?.message || error.error}</Message>
  ) : (
    <Table className="mt-5" striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? <FcApproval /> : <TiDeleteOutline />}</td>
            <td>
              <LinkContainer to={`/admin/user/${user._id}/edit`}>
                <Button variant="light">
                  <CiEdit />
                </Button>
              </LinkContainer>

              <Button
                variant="light"
                onClick={() => deleteUserHandler(user._id)}
              >
                <RiDeleteBin2Fill />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserListScreen;
