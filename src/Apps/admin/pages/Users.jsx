import React, { useEffect } from "react";
import LoadingPoint from "../../../components/LoadingPoint";
import FormAddUser from "../containers/Users/FormAddUser";

const Users = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("Utilisateurs");
  });
  return (
    <div className="Users row p-5 text-center d-flex justify-content-center">
     <section></section>
     <section></section>
     <section></section>
    </div>
  );
};

export default Users;
