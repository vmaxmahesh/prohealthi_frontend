import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import LoadingSpinner from '../../../loader/loader';
import EmptyRowComponent from '../../../shared/NoDataFound';
import Footer from '../../../shared/Footer';
import AsyncSelect from 'react-select/async';

export default function DiagnosisValidation()
{


    const scollToRef = useRef();


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');
    const [SelectedDiagnosisList, setSelectedDiagnosisList] = useState('');
    const [loading, setloading] = useState();
    const [loader, setloader] = useState();

    const getDiagnosisLimitation = (diagnosis_list) => {
        setloader(true);

        var test = {};
        test.diagnosis_list = diagnosis_list;
        setSelectedDiagnosisList(test);
        // console.log(test.diagnosis_list);
        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/get/${diagnosis_list}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                // console.log(data.data);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setNdClass([]);
                    return Promise.reject(error);
                } else {
                    setNdClass(data.data);
                    setloader(false);
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

 //get diagnosis form data
    const getPriorityDiagnosisId = (rowData) => {
        let diagnosis_list = rowData.diagnosis_list;
        let diagnosis_id = rowData.diagnosis_id;
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
        setloading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/search?search=${fdata.target.value}`, requestOptions)
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
                    setloading(false);
                    return;
                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const AddForm = () => {
        scollToRef.current.scrollIntoView()
    }

    useEffect(() => { }, [ndcData, ndcClass, selctedNdc]);



    return(
        <>
         <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Validation List</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Diagnosis</a></li>
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

            <SearchDiagnosis searchException={searchException} />
            <DiagnosisList key='DiagnosisList' diagnosisListData={ndcData} ndcClassData={ndcClass} getDiagnosisLimitationsList={getDiagnosisLimitation} getPriorityDiagnosisId={getPriorityDiagnosisId} selctedNdc={selctedNdc} loading={loading} loader={loader} selected={SelectedDiagnosisList} />

            <DiagnosisForm viewDiagnosisFormdata={selctedNdc} />
            <Footer />

        </>
    )
}

function SearchDiagnosis(props)
{

    const searchException = (fdata) => {
        props.searchException(fdata);
    }
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Diagnosis Validation ID/Name</small>
                                <input type="text"  onKeyUp={(e) => searchException(e)} className="form-control" placeholder='Start typing diagnosis validation ID/name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function DiagnosisExceptionRow(props) {

    useEffect(() => {

    }, [props.selected]);


    return (
        <>
            <tr className={(props.selected && props.ndcRow.diagnosis_list == props.selected.diagnosis_list ? ' tblactiverow ' : '')}

                onClick={() => props.getDiagnosisLimitationsList(props.ndcRow.diagnosis_list)}
            >
                <td>{props.ndcRow.diagnosis_list}</td>
                <td >{props.ndcRow.exception_name}</td>

                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}


function PriorityDiagnosisRow(props) {
    useEffect(() => {
    }, [props.selected]);

    return (
        <>
            <tr
                className={(props.selected && props.ndcClassRow.diagnosis_id == props.selected.diagnosis_id ? ' tblactiverow ' : '')}
                onClick={() => props.getPriorityDiagnosisId(props.ndcClassRow)}

            >
                <td>{props.ndcClassRow.diagnosis_id}</td>
                <td>{props.ndcClassRow.diagnosis_list}</td>
            </tr>
        </>
    )
}

function DiagnosisList(props)
{

    const scollToRef = useRef();

    useEffect(() => { }, [props.selctedNdc]);
    // //  console.log(props.selctedNdc);

    const getDiagnosisLimitationsList = (ndciemid) => {
        props.getDiagnosisLimitationsList(ndciemid);
    }

    const getPriorityDiagnosisId = (ndciemid) => {
        props.getPriorityDiagnosisId(ndciemid);
    }

    const diagnosisListArray = [];
    if (props.diagnosisListData.length > 0) {
        for (let i = 0; i < props.diagnosisListData.length; i++) {
            diagnosisListArray.push(<DiagnosisExceptionRow ndcRow={props.diagnosisListData[i]} getDiagnosisLimitationsList={getDiagnosisLimitationsList} selected={props.selected} />);
        }
    } else {
        diagnosisListArray.push(<EmptyRowComponent colspan='2'/>)
    }

const priorityDiagnosisArray = [];
    for (let j = 0; j < props.ndcClassData.length; j++) {
        priorityDiagnosisArray.push(<PriorityDiagnosisRow ndcClassRow={props.ndcClassData[j]} getPriorityDiagnosisId={getPriorityDiagnosisId} selected={props.selctedNdc} />);
    }

    const [ncdListData, setNcdListData] = useState();
    const [show, setShow] = useState("none");
    const handleShow = () => setShow("block");
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Diagnosis Validation List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>
                        <div className="col-md-6">
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
                                                {props.loading?<LoadingSpinner/>:diagnosisListArray}
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Priority ID</th>
                                                    <th>Diagnosis</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.loader? <LoadingSpinner/>: priorityDiagnosisArray}
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

function DiagnosisForm(props)
{

    const { register, reset, handleSubmit, control, formState: { errors } } = useForm();

//diagnosis code drop down list
    const [inputValue, setinputValue] = useState('');
    const [selectedValue, setselectedValue] = useState('');

    //  handle input change event
  const handleInputChange = value => {
    setinputValue(value);
    };

     // handle selection
  const handleChange = value => {
    setselectedValue(value);
  }

//  load options using API call
    const loadOptions = (inputValue) => {
        return new Promise((resolve, reject) => {


            fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/diagnosis-code-list/${inputValue}`)
                .then((response) => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ diagnosis_id,description }) => ({
                            value: diagnosis_id,
                            label: diagnosis_id+' - '+description,
                        })),
                    );
                    // console.log(data);
                });
        });
    };

    // limitations drop down list
    const [inputLimitationValue, setinputLimitationValue] = useState('');
    const [selectedLimitationValue, setselectedLimitationValue] = useState('');

    //  handle input change event
  const handleLimitationInputChange = value => {
    setinputLimitationValue(value);
    };

     // handle selection
  const handleLimitationChange = value => {
    setselectedLimitationValue(value);
  }

//  load options using API call
    const loadLimitationsOptions = (inputLimitationValue) => {
        return new Promise((resolve, reject) => {


            fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/limitation-code-list/${inputLimitationValue}`)
                .then((response) => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ limitations_list,limitations_list_name }) => ({
                            value: limitations_list,
                            label: limitations_list_name,
                        })),
                    );
                    // console.log(data);
                });
        });
    };


    useEffect(() => { reset(props.viewDiagnosisFormdata) }, [props.viewDiagnosisFormdata]);
    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="col-md-12">
                                <h5 className="mb-2">Diagnosis Validations</h5>
                            </div>
                            <form>
                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Diagnosis List ID:</small>
                                       <input type="text" name="diagnosis_id" {...register('diagnosis_list')} placeholder="" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Diagnosis List Name: </small>
                                    <input type="text" name="diagnosis_list" {...register('exception_name')} placeholder="100PC" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group ">
                                         <small> Diagnosis ID: </small>
                                        <div className="searchmodal">
                                       {/* <input type="text" name="diagnosis_id" {...register('diagnosis_id')} className="form-control" placeholder="" autoComplete="off" /> */}
                                       {/* <button className="btn-info"><i className="fa-solid fa-magnifying-glass"></i></button> */}

                                       <Controller  name="diagnosis_id"
                                                control={control}
                                                // rules={{ required: false }}
                                                render={({ field }) => (
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                {...field}
                                                isClearable
                                                // value={selectedStateValue}
                                                // inputValue={props.selectedZipCodeValue.state_code}
                                                // getOptionLabel={e => e.label}
                                                // getOptionValue={e => e.value}
                                                loadOptions={loadOptions}
                                                onInputChange={handleInputChange}
                                                // onChange={handleStateChange}
                                                    />
                                                    )} />
                                       </div>
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Diagnosis Status: </small>
                                            <select className="form-select" name="diagnosis_status" {...register('diagnosis_status')}>
                                            <option value="">--select--</option>
                                            <option value="A">Approved</option>
                                            <option value="R">Rejected</option>
                                            </select>
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Priority: </small>
                                        <input type="text" name="priority" {...register('priority')} className="form-control" placeholder="" autoComplete="off" />
                                    </div>
                                </div>
                                <hr/>

                            <div className="row mb-2">
                                 <div className="col-md-12">
                                <h5 className="mb-2">Limitations Lists</h5>
                            </div>

                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Effective Date:</small>
                                          <input type="date" name="" placeholder="100PC" className="form-control" />
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Termination Date:</small>
                                          <input type="date" name="" placeholder="100PC" className="form-control" />
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Limitations List Date:</small>
                                           <div className="searchmodal">
                                       {/* <input type="text" name="" className="form-control" placeholder="" autoComplete="off" />
                                       <button className="btn-info"><i className="fa-solid fa-magnifying-glass"></i></button> */}
                                            <Controller  name="limitation_id"
                                                control={control}
                                                // rules={{ required: false }}
                                                render={({ field }) => (
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                {...field}
                                                isClearable
                                                // value={selectedStateValue}
                                                // inputValue={props.selectedZipCodeValue.state_code}
                                                // getOptionLabel={e => e.label}
                                                // getOptionValue={e => e.value}
                                                loadOptions={loadLimitationsOptions}
                                                onInputChange={handleLimitationInputChange}
                                                // onChange={handleStateChange}
                                                    />
                                                    )} />
                                       </div>
                                    </div>
                                </div>

                                <div className="col-md-12 text-end">
                                     <button className="btn btn-primary"> Add </button>
                                    <button className="btn btn-warning"> Remove </button>
                                     <button className="btn btn-danger"> Clear </button>
                                </div>
                       </div>
                       <hr/>
                       <DiagnosisTable />
                            </div>
                            </form>

                        </div>
                    </div>

        </>
    )
}

function DiagnosisTable()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-12">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Effective Date</th>
                                        <th>Termination Date</th>
                                        <th>Limitations List</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <tr>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                     <tr>
                                         <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>

                       </div>
                   </div>
                   </div>
                   </>
    )
}