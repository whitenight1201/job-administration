import { useState } from "react";
import { IUser } from "../../types/user";
import { Pagination } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DELETE_USER, GET_USERS } from "../../graphql";
import { QUERY_KEY } from "../../graphql/constants/queryKeys";
import { toastNotification } from "../Notification";
import { GraphQLClient, Variables } from "graphql-request";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";

const Table = () => {
  const token = localStorage.getItem("token");
  const client = new GraphQLClient("http://localhost:5000/graphql", {
    headers: {
      Authorization: `${token}`,
    },
  });

  const { data }: any = useQuery(QUERY_KEY.userlist, () =>
    client.request(GET_USERS)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers =
    data?.users?.slice(indexOfFirstUser, indexOfLastUser) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const queryClient = useQueryClient();
  const deleteUser = useMutation(
    (variables: Variables) => {
      return client.request(DELETE_USER, variables);
    },
    {
      onSuccess: async () => {
        toastNotification("Delete Success", "success", 3000);
        await queryClient.refetchQueries("userlist");
      },
      onError: (err: any) => {
        err.response.errors.forEach((error: any) =>
          toastNotification(error.message, "error", 3000)
        );
      },
    }
  );

  const handleOnClick = async (id: string) => {
    await deleteUser.mutateAsync({ id });
  };
  const userSetting = async (id: string) => {
    const selectedUser = data?.users?.find((user: IUser) => user.id === id);
    if (selectedUser) {
      // TODO user setting
    } else {
      return;
    }
  };
  return (
    <div className="rounded-sm border px-5 pt-6 pb-2.5 shadow-default border-strokedark bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full ">
        <table className="w-full table-auto">
          <thead>
            <tr className=" text-left bg-meta-4">
              <th className="min-w-[120px] py-4 px-4 font-medium  text-black">
                NO
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium  text-black ">
                User
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium  text-black">
                Email Address
              </th>

              <th className="py-4 px-4 font-medium  text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((subAllUser: IUser, key: number) => (
              <tr key={key}>
                <td className="border-b  py-5 px-4 border-strokedark">
                  <p className="text-black">{key + 1}</p>
                </td>
                <td className="border-b  py-5 px-4 border-strokedark">
                  <p className="text-black">{subAllUser.name}</p>
                </td>
                <td className="border-b  py-5 px-4 border-strokedark">
                  <p className="text-black">{subAllUser.email}</p>
                </td>
                <td className="border-b  py-5 px-4 border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => userSetting(subAllUser.id)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => handleOnClick(subAllUser.id)}
                    >
                      <DeleteOutlinedIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          className="mt-6"
          current={currentPage}
          pageSize={usersPerPage}
          total={data?.users?.length || 0}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Table;
// function refetchQueries() {
//   throw new Error("Function not implemented.");
// }
