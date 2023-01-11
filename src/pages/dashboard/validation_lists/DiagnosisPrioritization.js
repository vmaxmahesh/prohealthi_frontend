import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';
import DraggableList from "react-draggable-lists";
import LoadingSpinner from '../../../loader/loader';
import EmptyRowComponent from '../../../shared/NoDataFound';
import Footer from '../../../shared/Footer';
import { useAuth } from '../../../hooks/AuthProvider';
import { toast } from 'react-toastify';

export default function DiagnosisPrioritization() {

    const scollToRef = useRef();
    const scollToRef2 = useRef();
    //loaders
    const [loading, setLoading] = useState('');
    const [prioritizationDiagnosisData, setPrioritizationDiagnosisData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selectedDiagnosis, setSelectedDiagnosis] = useState(false);
    const [selectedDiagnosisRow, setSelectedDiagnosisRow] = useState()
    const [diagnosisValidationData, setDiagnosisValidationData] = useState([]);
    const [diagnosisDetails, setDiagnosisDetails] = useState([]);
    const [adding, setAdding] = useState(false);

    const clearForm = () => {
        setAdding(false);
        document.getElementById('DiagnosisForm').reset();
    }

    const resetForm = () => {
        setAdding(false);
        document.getElementById('DiagnosisForm').reset();
    }


    // getDiagnosisvalidationList
    const getDiagnosisvalidationList = (diagnosis_list) => {
        var test = {};
        test.diagnosis_list = diagnosis_list;
        setSelectedDiagnosis(test);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/validation-list/${diagnosis_list}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setDiagnosisValidationData(data.data);
                    scollToRef.current.scrollIntoView()
                    return;
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    // getDiagnosisDetails
    const getDiagnosisDetails = (diagnosis_data) => {
        var diagnosis_list = diagnosis_data.diagnosis_list;
        var diagnosis_id = diagnosis_data.diagnosis_id
        var test = {};
        test.diagnosis_id = diagnosis_id;
        setSelectedDiagnosisRow(test);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/details/${diagnosis_list}/${diagnosis_id}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setDiagnosisDetails(data.data);
                    setAdding(true);
                    scollToRef2.current.scrollIntoView()
                    return;
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const searchException = (fdata) => {
        setLoading(true)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setPrioritizationDiagnosisData([]);
                    return Promise.reject(error);

                } else {
                    setPrioritizationDiagnosisData(data.data);
                    setLoading(false)
                    return;
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
                            <li><a href="">Diagnosis Prioritization</a></li>
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

            <SearchDiagPrioritization searchException={searchException} />
            <DiagnosisPrioritizationList prioritizationDiagnosisListData={prioritizationDiagnosisData} ndcClassData={ndcClass} getDiagnosisvalidationList={getDiagnosisvalidationList} selectedDiagnosis={selectedDiagnosis} loading={loading} diagnosisValidationData={diagnosisValidationData} getDiagnosisDetails={getDiagnosisDetails} selectedDiagnosisRow={selectedDiagnosisRow} scollToRef={scollToRef} />

            <div ref={scollToRef2}>
                <DiagPrioritizeForm viewDiagnosisFormdata={diagnosisDetails} clearForm={clearForm} adding={adding} resetForm={resetForm} />
            </div>

        </>
    )
}

function SearchDiagPrioritization(props) {

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
                                <small>Diagnosis Prioritization Validation ID/Name</small>
                                <input type="text" onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing diagnosis prioritization validation ID/name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function DiagnosisPrioritizationList(props) {
    const scollToRef = useRef();

    useEffect(() => { }, [props.selectedDiagnosis]);

    const getNDCItem = (ndciemid) => {
        props.getNDCItem(ndciemid);
    }

    const getDiagnosisvalidationList = (diagnosis_data) => {
        props.getDiagnosisvalidationList(diagnosis_data);
    }
    const getDiagnosisDetails = (diagnosis_data) => {
        props.getDiagnosisDetails(diagnosis_data);
    }

    const priorityDiagnosisListArray = [];
    if (props.prioritizationDiagnosisListData.length > 0) {
        for (let i = 0; i < props.prioritizationDiagnosisListData.length; i++) {
            priorityDiagnosisListArray.push(<PrioritizeDiagnosisRow prioritizeDiagnosisRow={props.prioritizationDiagnosisListData[i]} getDiagnosisvalidationList={getDiagnosisvalidationList} selected={props.selectedDiagnosis} />);
        }
    } else {
        priorityDiagnosisListArray.push(<EmptyRowComponent colSpan='2'/>)
    }


    const diagnosisValidationArray = [];
    if(props.diagnosisValidationData.length>0){
        for (let j = 0; j < props.diagnosisValidationData.length; j++) {
            diagnosisValidationArray.push(<DiagnosisValidationRow diagnosisValidationRow={props.diagnosisValidationData[j]} getDiagnosisvalidationList={getDiagnosisvalidationList} selected={props.selectedDiagnosisRow} getDiagnosisDetails={getDiagnosisDetails} />);
        }
    } else {
        diagnosisValidationArray.push(<EmptyRowComponent colSpan='5'/>)
    }


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Prioritize Diagnosis List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                        </div>
                        <div className="col-md-12">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Diagnosis Validation ID</th>
                                                    <th>Diagnosis Validation Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {props.loading?<LoadingSpinner colSpan='2'/>: priorityDiagnosisListArray}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-3 mb-3" ref={props.scollToRef}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Validations Diagnosis List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                        </div>
                        <div className="col-md-12">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Diagnosis Validation ID</th>
                                                    <th>Diagnosis Validation Name</th>
                                                    <th>Diagnosis Status</th>
                                                    <th>Diagnosis Priority</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.loading?<LoadingSpinner colSpan='5'/>: diagnosisValidationArray}
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

function DiagPrioritizeForm(props) {
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();

    useEffect(() => {
        if (!props.adding) {
            reset({diagnosis_list:'', exception_name:'', diagnosis_id:'', diagnosis_status:'' })
        } else {
            reset(props.viewDiagnosisFormdata)
        }
    }, [props.viewDiagnosisFormdata]);

    const updatePriorityData = (formData) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/submit-diagnosis-validation-form`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('Content-Type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    toast.error("There was an error !", {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                }else {
                    toast.success(data.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                    props.resetForm();

                }
            })
            .catch(error => {
                console.error('There was an error !', error);
            });
    }

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                <form id='DiagnosisForm' name='DiagnosisForm' onSubmit={handleSubmit(updatePriorityData)}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Priotrize Diagnosis List ID</small>
                                <input type="text" className="form-control" name="diagnosis_list" {...register('diagnosis_list')} id="" placeholder="" readOnly />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Priotrize Diagnosis List Name</small>
                                <input type="text" className="form-control" name="exception_name" {...register('exception_name')} id="" placeholder="" readOnly />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group ">
                                <small> Priotrize Diagnosis ID </small>
                                <div className="searchmodal">
                                    <input type="text" name="diagnosis_id" {...register('diagnosis_id')} className="form-control" placeholder="" readOnly/>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Priotrize Diagnosis Status</small>
                                <select className="form-select" name="diagnosis_status" {...register('diagnosis_status')} readOnly>
                                    <option value="">--select--</option>
                                    <option value="A">Approved</option>
                                    <option value="R">Rejected</option>
                                </select>
                            </div>
                            </div>
                            <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Priotrize Diagnosis priority</small>
                                <input type="text" name="priority" {...register('priority')} className="form-control" placeholder=""/>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 text-end">
                        <button type="submit" className="btn btn-primary ">{ props.viewDiagnosisFormdata ?'Update':'Add' } </button>&nbsp;&nbsp;
                                     <button onClick={e=>props.clearForm(e)} type="button" className="btn btn-danger"> Clear </button>
                        </div>
                </form>
                </div>
            </div>



        </>
    )
}


function PrioritizeDiagnosisRow(props) {

    useEffect(() => {  }, [props.selected]);
    return (
        <>
            <tr className={(props.selected && props.prioritizeDiagnosisRow.diagnosis_list == props.selected.diagnosis_list ? ' tblactiverow ' : '')}

                onClick={() => props.getDiagnosisvalidationList(props.prioritizeDiagnosisRow.diagnosis_list)}
            >
                <td>{props.prioritizeDiagnosisRow.diagnosis_list}</td>
                <td >{props.prioritizeDiagnosisRow.exception_name}</td>
            </tr>
        </>
    )
}

function DiagnosisValidationRow(props) {
    useEffect(() => {

    }, [props.selected]);
    return (
        <>
            <tr className={(props.selected && props.diagnosisValidationRow.diagnosis_id == props.selected.diagnosis_id ? ' tblactiverow ' : '')}

                onClick={() => props.getDiagnosisDetails(props.diagnosisValidationRow)}
            >
                <td>{props.diagnosisValidationRow.diagnosis_id}</td>
                <td >{props.diagnosisValidationRow.diagnosis_list}</td>
                <td >{props.diagnosisValidationRow.diagnosis_status=='A'?'Approved':'Rejected'}</td>
                <td >{props.diagnosisValidationRow.priority}</td>

            </tr>
        </>
    )
}
