import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';

export default function GPI() {
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



    useEffect(() => { }, [ndcData, ndcClass, selctedNdc]);

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
                                <small>GPI ID/Name</small>
                                <input type="text" onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing NDC ID/Name' {...register("ndc_id", { required: true })} />

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
                            <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add GPI List</button>
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>GPI EXCEPTION ID</th>
                                                    <th>GPI EXCEPTION NAME</th>
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
                                                    <th>eff. Date</th>
                                                    <th>New drug status</th>
                                                    <th>Process rule</th>
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
            <tr onClick={() =>props.getNDCItem(props.ndcRow.gpi_exception_list)}
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

    const [selctedNdc, setSelctedNdc] = useState({});


    const currentpath = location.pathname.split('/').pop();

    useEffect(() => { setSelctedNdc(props.selectedNdc) }, [props.selectedNdc, selctedNdc]);
    // //  console.log(selctedNdc);

    return (
        <>
            <div className="data">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">

                    <Link to="process-rule" className={'nav-link' + (currentpath == 'process-rule' ? ' active' : '')}>Process Rules</Link>
                    <Link to="rx-limitation-pricing" className={'nav-link' + (currentpath == 'rx-limitation-pricing' ? ' active' : '')}>Rx Limitations/Pricing</Link>
                    <Link to="validation-override" className={'nav-link' + (currentpath == 'validation-override' ? ' active' : '')}>Validations/Override</Link>

                </div>
                <div className="tab-content" id="nav-tabContent">
                    <Outlet context={[selctedNdc, setSelctedNdc]} />

                </div>
            </div>
        </>
    )
}

export function GPIProcessRule(props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const [selctedNdc, setSelctedNdc] = useOutletContext();

    useEffect(() => { reset(selctedNdc) }, [selctedNdc]);
    //  console.log(selctedNdc);

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
                                        <input type="text"  {...register("exception_list", {})} className="form-control" name="" id="" placeholder="Enter ID" />
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
                                        <label htmlFor="user">User will Exit will not be Invoked for this Section</label>
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