import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { objToQueryString } from '../../../hooks/healper';
import { Form, useOutletContext } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Card, Col, Row } from 'react-bootstrap';
import LoadingSpinner from '../../../loader/loader';


export default function Benefits() {
    const scollToRef = useRef();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const [benifitsData, setBenifitData] = useState(false);
    const [benifitsList, setBenifitList] = useState([]);
    const [adding, setAdding] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setloading] = useState();


    const onSearching = (fdata) => {

        setloading(true);

        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // console.log(fdata.target.value);

        if (process.env.REACT_APP_API_BASEURL != 'NOT') {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/benefits?search=${fdata.target.value}`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        setloading(false);
                        setBenifitList(data.data);

                        toast.success(response.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

        } else {

        }
    }

    const getCode = (id) => {
        setBenifitData(id);
        // console.log(benifitsData);
    }

    const updateSelected = (data) => {
        setBenifitData(data);
    }
    const AddForm = () => {
        setBenifitData(false);
        setAdding(true);
        reset();
    }
    useEffect(() => {
        if (benifitsData) {
            setAdding(false);
        } else {
            setAdding(true);
            setBenifitData(false);
        }
        document.title = 'Benefit Code | ProHealthi';
    }, [benifitsData, adding]);

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
                                <li><a href="">Benefit Codes</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum ">
                            <ul>
                                {/* <li className="float-end m-0"><a href="">Page Hint <i className="fa-solid fa-lightbulb"></i></a></li>  */}
                                <div className="col-md-3 ms-auto text-end">
                                    <button className="btn  btn-info btn-sm" onClick={e => AddForm()}>
                                        Add Benefit Code <i className="fa fa-plus-circle"></i></button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <form >
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Criteria</h5>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Search by code/description</small>
                                        <input type="text" name="code" onKeyUp={(e) => onSearching(e)} placeholder="Type code/description to search" {...register("code", { required: true })} className="form-control" />
                                        {errors.code && <span><p role="alert" className="notvalid">This field is required</p></span>}
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>

                </div>

                <Row>
                    <Col md="4" lg="4">
                        <Card>
                            <List loading={ loading } benifitsList={benifitsList} getCode={getCode} selected={benifitsData} />
                        </Card>
                    </Col>
                    <Col md="8" lg="8">
                        <Card>
                            <div ref={scollToRef}>
                                <AddBenefit show={show} adding={adding} handleClose={handleClose} selected={benifitsData} updateSelected={updateSelected} />

                            </div>
                        </Card>
                    </Col>

                </Row>

            </div>
            {/* </div> */}
        </>
    )
}


function List(props) {

    const benifitList = [];
    for (let i = 0; i < props.benifitsList.length; i++) {
        benifitList.push(<BenefitRow benifitRowData={props.benifitsList[i]} selected={props.selected} getCode={props.getCode} />);
    }
    return (
        <>
            <div className="card mt-3 mb-3 data">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ height: '400px', overflowY: 'scroll' }}>
                                <table className="table  table-bordered" style={{ position: 'relative' }}>
                                    <thead className='stickt-thead'>
                                        <tr>
                                            <th>Code</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.loading ?<LoadingSpinner />:benifitList}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

function BenefitRow(props) {
    return (
        <>
            <tr onClick={() => props.getCode(props.benifitRowData)}
                className={(props.selected && props.benifitRowData.benefit_code == props.selected.benefit_code ? ' tblactiverow ' : '')}
            >
                <td>{props.benifitRowData.benefit_code}</td>
                <td>{props.benifitRowData.description}</td>
            </tr>
        </>
    )
}

function AddBenefit(props) {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();


    const addCode = (data) => {
        // console.log(data);
        const requestOptions = {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        };
        // console.log(watch(data));
        if (process.env.REACT_APP_API_BASEURL == 'NOT') {
            toast.success('Added Successfully...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        } else {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/benefits/submit`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    // console.log(response);

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        reset(data.data);
                        var msg = props.adding ? 'Added Successfully...!' : 'Updated Successfully..'
                        toast.success(msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,

                        });
                    }


                    if (response === '200') {
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }

    }
    const onSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {


        if (props.adding) {
            reset({ benefit_code: '', description: '', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ benefit_code: '', description: '', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);

    return (
        <>
            <Card>
                <Card.Header>Benefit Codes {props.adding ? ' - (Adding)' : '- (' + props.selected.benefit_code + ' )'}</Card.Header>
                <Card.Body>
                    {/* <Form> */}
                    <form onSubmit={handleSubmit(addCode)}>
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Benefit Code</small>


                                    {props.adding ?
                                        <input type="text" className="form-control" name="benefit_code" id=""  {...register("benefit_code", { required: true })} />
                                        // errors.benefit_code && <span><p className='notvalid'>This field is required</p></span>

                                        :

                                        <input type="text" readOnly className="form-control" name="benefit_code" id=""  {...register("benefit_code", { required: true })} />
                                    }
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Description</small>
                                    <textarea className="form-control" rows="3" name="benefit_description" id="" {...register("description", { required: true })}></textarea>
                                    {errors.description && <span><p className='notvalid'>This field is required</p></span>}
                                </div>
                            </div>
                        </div>
                        <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>
                    </form>
                    {/* </Form> */}
                </Card.Body>
            </Card>

        </>
    )
}
