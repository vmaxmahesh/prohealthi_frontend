import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { Alert } from 'react-bootstrap';
import { Button, Col, Row } from 'react-bootstrap';




function TraditionalNetworks(props) {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();


    const [provider, setProvider] = useState([]);
    const [ProviderData, setProviderdata] = useState([]);

    const [tableData, settableData] = useState([]);

    const [traditionalnetwork, SetTraditionalNetwork] = useState([]);
    const [customerlist, setCustomerlist] = useState([]);

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
            <button onClick={e =>
                fillProviderData()} className="btn btn-info">Search</button>
            <div className="dashboard-content clearfix">

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Provider Data</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Treditional Network</a></li>
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

                <div className="col-md-12 mb-3">
                    {/* <h4 >Search Client</h4> */}
                    <SearchTraditionalNetwork />
                </div>

                {/* <div className="card mt-3 mb-3">
                    <div className="card-body" onClick={e =>
                        fillProviderData()}>

                        <div className="row">
                            <div className="col-md-12">

                                {ProviderData.length > 0 ?
                                    <TraditionalNetworkResults typedata={ProviderData} />
                                    : ''}
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>FreeDrug</td>
                                            <td>Free drug</td>
                                            <td><button type="submit" onClick={handleshow} className="btn btn-sm btn-info" id="show"><i className="fa fa-eye"></i> View</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> */}

                <Row>
                    <Col md="3">
                        <TraditionalNetworkList />
                    </Col>

                    <Col md="9">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">

                            <Link to="network" className={'nav-link' + (currentpath == 'network' ? ' active' : '')}>NetWork</Link>
                            <Link to="providers" className={'nav-link' + (currentpath == 'providers' ? ' active' : '')}>Providers</Link>

                        </div>
                        <div className="tab-content" id="nav-tabContent">

                            <Outlet context={[traditionalnetwork, SetTraditionalNetwork]} />
                        </div>

                    </Col>
                </Row>



                {/* <div className="data" style={{ display: '' }} >
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">

                        <Link to="network" className={'nav-link' + (currentpath == 'network' ? ' active' : '')}>NetWork</Link>
                        <Link to="providers" className={'nav-link' + (currentpath == 'providers' ? ' active' : '')}>Providers</Link>

                    </div>
                    <div className="tab-content" id="nav-tabContent">

                        <Outlet context={[traditionalnetwork, SetTraditionalNetwork]} /> */}

                        {/* const [traditionalnetwork, SetTraditionalNetwork] = useState([]); */}

                        {/* <div className="tab-pane fade" id="Providers" role="tabpanel" aria-labelledby="nav-profile-tab">

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
                                                <label htmlFor="male">Parcipation Denied</label>
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
                                            <a href="" className="btn btn-warning ">Remove From List</a>&nbsp;&nbsp;
                                            <a href="provider-search.html" className="btn btn-info">Add to List</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 float-end">
                                <a href="" className="btn btn-theme pt-2 pb-2" style="width: 100%">Next</a> *
                            </div>
                        </div> */}
                    {/* </div>
                </div>
            </div> */}
            <Footer />
            </div>
        </>
    )
}

function SearchTraditionalNetwork() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Traditional NetWork </small>
                                <input type="text" className="form-control" placeholder='Start typing traditional network id/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function TraditionalNetworkList() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Traditional Network List </h5>
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
                            <h5 className="mb-2">Traditional Network List</h5>
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


function TraditionalNetworkRow(props) {

    const currentpath = location.pathname.split('/').pop();

    const [display, setDisplay] = useState('');


    const [show, setShow] = useState(false);


    const handleshow = (e) => {
        setDisplay('show');

        // console.log(display);


    }

    return (
        <>
            <tr>
                <td>{props.datar.id}</td>

                <td><button type="submit" onClick={handleshow} className="btn btn-sm btn-info" id="show"><i className="fa fa-eye"></i> View</button></td>

            </tr>
        </>
    )
}

function TraditionalNetworkResults(props) {

    console.log(props.typedata);
    var myData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        myData.push(<TraditionalNetworkRow datar={props.typedata[index]}
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
                                <th> ID</th>
                                <th> Name</th>

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

export function Network(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [traditionalnetwork, SetTraditionalNetwork] = useOutletContext();

    const onsubmit = (data) => {

        const id = traditionalnetwork;
        id['networkdata'] = data;
        SetTraditionalNetwork(id);
        console.log(data);

    }
    return (
        <>
            <form onSubmit={handleSubmit(onsubmit)}>
                <div className="tab-pane fade show active" id="Network" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mb-2">Network</h5>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <small>Network ID</small>
                                        <input type="text" className="form-control" name="network_id" {...register('network_id', {
                                            required: true,
                                        })} id="" placeholder="" required="" />
                                        {errors.network_id?.type === 'required' && <p role="alert" className="notvalid">Network ID is  required</p>}

                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <small>Network Name</small>
                                        <input type="text" className="form-control" name="network_name" {...register('network_name', {
                                            required: true,
                                        })} id="" placeholder="" required="" />
                                        {errors.network_name?.type === 'required' && <p role="alert" className="notvalid">Network Name is  required</p>}

                                    </div>
                                </div>
                                <div className="clearfix mb-1"></div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5 className="mb-2">Pricing</h5>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Price Schedule Override</small>
                                                <input type="text" className="form-control" name="pricing_schedule_override" {...register('pricing_schedule_override', {
                                                    required: true,
                                                })} id="" placeholder="" required="" />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                                {errors.pricing_schedule_override?.type === 'required' && <p role="alert" className="notvalid">Price Schedule Override is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <h5 className="mb-2">Communication Charges</h5>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <small>Paid/Accepted</small>
                                                <input type="text" className="form-control" name="paid_accepted" {...register('paid_accepted', {
                                                    required: true,
                                                })} id="" placeholder="" required="" />
                                                {errors.paid_accepted?.type === 'required' && <p role="alert" className="notvalid">Paid/Accepted is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <small>Reject/Reversal</small>
                                                <input type="text" className="form-control" name="rejected" {...register('rejected', {
                                                    required: true,
                                                })} id="" placeholder="" required="" />
                                                {errors.rejected?.type === 'required' && <p role="alert" className="notvalid">Reject/Reversal is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <h5 className="mb-2">Formulary Exceptions</h5>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <small>By GPI List</small>
                                                <input type="text" className="form-control" name="by_gpi_list" {...register('by_gpi_list', {
                                                    required: true,
                                                })} id="" placeholder="" required="" />

                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                                {errors.by_gpi_list?.type === 'required' && <p role="alert" className="notvalid">By GPI List is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <small>By BDC List</small>
                                                <input type="text" className="form-control" name="by_bdc_list"  {...register('by_bdc_list', {
                                                    required: true,
                                                })} id="" placeholder="" required="" />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                                {errors.by_bdc_list?.type === 'required' && <p role="alert" className="notvalid">By BDC List is  required</p>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5 className="mb-2">Rx Limitations</h5>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Rx Quantity</small>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control" name="rx_quantity_minium" {...register('rx_quantity_minium', {
                                                            required: true,
                                                        })} id="" placeholder="Minimum" required="" />
                                                        {errors.rx_quantity_minium?.type === 'required' && <p role="alert" className="notvalid">Rx Minium Quantity   is  required</p>}

                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control" name="rx_quantity_maxium" id=""  {...register('rx_quantity_maxium', {
                                                            required: true,
                                                        })} placeholder="Maximum" required="" />
                                                        {errors.rx_quantity_maxium?.type === 'required' && <p role="alert" className="notvalid">Rx Maxium Quantity  is  required</p>}


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Days Supply</small>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control" name="minium_days_supply"  {...register('minium_days_supply', {
                                                            required: true,
                                                        })} id="" placeholder="Minimum" required="" />
                                                        {errors.minium_days_supply?.type === 'required' && <p role="alert" className="notvalid">Days Supply Minium is  required</p>}

                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control" name="maxium_days_supply" {...register('maxium_days_supply', {
                                                            required: true,
                                                        })} id="" placeholder="Maximum" required="" />
                                                        {errors.maxium_days_supply?.type === 'required' && <p role="alert" className="notvalid">Days Supply Maxium is  required</p>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Retail Fills</small>
                                                <input type="text" className="form-control" name="retail_fills" {...register('retail_fills', {
                                                    required: true,
                                                })} id="" placeholder="Maximum" required="" />
                                                {errors.retail_fills?.type === 'required' && <p role="alert" className="notvalid">Retail Fills is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Fills</small>
                                                <input type="text" className="form-control" name="fills"   {...register('fills', {
                                                    required: true,
                                                })} id="" placeholder="Maximum" required="" />
                                                {errors.fills?.type === 'required' && <p role="alert" className="notvalid"> Fills is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Starter Dose Date</small>
                                                <input type="text" className="form-control" name="starter_dose_date" {...register('starter_dose_date', {
                                                    required: true,
                                                })} id="" placeholder="Maximum" required="" />
                                                {errors.starter_dose_date?.type === 'required' && <p role="alert" className="notvalid"> Starter Dose Date is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Starter Dose Bypass Days</small>
                                                <input type="text" className="form-control" name="starter_dose_bypass_days"  {...register('starter_dose_bypass_days', {
                                                    required: true,
                                                })} id="" placeholder="Maximum" required="" />
                                                {errors.starter_dose_bypass_days?.type === 'required' && <p role="alert" className="notvalid"> Starter Dose Bypass Days is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>St. Dose Maint. Bypass Days</small>
                                                <input type="text" className="form-control" name="dose_maint_bypass_days" {...register('dose_maint_bypass_days', {
                                                    required: true,
                                                })} id="" placeholder="Maximum" required="" />

                                                {errors.dose_maint_bypass_days?.type === 'required' && <p role="alert" className="notvalid"> St. Dose Maint. Bypass Days is  required</p>}

                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="col-md-1 float-end">
                        <button type="submit" className="btn btn-theme pt-2 pb-2">submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}


export function Providers(props) {


    const { register, handleSubmit, formState: { errors } } = useForm();

    const [networkData, setNetworkData] = useState([]);

    useEffect(() => {
    }, [networkData]);

    const onSubmit = data => {

        setNetworkData([data]);
        console.log(data);

    }

    const clearForm = () => {
        document.getElementById("providersform").reset();
    }



    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <form key={1} id="providersform" onSubmit={handleSubmit(onSubmit)}>

                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="mb-2">Providers within Network</h5>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <small>Provider ID</small>
                                    <input type="text" className="form-control" name="provider_id" {...register('provider_id', {
                                        required: true,
                                    })} placeholder="Enter Customer ID" id="" required="" />

                                    {errors.provider_id?.type === 'required' && <p role="alert" className="notvalid">Provider ID is  required</p>}

                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <small>Price Schedule</small>
                                    <input type="text" className="form-control" name="price_schedule"  {...register('price_schedule', {
                                        required: true,
                                    })} placeholder="Enter Price Schdule" id="" required="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                    {errors.price_schedule?.type === 'required' && <p role="alert" className="notvalid">Price Schedule is  required</p>}

                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group mb-3 mt-4">
                                    <small>&nbsp;</small>
                                    <input type="checkbox" id="male" {...register('participation_denied', {
                                        required: true,
                                    })} name="participation_denied" className="d-none" />
                                    <label htmlFor="male">Parcipation Denied</label>
                                    {errors.participation_denied?.type === 'required' && <p role="alert" className="notvalid">Parcipation Denied is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <small>Effective Date</small>
                                    <input type="date" className="form-control" name="effective_date" {...register('effective_date', {
                                        required: true,
                                    })} placeholder="Enter Customer ID" id="" required="" />
                                    {errors.effective_date?.type === 'required' && <p role="alert" className="notvalid">Effective Date  is  required</p>}

                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <small>Termination Date</small>
                                    <input type="date" className="form-control" name="termination_date" {...register('termination_date', {
                                        required: true,
                                    })} placeholder="Enter Customer ID" id="" required="" />

                                    {errors.termination_date?.type === 'required' && <p role="alert" className="notvalid">Termination Date  is  required</p>}

                                </div>
                            </div>
                            <div className="clearfix mb-2"></div>

                            <div className="col-md-6 ms-auto text-end mb-3">
                                <a onClick={clearForm} className="btn btn-danger">Clear</a>&nbsp;&nbsp;
                                {/* <a href="" className="btn btn-warning ">Remove From List</a>&nbsp;&nbsp; */}
                                <button type="submit" className="btn btn-info">Add to List</button>
                            </div>
                        </div>
                    </form>

                    {/* {networkData.length > 0 ? */}
                    <ProvidersResults typedata={networkData} />
                    {/* // : ''} */}

                </div>

            </div>

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
                            <table className="table table-striped table-bordered">
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
                <td><button onClick={deleteRow} value={props.datar.provider_id} className="btn btn-sm btn-warning"><i className="fa fa-trash-alt"></i></button></td>
            </tr>
        </>
    )
}


export default TraditionalNetworks;