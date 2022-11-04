import React from 'react';

export default function PrescriberValidation()
{
    return(
        <>
         <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Validation List</a></li>
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
            </div> 
            <SearchPrescriber />
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
                                <small>Prescriber Validation ID/Name</small>
                                <input type="text"  className="form-control" placeholder='Start typing presciber validation ID/name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
            <PrescriberList />
        </>
    )
}

function PrescriberList()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Prescriber Validation List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>
                        <div className="col-md-6">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Prescriber Validation ID</th>
                                                    <th>Prescriber Validation Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Prescriber ID</th>
                                                    <th>Prescriber Status</th>
                                                    <th>Prescriber Name</th>
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
            <PrescriberForm />
        </>
    )
}

function PrescriberForm()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Prescriber List ID</small>
                                    <input type="text" className="form-control" name="" id="" placeholder="" required />
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Prescriber List Name</small>
                                    <input type="text" className="form-control" name="" id="" placeholder="" required />
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group ">
                                         <small> Prescriber ID </small>
                                        <div className="searchmodal">
                                       <input type="text" name="" className="form-control" placeholder="" />
                                       <button className="btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-magnifying-glass"></i></button>
                                       </div>
                                    </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-group">
                                    <small>Prescriber Status</small>
                                    <select className="form-select">
                                        <option value="">Approved</option>
                                        <option value="">Rejected</option>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </>
    )
}