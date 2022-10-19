import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { objToQueryString } from '../../../hooks/healper';
import { toast } from 'react-toastify';
export default function Reason() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [reasonCodeData, setReasonCodeData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fillReasonCodeData = (fdata) => {
        var arr = [
            // {code : '1231', description : 'reason code 1'},
            // {code : '2231', description : 'reason code 2'},
            // {code : '1134', description : 'reason code 3'},
        ];

        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/reasons?${objToQueryString(fdata)}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    // console.log(data.data);
                    setReasonCodeData(data.data);
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });


    }

    useEffect(() => {console.log(reasonCodeData) }, [reasonCodeData]);
    return (
        <>
            <div className='dashboard-content clearfix'>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Codes</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Reason Codes</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum ">
                            <ul>
                                <li className="float-end m-0"><a href="">Page Hint <i className="fa-solid fa-lightbulb"></i></a></li>
                                <div className="col-md-3 ms-auto text-end">
                                    <button className="btn  btn-info" onClick={e => handleShow()}>
                                        Add Reason Code <i className="fa fa-plus-circle"></i></button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(fillReasonCodeData)}>
                            <div className="row">

                                <div className="col-md-12 mb-2">
                                    <h5>Criteria</h5>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Code</small>
                                        <input type="text" name="" id="" className="form-control" {...register("code", { required: true })} />
                                        {errors.code && <span><p role="alert" className="notvalid">This field is required</p></span>}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Discription</small>
                                        <input type="text" name="" id="" className="form-control" {...register("description", { required: true })} />
                                        {errors.description && <span><p className="notvalid">This field is required  </p></span>}
                                    </div>
                                </div>

                                <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                                    {/* <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                                    <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                                    <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp; */}
                                    <button type="submit" className="btn btn-info">Search</button>
                                </div>
                            </div>
                        </form>
                        <Add show={show} handleClose={handleClose} />
                    </div>
                </div>
                {reasonCodeData.length > 0 ?
                    <Results data={reasonCodeData} />
                    : ''
                }
            </div>
        </>
    );

}

function Results(props) {
    var reasonCodes = [];
    for (let i = 0; i < props.data.length; i++) {
        reasonCodes.push(<ReasonCodeRow rowData={props.data[i]} />);
    }

    return (
        <>
            <div className="card mt-3 mb-3 data" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Discription</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reasonCodes}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

function ReasonCodeRow(props) {
    return (
        <>
            <tr>
                <td>{props.rowData.reason_code}</td>
                <td>{props.rowData.reason_description}</td>
            </tr>
        </>
    )
}

function Add(props) {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const [added, setAdded] = useState(false);

    useEffect(() => {

        if (added) {
            reset();
        }
    }, [added, reset]);

    const submitReasonCode = (data) => {
        console.log(data);
        const requestOptions = {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        };
        fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/reasons/submit`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setAdded(true);
                    toast.success(data.message, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,

                    });

                    return true;
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
            <Modal show={props.show} onHide={props.handleClose}>
                <form onSubmit={handleSubmit(submitReasonCode)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reason Code </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-12 mb-2">
                                    <div class="form-group">
                                        <small>Reason Code</small>
                                        <input type="text" class="form-control" name="" id="" {...register("reason_code", { required: true })} />
                                        {errors.reason_code && <span><p className="notvalid">This field is required</p></span>}
                                    </div>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <div class="form-group">
                                        <small>Discription</small>
                                        <textarea class="form-control" rows="3" name="" id="" {...register("reason_description", { required: true })}></textarea>
                                        {errors.reason_description && <span><p className='notvalid'>This field is required</p></span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <button type="submit" class="btn btn-info">Add Reason Code</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}