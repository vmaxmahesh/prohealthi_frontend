import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { objToQueryString } from '../../../hooks/healper';


export default function Procedure() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const onSubmit = data => console.log(data);

      const[benifitsData, setBenifitData] = useState([]);
    const[procedureData, setProcedureData] = useState([]);
    const fillProcedureData = (data) => {
        var arr = [
            {code : '2321', description : 'procedure code1'},
            {code : '6273', description : 'procedure code 2'},
            {code : '1324', description : 'procedure code 3'},
            {code : '6227', description : 'procedure code 4'}
        ];

        const requestOptions = {
            method: 'GET',
           // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        console.log(watch(data)); 

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


                if(response==='200'){
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });


        setProcedureData(arr);
    }

    useEffect(() => {}, [procedureData]);
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
                <li><a href="">Procedure Codes</a></li>
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
                    <form onSubmit={handleSubmit(fillProcedureData)}>
                        <div className="row">

                            <div className="col-md-12 mb-2">
                                <h5>Criteria</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Code</small>
                                    <input type="text"  className="form-control" {...register("code", { required: true })} />
                                    {errors.code && <span><p role="alert" className="notvalid">This field is required</p></span>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Discription</small>
                                    <input type="text" className="form-control" {...register("description", { required: true })} />
                                    {errors.description && <span><p role="alert" className="notvalid">This field is required</p></span>}
                                </div>
                            </div>

                            <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                                <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                                <button className="btn btn-info" type="submit">Search</button>
                            </div>
                        </div>
                        </form>
                    </div>                   
                </div>
                {procedureData.length > 0 ?
                    <ResultList procedureData={procedureData} />
                    : ''
                }
    </div>
        </>
    )
}

function ResultList(props)
{   
    const procedureList = [];
    for(let i=0; i < props.procedureData.length; i++)
    {
        procedureList.push(<ProcedureRow procdureListData={props.procedureData[i]} />);
    }
    const[show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
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
                                  {procedureList} 
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-3 ms-auto text-end">
                                <button className="btn  btn-info" onClick={e => handleShow()}>
                                    Add Procedure Code <i className="fa fa-plus-circle"></i></button>
                    </div>
                </div>
                <AddProcedureCode show={show} handleClose={handleClose} />
            </div>
        </>
    )
}

function ProcedureRow(props)
{
    return(
        <>
            <tr>
                <td>{props.procdureListData.code}</td>
                <td>{props.procdureListData.description}</td>
            </tr>
        </>
    )
}

function AddProcedureCode(props)
{
    return(
        <>
        <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Procedure Codes </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <div className="form-group">
                                <small>Procedure Code</small>
                                <input type="text" className="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div className="col-md-12 mb-2">
                            <div className="form-group">
                                <small>Discription</small>
                                <textarea className="form-control" rows="3" name="" id="" required></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    
                <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <button type="button" className="btn btn-info">Add Procedure Codes</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}