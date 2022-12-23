import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { json, Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { PuffLoader } from "react-spinners";
import { toast } from 'react-toastify';


export default function Prescriber() {

    const scollToRef = useRef();
    const [customer, setCustomer] = useState([]);

    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];


    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);


    const [selctedNdc, setSelctedNdc] = useState('');
    const [loading, setloading] = useState(false);


    const searchException = (fdata) => {
        setloading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/prescriberdata/prescriber/search?search=${fdata.target.value}`, requestOptions)
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
                    setloading(false);
                    setNdcData(data.data);
                    return;
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const getNDCItems = (ndcid) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(process.env.REACT_APP_API_BASEURL + `/api/prescriberdata/prescriber/details/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setSelctedNdc([]);
                    return Promise.reject(error);
                } else {
                    setSelctedNdc(data.data);
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
                            <li><a href="">Prescriber Data</a></li>
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

            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <SearchPrescriber searchException={searchException} />
                        <PrescriberList ndcListData={ndcData} mydata={selctedNdc} ndcClassData={ndcClass} getNDCItem={getNDCItems} loading={loading} />
                    </div>
                </div>
            </div>
        </>
    )
}

function SearchPrescriber(props) {

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
                                <small>Prescriber Data </small>
                                <input type="text" className="form-control" onKeyUp={(e) => searchException(e)} placeholder='Start typing phys. grouping ID/ prescriber ID/ last name/ first name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PrescriberList(props) {

    const scollToRef = useRef();

    // useEffect(() => { }, [props.mydata]);
    // console.log(props.mydata);

    const getNDCItem = (ndciemid) => {
        props.getNDCItem(ndciemid);
    }

    const LoadingSpinner = props => {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <PuffLoader
                    color="#59d8f1" />
            </div>

        );
    }
    const ndcListArray = [];
    for (let i = 0; i < props.ndcListData.length; i++) {
        ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} getNDCItem={getNDCItem} />);
    }

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Prescriber List</h5>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div style={{ height: "700px", overflowY: "scroll" }}>
                                <table className="table  table-bordered">
                                    <thead className='stickt-thead'>
                                        <tr>
                                            <th>Phys. Grouping ID</th>
                                            <th>Prescriber ID</th>
                                            <th>Last Name</th>
                                            <th>First Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.loading ? <LoadingSpinner /> : ndcListArray}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-8">
                            {/* <PrescriberForm /> */}

                            <PrescriberForm viewDiagnosisFormdata={props.mydata} />

                        </div>
                    </div>
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
            <tr className={(props.selected && props.ndcRow.physician_id == props.selected.physician_id ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.physician_id)}
            >
                <td></td>
                <td >{props.ndcRow.physician_id}</td>
                <td>{props.ndcRow.physician_last_name}</td>
                <td>{props.ndcRow.physician_first_name}</td>

                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function PrescriberForm(props) {

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const [adding, setAdding] = useState(false);

    const clearForm = (e) => {
        // props.viewDiagnosisFormdata(false);
        // setSelctedNdc(false);
        setAdding(true);
        reset();
        // document.getElementById('prescriber_form').reset();
    }

    const formSubmit = (formData) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(formData)
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/prescriberdata/prescriber/update/${formData.physician_id}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        if (adding) {
            reset({
                physician_id: '', physician_last_name: '', physician_first_name: '', address_1: '',
                city: '', country: '', license_number: '', medical_group: '', phone: '', physician_dea: '',
                physician_specialty: '', physician_title: '', spin_number: '', state: '', user_id: '', zip_code: '', new: 1
            });
        }
        if(props.viewDiagnosisFormdata)
        {
            setAdding(false);
        }
        reset(props.viewDiagnosisFormdata)
    }, [props.viewDiagnosisFormdata]);

    return (
        <>
            <form onSubmit={handleSubmit(formSubmit)} id="prescriber_form">
                <div className="col-md-12">
                    <h5 className="mb-2">Prescriber {adding ? " (Add Form)" : ' (Update Form)'}</h5>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <small>ID</small>
                            <input type="text" className="form-control" name="physician_id" {...register('physician_id')} id="" readOnly />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <small>Prescriber Grouping ID</small>
                            <input type="text" className="form-control" name="physician_first_name" id="" placeholder="" readOnly />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <small>Last Name</small>
                            <input type="text" className="form-control" {...register('physician_last_name')} placeholder="" readOnly />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <small>First Name</small>
                            <input type="text" className="form-control" {...register('physician_first_name')} placeholder="" readOnly />
                        </div>
                    </div>

                    <div className="col-md-4 mb-2">
                        <div className="form-group">
                            <small>Speciality</small>
                            <input type="text" className="form-control" {...register('physician_specialty')} placeholder="" readOnly />
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="form-group">
                            <small>Title</small>
                            <input type="text" className="form-control" {...register('physician_title')} placeholder="" readOnly />
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="form-group">
                            <small>License</small>
                            <input type="text" className="form-control" {...register('license_number')} placeholder="" readOnly />
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="form-group">
                            <small>DEA</small>
                            <input type="text" className="form-control" {...register('physician_dea')} placeholder="" readOnly />
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="form-group">
                            <small>Spin Number</small>
                            <input type="text" className="form-control" {...register('spin_number')} placeholder="" readOnly />
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="form-group">
                            <small>Medical Group</small>
                            <input type="text" className="form-control" {...register("medical_group")} placeholder="" readOnly />
                        </div>
                    </div>
                </div>
                <hr />

                <div className="row">
                    <div className="col-md-12 mb-2">
                        <h5>Address & Phone Number {adding ? " (Add Form)" : ' (Update Form)'}</h5>
                    </div>
                    <div className="col-md-12 mb-2">
                        <div className="form-group">
                            <small>Address</small>
                            <textarea className="form-control" rows="1" {...register("address_1")}></textarea>
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <small>City</small>
                            <input type="text" className="form-control" {...register("city")} placeholder="" required="" />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <small>State</small>
                            <input type="text" className="form-control" {...register("state")} placeholder="" required="" />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <small>Country</small>
                            <input type="text" className="form-control" {...register("country")} placeholder="" required="" />
                        </div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className="form-group">
                            <small>Zip Code</small>
                            <input type="text" className="form-control" {...register("zip_code")} placeholder="" required="" />
                        </div>
                    </div>
                    <div className="col-md-12 mb-2">
                        <div className="form-group">
                            <small>Phone</small>
                            <input type="text" className="form-control" {...register("phone")} placeholder="" required="" />
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                    <button type="submit" className="btn btn-primary">{adding ? 'Add' : 'Update'}</button>
                </div>
                <div className="modal-footer">
                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                    <button type="button" onClick={e => clearForm(e)} className="btn btn-info">Clear</button>
                </div>
            </form>
        </>
    )
}
