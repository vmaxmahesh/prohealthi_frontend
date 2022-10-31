import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { objToQueryString } from '../../../hooks/healper';

export default function Diagnosis() {

    const[diagnosisData, setDiagnosisData]  = useState([]);
    const fillDiagnosisData = () => {
        var arr = [
            {code : '1234', description : 'diagnosis code 1'},
            {code : '2901', description : 'diagnosis 2'},
            {code : '8236', description : 'diagnosis code 8236'},
        ];

        setDiagnosisData(arr);
    }

    useEffect(() => {},[diagnosisData]);

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
                                <li><a href="">Diagnosis Codes</a></li>
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

                            <div className="col-md-12 mb-2">
                                <h5>Criteria</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Code</small>
                                    <input type="text" name="" id="" className="form-control" required />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Discription</small>
                                    <input type="text" name="" id="" className="form-control" required />
                                </div>
                            </div>

                            <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                                <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                                <button href="provider-search.html" className="btn btn-info" onClick={e => fillDiagnosisData()}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                {diagnosisData.length > 0 ?
                   <Results diagnosisData={diagnosisData} />
                   : ''
                }
                </div>
        </>
    )
}

function Results(props)
{
    var diagData = [];
    for(let i=0; i<props.diagnosisData.length; i++)
    {
        diagData.push(<DiagRow diagData={props.diagnosisData[i]} />);
    }

    const[show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return(
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
                                        {diagData}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-3 ms-auto text-end">
                                <button className="btn  btn-info" onClick={e => handleShow()}>
                                    Add Diagnosis Code <i className="fa fa-plus-circle"></i></button>
                            </div>
                        </div>
                    </div>
                    <AddDiagnosisCode show={show} handleClose={handleClose} />
                </div>
        </>
    )
}

function DiagRow(props)
{
    return(
        <>
            <tr>
                <td>{props.diagData.code}</td>
                <td>{props.diagData.description}</td>
            </tr>
        </>
    )
}

function AddDiagnosisCode(props)
{
    return(
        <>
        <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Diagnosis Codes </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <div className="form-group">
                                <small>Diagnosis Code</small>
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
                    <button type="button" className="btn btn-info">Add Diagnosis Codes</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}