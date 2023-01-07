import React from 'react';

export default function NDCCrossReference()
{
    return(
        <>
         <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Drug Information</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">NDC/GPI Cross Reference</a></li>
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
            <SearchNDCCross />
            <NDCCrossList /> 
        </>
    )
}

function SearchNDCCross()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="col-md-12">
                            <h5 className="mb-2">NDC/GPI Cross Reference </h5>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="row comparis-ionn">
                                    <div className=""><span></span></div>
                                    <div className="col-md-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                NDC
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 ">
                                        <div className="form-check">
                               
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                GPI
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="row comparis-ionn">
                                    <div className=""><span>Schedule Type:</span></div>
                                    
                                    <div className="form-group">
                                        <small>NDC/GPI Search</small>
                                        <input type="text" className="form-control" placeholder='Start typing NDC/GPI ID/name to search'/>                                                    
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">                                
                                <div className="col-md-8 mb-2">
                                    <div className="form-group">
                                        <small>Description</small>
                                        <input type="text" name="" id="" className="form-control" required />
                                    </div>
                                </div>
                               
                                <div className="col-md-4 text-end mb-3 mt-4">
                                        <button type="button" href="provider-search.html" className="btn btn-info">Cross Ref.</button>&nbsp;&nbsp;
                                        <a href="" className="btn btn-danger">Clear</a>&nbsp;&nbsp;
                                        <a href="" className="btn btn-secondary">Close</a>
                                    </div>
                                </div>

                    </div>
                </div>
               
        </>

    )
}



function NDCCrossList()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                <div className="col-md-12">
                            <h5 className="mb-2">NDC/GPI List</h5>
                        </div>
                    <div className="row">
                    <div className="col-md-8">                        
                        <table className= "table  table-bordered">
                            <thead>
                                <tr>
                                    <th>NDC</th>
                                    <th>Label Name</th>
                                    <th>Manufacturer</th>
                                    <th>Package Size</th>
                                    <th>Generic Indicator</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>                        
                </div>
                <div className="col-md-4">
                <div className="col-md-12 mb-3">
                                <h5>Discription for</h5>
                            </div>
                            
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>NDC</small>
                                    <input type="text" name="" id="" className="form-control" placeholder="85115-5020-14" readOnly />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Label Name</small>
                                    <input type="text" name="" id="" className="form-control" placeholder="Klaridic Tab 250MG" readOnly />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Manufacturer</small>
                                    <input type="text" name="" id="" className="form-control" placeholder="Abbot" readOnly />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Package Size</small>
                                    <input type="text" name="" id="" className="form-control" placeholder="14" readOnly />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Generic Indicator</small>
                                    <input type="text" name="" id="" className="form-control" placeholder="O - Original with Generics" readOnly />
                                </div>
                            </div>

                </div>
                </div>
                </div>
                </div>
        </>
    )
}
