import React from "react";

import DetailsPatient from "../../containers/admission/DetailsPatients";
import ListPatient from "../../containers/admission/ListPatients";

const Patients = () => {
 
  return (
    <div className="Patients row p-3">
      <section id="deatilsPatient" className="col-3">
        <ListPatient />
      </section>
      <section id="listPatient" className="col-4">
        <DetailsPatient />
      </section>
    </div>
  );
};

export default Patients;
