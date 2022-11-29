import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Prescriber() {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [provider, setProvider] = useState([]);
    const [ProviderData, setProviderdata] = useState([]);
   
    const fillProviderData = (e) => {

        var arr = [
            { id: '123', name: 'Mahesh', storenumber: '101', chain: 'Hyderabad' },
            { id: '1234', name: 'Mahesh', storenumber: '101', chain: 'Hyderabad' },

        ];

        setProviderdata(arr);
    }


    useEffect(() => {
    }, [ProviderData]);



    const clearForm = () => {
        document.getElementById("search-form").reset();
    }



    return (
        <>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Provider Data</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Provider</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="breadcrum ">
                        <ul>
                            <li className="float-end m-0"><a href="">Page Hint <i className="fa-solid fa-lightbulb"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="card mt-3 mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="mb-2">Prescriber Search</h5>
                        </div>
                        <div class="col-md-3 mb-3">
                            <div class="form-group">
                                <small>Phys. Grouping ID</small>
                                <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <div class="form-group">
                                <small>Prescriber ID</small>
                                <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <div class="form-group">
                                <small>Last Name</small>
                                <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <div class="form-group">
                                <small>First Name</small>
                                <input type="date" class="form-control" name="" id="" placeholder="" required="" />
                            </div>
                        </div>

                        <div class="col-md-6 ms-auto text-end mb-3">
                            <button href="" class="btn btn-secondary">Cancel</button>&nbsp;&nbsp;
                            <button href="" class="btn btn-danger">Select</button>&nbsp;&nbsp;
                            <button href="" class="btn btn-warning ">Clear</button>&nbsp;&nbsp;
                            <button onClick={e =>
                                fillProviderData()} className="btn btn-info">Search</button>                                </div>

                    </div>
                </div>
            </div>



            {ProviderData.length > 0 ?
                <Results typedata={ProviderData} />
                : ''}







            <Footer />
        </>
    );
}


function ProviderTypeRow(props) {

    const currentpath = location.pathname.split('/').pop();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
         <PrescriberAdd show={show} handleClose={handleClose} />

            <tr>
                <td>{props.datar.id}</td>
                <td>{props.datar.name}</td>
                <td>{props.datar.storenumber}</td>
                <td>{props.datar.chain}</td>
                <td><button className="btn btn-sm btn-info" onClick={e => handleShow()} ><i className="fa fa-eye"></i> View</button></td>
               


            </tr>


        </>
    )
}


function Results(props) {


    var ProviderData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        ProviderData.push(<ProviderTypeRow datar={props.typedata[index]}
        />);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let modalData = {
        show: 'true',
        hide: 'false'
    }


    return (
        <>

            <div className="row">
                <div className="col-md-12 mb-3">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>prescriber ID</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Group ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ProviderData}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
 
function SearchPrescriber()
{
    return(
        <>
          <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <small>Prescriber Data </small>
                                    <input type="text" className="form-control" placeholder='Start typing phys. grouping ID/ prescriber ID/ last name/ first name to search'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

function PrescriberList()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Prescriber List</h5>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Phys. Grouping ID</th>
                                        <th>Prescriber ID</th>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-8">
                           <PrescriberForm />
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}

function PrescriberForm()
{
    return(
        <>
                    {/* <div className="data col-md-12" >
                    <div className="card mt-3 mb-3">
                        <div className="card-body">                                */}
                        <div className="col-md-12">
                        <h5 className="mb-2">Prescriber</h5>
                    </div>
                                <div className="row">                               
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="1120" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Prescriber Grouping ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Last Name</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>First Name</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>Speciality</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>Title</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>License</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>DEA</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>Spin Number</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>Medical Group</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>                                
                            </div>
                            <hr/>
                            {/* </div>
                            </div>
                            </div> */}

<div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Address & Phone Number</h5>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Address</small>
                                        <textarea className="form-control" rows="1"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>City</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>State</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Country</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Zip Code</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Phone</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
        </>
    )
}
