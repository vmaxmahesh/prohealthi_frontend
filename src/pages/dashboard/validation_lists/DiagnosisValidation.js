import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import LoadingSpinner from '../../../loader/loader';
import EmptyRowComponent from '../../../shared/NoDataFound';
import Footer from '../../../shared/Footer';
import AsyncSelect from 'react-select/async';
import { toast } from "react-toastify";
import { useAuth } from '../../../hooks/AuthProvider';

export default function DiagnosisValidation()
{


    const scollToRef = useRef();


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);

    const [selctedNdc, setSelctedNdc] = useState('');
    const [SelectedDiagnosisList, setSelectedDiagnosisList] = useState('');
    const [loading, setloading] = useState();
    const [loader, setloader] = useState();

    const [priorityDiagnosisFromData, setpriorityDiagnosisFromData] = useState('');
    const [selectLimitationLists, setSelectLimitationLists] = useState('');
    const [adding, setAdding] = useState(false);

    const clearForm = (e) => {
        setAdding(false);
        // setLimitationFormData([]);
        document.getElementById('diagnisisIdForm').reset();
    }
    const resetForm = (e) => {
        setAdding(false);
        document.getElementById('diagnisisIdForm').reset();
    }


//get priority data here name is different
    const getDiagnosisLimitation = (data) => {
        setloader(true);

        var test = {};
        test.diagnosis_list = data.diagnosis_list;
        setSelectedDiagnosisList(test);
        setpriorityDiagnosisFromData(data);
        // console.log(data);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/get/${data.diagnosis_list}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
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
                    setAdding(true);
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

 //get limitation row data here name
    const getPriorityDiagnosisId = (rowData) => {
        let diagnosis_list = rowData.diagnosis_list;
        let diagnosis_id = rowData.diagnosis_id;
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/diagnosis_limitations/${diagnosis_list}/${diagnosis_id}`, requestOptions)
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
                    setSelectLimitationLists(data.data);
                    scollToRef.current.scrollIntoView()
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

//get diagnosis form data on click here
    const getpriorityDiagnosisFromData = (formData) => {
        setpriorityDiagnosisFromData(formData);
        scollToRef.current.scrollIntoView();
    }

//search diagnosis code/description data here
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

            <SearchDiagnosis key='SearchDiagnosis' searchException={searchException} />
            <DiagnosisList key='DiagnosisList' diagnosisListData={ndcData} ndcClassData={ndcClass} getDiagnosisLimitationsList={getDiagnosisLimitation} getPriorityDiagnosisId={getPriorityDiagnosisId} selctedNdc={priorityDiagnosisFromData} loading={loading} loader={loader} selected={SelectedDiagnosisList} getpriorityDiagnosisFromData={getpriorityDiagnosisFromData}  />

            <div ref={scollToRef}>
                <DiagnosisForm key='DiagnosisForm' viewDiagnosisFormdata={priorityDiagnosisFromData} limitationListData={selectLimitationLists} adding={adding} clearForm={clearForm} resetForm={resetForm} />
            </div>
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

                onClick={() => props.getDiagnosisLimitationsList(props.ndcRow)}
            >
                <td>{props.ndcRow.diagnosis_list}</td>
                <td >{props.ndcRow.exception_name}</td>
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
                onClick={() => { props.getpriorityDiagnosisFromData(props.ndcClassRow); props.getPriorityDiagnosisId(props.ndcClassRow) }}

            >
                <td>{props.ndcClassRow.priority}</td>
                <td>{props.ndcClassRow.diagnosis_id}</td>
            </tr>
        </>
    )
}




function DiagnosisList(props)
{

    useEffect(() => { }, [props.selctedNdc]);

    const getDiagnosisLimitationsList = (ndciemid) => {
        props.getDiagnosisLimitationsList(ndciemid);
    }

    const getPriorityDiagnosisId = (ndciemid) => {
        props.getPriorityDiagnosisId(ndciemid);
    }

    const diagnosisListArray = [];
    if (props.diagnosisListData.length > 0) {
        for (let i = 0; i < props.diagnosisListData.length; i++) {
            diagnosisListArray.push(<DiagnosisExceptionRow key={'DiagnosisExceptionRow'+i} ndcRow={props.diagnosisListData[i]} getDiagnosisLimitationsList={getDiagnosisLimitationsList} selected={props.selected} />);
        }
    } else {
        diagnosisListArray.push(<EmptyRowComponent colSpan='2' key='EmptyRowComponent'/>)
    }

    const priorityDiagnosisArray = [];
    if (props.ndcClassData.length > 0) {
        for (let j = 0; j < props.ndcClassData.length; j++) {
            priorityDiagnosisArray.push(<PriorityDiagnosisRow   ndcClassRow={props.ndcClassData[j]} getPriorityDiagnosisId={getPriorityDiagnosisId} selected={props.selctedNdc} getpriorityDiagnosisFromData={props.getpriorityDiagnosisFromData} />);
        }
    } else {
        priorityDiagnosisArray.push(<EmptyRowComponent colSpan='2'/>)
    }



    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Diagnosis Validation List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
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
                                                {props.loading?<LoadingSpinner colSpan='2'/>:diagnosisListArray}
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
                                                {props.loader? <LoadingSpinner colSpan='2'/>: priorityDiagnosisArray}
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
    const [selectedValue, setselectedValue] = useState(props.viewDiagnosisFormdata.diagnosis_id);


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


    const [limitationFormData, setLimitationFormData] = useState('');
    const getLimitationsRow = (data) => {
        setLimitationFormData(data);
    }
    const { user } = useAuth();



    useEffect(() => {

        if (props.adding) {
            reset({ diagnosis_list: '', exception_name: '',diagnosis_id:'',priority:'',diagnosis_status:'', new: 1 }, {
                    keepValues:false,
                })
        } else {

            reset({ diagnosis_list: '', exception_name: '',diagnosis_id:'',priority:'',diagnosis_status:'', new: 1 }, {
                keepValues:false,
            })
        }

        if (!props.viewDiagnosisFormdata) {

            reset({ diagnosis_list: '',exception_name:'',diagnosis_id:'',priority:'',diagnosis_status:'', new: 1 }, {
                keepValues: false,
            })
        }
    }, [props.viewDiagnosisFormdata, props.adding]);

    useEffect(() => {
        reset(props.viewDiagnosisFormdata), reset(limitationFormData)
    }, [props.viewDiagnosisFormdata, limitationFormData]);


    const addDiagnosisData = (DiagnosisFormData) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(DiagnosisFormData)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/submit-diagnosis-form`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('Content-Type')?.includes('application/json');
                const data = isJson && await response.json();
                // console.log(response);
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
                } else {
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


    const addDiagnosisLimitationData = (DiagnosisLimitationFormData) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(DiagnosisLimitationFormData)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/diagnosisvalidation/submit-diagnosis-limitation-form`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('Content-Type')?.includes('application/json');
                const data = isJson && await response.json();
                // console.log(response);
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
                } else {
                    toast.success(data.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });

                }
                // reset({ diagnosis_list: '',exception_name:'',diagnosis_id:'',priority:'',diagnosis_status:'' }, {
                //     keepValues: false,
                // });


            })
            .catch(error => {
                console.error('There was an error !', error);
            });
        }



    // useEffect(() => { reset(limitationFormData) }, [limitationFormData]);
    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="col-md-12">
                                <h5 className="mb-2">Diagnosis Validations</h5>
                            </div>

                    <div className="row mb-2">
                        <form id='diagnisisIdForm' name='diagnisisIdForm' onSubmit={handleSubmit(addDiagnosisData)}>
                            {props.viewDiagnosisFormdata.diagnosis_id ? <input type='hidden' {...register('updateForm')} value='update' />:<input type='hidden' {...register('updateForm')} value='update' />}
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                    <small> Diagnosis List ID:</small>
                                    {props.viewDiagnosisFormdata?<input  type="text" name="diagnosis_list" {...register('diagnosis_list',{required:true})}  placeholder="" className="form-control" readonly='readonly' />:<input maxLength='10'  type="text" name="diagnosis_list" {...register('diagnosis_list',{required:true})}  placeholder="Diagnosis List Id" className="form-control" />}

                                    <input type="hidden" className="form-control" name="user_name" {...register('user_name')} value={user.name} />
                                    {errors.diagnosis_list && <span><p className="notvalid">This field is required!</p></span>}
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Diagnosis List Name: </small>
                                    <input type="text" name="exception_name" {...register('exception_name', {required:true})} placeholder="Diagnosis List Name" className="form-control" />
                                    {errors.exception_name && <span><p className="notvalid">This field is required!</p></span>}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group ">
                                         <small> Diagnosis ID: </small>
                                        <div className="searchmodal">

                                       <Controller  name="diagnosis_id"
                                                control={control}
                                                // rules={{ required: false }}
                                                render={({ field }) => (
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                {...field}
                                                isClearable
                                                value={selectedValue}
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
                                    <input type="text" name="priority" {...register('priority' )} className="form-control" placeholder="" autoComplete="off" />
                                    {errors.priority && <span><p className="notvalid">This field is required!</p></span>}
                                    </div>
                            </div>
                            <div class="col-md-12 text-end mt-3 mb-3" >
                                <button type="submit" className="btn btn-primary "> {props.viewDiagnosisFormdata.diagnosis_list ? 'Update' : 'Add'} </button>
                                    {/* <button type="button" className="btn btn-warning" > Remove </button> */}
                                <button type="button" className="btn btn-danger" onClick={e => props.clearForm(e)}> Clear </button>
                                </div>
                            </form>
                    <hr/>
                        <form id='diagnisisLimitationIdForm' name='diagnisisLimitationIdForm' onSubmit={handleSubmit(addDiagnosisLimitationData)}>
                        <input type="hidden" className="form-control" name="user_name" {...register('user_name')} value={user.name} />
                            <div className="row mb-2">
                                 <div className="col-md-12">
                                <h5 className="mb-2">Limitations Lists</h5>
                            </div>

                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Effective Date:</small>
                                          <input type="date" name="effective_date" {...register('effective_date')} placeholder="Effective Date" className="form-control" />
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Termination Date:</small>
                                          <input type="date" name="termination_date" {...register('termination_date')} placeholder="Termination Date" className="form-control" />
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Limitations List Date:</small>
                                           <div className="searchmodal">

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
                                    <button type="submit" className="btn btn-primary "> { limitationFormData ?'Update':'Add'} </button>
                                    {/* <button type="button" className="btn btn-warning" > Remove </button> */}
                                     <button type="button" className="btn btn-danger" onClick={e=> props.clearForm(e)}> Clear </button>
                                </div>
                        </div>
                        </form>
                       <hr/>
                            <DiagnosisTable key='DiagnosisTable' limitationTbaleData={ props.limitationListData } getLimitationsRow={getLimitationsRow} />
                        </div>


                        </div>
                    </div>

        </>
    )
}

function LimitationListRow(props) {
    return (
        <>
            <tr className={(props.selected && props.limitationListRows == props.selected.diagnosis_id ? ' tblactiverow ' : '')}
                onClick={() => props.getLimitationsRow(props.limitationListRows) }>
                <td>{ props.limitationListRows.effective_date}</td>
                <td>{ props.limitationListRows.termination_date}</td>
                <td>{ props.limitationListRows.limitations_list}</td>
            </tr>
        </>
    )
}


function DiagnosisTable(props)
{

     //limitation array row
const limitationListArray = [];
if (props.limitationTbaleData.length > 0) {
    for (let k = 0; k < props.limitationTbaleData.length; k++){
        limitationListArray.push(<LimitationListRow limitationListRows={props.limitationTbaleData[k]} getLimitationsRow={props.getLimitationsRow} />);
    }
}
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
                                {limitationListArray}
                                </tbody>
                            </table>
                            </div>

                       </div>
                   </div>
                   </div>
                   </>
    )
}