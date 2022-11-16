import React from 'react';

export default function Prescriber()
{
    return(
        <>
         <div className="dashboard-content clearfix">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Prescriber Data</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Prescriber</a></li>
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
                    <SearchPrescriber />
                    <PrescriberList />
                </div>
            </div>
        </>
    )
}
 
function SearchPrescriber()
{
    return(
        <>
          <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <small>Prescriber Data </small>
                                    <input type="text" className="form-control" placeholder='Start typing phys. grouping ID/ prescriber ID/ last name/ first name to search'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

function PrescriberList()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Prescriber List</h5>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Phys. Grouping ID</th>
                                        <th>Prescriber ID</th>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-8">
                           <PrescriberForm />
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}

function PrescriberForm()
{
    return(
        <>
                    {/* <div className="data col-md-12" >
                    <div className="card mt-3 mb-3">
                        <div className="card-body">                                */}
                        <div className="col-md-12">
                        <h5 className="mb-2">Prescriber</h5>
                    </div>
                                <div className="row">                               
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="1120" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Prescriber Grouping ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Last Name</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>First Name</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>Speciality</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>Title</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>License</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>DEA</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>Spin Number</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="form-group">
                                        <small>Medical Group</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" readOnly />
                                    </div>
                                </div>                                
                            </div>
                            <hr/>
                            {/* </div>
                            </div>
                            </div> */}

<div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Address & Phone Number</h5>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Address</small>
                                        <textarea className="form-control" rows="1"></textarea>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>City</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>State</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Country</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Zip Code</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Phone</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
        </>
    )
}