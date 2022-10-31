import React from 'react';
export default function RVAList() {
    return(
        <>
        <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href=""> Third Party Pricing </a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">RVA Lists</a></li>
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
                <List />
        </>
    )
}

function List() {
    return(
        <>
            <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="col-md-12">
                                <h5 className="mb-2">RVA Lists</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> ID</small>
                                       <select className="form-select">
                                        <option>JaimaicaOTC</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Description</small>
                                    <select className="form-select">
                                        <option>OC Tax</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-3 mb-3">
                       <div className="card-body">
                        
                            <div className="row mb-2">
                                 <div className="col-md-12">
                                <h5 className="mb-2">Adding</h5>
                            </div>
                                <div className="col-md-12">
                                <p><b>RVA List</b></p>
                            </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>RVA List:</small>
                                        <input type="text" className="form-control" placeholder="JaimaicaOTC" name="" id="" required="" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="col-md-10 mb-3">
                                    <div className="form-group">
                                        <small>RVA Description:</small>
                                    <textarea rows="3" cols="2" className="form-control" placeholder="OC Tax"></textarea>
                                    </div>
                                </div>
                            </div>
                           
                             <div className="row mb-2 ">
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Effective Date: </small>
                                        <input type="date" className="form-control" placeholder="0.15" name="" id="" required="" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <div className="form-group">
                                         <small>Termination Date: </small>
                                        <input type="date" className="form-control" placeholder="0" name="" id="" required="" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <div className="form-group">
                                          <small>RVA Value : </small>
                                         <input type="text" className="form-control" placeholder="0" name="" id="" required="" autoComplete="off" />
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 ">
                                    <div className="float-end">
                                <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a>
                            </div> 
                            </div>
                       </div>
                   </div>
        </>
    )
}