import React, { useEffect, useRef, useState } from 'react';
import { useForm , Controller} from 'react-hook-form';
import AsyncSelect from 'react-select';
import LoadingSpinner from '../../../loader/loader';
import EmptyRowComponent from '../../../shared/NoDataFound';
import Footer from '../../../shared/Footer';
import {useAuth} from '../../../hooks/AuthProvider';
import {toast} from 'react-toastify';

export default function PrescriberValidation()
{
    const scollToRef = useRef();
    const [presciberExceptionData, setPresciberExceptionData] = useState([]);
    const [prescriberValidationData, setPrescriberValidationData] = useState([]);
    const [presciberData, setPresciberData] = useState([]);
    const [selctedPrescriberException, setSelctedPrescriberException] = useState('');
    const [selectedPreciberValidation, setSelectedPreciberValidation] = useState('');

    //loaders
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);

    const [adding, setAdding] = useState(false);

    const clearForm = (e) => {
        setAdding(false);
        setSelectedPreciberValidation('');
        document.getElementById('prescriberForm').reset();
    }
    const resetForm = (e) => {
        setAdding(false);
        setSelctedPrescriberException('');
        setSelectedPreciberValidation('');
        setPresciberData([]);
        document.getElementById('prescriberForm').reset();
    }


    const getPresciberValidationData = (presciber_list) => {
        setLoader(true);
        var test = {};
        test.presciber_list = presciber_list;
        setSelctedPrescriberException(test);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/prescriber/get/${presciber_list}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setPrescriberValidationData([]);
                    return Promise.reject(error);
                } else {
                    setPrescriberValidationData(data.data);
                    setLoader(false);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    const getPreciberDetails = (preciber_data) => {
        var preciber_list = preciber_data.physician_list;
        var preciber_id = preciber_data.physician_id;
        var test = {};
        test.preciber_id = preciber_id
        setSelectedPreciberValidation(test);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/prescriber/details/${preciber_list}/${preciber_id}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setPresciberData(data.data);
                    scollToRef.current.scrollIntoView();
                    setAdding(true);
                    return;
                }

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }


    const searchPrescriber = (fdata) => {
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/prescriber/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setPresciberExceptionData([]);
                    return Promise.reject(error);

                } else {
                    setPresciberExceptionData(data.data);
                    setLoading(false);
                    setSelctedPrescriberException('');
                    setPrescriberValidationData('');
                    return;
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
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
                            <li><a href="">Prescriber</a></li>
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
            <SearchPrescriber searchPrescriber={searchPrescriber} />
            <PrescriberList key='prescriber_list' prescriberExceptionListData={presciberExceptionData} prescriberValidationListData={prescriberValidationData} getPresciberValidationData={getPresciberValidationData} getPreciberDetails={getPreciberDetails} selctedPrescriberException={selctedPrescriberException} loading={loading} loader={loader} selectedPreciberValidation={selectedPreciberValidation} />
            <div ref={scollToRef}>
                <PrescriberForm viewPresciberData={presciberData} adding={adding} clearForm={clearForm} resetForm={resetForm} />
            </div>

            <Footer/>


        </>
    )
}

function SearchPrescriber(props)
{
    const searchPrescriber = (fdata) => {
        props.searchPrescriber(fdata);
    }
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Prescriber Validation ID/Name</small>
                                <input type="text"  onKeyUp={(e) => searchPrescriber(e)}   className="form-control" placeholder='Start typing presciber validation ID/name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PrescriberList(props)
{
    useEffect(() => { }, [props.selctedNdc]);
    const getPresciberValidationData = (preciber_id) => {
        props.getPresciberValidationData(preciber_id);
    }

    const getPreciberDetails = (presciber_data) => {
        props.getPreciberDetails(presciber_data);
    }


    const prescriberExceptionListArray = [];
    if (props.prescriberExceptionListData.length > 0) {
        for (let i = 0; i < props.prescriberExceptionListData.length; i++) {
            prescriberExceptionListArray.push(<PrescriberExceptionRow key={'PrescriberExceptionRow'+i} preciberExceptionRowData={props.prescriberExceptionListData[i]} getPresciberValidationData={getPresciberValidationData} selected={props.selctedPrescriberException} />);
        }
    } else {
        prescriberExceptionListArray.push(<EmptyRowComponent key='EmptyRowComponent' colSpan='2'/>)
    }


    const prescriberValidationListArray = [];
    if (props.prescriberValidationListData.length > 0) {
        for (let j = 0; j < props.prescriberValidationListData.length; j++) {
            prescriberValidationListArray.push(<PrescriberValidationRow key={'PrescriberValidationRow'+j} prescriberValidationRowData={props.prescriberValidationListData[j]} getPreciberDetails={getPreciberDetails} selected={props.selectedPreciberValidation} />);
        }
    } else {
        prescriberValidationListArray.push(<EmptyRowComponent key='EmptyRowComponent' colSpan='3'/>)
    }


    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Prescriber Validation List</h5>
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
                                                    <th>Prescriber Validation ID</th>
                                                    <th>Prescriber Validation Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.loading?<LoadingSpinner colSpan='2'/>:prescriberExceptionListArray}
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
                                                    <th>Prescriber ID</th>
                                                    <th>Prescriber Status</th>
                                                    <th>Prescriber Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.loader?<LoadingSpinner colSpan='3'/>:prescriberValidationListArray}
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



function PrescriberExceptionRow(props) {
    useEffect(() => { }, [props.selected]);

    return (
        <>
            <tr className={(props.selected && props.preciberExceptionRowData.physician_list == props.selected.presciber_list ? ' tblactiverow ' : '')}
                onClick={() => props.getPresciberValidationData(props.preciberExceptionRowData.physician_list)}
            >
                <td>{props.preciberExceptionRowData.physician_list}</td>
                <td >{props.preciberExceptionRowData.exception_name}</td>
            </tr>
        </>
    )
}


function PrescriberValidationRow(props) {
    useEffect(() => { }, [props.selected]);

    return (
        <>
            <tr
                className={(props.selected && props.prescriberValidationRowData.physician_id == props.selected.preciber_id ? ' tblactiverow ' : '')}
                onClick={() => props.getPreciberDetails(props.prescriberValidationRowData)}

            >
                <td>{props.prescriberValidationRowData.physician_id}</td>
                <td>{props.prescriberValidationRowData.physician_status}</td>
                <td>{props.prescriberValidationRowData.physician_first_name}    {props.prescriberValidationRowData.physician_last_name}</td>
            </tr>
        </>
    )
}

function PrescriberForm(props)
{

    const { register, reset, handleSubmit, control, formState: { errors } } = useForm();

    const { user } = useAuth();

        //fetch prescriber data
        const [prescriberId, setPrescriberId] = useState([]);
        const fetchPrescriberId = () => {
            fetch(process.env.REACT_APP_API_BASEURL +`/api/validationlist/prescriber/prescriber-list-drop-down`)
            .then((res) => res.json())
            .then((prescriberId) => {
            const prescriberIdList = prescriberId.data.map((item) => ({
                label: item.physician_id +' - '+ item.physician_last_name,
                value: item.physician_id
            }));
            setPrescriberId(prescriberIdList);
            });
        }

        useEffect(() => {
            fetchPrescriberId();
        }, [])

        useEffect(() => {
            if (!props.adding) {
                reset({ physician_list: '',exception_name:'', physician_id:'', physician_status:'', new:1 },{keepValues:false})
            } else {
                reset(props.viewPresciberData)
            }

        }, [props.viewPresciberData]);

    const addPrescriberData = (formData) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/prescriber/submit-prescriber-form`, requestOptions).then(async response => {
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


    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                    <form id="prescriberForm" name="prescriberForm" onSubmit={handleSubmit(addPrescriberData)}>
                    <input type="hidden" name="user_name" value={user.name} {...register('user_name')} />
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Prescriber List ID</small>
                                    <input type="text" className="form-control" name="physician_list" {...register('physician_list', { required: true })} id="" placeholder="Prescriber List Id" />
                                    {errors.physician_list && <span><p className="notvalid">Prescriber List Id is required.</p></span>}
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Prescriber List Name</small>
                                    <input type="text" className="form-control" name="exception_name" {...register('exception_name', { required: true })} id="" placeholder="Prescriber Name" />
                                    {errors.exception_name && <span><p className="notvalid">Prescriber Name is required.</p></span>}
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group ">
                                         <small> Prescriber ID </small>
                                    <div className="searchmodal">
                                        <Controller name="physician_id"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                {...field}
                                                    placeholder="Select Prescriber ID"
                                                    options={prescriberId}
                                                    noOptionsMessage={() => "Prescriber ID/Name Not Matched"}
                                                />
                                            )} />
                                        {errors.physician_id && <span><p className="notvalid">Prescriber Id is required.</p></span>}
                                       </div>
                                    </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Prescriber Status</small>
                                    <select className="form-select" name="physician_status" {...register('physician_status' , {required:true})}>
                                    <option value="">--select--</option>
                                        <option value="A">Approved</option>
                                        <option value="R">Rejected</option>
                                    </select>
                                    {errors.physician_status && <span><p className="notvalid">Prescriber status is required.</p></span>}
                                </div>
                            </div>

                    </div>
                    <div className="col-md-12 text-end">
                                <button  type="submit" className="btn btn-primary ">{ props.adding?'Update':'Add'}
                                </button>&nbsp;&nbsp;&nbsp;
                                <button onClick={
                                        e => props.clearForm(e)
                                    }
                                    type="button"
                                    className="btn btn-danger">
                                    Clear
                                </button>
                        </div>
                        </form>
                    </div>

                </div>
        </>
    )
}