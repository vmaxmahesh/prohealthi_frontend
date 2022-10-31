// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import {useState, useEffect} from 'react';
// import {useForm} from "react-hook-form";
// import { objToQueryString } from '../../../hooks/healper';
// export default function ServiceModifiers()
// {
//     const [serviceModifireData, setServiceModifiersData] = useState([]);
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     const{register, handleSubmit, watch, formState: {errors}} = useForm();
//     var fillServiceModifiersData = (data) => {
//         var arr = [
//             {code : '1234', discription : 'description'},
//             {code : '4321', discription : 'description 1'}
//         ];
//         const requestOptions = {
//             method: 'GET',
//            // mode: 'no-cors',
//             headers: { 'Content-Type': 'application/json' },
//             // body: encodeURIComponent(data)
//         };
//         console.log(watch(data)); 

//         fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/service-modifier?${objToQueryString(data)}`, requestOptions)
//             .then(async response => {
//                 const isJson = response.headers.get('content-type')?.includes('application/json');
//                 const data = isJson && await response.json();
//                 console.log(response);

//                 // check for error response
//                 if (!response.ok) {
//                     // get error message from body or default to response status
//                     const error = (data && data.message) || response.status;
//                     return Promise.reject(error);
//                 }


//                 if(response==='200'){
//                 }
//             })
//             .catch(error => {
//                 console.error('There was an error!', error);
//             });
//         setServiceModifiersData(arr);
//     }

//     useEffect(() => {        
//     },[serviceModifireData]);

//     return(
//         <>
//             <div className='dashboard-content clearfix'>
//                     <div className="row">
//                         <div className="col-md-6 mb-3">
//                             <div className="breadcrum">
//                                 <ul>
//                                     <li><a href="">Home</a></li>
//                                     <li><i className="fas fa-angle-right"></i></li>
//                                     <li><a href="">Codes</a></li>
//                                     <li><i className="fas fa-angle-right"></i></li>
//                                     <li><a href="">Service Modifiers</a></li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="col-md-6 mb-3">
//                             <div className="breadcrum ">
//                                 <ul>
//                                     <li className="float-end m-0"><a href="">Page Hint <i className="fa-solid fa-lightbulb"></i></a></li>
//                                     <div className="col-md-3 ms-auto text-end">
//                                         <button className="btn  btn-info" onClick={e => handleShow()}   >
//                                             Add Service Modifiers <i className="fa fa-plus-circle"></i></button>
//                                     </div>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 <div className="card mt-3 mb-3">
//                         <div className="card-body">
//                           <form onSubmit={handleSubmit(fillServiceModifiersData)}>
//                             <div className="row">

//                                 <div className="col-md-12 mb-2">
//                                     <h5>Criteria</h5>
//                                 </div>
//                                 <div className="col-md-6 mb-2">
//                                     <div className="form-group">
//                                         <small>Code</small>
//                                         <input type="text" name="" id="" className="form-control" {...register("code", {required:true})} />
//                                         {errors.code && <span><p className="notvalid">This field is required</p></span>}
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6 mb-2">
//                                     <div className="form-group">
//                                         <small>Discription</small>
//                                         <input type="text" name="" id="" className="form-control" {...register("description",{required:true})} />
//                                         {errors.description && <span><p className="notvalid">This field is required</p></span>}
//                                     </div>
//                                 </div>

//                                 <div className="col-md-6 ms-auto text-end mb-3 mt-3">
//                                     <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
//                                     <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
//                                     <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
//                                     <button type="submit" className="btn btn-info" >Search</button>
//                                 </div>
//                             </div>
//                             </form>
//                         </div>
//                         <Add show={show} handleClose={handleClose}/>
//                     </div>

//                     {serviceModifireData.length > 0 ?
//                     <Results serviceModifierData={serviceModifireData} />
//                     : ''
//                  }
//             </div>
//         </>
//     );
// }

// function Results(props)
// {
//     let s_modifire_data = [];
//     for(let i = 0; i < props.serviceModifierData.length; i++)
//     {
//         s_modifire_data.push(<ServiceModifierRow s_row={props.serviceModifierData[i]} />);
//     }

//     return(
//         <>        
//             <div className="card mt-3 mb-3 data">
//                         <div className="card-body">
//                             <div className="row">
//                                 <div className="col-md-12">
//                                     <table className="table table-striped table-bordered">
//                                         <thead>
//                                             <tr>
//                                                 <th>Code</th>
//                                                 <th>Discription</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                            {s_modifire_data}
//                                         </tbody>
//                                     </table>
//                                 </div>

//                             </div>
//                         </div>

//                     </div>
//                 </>
//     )
// }

// function ServiceModifierRow(props)
// {
//     return(
//         <>
//             <tr>
//                 <td>{props.s_row.code}</td>
//                 <td>{props.s_row.discription}</td>
//             </tr>
//         </>
//     );
// }

// function Add(props)
// {
//     const{ register, handleSubmit, watch, reset, formState : { errors } } = useForm();
//     const sericeModifiersData = (data) => {
//         console.log(data);
//         const requestOptions = {
//             method: 'POST',
//            // mode: 'no-cors',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)

//         };
//         fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/service-modifier/submit`, requestOptions)
//             .then(async response => {
//                 const isJson = response.headers.get('content-type')?.includes('application/json');
//                 const data = isJson && await response.json();
//                 console.log(response);

//                 // check for error response
//                 if (!response.ok) {
//                     // get error message from body or default to response status
//                     const error = (data && data.message) || response.status;
//                     return Promise.reject(error);
//                 } else {
//                     reset();
//                     toast.success('Added Successfully...!', {
//                         position: "top-right",
//                         autoClose: 5000,
//                         hideProgressBar: false,
//                         closeOnClick: true,
//                         pauseOnHover: true,
//                         draggable: true,
//                         progress: undefined,

//                     });
//                 }


//                 if(response==='200'){
//                 }

//             })
//             .catch(error => {
//                 console.error('There was an error!', error);
//             });
//     }
//     return(
//         <>
//         <Modal show={props.show} onHide={props.handleClose}>
//             <form onSubmit={handleSubmit(sericeModifiersData)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Service Modifiers </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                 <div class="modal-body">
//                     <div class="row">
//                         <div class="col-md-12 mb-2">
//                             <div class="form-group">
//                                 <small>Service Modifier Code</small>
//                                 <input type="text" class="form-control" name="" id="" {...register("service_modifier_code", {required:true})} />
//                                 {errors.service_modifier_code && <span><p className="notvalid">This field is required</p></span>}
//                             </div>
//                         </div>
//                         <div class="col-md-12 mb-2">
//                             <div class="form-group">
//                                 <small>Discription</small>
//                                 <textarea class="form-control" rows="3" name="" id="" {...register("service_modifier_description", {required:true})}></textarea>
//                                 {errors.service_modifier_description && <span><p className="notvalid">This field is required</p></span>}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 </Modal.Body>
//                 <Modal.Footer>

//                 <Button variant="secondary" onClick={props.handleClose}>
//                         Close
//                     </Button>
//                     <button type="submit" class="btn btn-info">Add Service Modifier</button>
//                 </Modal.Footer>
//                 </form>
//             </Modal>
//         </>
//     )
// }

//--------------------------------------------------------------------------------------
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


export default function ServiceModifiers() {
    const scollToRef = useRef();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const [benifitsData, setBenifitData] = useState({});
    const [benifitsList, setBenifitList] = useState([]);



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onSearching = (fdata) => {


        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // console.log(watch(data)); 

        if (process.env.REACT_APP_API_BASEURL != 'NOT') {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/service-modifier?search=${fdata.target.value}`, requestOptions)
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
                        setBenifitList(data.data);
                        console.log(benifitsList);
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

        } else {

        }
    }

    const getCode = (id) => {
        setBenifitData(id);
        console.log(benifitsData);
        // scollToRef.current.scrollIntoView()
        // const requestOptions = {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' },
        // };


        // if (process.env.REACT_APP_API_BASEURL != 'NOT') {
        //     fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/benefits/${fdata.target.value}`, requestOptions)
        //         .then(async response => {
        //             const isJson = response.headers.get('content-type')?.includes('application/json');
        //             const data = isJson && await response.json();
        //             console.log(response);

        //             // check for error response
        //             if (!response.ok) {
        //                 // get error message from body or default to response status
        //                 const error = (data && data.message) || response.status;
        //                 return Promise.reject(error);
        //             } else {
        //                 setBenifitList(data.data);
        //                 console.log(benifitsList);
        //                 toast.success(response.message, {
        //                     position: "top-right",
        //                     autoClose: 5000,
        //                     hideProgressBar: false,
        //                     closeOnClick: true,
        //                     pauseOnHover: true,
        //                     draggable: true,
        //                     progress: undefined,

        //                 });
        //             }

        //         })
        //         .catch(error => {
        //             console.error('There was an error!', error);

        //             // toast.error(error.response.data.message, {
        //             //     position: "top-right",
        //             //     autoClose: 5000,
        //             //     hideProgressBar: false,
        //             //     closeOnClick: true,
        //             //     pauseOnHover: true,
        //             //     draggable: true,
        //             //     progress: undefined,


        //             //     });
        //         });

        // } else {}
    }

    const updateSelected = (data) => {
        setBenifitData(data);
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
                                <li><a href="">Service Modifiers</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum ">
                            <ul>
                                <li className="float-end m-0"><a href="">Page Hint <i className="fa-solid fa-lightbulb"></i></a></li>
                                <div className="col-md-3 ms-auto text-end">
                                    {/* <button className="btn  btn-info" onClick={e => handleShow()}>
                                        Add Service Modifiers <i className="fa fa-plus-circle"></i></button> */}
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
                                        <small>Search by code/discription</small>
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
                            <List benifitsList={benifitsList} getCode={getCode} selected={benifitsData} />
                        </Card>
                    </Col>


                    <Col md="8" lg="8">
                        <Card>
                            <div ref={scollToRef}>
                                <AddBenifit show={show} handleClose={handleClose} selected={benifitsData} updateSelected={updateSelected} />

                            </div>
                        </Card>
                    </Col>

                </Row>
                {/*                 
                <List benifitsList={benifitsList} getCode={getCode} />

                <div ref={scollToRef}>
                    <AddBenifit show={show} handleClose={handleClose} selected={benifitsData} updateCode={updateCode} />

                </div> */}

            </div>
        </>
    )
}

function List(props) {

    const benifitList = [];
    for (let i = 0; i < props.benifitsList.length; i++) {
        benifitList.push(<BenifitRow benifitRowData={props.benifitsList[i]} selected={props.selected} getCode={props.getCode} />);
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
                                            <th>Discription</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {benifitList}
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

function BenifitRow(props) {
    return (
        <>
            <tr onClick={() => props.getCode(props.benifitRowData)}
                className={(props.selected && props.benifitRowData.service_modifier == props.selected.service_modifier ? ' tblactiverow ' : '')}
            >
                <td>{props.benifitRowData.service_modifier}</td>
                <td>{props.benifitRowData.description}</td>
            </tr>
        </>
    )
}

function AddBenifit(props) {
    const [code, setCode] = useState();
    const [description, setDescription] = useState();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();


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
            fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/diagnosis/submit`, requestOptions)
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
                        props.updateSelected(data.data);
                        reset();
                        toast.success('Added Successfully...!', {
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

    useEffect(() => { reset(props.selected) }, [props.selected]);

    return (
        <>
            <Card>
                <Card.Header>Service Modifiers</Card.Header>
                <Card.Body>
                    {/* <Form> */}
                    <form onSubmit={handleSubmit(addCode)}>
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Service Modifier Code</small>
                                    <input type="text" readOnly autocomplete="off" className="form-control" name="benefit_code" id=""  {...register("service_modifier", { required: true })} />
                                    {errors.benefit_code && <span><p className='notvalid'>This field is required</p></span>}
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Discription</small>
                                    <textarea className="form-control" rows="3" name="benefit_description" id="" {...register("description", { required: true })}></textarea>
                                    {errors.description && <span><p className='notvalid'>This field is required</p></span>}
                                </div>
                            </div>
                        </div>
                        <Button type='submit' variant="primary">Save</Button>
                    </form>
                    {/* </Form> */}
                </Card.Body>
            </Card>
        </>
    )
}