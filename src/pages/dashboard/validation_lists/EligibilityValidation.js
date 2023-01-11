import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../../loader/loader';
import EmptyRowComponent from '../../../shared/NoDataFound';
import { toast } from 'react-toastify';
import {useAuth} from '../../../hooks/AuthProvider';


export default function EligibilityValidation() {
    const scollToRef = useRef();
    const [eligibilityDataList, setEligibilityDataList] = useState([]);
    const [selectedEligbility, setSelectedEligbility] = useState('');
    const [adding, setAdding] = useState(false);

    //loaders
    const [loading, setLoading] = useState(false);

    const clearForm = () => {
        setAdding(false);
        setSelectedEligbility('');
        document.getElementById('eligibilityForm').reset();
    }

    const resetForm = () => {
        setAdding(false);
        setSelectedEligbility('');
        document.getElementById('eligibilityForm').reset();
    }

    const searchEligibility = (fdata) => {
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/eligibility/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setEligibilityDataList([]);
                    return Promise.reject(error);

                } else {
                    setEligibilityDataList(data.data);
                    setLoading(false);
                    return;
                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getEligibilityItem = (elig_list_id) => {

        var test = {};
        test.ndc_exception_list = elig_list_id;

        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/eligibility/details/${elig_list_id}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setSelectedEligbility([]);
                    return Promise.reject(error);
                } else {
                    setSelectedEligbility(data.data);
                    setAdding(true);
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

            <SearchEligibility searchEligibility={searchEligibility} />

            <EligibilityList key='EligibilityList' eligibilityListData={eligibilityDataList} getEligibilityItem={getEligibilityItem} selectedEligbility={selectedEligbility} loading={loading} clearForm={clearForm} adding={adding} resetForm={resetForm} />


        </>
    )
}

function SearchEligibility(props) {


    const searchEligibility = (fdata) => {
        props.searchEligibility(fdata);
    }

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Eligibility Validation ID/Name</small>
                                <input type="text" onKeyUp={(e) => searchEligibility(e)} className="form-control" placeholder='Start typing eligibility validation ID/name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function EligibilityList(props) {

    const scollToRef = useRef();

    useEffect(() => { }, [props.selectedEligbility]);

    const getEligibilityItem = (ndciemid) => {
        props.getEligibilityItem(ndciemid);
    }

    const getNDCItemDetails = (ndciemid) => {
        props.getNDCItemDetails(ndciemid);
    }

    const eligibilityListArray = [];
    if (props.eligibilityListData.length > 0) {
        for (let i = 0; i < props.eligibilityListData.length; i++) {
            eligibilityListArray.push(<EligibilityRow key={'EligibilityRow'+i} eligibilityListRow={props.eligibilityListData[i]} getEligibilityItem={getEligibilityItem} selected={props.selectedEligbility} loading={props.loading} />);
        }
    } else {
        eligibilityListArray.push(<EmptyRowComponent key='EmptyRowComponent' colSpan='2' />);
    }

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
                                                {props.loading?<LoadingSpinner colSpan='2'/>:eligibilityListArray}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <EligibilityForm viewEligibilityFormdata={props.selectedEligbility} clearForm={props.clearForm} adding={props.adding} resetForm={props.resetForm} />
                    </div>
                </div>
            </div>
        </>
    )
}


function EligibilityRow(props) {

    useEffect(() => {
    }, [props.selected]);

    return (
        <>
            <tr className={(props.selected && props.eligibilityListRow.elig_validation_id == props.selected.elig_validation_id  ? ' tblactiverow ' : '')}

                onClick={() => props.getEligibilityItem(props.eligibilityListRow.elig_validation_id)}
            >
                <td>{props.eligibilityListRow.elig_validation_id}</td>
                <td >{props.eligibilityListRow.elig_validation_name}</td>
            </tr>
        </>
    )
}

function EligibilityForm(props) {

    const { register, reset, handleSubmit,  formState: { errors } } = useForm();
    const { user } = useAuth();

    const setFamily = () => {
        reset({cardholder_covd:true, spouse_covd:true, child_covd:true, student_covd:true, disabled_dep_covd:true })
    }
    const setAll = () => {
        reset({cardholder_covd:true, spouse_covd:true, child_covd:true, student_covd:true, disabled_dep_covd:true,adult_dep_covd:true, sig_other_covd:true })
    }

    useEffect(() => {
        if (!props.adding) {
            reset({ elig_validation_id: '', elig_validation_name: '', age_limit_opt:'', agelimit_month:'', age_limit_day:'', cardholder_covd:'',  spouse_covd:'', child_covd:'', child_age_limit:'', student_covd:'', student_age_limit:'', disabled_dep_covd:'', dis_dep_age_limit:'' , adult_dep_covd:'', sig_other_covd:'', new:1},{keepValues:false});
        } else {
            reset(props.viewEligibilityFormdata);
        }
    },[props.viewEligibilityFormdata])

    const addEligibilityFormData = (formData) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/eligibility/submit-eligiblity-form`, requestOptions).then(async response => {
            const isJson = response.headers.get('Content-Type') ?. includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
                toast.error("There was an error !", {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined
                });
            } else {
                toast.success(data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined
                });
                props.resetForm();

            }
        }).catch(error => {
            console.error('There was an error !', error);
        });
    }
    const [isReadonlyChild, setIsReadonlyChild] = useState(true);
    const [isReadonlyStudent, setIsReadonlyStudent] = useState(true);
    const [isReadonlyDisabled, setIsReadonlyDisabled] = useState(true);

    return (
        <>
            <div className="col-md-8">
                <form id="eligibilityForm" name="eligibilityForm" onSubmit={handleSubmit(addEligibilityFormData)}>
                <input type="hidden" name="user_name" value={user.name} {...register('user_name')} />
                <div className="col-md-6">
                    <h5 className="mb-2">Eligibility Identification</h5>
                </div>
                <div className="row mb-2">
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small> Eligibility Validation ID: </small>
                                <input type="text" name="elig_validation_id" {...register('elig_validation_id', {required:true})} placeholder="Eligibility Validation Id" className="form-control" />
                                {errors.elig_validation_id && <span><p className="notvalid">This field is required!</p></span>}
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Eligibility Validation Name: </small>
                                <input type="text" name="elig_validation_name"  {...register('elig_validation_name',{required:true})} placeholder="Eligibility Validation Name" className="form-control" />
                                {errors.elig_validation_name && <span><p className="notvalid">This field is required!</p></span>}
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
                            <select className="form-select" name="age_limit_opt" {...register('age_limit_opt', {required:true})}>
                                <option value="">--Select--</option>
                                <option value="0">Through Birthday</option>
                                <option value="1">Up to birth day</option>
                                <option value="2">Through week that birth day occurs</option>
                                <option value="3">Through month that birth day occurs</option>
                                <option value="4">Through year that birth day occurs</option>
                                <option value="5">Through specified date</option>
                                </select>
                                {errors.age_limit_opt && <span><p className="notvalid">This field is required!</p></span>}
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small> Age Limit Month: </small>
                            <select className="form-select" name="agelimit_month" {...register('agelimit_month')} >
                                <option value="">--Select--</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                                </select>
                                {errors.agelimit_month && <span><p className="notvalid">This field is required!</p></span>}
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Age Limit Day: </small>
                            <input type="text" name="age_limit_day"  {...register('age_limit_day')} placeholder="Age Limit Day" className="form-control" maxLength='2'/>
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
                                    <input type="checkbox" name="cardholder_covd" {...register('cardholder_covd')} id="Return2" className="d-none"  />
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
                                        <input onClick={() => { setIsReadonlyChild(prevState => !prevState) }} type="checkbox" id="Return4" {...register('child_covd')} className="d-none" />
                                    <label htmlFor="Return4"></label>
                                </div>
                            </td>
                            <td>
                                    <div className="form-group">
                                        <input readOnly={props.viewEligibilityFormdata.child_covd == true || props.viewEligibilityFormdata.child_covd == undefined ?isReadonlyChild:''} maxLength='3' type="text" className="form-control" name="child_age_limit"  {...register('child_age_limit')} />
                                        {errors.child_age_limit && <span><p className="notvalid">This field is required!</p></span>}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Student </td>
                            <td>
                                <div className="form-group mt-2">
                                    <input type="checkbox" id="Return8" name="student_covd" {...register('student_covd')} className="d-none" onClick={()=>{setIsReadonlyStudent(prevState =>! prevState)}} />
                                    <label htmlFor="Return8"></label>
                                </div>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input readOnly={props.viewEligibilityFormdata.student_age_limit == true || props.viewEligibilityFormdata.student_age_limit == undefined ?isReadonlyStudent:''} type="text" className="form-control" name="student_age_limit" {...register('student_age_limit')} maxLength='3' />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Disabled Dependent</td>
                            <td>
                                <div className="form-group mt-2">
                                    <input type="checkbox" id="Return5" name="disabled_dep_covd" {...register('disabled_dep_covd')} className="d-none" onClick={() =>{setIsReadonlyDisabled(prevState => !prevState)} } />
                                    <label htmlFor="Return5"></label>
                                </div>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input readOnly={props.viewEligibilityFormdata.dis_dep_age_limit == true || props.viewEligibilityFormdata.dis_dep_age_limit == undefined ?isReadonlyDisabled:''} type="text" className="form-control" name="dis_dep_age_limit" {...register('dis_dep_age_limit')} maxLength='3'/>
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
                        <button type='button' onClick={e => setFamily(e)}  className="btn btn-primary">Set Family</button>&nbsp;&nbsp;
                        <button type='button' onClick={e => setAll(e)} className="btn btn-danger">Set All</button>&nbsp;&nbsp;
                        <button type='button' className="btn btn-warning " onClick={e => props.clearForm(e)}>Clear</button>&nbsp;&nbsp;
                        <button type='submit' className="btn btn-primary">{ props.adding?'Update':'Add'}</button>
                    </div>
                </form>
            </div>

        </>
    )
}