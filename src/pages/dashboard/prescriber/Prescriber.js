import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Prescriber() {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [provider, setProvider] = useState([]);
    const [ProviderData, setProviderdata] = useState([]);
   






    const fillProviderData = (e) => {

        // API  
        // var staticProviderType =; 
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











function TraditionalResults(props) {




    var networkData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        networkData.push(<TraditionalTypeRow datar={props.typedata[index]}
        />);
    }




    return (
        <>

            <form>

            </form>
            <div className="card mt-3 mb-3 data" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-
bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price Schedule</th>
                                        <th>Denied</th>
                                        <th>Effective Date</th>
                                        <th>Termination Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {networkData}

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-3 ms-auto text-end">
                            {/* <button className="btn  btn-info" data-bs-
toggle="modal" data-bs-target="#exampleModal"> 
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button> */}
                            {/* <button className="btn  btn-info" onClick={e =>
                                handleShow()}>
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* <Add show={show} handleClose={handleClose()}/> */}
            {/* <Add props={modalData} /> */}
        </>
    )
}


function FlexibleResults(props) {



    var networkData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        networkData.push(<FlexibleTypeRow datar={props.typedata[index]}
        />);
    }




    return (
        <>

            <form>

            </form>
            <div className="card mt-3 mb-3 data" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-
bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price Schedule</th>
                                        {/* <th>Denied</th> */}
                                        <th>Inclusion By</th>
                                        <th>Exclusion By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {networkData}

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-3 ms-auto text-end">
                            {/* <button className="btn  btn-info" data-bs-
toggle="modal" data-bs-target="#exampleModal"> 
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button> */}
                            {/* <button className="btn  btn-info" onClick={e =>
                                handleShow()}>
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button> */}

                        </div>
                    </div>
                </div>
            </div>

            {/* <Add show={show} handleClose={handleClose()}/> */}
            {/* <Add props={modalData} /> */}
        </>
    )
}

function TraditionalTypeRow(props) {


    const currentpath = location.pathname.split('/').pop();
    const ischecked = true;


    const deleteRow = (e) => {

        alert(e.currentTarget.value);

    }

    return (
        <>
            <tr>
                <td>{props.datar.traditional_id}</td>
                <td>{props.datar.network_name}</td>
                <td>{props.datar.price_schedule}</td>
                {props.datar.denied == ischecked ? (
                    <td>Yes</td>
                ) : (

                    <td>No</td>

                )}
                <td>{props.datar.effective_date}</td>
                <td>{props.datar.termination_date}</td>
                <td><button onClick={deleteRow} value={props.datar.traditional_id} className='btn btn-sm btn-warning'><i className='fa fa-trash-alt'></i></button></td>



            </tr>
        </>
    )
}

function FlexibleTypeRow(props) {


    const currentpath = location.pathname.split('/').pop();
    const ischecked = true;


    const flexdeleteRow = (e) => {

        alert(e.currentTarget.value);

    }

    return (
        <>
            <tr>
                <td>{props.datar.flexible_network_id}</td>
                <td>{props.datar.flexible_network_name}</td>
                <td>{props.datar.flexible_price_schedule}</td>

                <td>{props.datar.inclusion_by}</td>
                <td>{props.datar.exclusion_by}</td>
                <td><button onClick={flexdeleteRow} value={props.datar.flexible_network_id} className='btn btn-sm btn-warning'><i className='fa fa-trash-alt'></i></button></td>



            </tr>
        </>
    )
}


function PrescriberAdd(props) {
    return (
        <>
        <form>


        <Modal dialogClassName="modal-lg"
        aria-labelledby="example-custom-modal-styling-title" show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Prescriber Data </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-12 mb-2">
                                    <h5>Prescriber</h5>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <div class="form-group">
                                        <small>ID</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="1120" readonly=""/>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <div class="form-group">
                                        <small>Prescriber Groupoing ID</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" readonly=""/>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <div class="form-group">
                                        <small>Last Name</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" readonly=""/>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <div class="form-group">
                                        <small>First Name</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" readonly=""/>
                                    </div>
                                </div>
                                
                                <div class="col-md-4 mb-2">
                                    <div class="form-group">
                                        <small>Specility</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" readonly=""/>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-2">
                                    <div class="form-group">
                                        <small>Title</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" readonly=""/>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-2">
                                    <div class="form-group">
                                        <small>License</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" readonly=""/>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-2">
                                    <div class="form-group">
                                        <small>DEA</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" readonly=""/>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-2">
                                    <div class="form-group">
                                        <small>Spin Number</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" readonly=""/>
                                    </div>
                                </div>
                                <div class="col-md-4 mb-2">
                                    <div class="form-group">
                                        <small>Medical Group</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" readonly=""/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-12 mb-2">
                                    <h5>Address &amp; Phone Number</h5>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <div class="form-group">
                                        <small>Address</small>
                                        <textarea class="form-control" rows="1"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <div class="form-group">
                                        <small>City</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <div class="form-group">
                                        <small>State</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <div class="form-group">
                                        <small>Country</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                    </div>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <div class="form-group">
                                        <small>Zip Code</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <div class="form-group">
                                        <small>Phone</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <button type="button" class="btn btn-info">Add Prescriber </button>
                </Modal.Footer>
            </Modal>

        </form>
           
        </>
    )
}


export default Prescriber;