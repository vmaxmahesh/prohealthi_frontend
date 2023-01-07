import React from "react";
function SearchAudit() {
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
                    <SearchAuditform />
                    <SearchAudittable />
                </div>
            </div>
        </>
    );
}

export function SearchAuditform(props) {
    return (
        <>
            <div className="row">
                <div className="col-md-12 mb-2">
                    <h5>Search Audit Trail</h5>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="form-group">
                        <small>Mandatory Selection</small>
                        <select className="form-select">
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>
                <div className="clearfix"></div>

                <div className="col-md-8 mb-2">
                    <h5>Optional Selections</h5>
                </div>
                <div className="clearfix"></div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <small>User ID</small>
                        <select className="form-select">
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <small>Record Action</small>
                        <select className="form-select">
                            <option value="">Select</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <small>From Date</small>
                        <input type="date" className="form-control" name="" />
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <small>To Date</small>
                        <input type="date" className="form-control" name="" />
                    </div>
                </div>
                <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                    <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                    <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                    <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                    <button href="provider-search.html" className="btn btn-info">Search</button>
                </div>
            </div>

        </>

    );
}


export function SearchAudittable(props) {
    return (
        <>
            <div className="col-md-12">

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

export default SearchAudit;