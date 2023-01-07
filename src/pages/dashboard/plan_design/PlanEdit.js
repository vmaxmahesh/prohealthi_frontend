import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PlanEdit() {

    const [planEditList, setPlanEditList] = useState([]);
    const [planEditForm, setPlanEditForm] = useState(false);

    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];

    const onSearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setPlanEditList(data.data);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getFormData = (plan_id) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get-plan-edit-data?search=${plan_id}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setPlanEditForm(data.data);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => { }, [planEditList, planEditForm]);

    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Plan Design</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Plan Edit</a></li>
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
            <SearchPlanEdit onSearch={onSearch} />
            <PlanEditList planEditList={planEditList} getFormData={getFormData} />
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <Link to="plan-formulary" className={'nav-link' + (currentpath == 'plan-formulary' ? ' active' : '')}>Plan / Formularly</Link>
                <Link to="rx-limitations" className={'nav-link' + (currentpath == 'rx-limitations' ? ' active' : '')}>Rx Limitations</Link>
                <Link to="date-limitations" className={'nav-link' + (currentpath == 'date-limitations' ? ' active' : '')}>Date Limitations</Link>
                <Link to="refill-limitations" className={'nav-link' + (currentpath == 'refill-limitations' ? ' active' : '')}>Refill Limitations</Link>
                <Link to="notes" className={'nav-link' + (currentpath == 'notes' ? ' active' : '')}>Notes</Link>
            </div>
            <Outlet context={[planEditForm, setPlanEditForm]} />
        </>
    )
}

function SearchPlanEdit(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Plan Edit </small>
                                <input type="text" onKeyUp={e => props.onSearch(e)} className="form-control" placeholder='Start typing  plan ID/ name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PlanEditList(props) {
    const editListArray = [];
    for (let i = 0; i < props.planEditList.length; i++) {
        editListArray.push(<EditListRow editListRow={props.planEditList[i]} getFormData={props.getFormData} />);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Plan Edit List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                            {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        </div>

                        <div className="col-md-12">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Plan ID</th>
                                                    <th>Effective Date</th>
                                                    <th>Termination Date</th>
                                                    <th>Plan Name</th>
                                                    <th>Default Drug Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {editListArray}
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

function EditListRow(props) {
    return (
        <>
            <tr onClick={e => props.getFormData(props.editListRow.plan_id)}>
                <td>{props.editListRow.plan_id}</td>
                <td>{props.editListRow.effective_date}</td>
                <td>{props.editListRow.termination_date}</td>
                <td>{props.editListRow.plan_name}</td>
                <td>{props.editListRow.default_drug_status}</td>
            </tr>
        </>
    )
}


export function PlanFormulary() {
    const [planEditForm, setPlanEditForm] = useOutletContext();
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    useEffect(() => { reset(planEditForm) }, [planEditForm]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-md-6">
                            <h5 className="mb-2">Plan</h5>
                            <div className="form-group mb-2">
                                <small> ID</small>
                                <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mb-1">Name</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Effective Date</small>
                                        <input type="date" className="form-control" {...register("effective_date", { required: true })} placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group mb-2">
                                        <small>Classification</small>
                                        <select className="form-select" {...register("plan_classification", { required: true })}>
                                            <option value="">Select </option>
                                            <option value="C">Cash</option>
                                            <option value="M">Medicaid</option>
                                            <option value="T">Third Party</option>
                                            <option value="U">Unclassified</option>
                                            <option value="W">Workers Compensation</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <h5 className="mb-1">Plan Participation</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Eligibility</small>
                                        <select className="form-select" {...register("eligibility_exceptions_flag", { required: true })}>
                                            <option value="">Select </option>
                                            <option value="N">None (No Eligibility check)</option>
                                            <option value="V">Validate Patient by PIN</option>
                                            <option value="M">Check Eligibility By Member </option>
                                            <option value="X">Check Eligibility By Member Date of Birth & Gender</option>
                                            <option value="Y">Check Eligibility By Member Date of Birth</option>
                                            <option value="Z">Check Eligibility By Member Gender</option>
                                            <option value="1">Check Eligibility By Member Birth Year</option>
                                            <option value="2">Check Eligibility By Member Birth Month and Year</option>
                                        </select>
                                    </div>
                                    <small style={{ fontSize: "9px", fontWeight: "600" }}>Check Eligibilty by Member Date of Birth & Gender</small>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Provider</small>
                                        <select className="form-select" {...register("pharmacy_exceptions_flag", { required: true })}>
                                            <option value="">Select </option>
                                            <option value="N">None </option>
                                            <option value="M">Must Exist Within Provider Master</option>
                                            <option value="N">Must Exist Within Provider Network</option>
                                            <option value="F">Validate Provider Format</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Must Exist within Provider Master</small>
                                        <input type="text" className="form-control" {...register("plan_id", { required: true })} placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Super Provider</small>
                                        <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Prescriber</small>
                                        <select className="form-select" {...register("prescriber_exceptions_flag", { required: true })}>
                                            <option value="">Not Specified</option>
                                            <option value="N">No Prescriber check</option>
                                            <option value="D">Validate DEA Code</option>
                                            <option value="P">Primary Phisician Validation</option>
                                            <option value="E">Must Exist in Physician Master</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Exhausted Benefits Opt</small>
                                        <select className="form-select" {...register("exhausted_benefit_opt", { required: true })}>
                                            <option value="">Select </option>
                                            <option value="R">Reject the transaction</option>
                                            <option value="N">New plan is specified</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group mb-2">
                                        <small>Exhausted Benefits Plan ID</small>
                                        <input type="text" className="form-control" placeholder="" {...register("exhausted_benefit_plan_id", { required: true })} />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-md-6">
                            <h5 className="mb-1">Formularly Excemptions</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>By Drug Category List</small>
                                        <input type="text" className="form-control" placeholder="" {...register("drug_catgy_exception_list", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>By Therapy Class List</small>
                                        <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>By GPI</small>
                                        <input type="text" className="form-control" placeholder="" {...register("plagpi_exception_list_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>By NDC</small>
                                        <input type="text" className="form-control" placeholder="Enter" {...register("ndc_exception_list", { required: true })} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Census Date</small>
                                        <input type="text" className="form-control" placeholder="Census Date" {...register("plan_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Super Benefit List</small>
                                        <input type="text" className="form-control" placeholder="Active Contracts" {...register("super_benefit_list_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Maj Med Spr Bene List</small>
                                        <input type="text" className="form-control" placeholder="Active Memebers" {...register("plan_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Prov Type/ Proc Association</small>
                                        <input type="text" className="form-control" placeholder="Termed Contracts" {...register("prov_type_proc_assoc_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Prov Type Valid List</small>
                                        <input type="text" className="form-control" placeholder="Termed Memebers" {...register("plan_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Proc. Exception List</small>
                                        <input type="text" className="form-control" placeholder="Pending Contracts" {...register("procedure_exception_list", { required: true })} />
                                    </div>
                                </div>

                                <h5 className="mb-1">Strategy Validations</h5>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Pricing Strategy ID</small>
                                        <input type="text" className="form-control" placeholder="Termed Memebers" {...register("pricing_strategy_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Copy Strategy ID</small>
                                        <input type="text" className="form-control" placeholder="Pending Contracts" {...register("copay_strategy_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Accum Benfint Strategy</small>
                                        <input type="text" className="form-control" placeholder="Pending Contracts" {...register("accum_bene_strategy_id", { required: true })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <h5 className="mb-1">Formularly Type</h5>
                            </div>
                            <div className="col-md-3">
                                <h5 className="mb-1">Pricing Defaults</h5>
                            </div>


                            <div className="row">
                                <div className="col-md-3">
                                    <div className="form-group mb-2">
                                        <small>Formularly Type</small>
                                        <select className="form-select" {...register("plan_id", { required: true })}>
                                            <option value="">Select </option>
                                            <option value="FA">Approved, Formularly</option>
                                            <option value="NF">Approved, Non Formularly</option>
                                            <option value="CF">Rejected</option>
                                            <option value="NR">Rejected-No Rx Coverage</option>
                                        </select>
                                    </div>
                                </div>



                                <div className="col-md-3">
                                    <div className="form-group mb-2">
                                        <small>Price Schedule</small>
                                        <input type="text" className="form-control" placeholder="Termed Memebers" {...register("plan_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group mb-2">
                                        <small>Max Allow cost List</small>
                                        <input type="text" className="form-control" placeholder="Pending Contracts" {...register("plan_id", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group mb-2">
                                        <small>Procedue UCR List</small>
                                        <input type="text" className="form-control" placeholder="Pending Contracts" {...register("plan_id", { required: true })} />
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

export function RxLimitations() {
    const [planEditForm, setPlanEditForm] = useOutletContext();
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    useEffect(() => { reset(planEditForm) }, [planEditForm]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div class='row'>
                        <div className="col-md-11 mb-1">
                            <h5 className="mb-2">Rx Limitations</h5>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-6 form-btm">
                            <div className="row">
                                <div className="col-md-6">
                                </div>
                                <div className="col-md-3 ">
                                    <label>Minimum</label>
                                </div>
                                <div className="col-md-3 ">
                                    <label>Maximum</label>
                                </div>

                                <div className="col-md-6">
                                    <p>RX Quantity</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("min_rx_qty", { required : true })}/>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_rx_qty", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Quantity Over Time</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_qty_over_time", { required : true })} />
                                </div>

                                <div className="col-md-6">
                                    <p>Days Supply</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })} />
                                </div>

                                <div className="col-md-6">
                                    <p> Days Over Time</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_days_over_time", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> CTS Days Supply</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })} />
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Retails Fills</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("retail_max_fills_opt", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Days Per Time</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_days_per_fill", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Quantity Per Fill</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_qty_per_fill", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Daily Dose</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_dose", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Starter Dose Days</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("starter_dose_days", { required : true })} />
                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 form-btm">
                            <div className="row">
                                <div className="col-md-6">
                                </div>
                                <div className="col-md-3 ">
                                    <label>Minimum</label>
                                </div>
                                <div className="col-md-3 ">
                                    <label>Maximum</label>
                                </div>

                                <div className="col-md-6">
                                    <p>Strt Dose Bypass Days</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("starter_dose_bypass_days", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Strt. Dose. Maint. By. Days</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("starter_dose_maint_bypass_days", { required : true })} />
                                </div>

                                <div className="col-md-6">
                                    <p>Days Untill Cover Effective</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })} />
                                </div>

                                <div className="col-md-6">
                                    <p> Age</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("min_age", { required : true })} />
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_age", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Price</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("min_price", { required : true })} />
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_price", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> RX / Patient</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_rxs_patient", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> accum Benefit / Patient</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("accum_bene_strategy_id", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Coverage Start Days</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("coverage_start_days", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Brand Copay Amount</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("min_brand_copay_amt", { required : true })} />
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_brand_copay_amt", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p>Generic Copay</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("min_generic_copay_amt", { required : true })} />
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_generic_copay_amt", { required : true })} />
                                </div>
                                <div className="col-md-6">
                                    <p>DFLT Brand Copay</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("brand_copay_amt", { required : true })} />
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-6">
                                    <p>DFLT Generic Copay</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("generic_copay_amt", { required : true })} />
                                </div>
                                <div className="col-md-3 ">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function DateLimitations() {
    const [planEditForm, setPlanEditForm] = useOutletContext();
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    useEffect(() => { reset(planEditForm) }, [planEditForm]);
    console.log(planEditForm);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div class='row'>
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Override System Date Limitations</h5>
                        </div>
                        <div className="col-md-8">
                        </div>
                        <div className="col-md-2">
                            <p>Maximum</p>
                        </div>
                        <div className="col-md-2">
                            <p>System Default</p>
                        </div>

                        <div className="col-md-6">
                            <p>Days from Days Written to First Fill</p>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })}/>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })}/>
                        </div>

                        <div className="col-md-6">
                            <p>Days from Days Filled to date Submitted (On line)</p>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })}/>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })}/>
                        </div>

                        <div className="col-md-6">
                            <p>Days from Days Filled to date Submitted (DMR / UCF)</p>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })}/>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })}/>
                        </div>

                        <div className="col-md-6">
                            <p>Days from Days Submitted to Date Filled (Future Fill)</p>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })}/>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })} />
                        </div>

                        <div className="col-md-6">
                            <p>Days of Reversal</p>
                        </div>
                        <div className="col-md-3"> 
                            <input type="text" className="form-control" placeholder=""  {...register("plan_id", { required : true })}/>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })} />
                        </div>

                    </div>


                    <div class='row'>
                        <div className="col-md-12 mt-3 mb-3">
                            <h5 className="mb-2">Miscellaneous Flags</h5>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Tax Status</small>
                                <select className="form-select" {...register("plan_id", { required : true })}>
                                    <option value=""> Not Specified </option>
                                    <option value="0">Taxable</option>
                                    <option value="1">Tax excempt </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })} />
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Mandatory U and C Plan</small>
                                <select className="form-select" {...register("plan_id", { required : true })}>
                                    <option value=""> Not Specified </option>
                                    <option value="0">No</option>
                                    <option value="1">Yes </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required : true })} />
                        </div>

                        <div className="col-md-8  mb-3">
                            <p>Syringes With Issuling Same Day</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="ReturnMax" className="d-none" {...register("plan_id", { required : true })} />
                                <label htmlFor="ReturnMax"></label>
                            </div>
                        </div>

                        <div className="col-md-8 mb-3">
                            <p>Exclude System NDC/GPI Formularly Edits for Out of Network Claim</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="ReturnMaxQ" className="d-none" {...register("plan_id", { required : true })} />
                                <label htmlFor="ReturnMaxQ">  </label>
                            </div>
                        </div>

                        <div className="col-md-8 mb-3">
                            <p>Exclude Plan NDC/GPI Formularly Edits for Out of Network Claim</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="ReturnMax1" className="d-none" {...register("plan_id", { required : true })} />
                                <label htmlFor="ReturnMax1">  </label>
                            </div>
                        </div>

                        <div className="col-md-8 mb-3">
                            <p>Reject Claim for Missing Cardholder ID</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="ReturnMax2" className="d-none" {...register("plan_id", { required : true })} />
                                <label htmlFor="ReturnMax2">  </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function RefillLimitations() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div class='row align-items-center'>
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Early Refill Limitations</h5>
                        </div>

                        <div className="col-md-4 text-center">
                            <h6><b>Limit 1</b></h6>
                        </div>
                        <div className="col-md-4">
                            <p>RX Maximum Days Supply</p>
                            <p>Minimum Use Percentage</p>
                        </div>
                        <div className="col-md-4 ">
                            <small>Limit</small>
                            <input type="text" className="form-control mb-2" placeholder="" />
                            <input type="text" className="form-control mb-2" placeholder="" />
                        </div>
                        <hr />

                        <div className="col-md-4 text-center">
                            <h6><b>Limit 2 - Above Limit 1</b></h6>
                        </div>
                        <div className="col-md-4">
                            <p>RX Maximum Days Supply</p>
                            <p>Minimum Use Percentage</p>
                        </div>
                        <div className="col-md-4 ">
                            <input type="text" className="form-control mb-2" placeholder="" />
                            <input type="text" className="form-control mb-2" placeholder="" />
                        </div>
                        <hr />

                        <div className="col-md-4 text-center">
                            <h6><b> Above Limit 2</b></h6>
                        </div>
                        <div className="col-md-4">
                            <p> Maximum Use Maximum</p>
                        </div>
                        <div className="col-md-4 ">
                            <input type="text" className="form-control mb-2" placeholder="" />
                        </div>
                        <hr />

                        <div className="col-md-4 text-center">
                        </div>
                        <div className="col-md-4">
                            <p> Search Indication</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select className="form-select">
                                <option value="">Select</option>
                                <option value="N">Name Portion of GPI</option>
                                <option value="F">Full GPI</option>
                            </select>
                        </div>
                        <hr />


                        <div className="col-md-12 mt-3 mb-3">
                            <h5 className="mb-2">Mail Service Early Refiil Limitations</h5>
                        </div>

                        <div className="col-md-4 text-center">
                            <h6><b>Limit 1</b></h6>
                        </div>
                        <div className="col-md-4">
                            <p>RX Maximum Days Supply</p>
                            <p>Minimum Use Percentage</p>
                        </div>
                        <div className="col-md-4 ">
                            <small>Limit</small>
                            <input type="text" className="form-control mb-2" placeholder="" />
                            <input type="text" className="form-control mb-2" placeholder="" />
                        </div>
                        <hr />

                        <div className="col-md-4 text-center">
                            <h6><b>Limit 2 - Above Limit 1</b></h6>
                        </div>
                        <div className="col-md-4">
                            <p>RX Maximum Days Supply</p>
                            <p>Minimum Use Percentage</p>
                        </div>
                        <div className="col-md-4 ">
                            <input type="text" className="form-control mb-2" placeholder="" />
                            <input type="text" className="form-control mb-2" placeholder="" />
                        </div>
                        <hr />

                        <div className="col-md-4 text-center">
                            <h6><b> Above Limit 2</b></h6>
                        </div>
                        <div className="col-md-4">
                            <p> Maximum Use Maximum</p>
                        </div>
                        <div className="col-md-4 ">
                            <input type="text" className="form-control mb-2" placeholder="" />
                        </div>
                        <hr />

                        <div className="col-md-4 text-center">
                        </div>
                        <div className="col-md-4">
                            <p> Search Indication</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select className="form-select">
                                <option value="">Select</option>
                                <option value="N">Name Portion of GPI</option>
                                <option value="F">Full GPI</option>
                            </select>
                        </div>
                        <hr />

                    </div>
                </div>
            </div>
        </>
    )
}

export function PlanEditNotes() {
    const textareastyle = {
        border: '1px solid rgba(0, 0, 0, 0.05)',
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <h5>Notes</h5>
                        </div>
                        <div className="col-md-12 mb-2">
                            <textarea className="form-control" rows="15" style={{}}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}