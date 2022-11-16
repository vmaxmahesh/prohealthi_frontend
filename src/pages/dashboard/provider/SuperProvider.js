import React from 'react';

export default function SuperProvider() {
    return (
        <>
            <div className="dashboard-content clearfix">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Provider Data</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Super Provider Network</a></li>
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
                    <SearchSuperProvider />
                    <SuperProviderList />
                    <SuperProviderForm />
                </div>
            </div>
            
        </>
    )
}

function SearchSuperProvider()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Super Provider NetWork </small>
                                <input type="text" className="form-control" placeholder='Start typing super provider network id/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function SuperProviderList()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Super Provider Network List </h5>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Priority</th>
                                        <th>Network ID</th>
                                        <th>Effective Date</th>
                                        <th>Network Type</th>
                                        <th>Price Schedule</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function SuperProviderForm()
{
    return(
        <>
         <div class="data col-md-12">
                    <div class="card mt-3 mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="row">
                                    <div class="col-md-12">
                                        <h5 class="mb-2">Super Provider Network</h5>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>Super Network ID</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="" required />
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <div class="form-group">
                                            <small>Super Network Name</small>
                                            <input type="text" class="form-control" name="" id="" placeholder="" required />
                                        </div>
                                    </div>
                                    
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Provider Network</h5>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Provider Network ID</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="" required />
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Super Network Priority</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="" required />
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Effective Date</small>
                                                <input type="date" class="form-control" name="" id="" placeholder="" required />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Termination Date</small>
                                                <input type="date" class="form-control" name="" id="" placeholder="" required />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Pricing</h5>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Price Schedule Override</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="" required />
                                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        
                                        
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Communication Charges</h5>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Paid/Accepted</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="" required />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <div class="form-group">
                                                <small>Reject/Reversal</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="" required />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h5 class="mb-2">Rx Limitations</h5>
                                        </div>

                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Rx Quantity</small>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <input type="text" class="form-control" name="" id="" placeholder="Minimum" required />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" class="form-control" name="" id="" placeholder="Maximum" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Days Supply</small>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <input type="text" class="form-control" name="" id="" placeholder="Minimum" required />
                                                    </div>
                                                    <div class="col-md-6">
                                                        <input type="text" class="form-control" name="" id="" placeholder="Maximum" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Retail Fills</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required />
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Fills</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required />
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Starter Dose Date</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required />
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>Starter Dose Bypass Days</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required />
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-3">
                                            <div class="form-group">
                                                <small>St. Dose Maint. Bypass Days</small>
                                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required />
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}