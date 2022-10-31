import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState, useEffect} from 'react';

export default function Benifits() {

    const[benifitsData, setBenifitData] = useState([]);
    const fillBenifitsData = () => {
        var arr = [
            {code : '1112', description : 'benifit description 1'},
            {code : '2341', description : 'benifit description 2'},
        ];

        setBenifitData(arr);
    }

    useEffect(() => {},[benifitsData]);
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
                                <button href="provider-search.html" className="btn btn-info" onClick={e => fillBenifitsData()}>Search</button>
                            </div>
                        </div>
                    </div>                   
                </div>                
                {benifitsData.length > 0 ?
                <List benifitsData={benifitsData}  />
            : ''}
            </div>
        </>
    )
}

function List(props) {
    // style={{width: '100px', height: '100px', backgroundColor: 'red'}}
    const benifitList = [];
    for(let i=0; i < props.benifitsData.length; i++)
    {
        benifitList.push(<BenifitRow benifitRowData={props.benifitsData[i]} />);
    }
    const[show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                    <div className="col-md-3 ms-auto text-end">
                                <button className="btn  btn-info" onClick={e => handleShow()}>
                                    Add Benifit Code <i className="fa fa-plus-circle"></i></button>
                    </div>
                </div>
                <AddBenifit show={show} handleClose={handleClose} />
            </div>
           
        </>
    )
}

function BenifitRow(props)
{   
    return(
        <>
        <tr>
                <td>{props.benifitRowData.code}</td>
                <td>{props.benifitRowData.description}</td>
            </tr>
        </>
    )
}

function AddBenifit(props) {  
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Benefit Codes </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <div className="form-group">
                                <small>Benefit Code</small>
                                <input type="text" className="form-control" name="benefit_code" id=""  />
                            </div>
                        </div>
                        <div className="col-md-12 mb-2">
                            <div className="form-group">
                                <small>Discription</small>
                                <textarea className="form-control" rows="3" name="benefit_description" id="" required></textarea>
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