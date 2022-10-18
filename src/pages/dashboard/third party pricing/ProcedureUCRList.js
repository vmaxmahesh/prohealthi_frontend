import React from 'react';

export default function ProcedureUCRList() {
    return(
        <>
              
              <div class="row">
                    <div class="col-md-6 mb-3">
                        <div class="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i class="fas fa-angle-right"></i></li>
                                <li><a href=""> Third Party Pricing </a></li>
                                <li><i class="fas fa-angle-right"></i></li>
                                <li><a href="">Procedure UCR List</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="breadcrum ">
                            <ul>
                                <li class="float-end m-0"><a href="">Page Hint <i class="fa-solid fa-lightbulb"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card mt-3 mb-3">
                    <div class="card-body">
                        <div class="col-md-12">
                                <h5 class="mb-2">Procedure UCR List</h5>
                            </div>
                            <div class="row mb-2">
                                <div class="col-md-4 mb-3">
                                    <div class="form-group">
                                        <small>ID</small>
                                       <select class="form-select">
                                        <option>ais</option>
                                        <option>AIS UIR</option>
                                        <option>MASTER</option>
                                    </select>
                                       
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <div class="form-group">
                                        <small>Description</small>
                                    <select class="form-select">
                                        <option>ais usr</option>
                                        <option>AIS USR PRICE</option>
                                        <option>SURGICAL ULTRA</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-3 mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h5 class="mb-2">Step Schedules table</h5>
                            </div>
                            <table class= "table  table-bordered">
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

                   <div class="card mt-3 mb-3">
                       <div class="card-body">
                        
                            <div class="row mb-2">
                                <div class="col-md-12">
                                <h5 class="mb-2">Procedure UCR List: SANDELS_UC, Proc. Code:11420, Eff. Date:01-01-2001</h5>
                            </div>
                                <p><b>UCR List : </b></p>
                                <div class="col-md-4 mb-3">
                                    <div class="form-group">
                                        <small>UCR List</small>
                                        <input type="text" class="form-control" placeholder="Surgical" name="" id="" required="" autoComplete="off" />
                                       
                                    </div>
                                </div>
                                <div class="col-md-10 mb-3">
                                    <div class="form-group">
                                        <small>UCR Description</small>
                                       <textarea rows="3" cols="2" class="form-control" placeholder="Surgical Test"></textarea>
                                       
                                    </div>
                                </div>
                            </div>
                           
                             <div class="row mb-2 ">
                                <div class="col-md-4 mb-3">
                                    <div class="form-group">
                                        <small>Procedure Code: </small>
                                        <input type="text" class="form-control" placeholder="30000" name="" id="" required="" autoComplete="off" />
                                       
                                    </div>
                                </div>
                                <div class="col-md-3 mb-4">
                                    <div class="form-group">
                                         <small>Effective Date: </small>
                                        <input type="date" class="form-control" placeholder="0" name="" id="" required="" autoComplete="off" />
                                       
                                    </div>
                                </div>
                                <div class="col-md-3 mb-4">
                                    <div class="form-group">
                                          <small>Termination Date: </small>
                                        <input type="text" class="form-control" placeholder="83" name="" id="" required="" autoComplete="off" />
                                       
                                    </div>
                                </div>


                                <div class="col-md-3 mb-4">
                                    <div class="form-group">
                                          <small>Unit Value: </small>
                                        <input type="text" class="form-control" placeholder="83" name="" id="" required="" autoComplete="off" />
                                       
                                    </div>
                                </div>
                                <div class="col-md-3 mb-4">
                                    <div class="form-group">
                                          <small>UCR: </small>
                                        <input type="text" class="form-control" placeholder="83" name="" id="" required="" autoComplete="off" />
                                    </div>
                                </div>
                                <div class="col-md-12 ">
                                    <div class="float-end">
                                <a href="" class="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a>
                            </div> 
                            </div>
                            </div>
                       </div>
                   </div>
</>
    )
}