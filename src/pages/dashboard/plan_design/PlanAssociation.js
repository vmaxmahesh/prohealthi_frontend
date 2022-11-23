import React from 'react';

export default function PlanAssociation()
{
    return(
        <>
         <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Plan Design</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Plan Association</a></li>
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
            <SearchPlanAssociation />
            <PlanAssociationList />
            <PlanAssociationForm />
        </>
    )
}

function SearchPlanAssociation()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Plan Association </small>
                                <input type="text" className="form-control" placeholder='Start typing bin number/ process control number/ group/ plan ID to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
        </>
    )
}

function PlanAssociationList()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Plan Association List</h5>
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
                                                    <th>Bin No.</th>
                                                    <th>Process Control No.</th>
                                                    <th>Group</th>
                                                    <th>Plan ID</th>
                                                    <th>Bin Suffix</th>
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

function PlanAssociationForm()
{
    return(
        <>
       <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Plan Association</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small>Bin Number</small>
                                <input type="text" className="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small>Process Control Number</small>
                                <input type="text" className="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small>Group Number</small>
                                <input type="text" className="form-control" name="" id="" required />
                            </div>
                        </div>
                        
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small>Provider Chain</small>
                                <input type="text" className="form-control" name="" id="" required />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small>Plan ID</small>
                                <input type="text" className="form-control" name="" id="" required />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small>Mail Plan Server ID</small>
                                <input type="text" className="form-control" name="" id="" required />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small className="required">Membershop Proc Flag</small>
                                <select className="form-select">
                                    <option value="">Select</option>
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                </select>
                                <p className="input-hint">Required</p>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small>Pin Suffix</small>
                                <input type="text" className="form-control" name="" id="" required />
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small className="required">Transaction Type</small>
                                <select className="form-select">
                                    <option value="">Select</option>
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small className="required">Transaction Association</small>
                                <select className="form-select">
                                    <option value="">Select</option>
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                </select>
                                <p className="input-hint">Not Applicable</p>
                            </div>
                        </div>
                        
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small>Customer</small>
                                <input type="text" className="form-control" name="" id="" required />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small>Client</small>
                                <input type="text" className="form-control" name="" id="" required />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <div className="form-group">
                                <small>Group</small>
                                <input type="text" className="form-control" name="" id="" required />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>                        
                       
                    </div>
                </div>
                {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-info">Add Plan Association</button>
                </div> */}
            </div>
        </div>
        </div>
        </>
    )
}