import React from 'react';

export default function AccumulatedBenefitStrategy()
{
    return(
        <>
         <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Strategies</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Accumulated Benefit Strategy</a></li>
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
            <SearchAccumulatedStrategy />
            <AccumulatedBenefitStrategyList />
            <AccumeBenefitStrategyForm />
            <AccumeBenefitStrategyIdentifiers />
        </>
    )
}

function SearchAccumulatedStrategy()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Accumulated Benefit Strategy</small>
                                <input type="text" className="form-control" placeholder='Start typing  accumulated benefit strategy ID/name to search'
                                />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
        </>
    )
}

function AccumulatedBenefitStrategyList()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Accumulated Benefit Strategy List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Accumulated Benefit Strategy ID</th>
                                                    <th>Accumulated Benefit Strategy Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Effective Date</th>
                                                    <th>Provider Type Variation</th>
                                                    <th>Network Participation Variation</th>
                                                    <th>Claim Type Variation</th>
                                                    <th>Formulary Variation</th>
                                                    <th>Accume Benefits Plan ID</th>
                                                    <th>Exclusion Flag</th>
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
        </>
    )
}

function AccumeBenefitStrategyForm()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="col-md-12">
                                <h5 className="mb-2">Accumulate Benefit Strategy Identification</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <small> Strategy ID: </small>
                                       <input type="text" name="" placeholder="" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <small> Strategy Name: </small>
                                    <input type="text" name="" placeholder="100PC" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
        </div>

        <div className="card mt-3 mb-3">
            <div className="card-body">
            
                <div className="row mb-2">
                        <div className="col-md-12">
                    <h5 className="mb-2">Variations</h5>
                </div>
                    
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Provider Type:</small>
                                <select className="form-select">
                                    <option value="R">Retail</option>
                                    <option value="M">Mail Service </option>
                                    <option value="*">WildCard - No Variation</option>
                                </select>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Network Partification:</small>
                                <select className="form-select">
                                    <option value="I">In Network</option>
                                    <option value="O">Out of Network </option>
                                    <option value="*">WildCard - No Variation</option>
                                </select>
                                
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Claim Type:</small>
                                <select className="form-select">
                                        <option value="P">POS</option>
                                    <option value="D">DMR </option>
                                    <option value="U">UCF</option>
                                    <option value="*">WildCard - No Variation</option>
                                </select>
                                
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Formulary:</small>
                                <select className="form-select">
                                    <option value="F">Formularly</option>
                                    <option value="N">Non-Formulary </option>
                                    {/* <option>UCF</option> */}
                                    <option value="*">Wild Card - No Variation</option>
                                </select>
                                
                        </div>
                    </div>
                </div>
                
                    <div className="row mb-2 ">
                    
                    <div className="col-md-3 mb-4">
                        <div className="form-group">
                                <small>Effective Date: </small>
                                <input type="date" className="form-control" placeholder="" name="" id="" required="" autoComplete="off" /> 
                        </div>
                    </div>
                        
                </div>
                <div className="col-md-12 ">
                        <div className="float-end">
                    {/* <a href="" className="btn btn-theme pt-2 pb-2" style={{width: "100%"}}>Next</a> */}
                </div> 
                </div>
            </div>
        </div>
        </>
    )
}

function AccumeBenefitStrategyIdentifiers()
{
    return(
        <>
         <div className="card mt-3 mb-3">
            <div className="card-body">
            
                <div className="row mb-2">
                    <div className="col-md-12">
                        <h5 className="mb-2">Identifiers</h5>
                </div>

                <div className="col-md-3 mb-4">
                        <div className="form-group">
                                <small>Accumulate Benefit Plan ID    </small>
                                <input type="text" className="form-control" placeholder="" name="" id="" required="" autoComplete="off" /> 
                        </div>
                    </div>
                    
                <div className="col-md-3 mb-4"> 
                        <small className="mb-2"></small>
                        <div className="form-group mt-4">
                            <input type="checkbox" id="Return2" className="d-none" />
                            <label htmlFor="Return3">Accumlated Benefit Exclusion Flag </label>
                        </div>
                        </div>
                   
                <div className="col-md-3 mb-4"> 
                        <small className="mb-2"></small>
                        <div className="form-group mt-4">
                            <input type="checkbox" id="Return2" className="d-none" />
                            <label htmlFor="Return2">User exit will not be invoked for the strategy </label>
                        </div>
                        </div>
                </div>
               
            </div>
        </div>
        </>
    )
}