import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';

import { Button, Col, Row } from 'react-bootstrap';




function FlexibleNetworks(props) {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const [provider, setProvider] = useState([]);
    const [ProviderData, setProviderdata] = useState([]);
    const [customerlist, setCustomerlist] = useState([]);



    const [tableData, settableData] = useState([]);


    const [Flexiblenetwork, SetFlexibleNetwork] = useState([]);










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
        // fillProviderData();
    }, [ProviderData]);





    return (
        <>


        
            <div className="dashboard-content clearfix">

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Provider Data</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Flixible Network</a></li>
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



                <Row>
                <Col>
                    <form >
                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <small>Search Network ID/Name</small>
                                            <input type="text" onKeyUp={(e) => searchCustomer(e)} className="form-control" placeholder='Start typing Network ID or Name' {...register("customerid")} />
                                            {/* {errors.customerid && <span><p className='notvalid'>This field is required</p></span>} */}
                                        </div>
                                    </div>
                                    {/* <div className="col-md-4 mb-3">
                                        <div className="form-group">
                                            <small>Customer Name</small>
                                            <input type="text" className="form-control" placeholder='Enter Customer Name to search' {...register("customername")} />
                                        </div>
                                    </div>
                                    <div className="col-md-2 mb-2">
                                        <div className="form-group">
                                            <small>&nbsp;</small><br />
                                            <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: "100%", fontSize: "12px" }} >Search</button>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </form>
                </Col>
            </Row>



            <Row>
                <Col>
                    {/* {customerlist.length > 0 ? */}
                        <CustomerTable customers={customerlist} />
                        {/* : ''} */}
                </Col>
            </Row>


              

<SearchFlexibleNetwork />


                 {/* <div className="data" style={{ display: '' }} >
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">

                        <Link to="network" className={'nav-link' + (currentpath == 'network' ? ' active' : '')}>NetWork</Link>
                        <Link to="rules" className={'nav-link' + (currentpath == 'rules' ? ' active' : '')}>Rules</Link>

                    </div>
                    <div className="tab-content" id="nav-tabContent">


                        <Outlet context={[Flexiblenetwork, SetFlexibleNetwork]} />



                        <div className="tab-pane fade" id="Providers" role="tabpanel" aria-labelledby="nav-profile-tab">

                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5 className="mb-2">Providers within Network</h5>
                                        </div>
                                        <div className="col-md-12">


                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Effective Date</th>
                                                        <th>Termination Date</th>
                                                        <th>Price Schedule</th>
                                                        <th>Denied</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>ANP0005</td>
                                                        <td>Mangrove Cay</td>
                                                        <td>2010-09-09</td>
                                                        <td>9999-12-31</td>
                                                        <td>--</td>
                                                        <td>No</td>
                                                    </tr>
                                                    <tr>
                                                        <td>ANP0005</td>
                                                        <td>Mangrove Cay</td>
                                                        <td>2010-09-09</td>
                                                        <td>9999-12-31</td>
                                                        <td>--</td>
                                                        <td>No</td>
                                                    </tr>
                                                    <tr>
                                                        <td>ANP0005</td>
                                                        <td>Mangrove Cay</td>
                                                        <td>2010-09-09</td>
                                                        <td>9999-12-31</td>
                                                        <td>--</td>
                                                        <td>No</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <small>Provider ID</small>
                                                <input type="text" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <small>Price Schedule</small>
                                                <input type="text" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group mb-3 mt-4">
                                                <small>&nbsp;</small>
                                                <input type="checkbox" id="male" className="d-none" />
                                                <label for="male">Parcipation Denied</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <small>Effective Date</small>
                                                <input type="date" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <small>Termination Date</small>
                                                <input type="date" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                            </div>
                                        </div>
                                        <div className="clearfix mb-2"></div>

                                        <div className="col-md-6 ms-auto text-end mb-3">
                                            <a href="" className="btn btn-danger">Clear</a>&nbsp;&nbsp;
                                            <a href="provider-search.html" className="btn btn-info">Add to List</a>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 float-end">
                            </div>
                        </div>
                    </div>

                </div>  */}

<Row>
                    <Col md="3">
                        <FlexibleNetworkList />
                    </Col>

                    <Col md="9">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">

                            <Link to="network" className={'nav-link' + (currentpath == 'network' ? ' active' : '')}>NetWork</Link>
                            <Link to="rules" className={'nav-link' + (currentpath == 'rules' ? ' active' : '')}>Rules</Link>

                        </div>
                        <div className="tab-content" id="nav-tabContent">

                            <Outlet context={[Flexiblenetwork, SetFlexibleNetwork]} />
                        </div>

                    </Col>
                </Row>


            </div>


            <Footer />
        </>
    )
}

function SearchFlexibleNetwork() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Flexible NetWork </small>
                                <input type="text" className="form-control" placeholder='Start typing flexible network id/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function FlexibleNetworkList() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Flexible Network List </h5>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th> ID</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




function CustomerTable(props) {

    // const getCustomer = (customerid) => {
    //     // console.log(customerid);
    //     props.getCustomer(customerid);
    // }

    const CustomerList = [];
    // for (let i = 0; i < props.customers.length; i++) {
    //     CustomerList.push(<Cutomer customer={props.customers[i]} getCustomer={getCustomer} />);
    // }

    if (props.customers.length > 0) {
        for (let i = 0; i < props.customers.length; i++) {
            CustomerList.push(<Cutomer customer={props.customers[i]} />);
        }
    } else {
        CustomerList.push(<NoReacords/>);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">Flexible Network List</h5>
                        </div>
                        <div style={{    height: '400px', overflowY: 'scroll'}}>
                        <table className="table  table-bordered" style={{position:'relative'}}>
                            <thead className='stickt-thead'>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {CustomerList}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

function NoReacords(params) {
    return (
        <>
            <tr style={{padding: '10px', color:'red'}}><td colspan="7">No Records Matches..!</td></tr>
        </>
    )
}


function Cutomer(props) {
    return (
        <>
            <tr>
                <td>{props.customer.customer_id}</td>
                <td>{props.customer.customer_name}</td>
                <td><Button variant="primary" onClick={() => props.getCustomer(props.customer.customer_id)}>View</Button></td>
            </tr>
        </>
    )
}


function RulesRow(props) {

    const currentpath = location.pathname.split('/').pop();

    const [display, setDisplay] = useState('');


    const [show, setShow] = useState(false);


    const handleshow = (e) => {
        setDisplay('show');

        // console.log(display);


    }

    const deleteRow = (e) => {
        alert(e.currentTarget.value);


    }

    return (



        <>



            <tr>
                <td>{props.datar.net_rule_id}</td>
                <td>{props.datar.effective_date}</td>
                <td>{props.datar.termination_date}</td>
                <td>{props.datar.provider_chain}</td>
                <td>{props.datar.state}</td>
                <td>{props.datar.country}</td>
                <td>{props.datar.zip_code}</td>
                <td>{props.datar.area_code}</td>
                <td><button onClick={deleteRow} value={props.datar.net_rule_id} className='btn btn-sm btn-warning'><i className='fa fa-trash-alt'></i></button></td>







            </tr>
        </>
    )
}




function RulesResults(props) {

    var myData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        myData.push(<RulesRow datar={props.typedata[index]}
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
                                <th>Rules ID</th>
                                <th>Effective Date</th>
                                <th>Termination Date</th>
                                <th>Chain ID</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Zip Code</th>
                                <th>Area Code</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myData}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )




}

export function Networks(props) {


    const { register, handleSubmit, formState: { errors } } = useForm();

    const [Flexiblenetwork, SetFlexibleNetwork] = useOutletContext();

    const onsubmit = (data) => {




        const id = Flexiblenetwork;
        id['networkdata'] = data;
        SetFlexibleNetwork(id);
        console.log(data);


    }
    return (
        <>

            <form onSubmit={handleSubmit(onsubmit)}>
                <div class="card mt-3 mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="row">
                                    <div class="col-md-12">
                                        <h5 class="mb-2">Network</h5>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>Network ID</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>Network Name</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <h5 class="mb-2">Pricing</h5>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <small>Price Schedule Override</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                                            <a href=""><span class="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <h5 class="mb-2">Formulary Exceptions</h5>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>By GPI List</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                                            <a href=""><span class="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>By BDC List</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                                            <a href=""><span class="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <h5 class="mb-2">Communication Charges</h5>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>Paid/Accepted</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>Reject/Reversal</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="" required="" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="row">
                                    <div class="col-md-12">
                                        <h5 class="mb-2">Rx Limitations</h5>
                                    </div>

                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <small>Rx Quantity</small>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <input type="text" class="form-control" name="" id="" placeholder="Minimum" required="" />
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <small>Days Supply</small>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <input type="text" class="form-control" name="" id="" placeholder="Minimum" required="" />
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <small>Retail Fills</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <small>Fills</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <small>Starter Dose Date</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <small>Starter Dose Bypass Days</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                        </div>
                                    </div>
                                    <div class="col-md-12 mb-3">
                                        <div class="form-group">
                                            <small>St. Dose Maint. Bypass Days</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="Maximum" required="" />
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </form>


        </>
    )
}


export function Rules(props) {


    const { register, handleSubmit, formState: { errors } } = useForm();




    const [rulesData, setRulesData] = useState([]);



    useEffect(() => {
    }, [rulesData]);

    const onSubmit = data => {

        setRulesData([data]);
        console.log(data);


    }

    const clearForm = () => {
        document.getElementById("rulesform").reset();
    }



    return (
        <>


            <form key={1} id="rulesform" onSubmit={handleSubmit(onSubmit)}>

                <div class="card mt-3 mb-3">

                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h5 class="mb-2">Providers within Network</h5>
                            </div>
                            {/* <div class="col-md-12">
                                            <table class="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Rules ID</th>
                                                        <th>Effective Date</th>
                                                        <th>Termination Date</th>
                                                        <th>Chain ID</th>
                                                        <th>State</th>
                                                        <th>Country</th>
                                                        <th>Zip Code</th>
                                                        <th>Area Code</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>ANP0005</td>
                                                        <td>2010-09-09</td>
                                                        <td>9999-12-31</td>
                                                        <td>Jadep</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                    </tr>
                                                    <tr>
                                                        <td>ANP0005</td>
                                                        <td>2010-09-09</td>
                                                        <td>9999-12-31</td>
                                                        <td>Jadep</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                        <td>--</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div> */}

                            <div class="col-md-3">
                                <div class="form-group mb-3">
                                    <small>Net Rule ID</small>
                                    <input type="text" class="form-control" name="net_rule_id" {...register('net_rule_id', {
                                        required: true,
                                    })} placeholder="Enter Customer ID" id="" required="" />
                                    {errors.net_rule_id?.type === 'required' && <p role="alert" className="notvalid"> Net Rule ID is  required</p>}

                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group mb-3">
                                    <small>Effective Date</small>
                                    <input type="date" class="form-control" name="effective_date" {...register('effective_date', {
                                        required: true,
                                    })} placeholder="Enter Customer ID" id="" required="" />
                                    {errors.effective_date?.type === 'required' && <p role="alert" className="notvalid"> Effective Date is  required</p>}

                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group mb-3">
                                    <small>Termination Date</small>
                                    <input type="date" class="form-control" name="termination_date" {...register('termination_date', {
                                        required: true,
                                    })} placeholder="Enter Customer ID" id="" required="" />
                                    {errors.termination_date?.type === 'required' && <p role="alert" className="notvalid"> Termination Date is  required</p>}

                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group mb-3">
                                    <small>Provider Chain</small>
                                    <input type="text" class="form-control" name="provider_chain" {...register('provider_chain', {
                                        required: true,
                                    })} placeholder="Enter Customer ID" id="" required="" />
                                    {errors.provider_chain?.type === 'required' && <p role="alert" className="notvalid"> Provider Chain is  required</p>}

                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group mb-3">
                                    <small>State</small>
                                    <select class="form-select" name="state" {...register('state', {
                                        required: true,
                                    })}>
                                        <option value="">Select State</option>
                                        <option value="1">option 1</option>
                                        <option value="2">option 2</option>
                                        <option value="3">option 3</option>
                                    </select>
                                    {errors.state?.type === 'required' && <p role="alert" className="notvalid"> State is  required</p>}

                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group mb-3">
                                    <small>Country</small>
                                    <select class="form-select" name="country" {...register('country', {
                                        required: true,
                                    })}>
                                        <option value="">Select Country</option>
                                        <option value="1">option 1</option>
                                        <option value="2">option 2</option>
                                        <option value="3">option 3</option>
                                    </select>
                                    {errors.country?.type === 'required' && <p role="alert" className="notvalid"> Country is  required</p>}

                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group mb-3">
                                    <small>Zip Code</small>
                                    <input type="text" class="form-control" name="zip_code" {...register('zip_code', {
                                        required: true,
                                    })} placeholder="Enter Customer ID" id="" required="" />
                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                    {errors.zip_code?.type === 'required' && <p role="alert" className="notvalid"> Zipcode  is  required</p>}

                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group mb-3">
                                    <small>Area Code</small>
                                    <input type="text" class="form-control" name="area_code" {...register('area_code', {
                                        required: true,
                                    })} placeholder="Enter Customer ID" id="" required="" />
                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                    {errors.area_code?.type === 'required' && <p role="alert" className="notvalid"> Area Code  is  required</p>}

                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group mb-3">
                                    <small>Exchange</small>
                                    <input type="text" class="form-control" name="exchange" {...register('exchange', {
                                        required: true,
                                    })} placeholder="Enter Customer ID" id="" required="" />
                                    {errors.exchange?.type === 'required' && <p role="alert" className="notvalid"> Exchange is  required</p>}

                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                </div>
                            </div>


                            <div class="col-md-3">
                                <div class="form-group mb-3 mt-4">
                                    <small>&nbsp;</small>
                                    <input type="checkbox" id="male" name="exclusion" {...register('exclusion', {
                                        required: true,
                                    })} class="d-none" />

                                    <label htmlFor="male">Exclusion</label>
                                    {errors.exclusion?.type === 'required' && <p role="alert" className="notvalid"> Exclusion  is  required</p>}

                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group mb-3">
                                    <small>Price Schedule Override</small>
                                    <input type="text" class="form-control" name="price_schedule_override" {...register('price_schedule_override', {
                                        required: true,
                                    })} placeholder="Enter Customer ID" id="" required="" />
                                    {errors.price_schedule_override?.type === 'required' && <p role="alert" className="notvalid"> Price Schedule Override is  required</p>}

                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group mb-3">
                                    <small>Provider Status</small>
                                    <select class="form-select" name="provider_status" {...register('provider_status', {
                                        required: true,
                                    })}>
                                        <option value="">Select Country</option>
                                        <option value="1">option 1</option>
                                        <option value="2">option 2</option>
                                        <option value="3">option 3</option>
                                    </select>
                                    {errors.provider_status?.type === 'required' && <p role="alert" className="notvalid"> Provider Status is  required</p>}

                                </div>
                            </div>

                            <div class="clearfix mb-2"></div>

                            <div class="col-md-6 ms-auto text-end mb-3">
                                <a onClick={clearForm} class="btn btn-danger">Clear</a>&nbsp;&nbsp;
                                <button type="submit" class="btn btn-info">Add to List</button>
                            </div>


                        </div>
                        {/* {rulesData.length > 0 ? */}
                        <RulesResults typedata={rulesData} />
                        {/* : ''} */}
                    </div>


                </div>
            </form>





        </>
    )

}


function ProvidersResults(props) {



    var providersData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        providersData.push(<ProvidersRow datar={props.typedata[index]}
        />);
    }




    return (
        <>


            <div className="card mt-3 mb-3 data" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-
bordered">
                                <thead>
                                    <tr>
                                        <th>Provider ID</th>
                                        <th>Price Schedule</th>
                                        <th>Parcipation Denied</th>
                                        <th>Effective Date</th>
                                        <th>Termination Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {providersData}

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


function ProvidersRow(props) {

    const currentpath = location.pathname.split('/').pop();

    const [display, setDisplay] = useState('');


    const [show, setShow] = useState(false);


    const handleshow = (e) => {
        setDisplay('show');

        // console.log(display);


    }

    const deleteRow = (e) => {
        alert(e.currentTarget.value);


    }

    return (



        <>



            <tr>
                <td>{props.datar.provider_id}</td>
                <td>{props.datar.price_schedule}</td>
                <td>{props.datar.participation_denied}</td>
                <td>{props.datar.effective_date}</td>
                <td>{props.datar.termination_date}</td>
                <td><button onClick={deleteRow} value={props.datar.provider_id} class="btn btn-sm btn-warning"><i class="fa fa-trash-alt"></i></button></td>



            </tr>
        </>
    )
}


export default FlexibleNetworks;