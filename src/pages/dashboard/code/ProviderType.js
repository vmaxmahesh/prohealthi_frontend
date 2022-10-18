import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { objToQueryString } from '../../../hooks/healper';

export default function ProviderType() {
    const [ProvidertypeData, setProviderTypedata] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const fillProviderData = (fdata) => {
        // API 
        // var staticProviderType =;
        var arr = [
            // { code: '1120', discription: 'LOLOHY' },
            // { code: '1121', discription: 'LOLOHY1' },
        ];

        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/provider-type?${objToQueryString(fdata)}`, requestOptions)
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
                    setProviderTypedata(data.data);
                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }

    useEffect(() => {
    }, [ProvidertypeData]);

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
                                <li><a href="">Provider Types</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum ">
                            <ul>
                                <li className="float-end m-0"><a href="">Page Hint <i className="fa-solid fa-lightbulb"></i></a></li>
                                <div className="col-md-3 ms-auto text-end">
                                    <button className="btn  btn-info" onClick={e => handleShow()}>
                                        Add Provider Types <i className="fa fa-plus-circle"></i></button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(fillProviderData)}>
                            <div className="row">

                                <div className="col-md-12 mb-2">
                                    <h5>Criteria</h5>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Code</small>
                                        <input type="text" name="" id="" className="form-control" {...register("code", { required: true })} />
                                        {errors.code && <span><p className='notvalid'>This field is required</p></span>}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Description</small>
                                        <input type="text" name="" id="" className="form-control" {...register("description", { required: true })} />
                                        {errors.description && <span><p className='notvalid'>This field is required</p></span>}
                                    </div>
                                </div>

                                <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                                    {/* <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp; */}
                                    <button className="btn btn-info" type="submit">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <Add show={show} handleClose={handleClose} />
                </div>

                {ProvidertypeData.length > 0 ?
                    <Results typedata={ProvidertypeData} />
                    : ''}


            </div>
        </>
    );
}

function Results(props) {
    var ProvidertypeData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        ProvidertypeData.push(<ProviderTypeRow datar={props.typedata[index]} />);
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
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ProvidertypeData
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
function ProviderTypeRow(props) {
    return (
        <>
            <tr>
                <td>{props.datar.provider_type}</td>
                <td>{props.datar.description}</td>
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

    const providerTypeData = (data) => {
        console.log(data);
        const requestOptions = {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        };
        fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/provider-type/submit`, requestOptions)
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
                <form onSubmit={handleSubmit(providerTypeData)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Provider Types </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Provider Type</small>
                                        <input type="text" className="form-control" name="" id="" {...register("provider_type_code", { required: true, maxLength: 2 })} />
                                        {/* {errors.provider_type_code && <span><p className='notvalid'>This field is required</p></span>} */}
                                        {/* <input type="text" className="form-control" name="" id="" {...register("service_modifier_code", { required: true, maxLength: 2 })} /> */}
                                        {errors.provider_type_code && errors.provider_type_code.type === "required" && <span className="notvalid">This is required</span>}
                                        {errors.provider_type_code && errors.provider_type_code.type === "maxLength" && <span className="notvalid">Max length exceeded</span>}

                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Discription</small>
                                        <textarea className="form-control" rows="3" name="" id=""  {...register("provider_type_description", { required: true })} ></textarea>
                                        {errors.provider_type_description && <span><p className='notvalid'>This field is required</p></span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <button type="submit" className="btn btn-info">Add Provider Types</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}