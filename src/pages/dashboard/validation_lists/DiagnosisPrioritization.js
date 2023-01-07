import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';
import DraggableList from "react-draggable-lists";
import LoadingSpinner from '../../../loader/loader';
import EmptyRowComponent from '../../../shared/NoDataFound';
import Footer from '../../../shared/Footer';
import {useAuth} from '../../../hooks/AuthProvider';

export default function DiagnosisPrioritization() {


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');

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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosis/get/${ndcid}`, requestOptions)
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
        //  console.log(ndcid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/details/${ndcid}`, requestOptions)
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
                    // console.log(selctedNdc);
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

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
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



            <DiagnosisPrioritizationList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} getNDCItemDetails={getNDCItemDetails} selctedNdc={selctedNdc} />




            <DiagPrioritizeForm viewDiagnosisFormdata={selctedNdc} />


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
            {/* <DiagnosisPrioritizationList /> */}
        </>
    )
}

function DiagnosisPrioritizationList(props) {


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
        ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} getNDCItemDetails={getNDCItemDetails} selected={props.selctedNdc} />);
    }

    const ndcClassArray = [];
    for (let j = 0; j < props.ndcClassData.length; j++) {
        ndcClassArray.push(<NdcClassRow ndcClassRow={props.ndcClassData[j]} getNDCItemDetails={getNDCItemDetails} selected={props.selctedNdc} />);
    }

    const [ncdListData, setNcdListData] = useState();
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

                                                {ndcListArray}

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

    // const [selctedNdc, setSelctedNdc] = useOutletContext()



    // useEffect(() => {  [props.viewDiagnosisFormdata]});

    // useEffect(() => { }, [props.viewDiagnosisFormdata]);

    useEffect(() => { reset(props.viewDiagnosisFormdata) }, [props.viewDiagnosisFormdata]);


    // console.log(props.viewDiagnosisFormdata);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Priotrize Diagnosis List ID</small>
                                <input type="text" className="form-control" name="diagnosis_id" {...register('diagnosis_id')} id="" placeholder="" required />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Priotrize Diagnosis List Name</small>
                                <input type="text" className="form-control" name="exception_name" {...register('exception_name')} id="" placeholder="" required />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group ">
                                <small> Priotrize Diagnosis ID </small>
                                <div className="searchmodal">
                                    <input type="text" name="diagnosis_id" {...register('diagnosis_id')} className="form-control" placeholder="" />
                                    <button className="btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Priotrize Diagnosis Status</small>
                                <select className="form-select" name="diagnosis_status" {...register('diagnosis_status')}>
                                    <option value="">--select--</option>
                                    <option value="A">Approved</option>
                                    <option value="R">Rejected</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>click on list and drag new position to assign new priority</div>
                    <Row>
                        <Col>
                            {/* <DiagPrioritizeDragable  data={props.viewDiagnosisFormdata} /> */}
                            {/* <DraggableList width={300} height={50} rowSize={1} className="draggablelist">
                                {props.viewDiagnosisFormdata ?
                                    props.viewDiagnosisFormdata.map((item, index) => (
                                        // console.log(item.diagnosis_list)

                                        <li key={index}>{`${index + 1}.  ${item.diagnosis_list}`}</li>
                                        ))
                                    : ''}














                            </DraggableList> */}
                        </Col>
                    </Row>
                </div>
            </div>



        </>
    )
}


function NdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.diagnosis_list == props.selected.diagnosis_list ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItemDetails(props.ndcRow.diagnosis_list)}
            >
                <td>{props.ndcRow.diagnosis_list}</td>
                <td >{props.ndcRow.exception_name}</td>

                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function DiagPrioritizeDragable(props) {

    const listItems = [
        "Entertainment",
        "Private Time",
        "Rest",
        "Meal",
        "Exercise",
        "Work",
        "Home Projects",
        "Family"
    ];

    const index = 0;



    useEffect(() => {

        if (props.data == '') {

        }

    }, [props.data]);
    return (
        <>

        </>
    )
}
