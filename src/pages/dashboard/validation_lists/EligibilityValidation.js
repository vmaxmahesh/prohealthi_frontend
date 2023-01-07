import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';


export default function EligibilityValidation() {




    const scollToRef = useRef();


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');


    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/eligibility/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                console.log(data.data);

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
       

        // alert(ndcid);

        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/eligibility/details/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setSelctedNdc([]);
                    return Promise.reject(error);
                } else {
                    setSelctedNdc(data.data);
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
        //  console.log(ndcid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosis/details/${ndcid}`, requestOptions)
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
                    console.log(selctedNdc);
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




    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Validation List</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Eligibility</a></li>
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

            <SearchEligibility searchException={searchException} />

            <EligibilityList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} selctedNdc={selctedNdc} />


        </>
    )
}

function SearchEligibility(props) {


    const searchException = (fdata) => {
        // alert(fdata);

        props.searchException(fdata);
    }

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Eligibility Validation ID/Name</small>
                                <input type="text" onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing eligibility validation ID/name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <EligibilityList /> */}
        </>
    )
}

function EligibilityList(props) {

    const scollToRef = useRef();

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

    // const ndcClassArray = [];
    // for (let j = 0; j < props.ndcClassData.length; j++) {
    //     ndcClassArray.push(<NdcClassRow ndcClassRow={props.ndcClassData[j]} getNDCItemDetails={getNDCItemDetails} selected={props.selctedNdc} />);
    // }

    const [ncdListData, setNcdListData] = useState();
    const [show, setShow] = useState("none");
    const handleShow = () => setShow("block");
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Eligibility Validation List</h5>
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
                                                    <th>Eligibility Validation ID</th>
                                                    <th>Eligibility Validation Name</th>
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

                        <DiagnosisForm viewDiagnosisFormdata={props.selctedNdc} />


                    </div>
                </div>





            </div>
        </>
    )
}


function NdcRow(props) {

    useEffect(() => {
        console.log(props.selected);
    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.elig_validation_id == props.selected.elig_validation_id && props.ndcRow.elig_validation_name == props.selected.elig_validation_name   ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.elig_validation_id)}
            >
                <td>{props.ndcRow.elig_validation_id}</td>
                <td >{props.ndcRow.elig_validation_name}</td>

                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}




function DiagnosisForm(props) {

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();

    // const [selctedNdc, setSelctedNdc] = useOutletContext();

    useEffect(() => {
        reset(props.viewDiagnosisFormdata);
        console.log(props.viewDiagnosisFormdata);
    }, [props.viewDiagnosisFormdata]);

    return (
        <>


            <div className="col-md-8">
                <div className="col-md-6">
                    <h5 className="mb-2">Eligibility Identification</h5>
                </div>
                <div className="row mb-2">
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small> Eligibility Validation ID: </small>
                            <input type="text" name="elig_validation_id" {...register('elig_validation_id')} placeholder="" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Eligibility Validation Name: </small>
                            <input type="text" name="elig_validation_name"  {...register('elig_validation_name')} placeholder="100PC" className="form-control" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="col-md-6">
                    <h5 className="mb-2">Members History Information</h5>
                </div>
                <div className="row mb-2">
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small> Age Limit Verification: </small>
                            <select className="form-select" name="age_limit_opt" {...register('age_limit_opt')}>
                                <option value="1">Through Birthday</option>
                                <option value="2">Up to birth day</option>
                                <option value="3">Through week that birth day occurs</option>
                                <option value="3">Through month that birth day occurs</option>
                                <option value="4">Through year that birth day occurs</option>
                                <option value="5">Through specified date</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small> Age Limit Month: </small>
                            <select className="form-select" name="agelimit_month" {...register('agelimit_month')} >
                                <option value="1">Through Birthday</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Age Limit Day: </small>
                            <input type="text" name="age_limit_day"  {...register('age_limit_day')} placeholder="100PC" className="form-control" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="col-md-12">
                    <h5 className="mb-2">Relationship Verification Options</h5>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Relationship</th>
                            <th>Covered</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Cardholder</td>
                            <td>
                                <div className="form-group mt-2">
                                    <input type="checkbox" name="cardholder_covd" {...register('cardholder_covd')} id="Return2" className="d-none" />
                                    <label htmlFor="Return2"></label>
                                </div>
                            </td>
                            <td> </td>

                        </tr>

                        <tr>
                            <td>2</td>
                            <td>Spouse</td>
                            <td>
                                <div className="form-group mt-2">
                                    <input type="checkbox" id="Return3" name="spouse_covd" {...register('spouse_covd')} className="d-none" />
                                    <label htmlFor="Return3"></label>
                                </div>
                            </td>
                            <td> </td>

                        </tr>

                        <tr>
                            <td>3</td>
                            <td>Child</td>
                            <td>
                                <div className="form-group mt-2">
                                    <input type="checkbox" id="Return4" nam="child_covd" {...register('child_covd')} className="d-none" />
                                    <label htmlFor="Return4"></label>
                                </div>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="child_age_limit"  {...register('child_age_limit')} />
                                </div>
                            </td>

                        </tr>


                        <tr>
                            <td>4</td>
                            <td>Student </td>
                            <td>
                                <div className="form-group mt-2">
                                    <input type="checkbox" id="Return8" name="student_covd" {...register('student_covd')} className="d-none" />
                                    <label htmlFor="Return8"></label>
                                </div>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="student_age_limit" {...register('student_age_limit')} />
                                </div>
                            </td>

                        </tr>


                        <tr>
                            <td>5</td>
                            <td>Disabled Dependent</td>
                            <td>
                                <div className="form-group mt-2">
                                    <input type="checkbox" id="Return5" name="disabled_dep_covd" {...register('disabled_dep_covd')} className="d-none" />
                                    <label htmlFor="Return5"></label>
                                </div>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="dis_dep_age_limit" {...register('dis_dep_age_limit')} />
                                </div>
                            </td>

                        </tr>

                        <tr>
                            <td>7</td>
                            <td>Adult Dependent</td>
                            <td>
                                <div className="form-group mt-2">
                                    <input type="checkbox" id="Return6" name="adult_dep_covd" {...register('adult_dep_covd')} className="d-none" />
                                    <label htmlFor="Return6"></label>
                                </div>
                            </td>
                            <td></td>

                        </tr>

                        <tr>
                            <td>6</td>
                            <td>Significant Other</td>
                            <td>
                                <div className="form-group mt-2">
                                    <input type="checkbox" id="Return7" name="sig_other_covd" {...register('sig_other_covd')} className="d-none" />
                                    <label htmlFor="Return7"></label>
                                </div>
                            </td>
                            <td></td>

                        </tr>



                    </tbody>
                </table>

                <div className="col-md-6 ms-auto text-end mb-3">
                    <button href="" className="btn btn-primary">Set Family</button>&nbsp;&nbsp;
                    <button href="" className="btn btn-danger">Set All</button>&nbsp;&nbsp;
                    <button href="" className="btn btn-warning ">Clear</button>&nbsp;&nbsp;
                </div>
            </div>






        </>
    )
}