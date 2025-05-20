import AdminLayout from "../../layout/AdminLayout"
import Table from "../../components/shared/Table"
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import {transformImage} from "../../lib/features"
import { useFetchData } from "6pp";
import { useErrors } from "../../hooks/hook";
import { server } from "../../constants/configure";





const columns = [
  {
field: "id",
headernamee: "ID",
headerClassnamee: "table-header",
width: 200,
},


{
  field: "avatar",
  headernamee: "Avatar",
  headerClassnamee: "table-header",
  width: 150,
  renderCell: (params) => (
  <Avatar alt={params.row.namee} 
  src={params.row.avatar} />
  ),
  },

  {
    field: "namee",
    headernamee: "namee",
    headerClassnamee: "table-header",
    width: 200,
  },
  {
    field: "username",
    headernamee: "username",
    headerClassnamee: "table-header",
    width: 200,
  },

  {
    field: "friends",
    headernamee: "Friends",
    headerClassnamee: "table-header",
    width: 300,
  },

  {
    field: "group",
    headernamee: "Group",
    headerClassnamee: "table-header",
    width: 300,
  },



];


const UserManagement = () => {
 const { loading, data, error } = useFetchData({
      url: `${server}/api/v1/admin/users`,
      key: "dashboard-users",
      credentials: "include", // ✅ include cookies for authentication
    });
    console.log("users" , data);
  
    useErrors([
      {
        isError: error,
        error: error,
      },
    ]);
    const stats = data?.stats;
  const { id } = useParams();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if(data) {
    setRows(
      data.users.map((i) => (
      {
       ...i, id: i._id, avatar: transformImage(i.avatar, 50)
      }
    )))
  }}, [data])
  return (
  <AdminLayout>
    {
  loading ? 
  (<Skeleton height={"100vh"} /> ) : (
    <Table heading={"All Users"} columns={columns} rows={rows} />
  )
}

  </AdminLayout>
  );
}

export default UserManagement
