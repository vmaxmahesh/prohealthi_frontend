import React from 'react';

export default function DiagnosisValidation()
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
                            <li><a href="">Diagnosis</a></li>
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
            <SearchDiagnosis />
        </>
    )
}

function SearchDiagnosis()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Diagnosis Validation ID/Name</small>
                                <input type="text"  className="form-control" placeholder='Start typing diagnosis validation ID/name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
            <DiagnosisList />
        </>
    )
}

function DiagnosisList()
{
    return(
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
                        <div className="col-md-6">
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

                        <div className="col-md-6">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Priority ID</th>
                                                    <th>Diagnosis</th>
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
            <DiagnosisForm />
        </>
    )
}

function DiagnosisForm()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="col-md-12">
                                <h5 className="mb-2">Diagnosis Validations</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Diagnosis List ID: </small>
                                       <input type="text" name="" placeholder="" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Diagnosis List Name: </small>
                                    <input type="text" name="" placeholder="100PC" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group ">
                                         <small> Diagnosis ID: </small>
                                        <div className="searchmodal">
                                       <input type="text" name="" className="form-control" placeholder="" autoComplete="off" />
                                       <button className="btn-info"><i className="fa-solid fa-magnifying-glass"></i></button>
                                       </div>
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Diagnosis Status: </small>
                                            <select className="form-select">
                                                <option>Approved</option>
                                            </select>
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Priority: </small>
                                            <select className="form-select">
                                                <option>Approved</option>
                                            </select>
                                    </div>
                                </div>
                                <hr/>
                       
                            <div className="row mb-2">
                                 <div className="col-md-12">
                                <h5 className="mb-2">Limitations Lists</h5>
                            </div>
                                
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Effective Date:</small>
                                          <input type="date" name="" placeholder="100PC" className="form-control" />
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Termination Date:</small>
                                          <input type="date" name="" placeholder="100PC" className="form-control" />
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Limitations List Date:</small>
                                           <div className="searchmodal">
                                       <input type="text" name="" className="form-control" placeholder="" autoComplete="off" />
                                       <button className="btn-info"><i className="fa-solid fa-magnifying-glass"></i></button>
                                       </div>
                                    </div>
                                </div>
                                
                                <div className="col-md-12 text-end">
                                     <button className="btn btn-primary"> Add </button>
                                    <button className="btn btn-warning"> Remove </button>
                                     <button className="btn btn-danger"> Clear </button>
                                </div>
                       </div>
                       <hr/>
                       <DiagnosisTable />                  
                            </div>
                        </div>
                    </div>     
                    
        </>
    )
}

function DiagnosisTable()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-12">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Effective Date</th>
                                        <th>Termination Date</th>
                                        <th>Limitations List</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <tr>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                     <tr>
                                         <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
     
                       </div>
                   </div>
                   </div>
                   </>
    )
}