import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { objToQueryString } from '../../../hooks/healper';
import { useOutletContext } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function Benifits() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [benifitsData, setBenifitData] = useState([]);

    const addCode = (benefit_data) => {
        alert(benefit_data);
        console.log(benefit_data);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = (data) => {
        var arr = [
            { code: '1112', description: 'benifit description 1' },
            { code: '2341', description: 'benifit description 2' },
        ];
        //         const encodedValue = encodeURIComponent(someVariable);
        // fetch(`https://example.com/foo?bar=${encodedValue}`);

        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // console.log(watch(data)); 

        if (process.env.REACT_APP_API_BASEURL == 'NOT') {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/benefits?${objToQueryString(data)}`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    console.log(response);

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    console.log(process.env.REACT_APP_API_BASEURL);
                    if (process.env.REACT_APP_API_BASEURL == 'NOT') {
                        response.message = 'Successfully added';
                    }



                    if (response === '200') {
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

                    // props.onChange(data);
                    // navigate("/dashboard/user/customer/strategy");

                    // this.setState({ postId: data.id })
                })
                .catch(error => {
                    // this.setState({ errorMessage: error.toString() });
                    console.error('There was an error!', error);

                    // toast.error(error.response.data.message, {
                    //     position: "top-right",
                    //     autoClose: 5000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,


                    //     });
                });

            setBenifitData(arr);
        } else {
            toast.success('Added successfully.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        }
    }


    useEffect(() => { }, [benifitsData]);
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
                                <li className="float-end m-0"><a href="">Page Hint <i className="fa-solid fa-lightbulb"></i></a></li>
                                <div className="col-md-3 ms-auto text-end">
                                    <button className="btn  btn-info" onClick={e => handleShow()}>
                                        Add Benifit Code <i className="fa fa-plus-circle"></i></button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Criteria</h5>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Code</small>
                                        <input type="text" name="code" placeholder="Code" {...register("code", { required: true })} className="form-control" />
                                        {errors.code && <span><p role="alert" className="notvalid">This field is required</p></span>}
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Discription</small>
                                        <input type="text" name="description" placeholder="Description" {...register("description", { required: true })} id="" className="form-control" />
                                        {errors.description && <span><p role="alert" className="notvalid">This field is required</p></span>}
                                    </div>
                                </div>

                                <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                                    <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                                    <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                                    <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                                    {/* <button href="provider-search.html" className="btn btn-info" onClick={e => fillBenifitsData()}>Search</button> */}
                                    <button type="submit" href="provider-search.html" className="btn btn-info" >Search</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <AddBenifit show={show} handleClose={handleClose} />
                </div>
                {benifitsData.length > 0 ?
                    <List benifitsData={benifitsData} />
                    : ''}
            </div>
        </>
    )
}

function List(props) {
    // style={{width: '100px', height: '100px', backgroundColor: 'red'}}
    const benifitList = [];
    for (let i = 0; i < props.benifitsData.length; i++) {
        benifitList.push(<BenifitRow benifitRowData={props.benifitsData[i]} />);
    }
    // const[show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    return (
        <>
            <div className="card mt-3 mb-3 data">
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
                                    {benifitList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div className="col-md-3 ms-auto text-end">
                                <button className="btn  btn-info" onClick={e => handleShow()}>
                                    Add Benifit Code <i className="fa fa-plus-circle"></i></button>
                    </div> */}
                </div>
                {/* <AddBenifit show={show} handleClose={handleClose} /> */}
            </div>

        </>
    )
}

function BenifitRow(props) {
    return (
        <>
            <tr>
                <td>{props.benifitRowData.code}</td>
                <td>{props.benifitRowData.description}</td>
            </tr>
        </>
    )
}

function AddBenifit(props) {
    const [code, setCode] = useState();
    const [description, setDescription] = useState();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const addCode = (data) => {
        console.log(data);
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
                    console.log(response);

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
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

    return (
        <>
            {/* <form> */}

            <Modal show={props.show} onHide={props.handleClose}>
                <form onSubmit={handleSubmit(addCode)}>
                    <Modal.Header closeButton>
                        <Modal.Title> Benefit Codes </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Benefit Code</small>
                                        <input type="text" className="form-control" name="benefit_code" id=""  {...register("benefit_code", { required: true })} />
                                        {errors.benefit_code && <span><p className='notvalid'>This field is required</p></span>}
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Discription</small>
                                        <textarea className="form-control" rows="3" name="benefit_description" id="" {...register("benefit_description", { required: true })}></textarea>
                                        {errors.benefit_description && <span><p className='notvalid'>This field is required</p></span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <button type="submit" className="btn btn-info">Add Procedure Codes</button>

                    </Modal.Footer>
                </form>
            </Modal>

            {/* </form> */}
        </>
    )
}