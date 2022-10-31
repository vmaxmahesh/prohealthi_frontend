import React from 'react';

export default function CopayStepSchedule() {
    return(
        <>
            <div className='dashboard-content clearfix'>

<div className="row">
    <div className="col-md-6 mb-3">
        <div className="breadcrum">
            <ul>
                <li><a href="">Home</a></li>
                <li><i className="fas fa-angle-right"></i></li>
                <li><a href=""> Third Party Pricing </a></li>
                <li><i className="fas fa-angle-right"></i></li>
                <li><a href="">Step Schedule</a></li>
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
                <h5 className="mb-2">Step Schedules </h5>
            </div>
       <div className="row mb-2">
                <div className="col-md-4 mb-3">
                    <div className="form-group">
                        <small>Copay List</small>
                        <input type="text" className="form-control" placeholder="Surgical" name="" id="" required="" autoComplete="off" />
                       
                    </div>
                </div>
                <div className="col-md-9 mb-3">
                    <div className="form-group">
                        <small>Copay Description</small>
                       <textarea rows="3" cols="2" className="form-control" placeholder="Surgical Test"></textarea>
                       
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="row comparis-ionn">
                        <div className=""><span>Schedule Type:</span></div>
                        <div className="col-md-6">
                            <div className="form-check">
                                  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Days Supply
                                  </label>
                                </div>
                        </div>
                        <div className="col-md-6 ">
                           <div className="form-check">
                              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                              <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Max Cost
                              </label>
                            </div>
                        </div>
                  </div>
               </div>
            </div>

            <div className="row align-items-center mt-3 ">
                <div className="col-md-3">Maximum Cost</div>
                <div className="col-md-3">$</div>
                <div className="col-md-3">%</div>
                <div className="col-md-3"></div>
            </div>


             <div className="row mb-2 ">
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="30000" name="" id="" required="" autoComplete="off" />
                       
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="0" name="" id="" required="" autoComplete="off" />
                       
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="83" name="" id="" required="" autoComplete="off" />
                       
                    </div>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-md-12">
                    <div className="row">
                <div className="col-md-6 m-auto text-end">
                    <button className="btn btn-info"> Update Item </button>
                     <button className="btn btn-danger"> Clear Item </button>
                </div>
            </div>
        </div>
            </div>




        </div>
    </div>
<GetStepScheduleTable />
</div>
        </>
    )
}

function GetStepScheduleTable() {
    return(
        <>
            <div className="card mt-3 mb-3">
        <div className="card-body">
            <div className="row">
                <div className="col-md-12">
                    <h5 className="mb-2">Step Schedules table</h5>
                </div>
                <table className= "table  table-bordered">
                    <thead>
                        <tr>
                            <th>Maximum Cost</th>
                            <th>$</th>
                            <th>%</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>20000</td>
                            <td>80</td>
                            <td>90</td>
                            <td><button className="btn btn-sm btn-warning" id=""><i className="fa-solid fa-trash"></i> Remove</button></td>
                        </tr>
                        <tr>
                            <td>30000</td>
                            <td>60</td>
                            <td>85</td>
                            <td><button className="btn btn-sm btn-warning" id=""><i className="fa-solid fa-trash"></i> Remove</button></td>
                        </tr>
                    </tbody>
                </table>

        </div>
    </div>
            </div>
   </>
    )
}