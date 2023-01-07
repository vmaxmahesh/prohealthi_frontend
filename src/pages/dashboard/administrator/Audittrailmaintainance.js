import React from 'react';
import { Row } from 'react-bootstrap';

function Audittrail() {
    return (
        <>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Membership Data</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Zip Codes</a></li>
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

                    <AuditTable />
                    <AuditForm />
                    <AuditBottomTable />
                </div>
            </div>

        </>
    );
}


export function AuditTable(props) {
    return (
        <>
            <div className="col-md-12 mb-3">
                <h5>Audit Trail Maintanance</h5>
            </div>

            <div className="col-md-12 mb-3">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Date Created</th>
                            <th>Time Created</th>
                            <th>User ID</th>
                            <th>Action</th>
                            <th>Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>21-11-2022</td>
                            <td>12:25:15 PM</td>
                            <td>Shekar</td>
                            <td>Insert</td>
                            <td>ProPBM</td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </>
    );

}


export function AuditForm(props) {
    return (
        <>
            <Row>
                <div className="col-md-12 mb-2">
                    <h5>Details</h5>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <small>Application</small>
                        <input type="text" className="form-control" name="" id="" />
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <small>User ID</small>
                        <input type="text" className="form-control" name="" id="" />
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <small>Table Name</small>
                        <input type="text" className="form-control" name="" id="" />
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <small>Action</small>
                        <input type="text" className="form-control" name="" id="" />
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <small>Date</small>
                        <input type="date" className="form-control" name="" id="" />
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <small>Time</small>
                        <input type="time" className="form-control" name="" id="" />
                    </div>
                </div>


                <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                    <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                    <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                    <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                    <button href="provider-search.html" className="btn btn-info">Search</button>
                </div>
            </Row>
        </>

    );
}

export function AuditBottomTable(props) {
    return (
        <>
            <div className="col-md-12 mb-3">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Old Record</th>
                            <th>Field Name</th>
                            <th>New Record</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>

    );
}

export default Audittrail;