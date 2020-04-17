import React, { useEffect } from "react";
import LoadingPoint from "../../../components/LoadingPoint";

const Users = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("Utilisateurs");
  });
  return (
    <div className="Users row p-5 text-center d-flex flex-column justify-content-center align-items-center">
      <h6 className="lead">Page en consruction (35%)</h6>
      <LoadingPoint />
    </div>
  );
};

export default Users;
