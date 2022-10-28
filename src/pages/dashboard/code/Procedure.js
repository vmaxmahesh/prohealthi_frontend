// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import {useState, useEffect} from 'react';
// import { useForm } from "react-hook-form";
// import { objToQueryString } from '../../../hooks/healper';


// export default function Procedure() {
//     const { register, handleSubmit, watch, formState: { errors } } = useForm();

//     const[show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const[benifitsData, setBenifitData] = useState([]);
//     const[procedureData, setProcedureData] = useState([]);
//     const fillProcedureData = (data) => {
//         var arr = [
//             {code : '2321', description : 'procedure code1'},
//             {code : '6273', description : 'procedure code 2'},
//             {code : '1324', description : 'procedure code 3'},
//             {code : '6227', description : 'procedure code 4'}
//         ];

//         const requestOptions = {
//             method: 'GET',
//            // mode: 'no-cors',
//             headers: { 'Content-Type': 'application/json' },
//             // body: encodeURIComponent(data)
//         };
//         console.log(watch(data)); 

//         fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/procedure?${objToQueryString(data)}`, requestOptions)
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


//         setProcedureData(arr);
//     }

//     useEffect(() => {}, [procedureData]);
//     return (
//         <>
//             <div className='dashboard-content clearfix'>

// <div className="row">
//     <div className="col-md-6 mb-3">
//         <div className="breadcrum">
//             <ul>
//                 <li><a href="">Home</a></li>
//                 <li><i className="fas fa-angle-right"></i></li>
//                 <li><a href="">Codes</a></li>
//                 <li><i className="fas fa-angle-right"></i></li>
//                 <li><a href="">Procedure Codes</a></li>
//             </ul>
//         </div>
//     </div>
//     <div className="col-md-6 mb-3">
//                         <div className="breadcrum ">
//                             <ul>
//                                 <li className="float-end m-0"><a href="">Page Hint <i className="fa-solid fa-lightbulb"></i></a></li>
//                                 <div className="col-md-3 ms-auto text-end">
//                                    <button className="btn  btn-info" onClick={e => handleShow()}>
//                                     Add Procedure Code <i className="fa fa-plus-circle"></i></button>
//                                 </div>
//                             </ul>
//                         </div>
//                     </div>
//     </div>
//     <div className="card mt-3 mb-3">
//                     <div className="card-body">
//                     <form onSubmit={handleSubmit(fillProcedureData)}>
//                         <div className="row">

//                             <div className="col-md-12 mb-2">
//                                 <h5>Criteria</h5>
//                             </div>
//                             <div className="col-md-6 mb-2">
//                                 <div className="form-group">
//                                     <small>Code</small>
//                                     <input type="text"  className="form-control" {...register("code", { required: true })} />
//                                     {errors.code && <span><p role="alert" className="notvalid">This field is required</p></span>}
//                                 </div>
//                             </div>
//                             <div className="col-md-6 mb-2">
//                                 <div className="form-group">
//                                     <small>Discription</small>
//                                     <input type="text" className="form-control" {...register("description", { required: true })} />
//                                     {errors.description && <span><p role="alert" className="notvalid">This field is required</p></span>}
//                                 </div>
//                             </div>

//                             <div className="col-md-6 ms-auto text-end mb-3 mt-3">
//                                 <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
//                                 <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
//                                 <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
//                                 <button className="btn btn-info" type="submit">Search</button>
//                             </div>
//                         </div>
//                         </form>
//                     </div>
//                     <AddProcedureCode show={show} handleClose={handleClose} />                   
//                 </div>
//                 {procedureData.length > 0 ?
//                     <ResultList procedureData={procedureData} />
//                     : ''
//                 }
//     </div>
//         </>
//     )
// }

// function ResultList(props)
// {   
//     const procedureList = [];
//     for(let i=0; i < props.procedureData.length; i++)
//     {
//         procedureList.push(<ProcedureRow procdureListData={props.procedureData[i]} />);
//     }
    
//     return(
//         <>
//             <div className="card mt-3 mb-3 data">
//                 <div className="card-body">
//                     <div className="row">
//                         <div className="col-md-12">
//                             <table className="table table-striped table-bordered">
//                                 <thead>
//                                     <tr>
//                                         <th>Code</th>
//                                         <th>Discription</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                   {procedureList} 
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>                    
//                 </div>
                
//             </div>
//         </>
//     )
// }

// function ProcedureRow(props)
// {
//     return(
//         <>
//             <tr>
//                 <td>{props.procdureListData.code}</td>
//                 <td>{props.procdureListData.description}</td>
//             </tr>
//         </>
//     )
// }

// function AddProcedureCode(props)
// {
//     const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

//     const addProcedureCode = (procedureData) => {
//         const requestOptions = {
//             method: 'POST',
//            // mode: 'no-cors',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(procedureData)

//         };
//         fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/procedure/submit`, requestOptions)
//             .then(async response => {
//                 const isJson = response.headers.get('content-type')?.includes('application/json');
//                 const data = isJson && await response.json();
//                 console.log(response);

//                 // check for error response
//                 if (!response.ok) {
//                     // get error message from body or default to response status
//                     const error = (procedureData && procedureData.message) || response.status;
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
//             <form onSubmit={handleSubmit(addProcedureCode)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title> Procedure Codes </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                 <div className="modal-body">
//                     <div className="row">
//                         <div className="col-md-12 mb-2">
//                             <div className="form-group">
//                                 <small>Procedure Code</small>
//                                 <input type="text" className="form-control" name="" id="" {...register("procedure_code",{required:true})}/>
//                                 {errors.procedure_code && <span><p className="notvalid">This field is required</p></span>}
//                             </div>
//                         </div>
//                         <div className="col-md-12 mb-2">
//                             <div className="form-group">
//                                 <small>Discription</small>
//                                 <textarea className="form-control" rows="3" name="" id="" {...register("procedure_description",{required:true})}></textarea>
//                                 {errors.procedure_description && <span><p className="notvalid">This field is required</p></span>}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 </Modal.Body>
//                 <Modal.Footer>
                    
//                 <Button variant="secondary" onClick={props.handleClose}>
//                         Close
//                     </Button>
//                     <button type="submit" className="btn btn-info">Add Procedure Codes</button>
//                 </Modal.Footer>
//                 </form>
//             </Modal>
//         </>
//     )
// }


//------------------------------------------------------------------------------------------
import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { objToQueryString } from '../../../hooks/healper';
import { Form, useOutletContext } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Card, Row } from 'react-bootstrap';


export default function Procedure() {
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
            fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/procedure?search=${fdata.target.value}`, requestOptions)
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
        scollToRef.current.scrollIntoView()
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
                        <form >
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Criteria</h5>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Search by Code/Discription</small>
                                        <input type="text" name="code" onKeyUp={(e) => onSearching(e)} placeholder="Code" {...register("code", { required: true })} className="form-control" />
                                        {errors.code && <span><p role="alert" className="notvalid">This field is required</p></span>}
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>

                </div>
                <List benifitsList={benifitsList} getCode={getCode} />

                <div ref={scollToRef}>
                    <AddBenifit show={show} handleClose={handleClose} selected={benifitsData} />

                </div>

            </div>
        </>
    )
}

function List(props) {

    const benifitList = [];
    for (let i = 0; i < props.benifitsList.length; i++) {
        benifitList.push(<BenifitRow benifitRowData={props.benifitsList[i]} getCode={props.getCode} />);
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
            <tr onClick={() => props.getCode(props.benifitRowData)}>
                <td>{props.benifitRowData.proc_code_list_id}</td>
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
            fetch(process.env.REACT_APP_API_BASEURL + `/api/codes/procedure/submit`, requestOptions)
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
                <Card.Header>Benefit Codes</Card.Header>
                <Card.Body>
                    {/* <Form> */}
                    <form onSubmit={handleSubmit(addCode)}>
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Benefit Code</small>
                                    <input type="text" className="form-control" name="benefit_code" id=""  {...register("proc_code_list_id", { required: true })} />
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