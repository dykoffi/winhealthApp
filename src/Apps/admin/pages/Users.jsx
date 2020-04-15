import React, { useEffect } from "react";
import FormAddUser from "../containers/Users/FormAddUser";

const Users = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("Utilisateurs");
  });
  return (
    <div className="Users row p-5">
      <section className="col-3" id="statsUsers"></section>
      <section className="col-3" id="listUsers"></section>
      <section className="col-6" id="detailsUsers"></section>
      <FormAddUser />
    </div>
  );
};

export default Users;
