import React from 'react';

export default function MajorMedicalMaximums()
{
    return(
        <>
         <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Accumulated Benefits</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href=""> Major Medical Maximums </a></li>
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
            <SeacrchMajorMedicalMax />            
        </>
    )
}

function SeacrchMajorMedicalMax()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Major Medical Maximums</small>
                                <input type="text" className="form-control" placeholder='Start typing  major medical maximums ID/name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
            <MajorMedicalMaximumsList />
        </>
    )
}

function MajorMedicalMaximumsList()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Major Medical Maximums</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Customer ID</th>
                                                    <th>Customer Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Client ID</th>
                                                    <th>Client Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Group ID</th>
                                                    <th>Effective Date</th>
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
            <MajorMedicalMaximumForms />
        </>
    )
}

function MajorMedicalMaximumForms()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                                    <div className="row comparis-ionn mt-3">
                                        <div className=""><span>Major Medical Maximums:</span></div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Customer ID</small>
                                                  <input className="form-control" type="text" name="" id="" />
                                                </div>
                                          </div>
                                         <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Client ID</small>
                                                  <input className="form-control" type="text" name="" id="" />
                                                </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Group ID</small>
                                                  <input className="form-control" type="text" name="" id="" />
                                                </div>
                                          </div>
                                  </div>

                                  <div className="row comparis-ionn mt-4">
                                        <div className=""><span> Maximums:</span></div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Effective Date</small>
                                                  <input  className="form-control" type="date" name="" id="" />
                                                </div>
                                          </div>
                                         <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Termination Date</small>
                                                  <input className="form-control" type="date" name="" id="" />
                                                </div>
                                          </div>
                                         <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Major Medical Claim Max</small>
                                                  <input className="form-control" type="date" name="" id="" />
                                                </div>
                                          </div>
                                           <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Major Medical Claim Max Grouping</small>
                                                  <select className="form-select">
                                                      <option>1</option>
                                                  </select>
                                                </div>
                                          </div>
                                           <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Major Medical Lifetime Max</small>
                                                  <input className="form-control" type="date" name="" id="" />
                                                </div>
                                          </div>

                                           <div className="col-md-4">
                                            <div className="form-group mb-2">
                                                <small>Grouping Type:</small>
                                                  <select className="form-select">
                                                      <option>1</option>
                                                  </select>
                                                </div>
                                          </div>
                                  </div>
                        </div>
                    </div>
        </>
    )
}