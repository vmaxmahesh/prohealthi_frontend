import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
// import Footer from '../../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { Alert, Row, Col, Button } from 'react-bootstrap';
import Footer from '../../../shared/Footer';
import { Controller } from 'react-hook-form';
import AsyncSelect from 'react-select/async';



function FlexibleNetworks(props) {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const [provider, setProvider] = useState([]);
    const [ProviderData, setProviderdata] = useState([]);
    const [customerlist, setCustomerlist] = useState([]);

    const [traditionalnetwork, SetTraditionalNetwork] = useState([]);

    const [flexibleData, setFelxibleData] = useState(false);

    const [tableData, settableData] = useState([]);


    const [Flexiblenetwork, SetFlexibleNetwork] = useState([]);


    const [customer, setCustomer] = useState([]);




    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');


    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/flexiblenetwork/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                // console.log(data.data);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setNdcData([]);
                    return Promise.reject(error);

                } else {
                    setNdcData(data.data);
                    return;
                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }



    const getNDCItems = (ndcid) => {
        // ndc_exception_list
        var test = {};
        test.ndc_exception_list = ndcid;
        setSelctedNdc(test);

        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/flexiblenetwork/get/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    // setNdClass([]);
                    return Promise.reject(error);
                } else {
                    console.log(data.data);
                    setNdClass(data.data);

                    // scollToRef.current.scrollIntoView()
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getNDCItemDetails = (ndcid) => {
        console.log(ndcid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/flexiblenetwork/details/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setFelxibleData(data.data);

                    // scollToRef.current.scrollIntoView()
                    // return;
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }










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





                <div className="col-md-12 mb-3">
                    <SearchFlexibleNetwork searchException={searchException} />

                    <FlexibleNetworkList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />

                    {/* <TraditionalNetworkForm  /> */}
                    <TraditionalNetworkForm formData={flexibleData} selected={flexibleData} />



                    {/* <SearchTraditionalNetwork searchException={searchException} />


                    <TraditionalNetworkList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />

                    // <TraditionalNetworkForm formData={flexibleData} selected={flexibleData} adding={adding} />


 */}

                </div>




            </div>


            <Footer />
        </>
    )
}

function SearchFlexibleNetwork(props) {

    const searchException = (fdata) => {

        props.searchException(fdata);
    }

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Flexible NetWork </small>
                                <input type="text" onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing flexible network id/ name to search'

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function FlexibleNdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.rx_network_rule_id == props.selected.rx_network_rule_id ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.rx_network_rule_id)}
            >
                <td>{props.ndcRow.rx_network_rule_id}</td>
                <td >{props.ndcRow.rx_network_rule_name}</td>


                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}


function FlexibleNdcClassRow(props) {

    useEffect(() => {

    }, [props.selected]);

    return (
        <>
            <tr
                className={(props.selected && props.flexibleclassrow.pharmacy_nabp == props.selected.pharmacy_nabp ? ' tblactiverow ' : '')}
                onClick={() => props.getNDCItemDetails(props.flexibleclassrow.rx_network_rule_id)}

            >
                <td>{props.flexibleclassrow.rx_network_rule_id_number}</td>
                <td>{props.flexibleclassrow.effective_date}</td>
                <td>{props.flexibleclassrow.termination_date}</td>
                <td>{props.flexibleclassrow.pharmacy_chain}</td>
                <td>{props.flexibleclassrow.price_schedule_ovrd}</td>
                <td>{props.flexibleclassrow.state}</td>
                <td>{props.flexibleclassrow.country}</td>
                <td>{props.flexibleclassrow.zip_code}</td>



                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}




function FlexibleNetworkList(props) {

    useEffect(() => { }, [props.selctedNdc]);
    // //  console.log(props.selctedNdc);

    const getNDCItem = (ndciemid) => {
        props.getNDCItem(ndciemid);
    }

    const getNDCItemDetails = (ndciemid) => {
        props.getNDCItemDetails(ndciemid);
    }

    const ndcListArray = [];
    for (let i = 0; i < props.ndcListData.length; i++) {
        ndcListArray.push(<FlexibleNdcRow ndcRow={props.ndcListData[i]} getNDCItem={getNDCItem} selected={props.selctedNdc} />);
    }


    const ndcClassArray = [];
    for (let j = 0; j < props.ndcClassData.length; j++) {
        ndcClassArray.push(<FlexibleNdcClassRow flexibleclassrow={props.ndcClassData[j]} getNDCItemDetails={getNDCItemDetails} selected={props.selctedNdc} />);
    }







    return (
        <>

            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Flexible Network List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th> ID</th>
                                                    <th> Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {ndcListArray}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Rule ID</th>
                                                    <th>Effective Date</th>
                                                    <th>Termination Date</th>
                                                    <th>Chain Id</th>
                                                    <th>Price Schedule </th>
                                                    <th>State</th>
                                                    <th>Country</th>
                                                    <th>Zip Code</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {ndcClassArray}


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
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
        CustomerList.push(<NoReacords />);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">Flexible Network List</h5>
                        </div>
                        <div style={{ height: '400px', overflowY: 'scroll' }}>
                            <table className="table  table-bordered" style={{ position: 'relative' }}>
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
            <tr style={{ padding: '10px', color: 'red' }}><td colspan="7">No Records Matches..!</td></tr>
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
                                            <Controller name="price_schdule"
                                                control={control}
                                                render={({ field }) => (
                                                    <AsyncSelect
                                                        {...field}
                                                        cacheOptions
                                                        defaultOptions
                                                        // value={selectedValue}
                                                        getOptionLabel={e => e.price_label}
                                                        getOptionValue={e => e.price_value}
                                                        loadOptions={loadPriceScheduleOptions}
                                                        onInputChange={handlePriceScheduleInput}
                                                        // onChange={handleChange}
                                                        placeholder="Price Schedule 2"
                                                        value={{ price_label: props.formData.price_schedule_ovrd, price_value: props.formData.price_schedule_ovrd }}

                                                    />
                                                )} />
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
                                    <Controller name="price_schdule"
                                        control={control}
                                        render={({ field }) => (
                                            <AsyncSelect
                                                {...field}
                                                cacheOptions
                                                defaultOptions
                                                // value={selectedValue}
                                                getOptionLabel={e => e.price_label}
                                                getOptionValue={e => e.price_value}
                                                loadOptions={loadPriceScheduleOptions}
                                                onInputChange={handlePriceScheduleInput}
                                                // onChange={handleChange}
                                                placeholder="Price Schedule 2"
                                                value={{ price_label: props.formData.price_schedule_ovrd, price_value: props.formData.price_schedule_ovrd }}

                                            />
                                        )} />
                                    {errors.price_schedule_override?.type === 'required' && <p role="alert" className="notvalid"> Price Schedule Override is  required</p>}

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

function TraditionalNetworkForm(props) {
    const { register, reset, handleSubmit, watch, control, formState: { errors } } = useForm();

    useEffect(() => { reset(props.formData) }, [props.formData]);





    const [PriceScheduleInput, setPriceScheduleInput] = useState('');
    // const [PriceScheduleInput, setPriceScheduleInput] = useState('');
    const [ndcInput, setNdcInput] = useState('');




    const handlePriceScheduleInput = (e) => {
        console.log(e)
        setPriceScheduleInput(e);
    }




    const handleNdcInput = (ndc_input) => {
        console.log(ndc_input)
        setNdcInput(ndc_input);
    }


    const loadPriceScheduleOptions = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/price-schedule/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ price_schedule }) => ({
                            price_value: price_schedule,
                            price_label: price_schedule
                        }))
                    )
                })
        })
    }

    const loadRuleIdOptions = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/third-party-pricing/price-schedule/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ price_schedule }) => ({
                            price_value: price_schedule,
                            price_label: price_schedule
                        }))
                    )
                })
        })
    }

    const loadGpiList = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/gpi/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ exception_name }) => ({
                            gpi_value: exception_name,
                            gpi_label: exception_name
                        }))
                    )
                })
        })
    }


    const loadNDCList = (ndc_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/ndc/search?search=${ndc_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ exception_name }) => ({
                            ndc_value: exception_name,
                            ndc_label: exception_name
                        }))
                    )
                })
        })
    }


    const loadProviderId = (pharm_input) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/provider/id/search?search=${pharm_input}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ pharmacy_nabp }) => ({
                            provider_id_value: pharmacy_nabp,
                            provider_id_label: pharmacy_nabp
                        }))
                    )
                })
        })
    }

    const addCode = (data) => {
        // console.log(data);
        const requestOptions = {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        };
        // console.log(watch(data)); 
        if (process.env.REACT_APP_API_BASEURL == 'NOT') {
            toast.success('Added Successfully...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        } else {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/providerdata/traditionalnetwork/add`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    // console.log(response);

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        reset(data.data);
                        console.log(data.data);
                        var msg = props.adding ? 'Added Successfully...!' : 'Updated Successfully..'
                        toast.success(msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,

                        });
                    }


                    if (response === '200') {
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }

    }
    const onSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {


        if (props.adding) {
            reset({ accum_bene_strategy_name: '', description: '', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ accum_bene_strategy_name: '', accum_bene_strategy_id: '', description: '', pharm_type_variation_ind: '', network_part_variation_ind: '', claim_type_variation_ind: '', plan_accum_deduct_id: '', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);


    return (
        <>
            <form onSubmit={handleSubmit(addCode)} >
                <div class="data">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#Network" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Network</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Providers" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Rules</button>
                    </div>

                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="Network" role="tabpanel" aria-labelledby="nav-home-tab">
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
                                                        <input type="text" class="form-control" {...register('rx_network_rule_id')} name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6 mb-3">
                                                    <div class="form-group">
                                                        <small>Network Name</small>
                                                        <input type="text" class="form-control" {...register('rx_network_rule_name')} name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <h5 class="mb-2">Pricing</h5>
                                                </div>
                                                <div class="col-md-12 mb-3">
                                                    <div class="form-group">
                                                        <small>Price Schedule Override</small>
                                                        <Controller name="price_schdule"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <AsyncSelect
                                                                    {...field}
                                                                    cacheOptions
                                                                    defaultOptions
                                                                    // value={selectedValue}
                                                                    getOptionLabel={e => e.price_label}
                                                                    getOptionValue={e => e.price_value}
                                                                    loadOptions={loadPriceScheduleOptions}
                                                                    onInputChange={handlePriceScheduleInput}
                                                                    // onChange={handleChange}
                                                                    placeholder="Price Schedule 2"
                                                                    value={{ price_label: props.formData.price_schedule_ovrd, price_value: props.formData.price_schedule_ovrd }}

                                                                />
                                                            )} />
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <h5 class="mb-2">Formulary Exceptions</h5>
                                                </div>
                                                <div class="col-md-6 mb-3">
                                                    <div class="form-group">
                                                        <small>By GPI List</small>
                                                        <Controller name="gpi_list"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <AsyncSelect
                                                                    {...field}
                                                                    cacheOptions
                                                                    defaultOptions
                                                                    getOptionLabel={e => e.gpi_label}
                                                                    getOptionValue={e => e.gpi_value}

                                                                    loadOptions={loadGpiList}
                                                                    onInputChange={handlePriceScheduleInput}
                                                                    // onChange={handleChange}
                                                                    placeholder="Gpi List"
                                                                    value={{ gpi_label: props.formData.gpi_exception_list_ovrd, gpi_value: props.formData.gpi_exception_list_ovrd }}

                                                                />
                                                            )} />
                                                    </div>
                                                </div>
                                                <div class="col-md-6 mb-3">
                                                    <div class="form-group">
                                                        <small>By NDC List</small>
                                                        <Controller name="ndc_list"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <AsyncSelect
                                                                    {...field}
                                                                    cacheOptions
                                                                    defaultOptions
                                                                    // value={selectedValue}
                                                                    getOptionLabel={e => e.ndc_label}
                                                                    getOptionValue={e => e.ndc_value}

                                                                    loadOptions={loadNDCList}
                                                                    onInputChange={handleNdcInput}
                                                                    placeholder="NDC List"
                                                                    value={{ ndc_label: props.formData.gpi_exception_list_ovrd, ndc_value: props.formData.gpi_exception_list_ovrd }}

                                                                />
                                                            )} />
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

                        </div>

                        <div class="tab-pane fade" id="Providers" role="tabpanel" aria-labelledby="nav-profile-tab">

                            <div class="card mt-3 mb-3">

                                <div className="col-md-12">
                                    <div className="card-body">
                                        <div className='row'>

                                            <div class="col-md-3">
                                                <div class="form-group mb-3">
                                                    <small>Net Rule ID</small>
                                                    <Controller name="rule_id"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <AsyncSelect
                                                                {...field}
                                                                cacheOptions
                                                                defaultOptions
                                                                // value={selectedValue}
                                                                getOptionLabel={e => e.price_label}
                                                                getOptionValue={e => e.price_value}
                                                                loadOptions={loadPriceScheduleOptions}
                                                                onInputChange={handlePriceScheduleInput}
                                                                // onChange={handleChange}
                                                                placeholder="Price Schedule 2"
                                                                value={{ price_label: props.formData.price_schedule_ovrd, price_value: props.formData.price_schedule_ovrd }}

                                                            />
                                                        )} />
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group mb-3">
                                                    <small>Effective Date</small>
                                                    <input type="date" class="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group mb-3">
                                                    <small>Termination Date</small>
                                                    <input type="date" class="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <div class="form-group mb-3">
                                                    <small>Provider Chain</small>
                                                    <input type="text" class="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <div class="form-group mb-3">
                                                    <small>State</small>
                                                    <select class="form-select">
                                                        <option value="">Select State</option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group mb-3">
                                                    <small>Country</small>
                                                    <select class="form-select">
                                                        <option value="">Select Country</option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group mb-3">
                                                    <small>Zip Code</small>
                                                    <input type="text" class="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group mb-3">
                                                    <small>Area Code</small>
                                                    <input type="text" class="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <div class="form-group mb-3">
                                                    <small>Exchange</small>
                                                    <input type="text" class="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                                </div>
                                            </div>


                                            <div class="col-md-3">
                                                <div class="form-group mb-3 mt-4">
                                                    <small>&nbsp;</small>
                                                    <input type="checkbox" id="male" class="d-none" />
                                                    <label for="male">Exclusion</label>
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <div class="form-group mb-3">
                                                    <small>Price Schedule Override</small>
                                                    <Controller name="price_schdule"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <AsyncSelect
                                                                {...field}
                                                                cacheOptions
                                                                defaultOptions
                                                                // value={selectedValue}
                                                                getOptionLabel={e => e.price_label}
                                                                getOptionValue={e => e.price_value}
                                                                loadOptions={loadPriceScheduleOptions}
                                                                onInputChange={handlePriceScheduleInput}
                                                                // onChange={handleChange}
                                                                placeholder="Price Schedule 2"
                                                                value={{ price_label: props.formData.price_schedule_ovrd, price_value: props.formData.price_schedule_ovrd }}

                                                            />
                                                        )} />
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group mb-3">
                                                    <small>Provider Status</small>
                                                    <select class="form-select">
                                                        <option value="">Select Country</option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>




                    <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>

                </div>

            </form>

        </>
    )
}


export default FlexibleNetworks;