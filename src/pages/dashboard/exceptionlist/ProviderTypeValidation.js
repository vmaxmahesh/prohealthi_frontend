import React from 'react';

export default function ProviderTypeValidation() {
    return (
        <>
            <div className="dashboard-content clearfix">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Exception List</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Provider Type Validation</a></li>
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
                    <SearchProviderValidation />
                    <ProviderValidationList />
                </div>
            </div>
        </>
    )
}

function SearchProviderValidation() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Provider Type Validation </small>
                                <input type="text" className="form-control" placeholder='Start typing ID/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProviderValidationList() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Provider Type Validation</h5>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Effective Date</th>
                                        <th>Provider Type</th>
                                        <th>Proc. Code List ID</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-8">
                            <ProviderTypeForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function ProviderTypeForm() {
    return (
        <>
            {/* <div className="card mt-3 mb-3 data" >
                    <div className="card-body"> */}
            <div className="row mb-2">
                <div className="col-md-12 mb-2">
                    <h5>Provider Type Validation</h5>
                </div>
                <div className="col-md-6 mb-2">
                    <div className="form-group">
                        <small>List ID</small>
                        <input type="text" className="form-control" name="" id="" />
                    </div>
                </div>
                <div className="col-md-6 mb-2">
                    <div className="form-group">
                        <small>Description</small>
                        <input type="text" className="form-control" name="" id="" />
                    </div>
                </div>
                <div className="col-md-12 mb-2">
                    <h5>Codes</h5>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="form-group">
                        <small>Provider Type</small>
                        <input type="text" className="form-control" name="" id="" />
                        <a href=""><span className="fa fa-search form-icon"></span></a>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="form-group">
                        <small>Proc. Data List ID</small>
                        <input type="text" className="form-control" name="" id="" />
                        <a href=""><span className="fa fa-search form-icon"></span></a>
                    </div>
                </div>

                <div className="col-md-3 mb-2">
                    <div className="form-group">
                        <small>Effective Date</small>
                        <input type="date" className="form-control" name="" id="" />
                    </div>
                </div>

                <div className="col-md-3 mb-2">
                    <div className="form-group">
                        <small>Termination Date</small>
                        <input type="date" className="form-control" name="" id="" />
                    </div>
                </div>
            </div>
            {/* </div>
                </div> */}
        </>
    )
}