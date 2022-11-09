import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DraggableList from "react-draggable-lists";

export default function DiagnosisPrioritization() {
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Validation List</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Diagnosis Prioritization</a></li>
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
           
            <SearchDiagPrioritization />

            <DiagnosisPrioritizationList />


            <DiagPrioritizeForm />
            
        </>
    )
}

function SearchDiagPrioritization() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Diagnosis Prioritization Validation ID/Name</small>
                                <input type="text" className="form-control" placeholder='Start typing diagnosis prioritization validation ID/name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <DiagnosisPrioritizationList /> */}
        </>
    )
}

function DiagnosisPrioritizationList() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Diagnosis Validation List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>
                        <div className="col-md-12">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Diagnosis Validation ID</th>
                                                    <th>Diagnosis Validation Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

function DiagPrioritizeForm() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Priotrize Diagnosis List ID</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Priotrize Diagnosis List Name</small>
                                <input type="text" className="form-control" name="" id="" placeholder="" required />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group ">
                                <small> Priotrize Diagnosis ID </small>
                                <div className="searchmodal">
                                    <input type="text" name="" className="form-control" placeholder="" />
                                    <button className="btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Priotrize Diagnosis Status</small>
                                <select className="form-select">
                                    <option value="">Approved</option>
                                    <option value="">Rejected</option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>click on list and drag new position to assign new priority</div>
                    <Row>
                        <Col>
                            <DiagPrioritizeDragable />
                        </Col>
                    </Row>
                </div>
            </div>



        </>
    )
}

function DiagPrioritizeDragable() {

    const listItems = [
        "Entertainment",
        "Private Time",
        "Rest",
        "Meal",
        "Exercise",
        "Work",
        "Home Projects",
        "Family"
    ];


    return (
        <>
            <DraggableList width={300} height={50} rowSize={1} className="draggablelist">
                {listItems.map((item, index) => (
                    <li key={index}>{`${index + 1}.  ${item}`}</li>
                ))}
            </DraggableList>
        </>
    )
}






