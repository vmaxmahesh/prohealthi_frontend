import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
export default function BenefitDerivation()
{
    const searchBenefitDer = (fdata) => {
        console.log(fdata.target.value);
        const requestOptions = {
            method : 'GET',
            headers : { 'Content-Type' : 'application/json' },
        };
    }
    return(
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Exception List</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Benefit Derivation</a></li>
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
            <SearchBenefitDerivation ajaxData={searchBenefitDer}/>
        </>
    );
}

function SearchBenefitDerivation(props)
{
    const{register, handleSubmit, watch, formState : { errors }} = useForm();
    const searchBenefitDer = (fdata) => {
        props.ajaxData(fdata);
    }
    return(
        <>
        <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Benefit Derivation ID/Name</small>
                                <input type="text"  className="form-control" placeholder='Start typing benefit derivation ID/name to search'
                                 onKeyUp={(e) => searchBenefitDer(e)} {...register('benefit_derivation_id', {required : true})} />
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
            <BenefitDerivationList />
            <AddBenefitDerivation />
        </>
    )
}

export function BenefitDerivationList()
{
    const{ register, handleSubmit, watch, formState : { errors }} = useForm();
    const [ncdListData, setNcdListData] = useState();
    const [show, setShow] = useState("none");
    const handleShow = () => setShow("block");
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Benefit Derivation Exception List</h5>
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
                                                    <th>Benefit Derivation Exception ID</th>
                                                    <th>Benefit Derivation Exception Name</th>
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
                                                    <th>Benefit Derivation Exception List</th>
                                                    <th>Benefit Derivation</th>
                                                    <th>Effective Date</th>
                                                    <th>New Drug Status</th>
                                                    <th>Process Rule</th>
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

function AddBenefitDerivation()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-md-12 mb-2">
                                <h5>Benefit Derivation</h5>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group mb-2">
                                    <small>ID</small>
                                    <input type="text" className="form-control" name="" id="" placeholder="Enter ID" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group mb-2">
                                    <small>Description</small>
                                    <input type="text" className="form-control" name="" id="" placeholder="Description" />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <h5>Codes</h5>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Service Type</small>
                                    <input type="text" className="form-control" name="" id="" placeholder="Service Type" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                    <p className="input-hint">Pharmacy</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Service Modifier</small>
                                    <input type="text" className="form-control" name="" id="" placeholder="Service Modifier" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                    <p className="input-hint">General</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Product Code List ID</small>
                                    <input type="text" className="form-control" name="" id="" placeholder="Product Code List ID" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                    <p className="input-hint">Prescription Drugs</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Benefit Code</small>
                                    <input type="text" className="form-control" name="" id="" placeholder="Benefit Code" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                    <p className="input-hint">Drugs</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Effective Date</small>
                                    <input type="date" className="form-control" name="" id="" placeholder="Effective Date" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-2">
                                    <small>Termination Date</small>
                                    <input type="date" className="form-control" name="" id="" placeholder="Termination Date" />
                                </div>
                            </div>






                        </div>
                    </div>
                </div>
        </>
    )
}






