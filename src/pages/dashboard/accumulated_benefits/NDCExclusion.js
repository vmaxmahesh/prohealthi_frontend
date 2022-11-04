import React from 'react';

export default function NDCExclusion()
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
                            <li><a href="">NDC Exclusion</a></li>
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
            <SearchNDCExclusion />
        </>
    )
}

function SearchNDCExclusion()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>NDC Exclusion</small>
                                <input type="text" className="form-control" placeholder='Start typing  NDC exclusion ID/name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div> 
            <NDCExclusionList />
        </>
    )
}

function NDCExclusionList()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>NDC Exclusion List</h5>
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
                                                    <th>NDC Exclusion ID</th>
                                                    <th>NDC Exclusion Name</th>
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
                                                    <th>NDC Exclusion Status</th>
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
            <NDCExclusionForm />
        </>
    )
}

function NDCExclusionForm()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="col-md-12">
                                <h5 className="mb-2">NDC Exclusion</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> List ID</small>
                                       <input type="text" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> List Name</small>
                                     <input type="text" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group ">
                                         <small> NDC</small>
                                        <div className="searchmodal">
                                       <input type="text" name="" className="form-control" placeholder="" />
                                       {/* <button className="btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-magnifying-glass"></i></button> */}
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    )
}