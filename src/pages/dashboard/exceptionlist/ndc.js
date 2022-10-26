import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function NDC() {
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Exception List</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">NDC Exception</a></li>
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
            <SearchNDC />
        </>
    )
}

function SearchNDC() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [ndcData, setNdcData] = useState('');
    const [ndcClass, setNdClass] = useState('');
    const fillNdcArray = (e) => {
        var arr = [
            { ndc_id: '1234', name: 'Jades Approved NDC' },
            { ndc_id: '8682', name: 'NHF Diabetes Supplies' }
        ];
        var class_arr = [
            { class: 'clas one', eff_date: '12/12/2022', progress_status: 'success/true', process_rule: 'rule 1' },
            { class: 'clas two', eff_date: '15/12/2022', progress_status: 'success/true', process_rule: 'rule 2' },
            { class: 'clas three', eff_date: '18/12/2022', progress_status: 'success/true', process_rule: 'rule 3' },
            { class: 'clas four', eff_date: '120/12/2022', progress_status: 'success/true', process_rule: 'rule 4' },
        ];
        setNdcData(arr);
        setNdClass(class_arr);
    }
    useEffect(() => { }, [ndcData, ndcClass]);

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <small>ID</small>
                                <input type="text" className="form-control" placeholder='Enter NDC ID to search' {...register("ndc_id", { required: true })} />
                                {errors.ndc_id && <span><p className='notvalid'>This field is required</p></span>}
                            </div>
                        </div>
                        <div className="col-md-2 mb-2">
                            <div className="form-group">
                                <small>&nbsp;</small><br />
                                <button type="submit" className="btn m-0 p-2 btn-theme" style={{ width: "100%", fontSize: "12px" }} onClick={e => fillNdcArray()}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShowNDCList ndcListData={ndcData} ndcClassData={ndcClass} />
        </>
    )
}

function ShowNDCList(props) {
    const ndcListArray = [];
    for (let i = 0; i < props.ndcListData.length; i++) {
        ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} />);
    }

    const ndcClassArray = [];
    for (let j = 0; j < props.ndcClassData.length; j++) {
        ndcClassArray.push(<NdcClassRow ndcClassRow={props.ndcClassData[j]} />);
    }

    const [ncdListData, setNcdListData] = useState();
    const [show, setShow] = useState("none");
    const handleShow = () => setShow("block");
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>NDC Exception List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button>
                        </div>
                        <div className="col-md-4">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ndcListArray}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Class</th>
                                                <th>eff. Date</th>
                                                <th>New process status</th>
                                                <th>Process rule</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ndcClassArray}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddNcdList show={show} />
        </>
    )
}

function NdcRow(props) {
    return (
        <>
            <tr>
                <td>{props.ndcRow.ndc_id}</td>
                <td>{props.ndcRow.name}</td>
                <td><button className="btn btn-sm btn-info" id=""><i className="fa fa-eye"></i> View</button></td>
            </tr>
        </>
    )
}

function NdcClassRow(props) {
    return (
        <>
            <tr>
                <td>{props.ndcClassRow.class}</td>
                <td>{props.ndcClassRow.eff_date}</td>
                <td>{props.ndcClassRow.progress_status}</td>
                <td>{props.ndcClassRow.process_rule}</td>
                <td><button className="btn btn-sm btn-info" id=""><i className="fa fa-eye"></i> View</button></td>
            </tr>
        </>
    )
}

function AddNcdList(props) {
    const location = useLocation();

    const currentpath = location.pathname.split('/').pop();

    return (
        <>
            <div className="data">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {/* <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#Rules" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Process Rules</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Pricing" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Rx Limitations/Pricing</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Override" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Validations/Override</button> */}
                    <Link to="process-rule" className={'nav-link' + (currentpath == 'process-rule' ? ' active' : '')}>Process Rules</Link>
                    <Link to="rx-limitation-pricing" className={'nav-link' + (currentpath == 'rx-limitation-pricing' ? ' active' : '')}>Rx Limitations/Pricing</Link>
                    <Link to="validation-override" className={'nav-link' + (currentpath == 'validation-override' ? ' active' : '')}>Validations/Override</Link>

                </div>
                <div className="tab-content" id="nav-tabContent">
                    <Outlet/>
                    <div className="tab-pane fade show active" id="Rules" role="tabpanel" aria-labelledby="nav-home-tab">
                        {/* <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="mb-2">Information</h5>
                                        <div className="row mb-2">
                                            <div className="col-md-12">
                                                <div className="form-group mb-2">
                                                    <small>ID</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Enter ID" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Name</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="Name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>NDC</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Termination Date</small>
                                                    <input type="date" className="form-control" name="" id="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Effective Date</small>
                                                    <input type="date" className="form-control" name="" id="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h5 className="mb-1">Process Rules</h5>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>New Drug Status</small>
                                                    <select className="form-select">
                                                        <option value="">Select</option>
                                                        <option value="">Approved</option>
                                                        <option value="">Non Fourmulary</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Rule</small>
                                                    <select className="form-select">
                                                        <option value="">Select</option>
                                                        <option value="">R - Reject if status indicator</option>
                                                        <option value="">L - Limitations are Exceeded</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-4">
                                                <div className="form-group">
                                                    <input type="checkbox" id="user" className="d-none" />
                                                    <label htmlFor="user">User will Exit will not be Invoked for this Section</label>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <h5 className="mb-1">Product Exception</h5>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Preferred NDC</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-2">
                                                    <small>Conversion NDC</small>
                                                    <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <h5 className="mb-1">User Message</h5>
                                    </div>

                                    <div className="col-md-12 mb-2">
                                        <div className="form-group">
                                            <small>Message</small>
                                            <textarea className="form-control" rows="3"></textarea>
                                            <p className="input-hint">Message Returned to the Provider</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="form-group">
                                            <small>Stop Date</small>
                                            <input type="date" name="" id="" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mt-4 mb-4">
                                        <div className="form-group">
                                            <input type="checkbox" id="message" className="d-none" />
                                            <label htmlFor="message">Message sent only when Transation is Rejected</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> */}
                        <div className="col-md-1 float-end">
                            <a href="" className="btn btn-theme pt-2 pb-2" style={{ width: "100%" }}>Next</a>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="Pricing" role="tabpanel" aria-labelledby="nav-profile-tab">
                        {/* <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="row mb-2">
                                            <div className="col-md-12">
                                                <h5 className="mb-2">Rx Limitations</h5>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <small>Rx Quantity</small>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <small>Rxs/Patient</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <small>Amount Due</small>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <small>Accum. Ben./Patient</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <small>Day Supply</small>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <small>Retail Fills</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <small>Ctl Days Supply</small>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <small>Quantity/Fill</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-4">
                                                <small>Days Fill</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <small>Daily Dose</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <small>Starter Dose Days</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-8">
                                                <small>Days Until. Covg Effective</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <small>Star Dose Bypass Days</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-8">
                                                <small>Acute Dosing Days</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                            <div className="col-md-4">
                                                <small>Star Dose Maint. by Days</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>

                                        </div>

                                        <div className="row mb-2">
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <small>Age</small>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <small>Maint. Daily Dose</small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>

                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-8 mb-2">
                                                <div className="form-group mt-4">
                                                    <input type="checkbox" id="Return2" className="d-none" />
                                                    <label htmlFor="Return2">Merge Plan Rx Limitation</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <small>Quantity Over Time </small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                            <div className="col-md-8 mb-2">
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <small>Days Over Time </small>
                                                <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <h5 className="mb-2">Mail Service Limitation</h5>
                                        <div className="row mb-2">
                                            <div className="col-md-12 mb-2">
                                                <div className="form-group">
                                                    <small>Daily Supply</small>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <input type="text" className="form-control" placeholder="" name="" id="" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <input type="text" className="form-control" placeholder="" name="" id="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-2">
                                                <div className="form-group">
                                                    <small>Mail Service Fills</small>
                                                    <input type="text" className="form-control" name="" id="" />
                                                </div>
                                            </div>
                                        </div>

                                        <h5 className="mb-2">Member Rigistration</h5>

                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <small>Valid Relationship</small>
                                                <select className="form-select">
                                                    <option value="">Select</option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                    <option value=""></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Gender Restrictions - (Not Covered)</small>
                                                <div className="row">
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <input type="checkbox" id="male" className="d-none" />
                                                            <label htmlFor="male"> Male</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <input type="checkbox" id="female" className="d-none" />
                                                            <label htmlFor="female"> Female</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-2">
                                                        <div className="form-group">
                                                            <input type="checkbox" id="none" className="d-none" />
                                                            <label htmlFor="none"> None</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <h5 className="mb-2">Pricing Overrides</h5>
                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <small>Alt Price Schedule</small>
                                                <input type="text" className="form-control" name="" id="" />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <small>Alt Copay Schedule</small>
                                                <input type="text" className="form-control" name="" id="" />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <small>Brand Copay Amount</small>
                                                <input type="text" className="form-control" name="" id="" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <small>Generic Copay Amount</small>
                                                <input type="text" className="form-control" name="" id="" />
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <small>Max Allowable Amount</small>
                                                <input type="text" className="form-control" name="" id="" />
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div> */}
                        <div className="col-md-1 float-end">
                            <a href="" className="btn btn-theme pt-2 pb-2" style={{ width: "100%" }}>Next</a>
                        </div>
                    </div>

                    <div className="tab-pane fade" id="Override" role="tabpanel" aria-labelledby="nav-contact-tab">
                        {/* <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="mb-2">Validations</h5>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <small>Provider</small>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="" id="" required="" />
                                            <a href=""><span className="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <small>Prescriber</small>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="" id="" required="" />
                                            <a href=""><span className="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <small>Specilty</small>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="" id="" required="" />
                                            <a href=""><span className="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-2">
                                        <small>Diagnosis</small>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="" id="" required="" />
                                            <a href=""><span className="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div className="clearfix mb-2"></div>


                                    <div className="col-md-12 mb-1">
                                        <h5 className="mb-2">Processing Overrides</h5>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <small>Generic Indicator</small>
                                        <select className="form-select">
                                            <option value="">Select</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <small>Denial Override Code</small>
                                        <input type="text" className="form-control" name="" id="" />
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <small>Denial Override Code</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Not Allowed" readOnly />
                                    </div>

                                    <div className="clearfix mb-2"></div>

                                    <div className="col-md-12 mb-1">
                                        <h5 className="mb-2">Include/Exclude</h5>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <input type="checkbox" id="one" className="d-none" />
                                            <label htmlFor="one">Exclude Single Source Brand Drugs</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <input type="checkbox" id="two" className="d-none" />
                                            <label htmlFor="two">Exclude Multi-Source Brand Drugs</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <input type="checkbox" id="three" className="d-none" />
                                            <label htmlFor="three">Exclued Original with Generic Drugs</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <input type="checkbox" id="four" className="d-none" />
                                            <label htmlFor="four">Exclued Generic Drugs</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div> */}
                        <div className="col-md-1 float-end">
                            <a href="" className="btn btn-theme pt-2 pb-2" style={{ width: "100%" }}>Next</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function ProcessRule(props) {


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="mb-2">Information</h5>
                            <div className="row mb-2">
                                <div className="col-md-12">
                                    <div className="form-group mb-2">
                                        <small>ID</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Enter ID" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Name</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="Name" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>NDC</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Termination Date</small>
                                        <input type="date" className="form-control" name="" id="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Effective Date</small>
                                        <input type="date" className="form-control" name="" id="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mb-1">Process Rules</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>New Drug Status</small>
                                        <select className="form-select">
                                            <option value="">Select</option>
                                            <option value="">Approved</option>
                                            <option value="">Non Fourmulary</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Rule</small>
                                        <select className="form-select">
                                            <option value="">Select</option>
                                            <option value="">R - Reject if status indicator</option>
                                            <option value="">L - Limitations are Exceeded</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <input type="checkbox" id="user" className="d-none" />
                                        <label htmlFor="user">User will Exit will not be Invoked for this Section</label>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <h5 className="mb-1">Product Exception</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Preferred NDC</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Conversion NDC</small>
                                        <input type="text" className="form-control" name="" id="" placeholder="NDC" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-12">
                            <h5 className="mb-1">User Message</h5>
                        </div>

                        <div className="col-md-12 mb-2">
                            <div className="form-group">
                                <small>Message</small>
                                <textarea className="form-control" rows="3"></textarea>
                                <p className="input-hint">Message Returned to the Provider</p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <small>Stop Date</small>
                                <input type="date" name="" id="" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6 mt-4 mb-4">
                            <div className="form-group">
                                <input type="checkbox" id="message" className="d-none" />
                                <label htmlFor="message">Message sent only when Transation is Rejected</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export function RXLimitationPricing(props) {


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row mb-2">
                                <div className="col-md-12">
                                    <h5 className="mb-2">Rx Limitations</h5>
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <small>Rx Quantity</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <small>Rxs/Patient</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <small>Amount Due</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <small>Accum. Ben./Patient</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <small>Day Supply</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <small>Retail Fills</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <small>Ctl Days Supply</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <small>Quantity/Fill</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-4">
                                    <small>Days Fill</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <small>Daily Dose</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <small>Starter Dose Days</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <small>Days Until. Covg Effective</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <small>Star Dose Bypass Days</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <small>Acute Dosing Days</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-4">
                                    <small>Star Dose Maint. by Days</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>

                            </div>

                            <div className="row mb-2">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <small>Age</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Minimum" className="form-control" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" name="" id="" placeholder="Maximum" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <small>Maint. Daily Dose</small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>

                            </div>
                            <div className="row mb-2">
                                <div className="col-md-8 mb-2">
                                    <div className="form-group mt-4">
                                        <input type="checkbox" id="Return2" className="d-none" />
                                        <label htmlFor="Return2">Merge Plan Rx Limitation</label>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <small>Quantity Over Time </small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                                <div className="col-md-8 mb-2">
                                </div>
                                <div className="col-md-4 mb-2">
                                    <small>Days Over Time </small>
                                    <input type="text" name="" id="" placeholder="Max" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h5 className="mb-2">Mail Service Limitation</h5>
                            <div className="row mb-2">
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Daily Supply</small>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" placeholder="" name="" id="" />
                                            </div>
                                            <div className="col-md-6">
                                                <input type="text" className="form-control" placeholder="" name="" id="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Mail Service Fills</small>
                                        <input type="text" className="form-control" name="" id="" />
                                    </div>
                                </div>
                            </div>

                            <h5 className="mb-2">Member Rigistration</h5>

                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Valid Relationship</small>
                                    <select className="form-select">
                                        <option value="">Select</option>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <small>Gender Restrictions - (Not Covered)</small>
                                    <div className="row">
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <input type="checkbox" id="male" className="d-none" />
                                                <label htmlFor="male"> Male</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <input type="checkbox" id="female" className="d-none" />
                                                <label htmlFor="female"> Female</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-2">
                                            <div className="form-group">
                                                <input type="checkbox" id="none" className="d-none" />
                                                <label htmlFor="none"> None</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h5 className="mb-2">Pricing Overrides</h5>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Alt Price Schedule</small>
                                    <input type="text" className="form-control" name="" id="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Alt Copay Schedule</small>
                                    <input type="text" className="form-control" name="" id="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Brand Copay Amount</small>
                                    <input type="text" className="form-control" name="" id="" />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Generic Copay Amount</small>
                                    <input type="text" className="form-control" name="" id="" />
                                </div>
                            </div>
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <small>Max Allowable Amount</small>
                                    <input type="text" className="form-control" name="" id="" />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export function ValidationsOverride(props) {


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">Validations</h5>
                        </div>
                        <div className="col-md-3 mb-2">
                            <small>Provider</small>
                            <div className="form-group">
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <small>Prescriber</small>
                            <div className="form-group">
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <small>Specilty</small>
                            <div className="form-group">
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3 mb-2">
                            <small>Diagnosis</small>
                            <div className="form-group">
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="clearfix mb-2"></div>


                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Processing Overrides</h5>
                        </div>
                        <div className="col-md-4 mb-2">
                            <small>Generic Indicator</small>
                            <select className="form-select">
                                <option value="">Select</option>
                                <option value=""></option>
                                <option value=""></option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-2">
                            <small>Denial Override Code</small>
                            <input type="text" className="form-control" name="" id="" />
                        </div>
                        <div className="col-md-4 mb-2">
                            <small>Denial Override Code</small>
                            <input type="text" className="form-control" name="" id="" placeholder="Not Allowed" readOnly />
                        </div>

                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Include/Exclude</h5>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="one" className="d-none" />
                                <label htmlFor="one">Exclude Single Source Brand Drugs</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="two" className="d-none" />
                                <label htmlFor="two">Exclude Multi-Source Brand Drugs</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="three" className="d-none" />
                                <label htmlFor="three">Exclued Original with Generic Drugs</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="four" className="d-none" />
                                <label htmlFor="four">Exclued Generic Drugs</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}