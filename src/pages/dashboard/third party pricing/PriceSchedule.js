import React from 'react';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

export default function PriceSchedule() {
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a className=""> Third Party Pricing </a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a className="">Price Schedule</a></li>
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
            <SearchPriceSchedule />
            <GetPriceSchedules />
        </>
    );
}

function SearchPriceSchedule() {

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Price Schedule </small>
                                <input type="text" className="form-control" placeholder='Start typing price schedule id/ name/ copay schedule to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

function GetPriceSchedules() {
    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Price Schedule List</h5>
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
                                                    <th>Price Schedule ID</th>
                                                    <th>Price Schedule Name</th>
                                                    <th>Copay Schedule</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* form starts */}
                        <div className="col-md-8">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className="data">
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <Link to="brand-item" className={'nav-link' + (currentpath == 'brand-item' ? ' active' : '')}>Brand Item, No Generic / Non-Drug</Link>
                                            <Link to="brand-item-generic" className={'nav-link' + (currentpath == 'brand-item-generic' ? ' active' : '')}>Brand Item,Generic Available</Link>
                                            <Link to="generic-item" className={'nav-link' + (currentpath == 'generic-item' ? ' active' : '')}>Generic Item</Link>
                                        </div>
                                        <hr />
                                        <div className="tab-content" id="nav-tabContent">
                                            <Outlet />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* form ends  */}
                    </div>
                </div>
            </div>
        </>
    );
}


export function GetGenericItem() {
    return (
        <>
            <div class='row'>
                <div className="col-md-12">
                    <h5 className="mb-2">Generic Item</h5>
                    <div className="row mt-3 mb-3">
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    First available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    Greatest off all available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    Least off all available
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Source</small>
                                <input type="text" className="form-control" name="" id="" placeholder="Source " />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" name="" id="" placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" name="" id="" placeholder="In dollars" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Type</small>
                                <select className="form-select">
                                    <option>Type 1</option>
                                    <option>Type 2</option>
                                    <option>Type 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <small>Fee</small>
                            <div className="form-group mb-2">
                                <input type="text" className="form-control" name="" id="" placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Fee</small>
                                <input type="text" className="form-control" name="" id="" placeholder="In dollars" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return8" className="d-none" />
                                <label for="Return8">Std Pkg</label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return9" className="d-none" />
                                <label for="Return9">1 per fill</label>
                            </div>
                        </div>
                        {/* <div className="col-md-2 mt-4">
                             <div className="">
                             <button type="submit" className="btn m-0 p-2 btn-theme" style="width: 100%;font-size: 12px;">Search</button>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
        </>
    )
}

export function BrandItem() {
    return (
        <>
            <div className='row'>
                <div className="col-md-12">
                    <h5 className="mb-2">Brand Item, No Generic / Non-Drug</h5>
                    <div className="row mt-3 mb-3">
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    First available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Greatest off all available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Least off all available
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Source</small>
                                <input type="text" className="form-control" name="" id="" placeholder="Source " />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" name="" id="" placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" name="" id="" placeholder="In dollars" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Type</small>
                                <select className="form-select">
                                    <option>Type 1</option>
                                    <option>Type 2</option>
                                    <option>Type 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <small>Fee</small>
                            <div className="form-group mb-2">
                                <input type="text" className="form-control" name="" id="" placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Fee</small>
                                <input type="text" className="form-control" name="" id="" placeholder="In dollars" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return2" className="d-none" />
                                <label htmlFor="Return2">Std Pkg</label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return3" className="d-none" />
                                <label htmlFor="Return3">1 per fill</label>
                            </div>
                        </div>
                        <div className="col-md-2 mt-4">
                            <div className="">
                                <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: "100%", fontSize: "12px" }}>Search</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export function BrandItemGeneric() {
    return (
        <>
            <div class='row'>
                <div className="col-md-12">
                    <h5 className="mb-2">Brand Item,Generic Available</h5>
                    <div className="row mt-3 mb-3">
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    First available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    Greatest off all available
                                </label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    Least off all available
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Source</small>
                                <input type="text" className="form-control" name="" id="" placeholder="Source " />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" name="" id="" placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Mkp</small>
                                <input type="text" className="form-control" name="" id="" placeholder="In dollars" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Type</small>
                                <select className="form-select">
                                    <option>Type 1</option>
                                    <option>Type 2</option>
                                    <option>Type 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <small>Fee</small>
                            <div className="form-group mb-2">
                                <input type="text" className="form-control" name="" id="" placeholder="Percentage" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-2">
                                <small>Fee</small>
                                <input type="text" className="form-control" name="" id="" placeholder="In dollars" />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return5" className="d-none" />
                                <label for="Return5">Std Pkg</label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mt-4">
                                <input type="checkbox" id="Return6" className="d-none" />
                                <label for="Return6">1 per fill</label>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}