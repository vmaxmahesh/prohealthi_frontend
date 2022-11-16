import React from 'react';

export default function SuperBenefitList()
{
    return(
        <>
         <div className="dashboard-content clearfix">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Exception List</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Super Benefit List</a></li>
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
                    <SearchSuperBenefit />
                    <ShowSuperBenefitList />
                </div>
            </div> 
        </>
    )
}

function SearchSuperBenefit()
{
    return(
        <>
        <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <small>Super Benefit List </small>
                                    <input type="text" className="form-control" placeholder='Start typing ID/ name to search'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

function ShowSuperBenefitList()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Super Benefit List </h5>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Super Benefit ID</th>
                                        <th>Super Benefit Name </th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-8">
                           <SuperBenefitForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function SuperBenefitForm()
{
    return(
        <>
         <div className="card mt-3 mb-3 data" >
                    <div className="card-body">
                    <div className="row mb-2">
                            <div className="col-md-12 mb-2">
                                <h5>Super Benefit Lists</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>ID</small>
                                    <input type="text" className="form-control" name="" id="" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Description</small>
                                    <input type="text" className="form-control" name="" id="" />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <h5>Codes</h5>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Benefit List ID</small>
                                    <input type="text" className="form-control" name="" id=""/>
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Accume Benefit Strategy ID</small>
                                    <input type="text" className="form-control" name="" id=""/>
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Effective Date</small>
                                    <input type="date" className="form-control" name="" id=""/>
                                </div>
                            </div>
                            
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Termination Date</small>
                                    <input type="date" className="form-control" name="" id=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}