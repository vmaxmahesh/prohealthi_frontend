import React from 'react';
import { Link } from 'react-router-dom';

export default function CopayStepSchedule() {
    return (
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
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Max Cost
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <GetStepScheduleTable />
                    </div>
                    <div className="col-md-8">
                        <DataForm />
                    </div>
                </div>

            </div>
        </>
    )
}

function GetStepScheduleTable() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">

                    <h5 className="mb-2">Step Schedules table</h5>
                </div>
                <table className="table  table-bordered">
                    <thead>
                        <tr>
                            <th>By Day Supply
                                {/* by maximums cost */}
                            </th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>

            </div>


        </>
    )
}

function DataForm(params) {

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div class="row mb-2">
                        <div class="col-md-4 mb-3">
                            <div class="form-group">
                                <small>Copay List</small>
                                <input type="text" class="form-control" placeholder="Surgical" name="" id="" required="" autocomplete="off" />
                            </div>
                        </div>
                        <div class="col-md-8 mb-3">
                            <div class="form-group">
                                <small>Copay Description</small>
                                <textarea rows="1" cols="2" class="form-control" placeholder="Surgical Test"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class=""><span>Schedule Type:</span></div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Days Supply
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6 ">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Max Cost
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2 ">
                        <div class="col-md-3 mb-3">
                            <div class="form-group">
                                <small>Day Supply/ Maximum Cost</small>
                                <input type="text" class="form-control" placeholder="30000" name="" id="" required="" autoComplete="off" />

                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <div class="form-group">
                                <small>$</small>
                                <input type="text" class="form-control" placeholder="0" name="" id="" required="" autoComplete="off" />

                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <div class="form-group">
                                <small>%</small>
                                <input type="text" class="form-control" placeholder="83" name="" id="" required="" autoComplete="off" />

                            </div>
                        </div>

                        <div class="col-md-3 mb-3">
                            <div class="form-group">
                            <button className='btn btn-primary'>Add</button>
                            </div>
                        </div>

                        {/* <div class="col-md-3 mb-3">
                            <button className='btn btn-primary'>Add</button>
                        </div> */}
                    </div>
                    

                    <div class="row mb-2 ">
                        <div class="col-md-9 mb-3">
                            <table class="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Maximum Cost</th>
                                        <th>$</th>
                                        <th>%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>20000</td>
                                        <td>80</td>
                                        <td>90</td>
                                    </tr>
                                    <tr>
                                        <td>30000</td>
                                        <td>60</td>
                                        <td>85</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                       
                        <div class="col-md-3 mb-3">
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
}