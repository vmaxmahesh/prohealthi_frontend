import React from 'react';

export default function ProcedureUCRList() {
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
                                <li><a href="">Procedure UCR List</a></li>
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
                        <div className="col-md-12">
                                <h5 className="mb-2">Procedure UCR List</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>ID</small>
                                       <select className="form-select">
                                        <option>ais</option>
                                        <option>AIS UIR</option>
                                        <option>MASTER</option>
                                    </select>
                                       
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Description</small>
                                    <select className="form-select">
                                        <option>ais usr</option>
                                        <option>AIS USR PRICE</option>
                                        <option>SURGICAL ULTRA</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="mb-2">Step Schedules table</h5>
                            </div>
                            <table className= "table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Effective Date</th>
                                        <th>Procedure Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <tr>
                                        <td>2021-10-23</td>
                                        <td>100010</td>
                                    </tr>
                                     <tr>
                                        <td>2021-10-10</td>
                                        <td>200120</td>
                                    </tr>
                                </tbody>
                            </table>
     
                       </div>

                   </div>
                   </div>

                   <div className="card mt-3 mb-3">
                       <div className="card-body">
                        
                            <div className="row mb-2">
                                <div className="col-md-12">
                                <h5 className="mb-2">Procedure UCR List: SANDELS_UC, Proc. Code:11420, Eff. Date:01-01-2001</h5>
                            </div>
                                <p><b>UCR List : </b></p>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>UCR List</small>
                                        <input type="text" className="form-control" placeholder="Surgical" name="" id="" required="" autoComplete="off" />
                                       
                                    </div>
                                </div>
                                <div className="col-md-10 mb-3">
                                    <div className="form-group">
                                        <small>UCR Description</small>
                                       <textarea rows="3" cols="2" className="form-control" placeholder="Surgical Test"></textarea>
                                       
                                    </div>
                                </div>
                            </div>
                           
                             <div className="row mb-2 ">
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small>Procedure Code: </small>
                                        <input type="text" className="form-control" placeholder="30000" name="" id="" required="" autoComplete="off" />
                                       
                                    </div>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <div className="form-group">
                                         <small>Effective Date: </small>
                                        <input type="date" className="form-control" placeholder="0" name="" id="" required="" autoComplete="off" />
                                       
                                    </div>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <div className="form-group">
                                          <small>Termination Date: </small>
                                        <input type="text" className="form-control" placeholder="83" name="" id="" required="" autoComplete="off" />
                                       
                                    </div>
                                </div>


                                <div className="col-md-3 mb-4">
                                    <div className="form-group">
                                          <small>Unit Value: </small>
                                        <input type="text" className="form-control" placeholder="83" name="" id="" required="" autoComplete="off" />
                                       
                                    </div>
                                </div>
                                <div className="col-md-3 mb-4">
                                    <div className="form-group">
                                          <small>UCR: </small>
                                        <input type="text" className="form-control" placeholder="83" name="" id="" required="" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="float-end">
                                <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a>
                            </div> 
                            </div>
                            </div>
                       </div>
                   </div>
</>
    )
}