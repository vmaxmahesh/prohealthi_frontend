import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function GPI() {
    const scollToRef = useRef();

    const [adding, setAdding] = useState(false);

    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');

    useEffect(() => {
        if (selctedNdc) {
            setAdding(false);

        } else {
            setAdding(true);
            setSelctedNdc(false);
        }

        document.title = 'Benefit Code | ProHealthi';

    }, [selctedNdc, adding]);

    const getNDCItems = (ndcid) => {
        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/gpi/get/${ndcid}`, requestOptions)
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/gpi/details/${ndcid}`, requestOptions)
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/gpi/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

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



    useEffect(() => {
        document.title = 'GPI Exception | ProHealthi';
    }, [ndcData, ndcClass, selctedNdc]);

    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Exception List</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">GPI Exception</a></li>
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
                {/* <AddNcdList selectedNdc={selctedNdc} /> */}
                <AddNcdList selectedNdc={selctedNdc} selected={selctedNdc} adding={adding} />

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
                                <small>Search By GPI ID/Name</small>
                                <input type="text" onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing GPI ID/name...' {...register("ndc_id", { required: true })} />

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


    const scollToRef = useRef();


    const AddForm = () => {
        scollToRef.current.scrollIntoView()
    }

    const getNDCItem = (ndciemid) => {
        props.getNDCItem(ndciemid);
    }

    const getNDCItemDetails = (ndciemid) => {
        props.getNDCItemDetails(ndciemid);
    }

    const ndcListArray = [];

    const EmptyData={
        gpi_exception_list:'no data'
    }
   

        for (let i = 0; i < props.ndcListData.length; i++) {
            ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} getNDCItem={getNDCItem} selected={props.selctedNdc} />);
        }

   

    const ndcClassArray = [];
    for (let j = 0; j < props.ndcClassData.length; j++) {
        ndcClassArray.push(<NdcClassRow ndcClassRow={props.ndcClassData[j]} getNDCItemDetails={getNDCItemDetails} selected={props.selctedNdc} />);
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
                            <h5>GPI Exception List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            <button className="btn btn-sm btn-warning" id="show" onClick={e => AddForm()}><i className="fa plus-circle"></i> Add GPI List</button>
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>GPI Exception ID</th>
                                                    <th>GPI Exception Name</th>
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
                                                    <th>GPI Exception List</th>
                                                    <th>GPI</th>
                                                    <th>Effective Date</th>
                                                    <th>New Drug Status</th>
                                                    <th>Process Rule</th>
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
           
                <tr  onClick={() => props.getNDCItem(props.ndcRow.gpi_exception_list)}
                    className={(props.selected && props.ndcRow.gpi_exception_list == props.selected.gpi_exception_list ? ' tblactiverow ' : '')}
                >
                    <td>{props.ndcRow.gpi_exception_list}</td>
                    <td>{props.ndcRow.exception_name}</td>

                    
                    {/* <td><button className="btn btn-sm btn-info" id="" onClick={() => props.getNDCItem(props.ndcRow.gpi_exception_list)}><i className="fa fa-eye"></i> View</button></td> */}
                </tr>
            </>
        )

  
   
}

function NdcClassRow(props) {
    return (
        <>
            <tr onClick={() => props.getNDCItemDetails(props.ndcClassRow.generic_product_id)}
                className={(props.selected && props.ndcClassRow.generic_product_id == props.selected.generic_product_id ? ' tblactiverow ' : '')}
            >
                <td>{props.ndcClassRow.gpi_exception_list}</td>
                <td>{props.ndcClassRow.generic_product_id}</td>
                <td>{props.ndcClassRow.effective_date}</td>
                <td>{props.ndcClassRow.new_drug_status}</td>
                <td>{props.ndcClassRow.process_rule}</td>
                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function AddNcdList(props) {
    const location = useLocation();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [selctedNdc, setSelctedNdc] = useState({});
    const currentpath = location.pathname.split('/').pop();

    useEffect(() => {


        if (props.adding) {
            reset({ gpi_exception_list: '', description: '', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ gpi_exception_list: '', accum_bene_strategy_id: '', description: '', pharm_type_variation_ind: '', network_part_variation_ind: '', claim_type_variation_ind: '', plan_accum_deduct_id: '', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);


    useEffect(() => { reset(props.selected) }, [props.selected]);

    const addCode = (data) => {
        // console.log(selctedNdc);
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
            fetch(process.env.REACT_APP_API_BASEURL + `/api/exception/gpi/add`, requestOptions)
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
                        // reset(selctedNdc);
                        // setSelctedNdc([]);
                        console.log(data);
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
                        setSelctedNdc([]);
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


    return (
        <>
            <div className="data">
            <form onSubmit={handleSubmit(addCode)}>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">

                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#Rules" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Process Rules</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Pricing" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Rx Limitations/Pricing</button>
                        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Override" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Validations/Override</button>
                    </div>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="Rules" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div class="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className="mb-2">Information</h5>
                                            <div className="row mb-2">
                                                <div className="col-md-12">
                                                    <div className="form-group mb-2">
                                                        <small>ID</small>
                                                        <input type="text"  {...register("gpi_exception_list", {
                                                            required:true
                                                        })} className="form-control" name="gpi_exception_list" id="" placeholder="Enter ID" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Name</small>
                                                        <input type="text" className="form-control"  {...register("exception_name", {})} name="" id="exception_name" placeholder="Name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>NDC</small>
                                                        <input type="text" className="form-control" name="generic_product_id" {...register('generic_product_id')} id="" placeholder="NDC" />
                                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Termination Date</small>
                                                        <input type="date" className="form-control" {...register('termination_date')} name="termination_date" id="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Effective Date</small>
                                                        <input type="date" className="form-control" name="effective_date" {...register('effective_date')} id="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h5 className="mb-1">Process Rules</h5>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>New Drug Status</small>
                                                        <select className="form-select" name="new_drug_status" {...register('new_drug_status')}>
                                                            <option value="">Select</option>
                                                            <option value="1">Approved</option>
                                                            <option value="2">Non Fourmulary</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Rule</small>
                                                        <select className="form-select" name="process_rule" {...register('process_rule')}>
                                                            <option value="">Select</option>
                                                            <option value="">R - Reject if status indicator</option>
                                                            <option value="">L - Limitations are Exceeded</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-group">
                                                        <input type="checkbox" id="user" className="d-none" name="module_exit" {...register('module_exit')} />
                                                        <label htmlFor="user">User Exit will not be Invoked for this Section</label>
                                                    </div>
                                                </div>

                                                <div className="col-md-12">
                                                    <h5 className="mb-1">Product Exception</h5>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Preferred NDC</small>
                                                        <input type="text" className="form-control" name="preferred_product_ndc" {...register('preferred_product_ndc')} id="" placeholder="NDC" />
                                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Conversion NDC</small>
                                                        <input type="text" className="form-control" name="conversion_product_ndc"  {...register('conversion_product_ndc')} id="" placeholder="NDC" />
                                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <h5 className="mb-1">User Message</h5>
                                        </div>

                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <small>Message</small>
                                                <textarea {...register('message')} className="form-control" rows="3"></textarea>
                                                <p className="input-hint">Message Returned to the Provider</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <small>Stop Date</small>
                                                <input type="date"  id="" className="form-control" name="message_stop_date" {...register('message_stop_date')} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mt-4 mb-4">
                                            <div className="form-group">
                                                <input type="checkbox" id="message" className="d-none" name="reject_only_msg_flag" {...register('reject_only_msg_flag')} />
                                                <label htmlFor="message">Message sent only when Transation is Rejected</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="tab-pane fade" id="Pricing" role="tabpanel" aria-labelledby="nav-profile-tab">
                            <div class="card mt-3 mb-3">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="row mb-2">
                                                <div class="col-md-12">
                                                    <h5 class="mb-2">Rx Limitations</h5>
                                                </div>
                                                <div class="col-md-8">
                                                    <div class="form-group">
                                                        <small>Rx Quantity</small>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <input type="text" name="" {...register('min_rx_qty')} id="" placeholder="Minimum" class="form-control" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" name="" {...register('max_rx_qty')} id="" placeholder="Maximum" class="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <small>Rxs/Patient</small>
                                                    <input type="text" name="" id="" placeholder="Max" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-md-8">
                                                    <div class="form-group">
                                                        <small>Amount Due</small>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <input type="text" name="" id="" placeholder="Minimum" class="form-control" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" name="" id="" placeholder="Maximum" class="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <small>Accum. Ben./Patient</small>
                                                    <input type="text" name="" id="" placeholder="Max" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-md-8">
                                                    <div class="form-group">
                                                        <small>Day Supply</small>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <input type="text" name="" id="" {...register('min_days_supply_opt')} placeholder="Minimum" class="form-control" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" name="" {...register('max_days_supply_opt')} id="" placeholder="Maximum" class="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <small>Retail Fills</small>
                                                    <input type="text" name="" id="" {...register('retail_max_fills_opt')} placeholder="Max" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-md-8">
                                                    <div class="form-group">
                                                        <small>Ctl Days Supply</small>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <input type="text" name="min_ctl_days" {...register('min_ctl_days')} id="" placeholder="Minimum" class="form-control" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" name="max_ctl_days"  {...register('max_ctl_days')} id="" placeholder="Maximum" class="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <small>Quantity/Fill</small>
                                                    <input type="text" name="max_qty_per_fill"  {...register('max_qty_per_fill')} id="" placeholder="Max" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-md-4">
                                                    <small>Days Fill</small>
                                                    <input type="text" name="max_days_per_fill"  {...register('max_days_per_fill')} id="" placeholder="Max" class="form-control" />
                                                </div>
                                                <div class="col-md-4">
                                                    <small>Daily Dose</small>
                                                    <input type="text" name="max_dose" {...register('max_dose')} id="" placeholder="Max" class="form-control" />
                                                </div>
                                                <div class="col-md-4">
                                                    <small>Starter Dose Days</small>
                                                    <input type="text" name="starter_dose_days" {...register('starter_dose_days')} id="" placeholder="Max" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-md-8">
                                                    <small>Days Until. Covg Effective</small>
                                                    <input type="text" name="" id="" placeholder="Max" class="form-control" />
                                                </div>
                                                <div class="col-md-4">
                                                    <small>Star Dose Bypass Days</small>
                                                    <input type="text" name="starter_dose_bypass_days" {...register('starter_dose_bypass_days')} id="" placeholder="Max" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-md-8">
                                                    <small>Acute Dosing Days</small> 
                                                    <input type="text" name="acute_dosing_days" id=""  {...register('acute_dosing_days')} placeholder="Max" class="form-control" />
                                                </div>
                                                <div class="col-md-4">
                                                    <small>Star Dose Maint. by Days</small>
                                                    <input type="text" name="" id="" placeholder="Max" class="form-control" />
                                                </div>

                                            </div>

                                            <div class="row mb-2">
                                                <div class="col-md-8">
                                                    <div class="form-group">
                                                        <small>Age</small>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <input type="text" name="min_age" {...register('min_age')} id="" placeholder="Minimum" class="form-control" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" name="max_age" {...register('max_age')} id="" placeholder="Maximum" class="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <small>Maint. Daily Dose</small>
                                                    <input type="text" name="maint_dose_units_day"   {...register('maint_dose_units_day')} id="" placeholder="Max" class="form-control" />
                                                </div>

                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-md-8 mb-2">
                                                    <div class="form-group mt-4">
                                                        <input type="checkbox" id="Return2" class="d-none" />
                                                        <label for="Return2">Merge Plan Rx Limitation</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-4 mb-2">
                                                    <small>Quantity Over Time </small>
                                                    <input type="text" name="" {...register('max_qty_over_time')} id="" placeholder="Max" class="form-control" />
                                                </div>
                                                <div class="col-md-8 mb-2">
                                                </div>
                                                <div class="col-md-4 mb-2">
                                                    <small>Days Over Time </small>
                                                    <input type="text" name="max_days_over_time" {...register('max_days_over_time')} id="" placeholder="Max" class="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <h5 class="mb-2">Mail Service Limitation</h5>
                                            <div class="row mb-2">
                                                <div class="col-md-12 mb-2">
                                                    <div class="form-group">
                                                        <small>Daily Supply</small>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <input type="text" class="form-control" placeholder=""  {...register('mail_ord_max_days_supply_opt')} name="mail_ord_max_days_supply_opt" id="" />
                                                            </div>
                                                            <div class="col-md-6">
                                                                <input type="text" class="form-control" placeholder="" name="mail_ord_max_days_supply_opt"  {...register('mail_ord_max_days_supply_opt')} id="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 mb-2">
                                                    <div class="form-group">
                                                        <small>Mail Service Fills</small>
                                                        <input type="text" class="form-control" name="mail_ord_max_fills_opt" {...register('mail_ord_max_fills_opt')} id="" />
                                                    </div>
                                                </div>
                                            </div>

                                            <h5 class="mb-2">Member Rigistration</h5>

                                            <div class="col-md-12 mb-2">
                                                <div class="form-group">
                                                    <small>Valid Relationship</small>
                                                    <select class="form-select" name="valid_relation_code" {...register('valid_relation_code')}>
                                                        <option value="">Select</option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mb-3">
                                                <div class="form-group">
                                                    <small>Gender Restrictions - (Not Covered)</small>
                                                    <div class="row">
                                                        <div class="col-md-4 mt-2">
                                                            <div class="form-group">
                                                                <input type="checkbox" id="male" name="sex_restriction" {...register('sex_restriction')} class="d-none" />
                                                                <label for="male"> Male</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 mt-2">
                                                            <div class="form-group">
                                                                <input type="checkbox" id="female" name="sex_restriction" {...register('sex_restriction')} class="d-none" />
                                                                <label for="female"> Female</label>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 mt-2">
                                                            <div class="form-group">
                                                                <input type="checkbox" id="none" class="d-none" />
                                                                <label for="none"> None</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <h5 class="mb-2">Pricing Overrides</h5>
                                            <div class="col-md-12 mb-2">
                                                <div class="form-group">
                                                    <small>Alt Price Schedule</small>
                                                    <input type="text" class="form-control" {...register('alternate_price_schedule')} name="alternate_price_schedule" id="" />
                                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mb-2">
                                                <div class="form-group">
                                                    <small>Alt Copay Schedule</small>
                                                    <input type="text" class="form-control" {...register('alternate_copay_sched')} name="alternate_copay_sched" id="" />
                                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                                </div>
                                            </div>
                                            <div class="col-md-12 mb-2">
                                                <div class="form-group">
                                                    <small>Brand Copay Amount</small>
                                                    <input type="text" class="form-control" {...register('brand_copay_amt')} name="brand_copay_amt" id="" />
                                                </div>
                                            </div>
                                            <div class="col-md-12 mb-2">
                                                <div class="form-group">
                                                    <small>Generic Copay Amount</small>
                                                    <input type="text" class="form-control" name="generic_copay_amt" {...register('generic_copay_amt')} id="" />
                                                </div>
                                            </div>
                                            <div class="col-md-12 mb-2">
                                                <div class="form-group">
                                                    <small>Max Allowable Amount</small>
                                                    <input type="text" class="form-control" name="" id="" />
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="tab-pane fade" id="Override" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <div class="card mt-3 mb-3">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Validations</h5>
                                        </div>
                                        <div class="col-md-3 mb-2">
                                            <small>Provider</small>
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="" id="" required="" />
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-2">
                                            <small>Prescriber</small>
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="" id="" required="" />
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-2">
                                            <small>Specilty</small>
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="physician_specialty_list" {...register('physician_specialty_list')} id="" required="" />
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div class="col-md-3 mb-2">
                                            <small>Diagnosis</small>
                                            <div class="form-group">
                                                <input type="text" class="form-control" name="diagnosis_list" {...register('diagnosis_list')} id="" required="" />
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div class="clearfix mb-2"></div>


                                        <div class="col-md-12 mb-1">
                                            <h5 class="mb-2">Processing Overrides</h5>
                                        </div>
                                        <div class="col-md-4 mb-2">
                                            <small>Generic Indicator</small>
                                            <select class="form-select" name="gen_inc_exc_ind" {...register('gen_inc_exc_ind')}>
                                                <option value="">Select</option>
                                                <option value=""></option>
                                                <option value=""></option>
                                            </select>
                                        </div>
                                        <div class="col-md-4 mb-2">
                                            <small>Denial Override Code</small>
                                            <input type="text" class="form-control" name="denial_override"  {...register('denial_override')} id="" />
                                        </div>
                                        <div class="col-md-4 mb-2">
                                            <small>Denial Override Code</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="Not Allowed" readonly />
                                        </div>

                                        <div class="clearfix mb-2"></div>

                                        <div class="col-md-12 mb-1">
                                            <h5 class="mb-2">Include/Exclude</h5>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <input type="checkbox" id="one"{...register('bng_sngl_inc_exc_ind')} class="d-none" />
                                                <label for="one">Exclude Single Source Brand Drugs</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <input type="checkbox" id="two" name="bng_multi_inc_exc_ind" {...register('bng_multi_inc_exc_ind')} class="d-none" />
                                                <label for="two">Exclude Multi-Source Brand Drugs</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <input type="checkbox" name="bga_inc_exc_ind" {...register('bga_inc_exc_ind')} id="three" class="d-none" />
                                                <label for="three">Exclued Original with Generic Drugs</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <input type="checkbox" id="four" class="d-none" />
                                                <label for="four">Exclued Generic Drugs</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>



                    </div>
                    {console.log(props.adding)}
                    <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>


                </form>

            </div>
        </>
    )
}

export function GPIProcessRule(props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const [selctedNdc, setSelctedNdc] = useOutletContext();

    useEffect(() => { reset(selctedNdc) }, [selctedNdc]);
    console.log(selctedNdc);

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="mb-2">Information</h5>
                            <div className="row mb-2">
                                <div className="col-md-12">
                                    <div className="form-group mb-2">
                                        <small>ID</small>
                                        <input type="text"  {...register("gpi_exception_list", {})} className="form-control" name="" id="" placeholder="Enter ID" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Name</small>
                                        <input type="text" className="form-control"  {...register("exception_name", {})} name="" id="" placeholder="Name" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>NDC</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Termination Date</small>
                                        <input type="date" className="form-control" name="" id="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Effective Date</small>
                                        <input type="date" className="form-control" name="" id="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mb-1">Process Rules</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>New Drug Status</small>
                                        <select className="form-select">
                                            <option value="">Select</option>
                                            <option value="">Approved</option>
                                            <option value="">Non Fourmulary</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Rule</small>
                                        <select className="form-select">
                                            <option value="">Select</option>
                                            <option value="">R - Reject if status indicator</option>
                                            <option value="">L - Limitations are Exceeded</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <input type="checkbox" id="user" className="d-none" />
                                        <label htmlFor="user">User Exit will not be Invoked for this Section</label>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <h5 className="mb-1">Product Exception</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Preferred NDC</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Conversion NDC</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-12">
                            <h5 className="mb-1">User Message</h5>
                        </div>

                        <div className="col-md-12 mb-2">
                            <div className="form-group">
                                <small>Message</small>
                                <textarea className="form-control" rows="3"></textarea>
                                <p className="input-hint">Message Returned to the Provider</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <small>Stop Date</small>
                                <input type="date" name="" id="" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6 mt-4 mb-4">
                            <div className="form-group">
                                <input type="checkbox" id="message" className="d-none" />
                                <label htmlFor="message">Message sent only when Transation is Rejected</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export function GPIRXLimitationPricing(props) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const [selctedNdc, setSelctedNdc] = useOutletContext();

    useEffect(() => { reset(selctedNdc) }, [selctedNdc]);

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row mb-2">
                                <div className="col-md-12">
                                    <h5 className="mb-2">Rx Limitations</h5>
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <small>Rx Quantity</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <small>Rxs/Patient</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <small>Amount Due</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <small>Accum. Ben./Patient</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <small>Day Supply</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <small>Retail Fills</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <small>Ctl Days Supply</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <small>Quantity/Fill</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-4">
                                    <small>Days Fill</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <small>Daily Dose</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <small>Starter Dose Days</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <small>Days Until. Covg Effective</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <small>Star Dose Bypass Days</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <small>Acute Dosing Days</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <small>Star Dose Maint. by Days</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>

                            </div>

                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <small>Age</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <small>Maint. Daily Dose</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>

                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8 mb-2">
                                    <div className="form-group mt-4">
                                        <input type="checkbox" id="Return2" className="d-none" />
                                        <label htmlFor="Return2">Merge Plan Rx Limitation</label>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <small>Quantity Over Time </small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-8 mb-2">
                                </div>
                                <div className="col-md-4 mb-2">
                                    <small>Days Over Time </small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h5 className="mb-2">Mail Service Limitation</h5>
                            <div className="row mb-2">
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Daily Supply</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" placeholder="" name="" id="" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" placeholder="" name="" id="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Mail Service Fills</small>
                                        <input type="text" className="form-control" name="" id="" />
                                    </div>
                                </div>
                            </div>

                            <h5 className="mb-2">Member Rigistration</h5>

                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Valid Relationship</small>
                                    <select className="form-select">
                                        <option value="">Select</option>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <small>Gender Restrictions - (Not Covered)</small>
                                    <div className="row">
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <input type="checkbox" id="male" className="d-none" />
                                                <label htmlFor="male"> Male</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <input type="checkbox" id="female" className="d-none" />
                                                <label htmlFor="female"> Female</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <input type="checkbox" id="none" className="d-none" />
                                                <label htmlFor="none"> None</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5 className="mb-2">Pricing Overrides</h5>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Alt Price Schedule</small>
                                    <input type="text" className="form-control" name="" id="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Alt Copay Schedule</small>
                                    <input type="text" className="form-control" name="" id="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Brand Copay Amount</small>
                                    <input type="text" className="form-control" name="" id="" />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Generic Copay Amount</small>
                                    <input type="text" className="form-control" name="" id="" />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Max Allowable Amount</small>
                                    <input type="text" className="form-control" name="" id="" />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export function GPIValidationsOverride(props) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const [selctedNdc, setSelctedNdc] = useOutletContext();

    useEffect(() => { reset(selctedNdc) }, [selctedNdc]);

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">Validations</h5>
                        </div>
                        <div className="col-md-3 mb-2">
                            <small>Provider</small>
                            <div className="form-group">
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <small>Prescriber</small>
                            <div className="form-group">
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <small>Specilty</small>
                            <div className="form-group">
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <small>Diagnosis</small>
                            <div className="form-group">
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="clearfix mb-2"></div>


                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Processing Overrides</h5>
                        </div>
                        <div className="col-md-4 mb-2">
                            <small>Generic Indicator</small>
                            <select className="form-select">
                                <option value="">Select</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-2">
                            <small>Denial Override Code</small>
                            <input type="text" className="form-control" name="" id="" />
                        </div>
                        <div className="col-md-4 mb-2">
                            <small>Denial Override Code</small>
                            <input type="text" className="form-control" name="" id="" placeholder="Not Allowed" readOnly />
                        </div>

                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Include/Exclude</h5>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="one" className="d-none" />
                                <label htmlFor="one">Exclude Single Source Brand Drugs</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="two" className="d-none" />
                                <label htmlFor="two">Exclude Multi-Source Brand Drugs</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="three" className="d-none" />
                                <label htmlFor="three">Exclued Original with Generic Drugs</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="four" className="d-none" />
                                <label htmlFor="four">Exclued Generic Drugs</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}