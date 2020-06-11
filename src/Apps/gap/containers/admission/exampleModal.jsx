import React, { useState, useEffect, useContext } from 'react'
import GlobalContext, { Info } from "../../../global/context";
import { TextFieldLine, Select } from '../../../../components/InputCustom'

const Addsejour = () => {

    const global = useContext(GlobalContext);
    const [inputs, setinput] = useState({
        debutDate: new Date(),
        finDate: new Date(),
        DebutHeure: new Date(),
        finHeure: new Date(),
    });

    function setdebutDate({ target: { value } }) { setinput({ ...inputs, debutDate: value }); }
    function setfinDate({ target: { value } }) { setinput({ ...inputs, finDate: value }); }
    function setdebutHeure({ target: { value } }) { setinput({ ...inputs, DebutHeure: value }); }
    function setfinHeure({ target: { value } }) { setinput({ ...inputs, finHeure: value }); }
    function settype({ target: { value } }) { setinput({ ...inputs, type: value }); }
    function setmedecin({ target: { value } }) { setinput({ ...inputs, medecin: value }); }
    function setgestionnaire({ target: { value } }) { setinput({ ...inputs, gestionnaire: value }); }
    function setorganisme({ target: { value } }) { setinput({ ...inputs, organisme: value }); }
    function setbeneficiaire({ target: { value } }) { setinput({ ...inputs, beneficiaire: value }); }
    function setassurePrinc({ target: { value } }) { setinput({ ...inputs, assurePrinc: value }); }
    function setmatriculeAssure({ target: { value } }) { setinput({ ...inputs, matriculeAssure: value }); }
    function setnumeroPEC({ target: { value } }) { setinput({ ...inputs, numeroPEC: value }); }
    function settaux({ target: { value } }) { setinput({ ...inputs, taux: value }); }

    return (
        <div className="row">
            <div className="FormAddejour Modal col-12 d-flex justify-content-center align-items-center">
                <div className="col-8 white d-flex flex-column" style={{ maxHeight: '80vh', height: "75vh" }}>
                    <div className="row" style={{ flex: 1 }}>
                        <div className="col-5 p-5 bg-light">
                            <b>Ajouter un nouveau sejour</b>
                            <small>Début du séjour</small>
                            <div className="row">
                                <TextFieldLine label="Date" type="date" onChange={setdebutDate} />
                                <TextFieldLine label="Heure" type="time" onChange={setdebutHeure} />
                            </div>
                            <small>Fin du séjour</small>
                            <div className="row">
                                <TextFieldLine label="Date" type="date" onChange={setfinDate} />
                                <TextFieldLine label="Heure" type="time" onChange={setfinHeure} />
                            </div>
                            <div className="row">
                                <Select label="Type de séjour" onChange={settype} options={[
                                    { value: "Consultation", label: "Consultation" },
                                    { value: "Urgence", label: "Urgence" },
                                    { value: "Hospitalisation", label: "Hospitalisation" },
                                    { value: "Soins", label: "Soins" },
                                    { value: "Biologie", label: "Biologie" },
                                    { value: "Imagerie", label: "Imagerie" },
                                ]} />
                            </div>
                        </div>
                        <div className="d-flex flex-column-reverse blue col-7 p-3">
                            <div className="col-12 d-flex justify-content-end" style={{ flex: 'none' }}>
                                <button className="btn btn-outline-secondary">Annuler</button>
                                <button className="btn white-text ml-2" style={{ backgroundColor: global.theme.primary }}>Valider</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Addsejour