import React from 'react';

export default function SpecialityValidation()
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
                            <li><a href="">Speciality</a></li>
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
            <SearchSpeciality />
        </>
    )
}

function SearchSpeciality()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Speciality Validation ID/Name</small>
                                <input type="text"  className="form-control" placeholder='Start typing speciality validation ID/name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
            <SpecialityList />
        </>
    )
}

function SpecialityList() {
    return (  
        <>
          <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Speciality Validation List</h5>
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
                                                    <th>Speciality Validation ID</th>
                                                    <th>Speciality Validation Name</th>
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
                                                    <th>Priority ID</th>
                                                    <th>Speciality Status</th>
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
            <SpecialityForm />
        </>
    );
}

function SpecialityForm() {
    return (  
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="col-md-12">
                                <h5 className="mb-2">Specialty Validations</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Specialty List ID: </small>
                                       <input type="text" name="" placeholder="" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Specialty List Name: </small>
                                    <input type="text" name="" placeholder="100PC" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group ">
                                         <small> Specialty ID: </small>
                                        <div className="searchmodal">
                                       <input type="text" name="" className="form-control" placeholder="" autoComplete="off" />
                                       <button className="btn-info"><i className="fa-solid fa-magnifying-glass"></i></button>
                                       </div>
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Specialty Status: </small>
                                            <select className="form-select">
                                                <option>Approved</option>
                                            </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    );
}

