import React, { useEffect } from "react";
import ListApp from "../containers/Logs/ListApp";
import StatsLog from "../containers/Logs/StatsLog";
import ListLogs from "../containers/Logs/ListLogs";
// import LoadingPoint from "../../../components/LoadingPoint";

const Logs = ({ sendTitle }) => {
  useEffect(() => {
    sendTitle("Logs");
  });
  return (
    <div className="Logs row p-3 d-flex justify-content-center">
      <section className="col-1" id="listapps">
        <ListApp />
      </section>
      <section className="col-7 ml-2">
        <ListLogs />
      </section>
      <section className="col-3" id="statslogs">
        <StatsLog />
      </section>
    </div>
  );
};

export default Logs;
