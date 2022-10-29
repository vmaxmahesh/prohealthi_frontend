import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';

export default function SuperProvider() {
    const scollToRef = useRef();


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');

    const getNDCItems = (ndcid) => {
        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/network/get/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setNdClass([]);
                    return Promise.reject(error);
                } else {
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

    // getNDCItemList
    const getNDCItemDetails = (ndcid) => {
        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/network/details/${ndcid}`, requestOptions)
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
                    setSelctedNdc(data.data);
                    scollToRef.current.scrollIntoView()
                    return;
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/supernetwork/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                 console.log('mahesh');

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



    useEffect(() => { }, [ndcData, ndcClass, selctedNdc]);

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
                            <li><a href="">Super Provider Network</a></li>
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
            <SearchNDC searchException={searchException} />

            <ShowNDCList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />

            <div ref={scollToRef}>
                <AddNcdList selectedNdc={selctedNdc} />
            </div>


        </>
    )
}

function SearchNDC(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


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
                                <small>Network ID/Name</small>
                                <input type="text" onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing Network ID/Name' {...register("ndc_id", { required: true })} />

                            </div>
                        </div>
                        {/* <div className="col-md-2 mb-2">
                            <div className="form-group">
                                <small>&nbsp;</small><br />
                                <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: "100%", fontSize: "12px" }} onClick={e => fillNdcArray()}>Search</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

function ShowNDCList(props) {

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
        ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} getNDCItem={getNDCItem} />);
    }

    const ndcClassArray = [];
    for (let j = 0; j < props.ndcClassData.length; j++) {
        ndcClassArray.push(<NdcClassRow ndcClassRow={props.ndcClassData[j]} getNDCItemDetails={getNDCItemDetails} />);
    }

    const [ncdListData, setNcdListData] = useState();
    const [show, setShow] = useState("none");
    const handleShow = () => setShow("block");
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Super Provider Network List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add Benefit List</button>
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>NETWORK ID</th>
                                                    <th>NAME</th>
                                                    <th>Action</th>
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
                                                    <th>Priority</th>
                                                    <th>Network Id</th>
                                                    <th>eff. Date</th>
                                                    <th>Network Type</th>
                                                    <th>Price schedule</th>
                                                    <th>Action</th>
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

function NdcRow(props) {
    return (
        <>
            <tr>
                <td>{props.ndcRow.super_rx_network_id}</td>
                <td>{props.ndcRow.super_rx_network_id_name}</td>
                <td><button className="btn btn-sm btn-info" id="" onClick={() => props.getNDCItem(props.ndcRow.super_rx_network_id)}><i className="fa fa-eye"></i> View mahesh</button></td>
            </tr>
        </>
    )
}

function NdcClassRow(props) {
    return (
        <>
            <tr>
                <td>{props.ndcClassRow.super_rx_network_priority}</td>
                <td>{props.ndcClassRow.super_rx_network_id}</td>
                <td>{props.ndcClassRow.effective_date}</td>
                <td>{props.ndcClassRow.rx_network_type}</td>
                <td>{props.ndcClassRow.price_schedule_ovrd}</td>
                <td><button className="btn btn-sm btn-info" id="" onClick={() => props.getNDCItemDetails(props.ndcClassRow.super_rx_network_id)}><i className="fa fa-eye"></i> View</button></td>
            </tr>
        </>
    )
}

function AddNcdList(props) {
    const location = useLocation();

    const [selctedNdc, setSelctedNdc] = useState({});


    const currentpath = location.pathname.split('/').pop();

    useEffect(() => { setSelctedNdc(props.selectedNdc) }, [props.selectedNdc, selctedNdc]);
    // //  console.log(selctedNdc);

    return (
        <>
            <div class="card mt-3 mb-3">
            <div class="card-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="row">
                                    <div class="col-md-12">
                                        <h5 class="mb-2">Super Provider Network</h5>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>Super Network ID</small>
                                            <input type="text" class="form-control" name="" value={selctedNdc.super_rx_network_id} id="" placeholder="" required=""/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>Super Network Name</small>
                                            <input type="text" class="form-control" name="" value={selctedNdc.super_rx_network_id_name} id="" placeholder="" required=""/>
                                        </div>
                                    </div>
                                    
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Provider Network</h5>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Provider Network ID</small>
                                                <input type="text" class="form-control" name="" value={selctedNdc.rx_network_id} id="" placeholder="" required=""/>
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Super Network Priority</small>
                                                <input type="text" class="form-control" name="" value={selctedNdc.super_rx_network_priority} id="" placeholder="" required=""/>
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Effective Date</small>
                                                <input type="date" class="form-control" name="" value={selctedNdc.effective_date} id="" placeholder="" required=""/>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Termination Date</small>
                                                <input type="date" class="form-control" name="" id="" value={selctedNdc.termination_date} placeholder="" required=""/>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Pricing</h5>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Price Schedule Override</small>
                                                <input type="text" class="form-control" name="" id="" value={selctedNdc.pricing_ovrd_list_id} placeholder="" required=""/>
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        
                                        
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Communication Charges</h5>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Paid/Accepted</small>
                                                <input type="text" class="form-control" name=""  value={selctedNdc.comm_charge_paid} id="" placeholder="" required=""/>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Reject/Reversal</small>
                                                <input type="text" class="form-control" name="" value={selctedNdc.comm_charge_reject} id="" placeholder="" required=""/>
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
                                                        <input type="text" class="form-control" name="" value={selctedNdc.min_rx_qty} id="" placeholder="Minimum" required=""/>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" class="form-control" name="" id="" value={selctedNdc.max_rx_qty}  placeholder="Maximum" required=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Days Supply</small>
                                                <div class="row">
                                                    <div class="col-md-6"> 
                                                        <input type="text" class="form-control" name="" value={selctedNdc.days_supply_opt} id="" placeholder="Minimum" required=""/>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" class="form-control" name="" id="" value={selctedNdc.days_supply_opt} placeholder="Maximum" required=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Retail Fills</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required=""/>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Fills</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required=""/>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Starter Dose Date</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required=""/>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Starter Dose Bypass Days</small>
                                                <input type="text" class="form-control" name="" value={selctedNdc.starter_dose_bypass_days} id="" placeholder="Maximum" required=""/>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>St. Dose Maint. Bypass Days</small>  
                                                <input type="text" class="form-control" name="" id="" value={selctedNdc.starter_dose_maint_bypass_days} placeholder="Maximum" required=""/>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
            </div>
        </>
    );
}
