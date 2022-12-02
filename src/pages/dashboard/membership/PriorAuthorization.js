import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PriorAuthorization() {

    const [priorAuthList, setPriorAuthList] = useState([]);
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();
    const [priorAuthFormData, setPriorAuthFormData] = useState(false);

    const onSearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/membership/prior-authorization/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setPriorAuthList(data.data);
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

    const fillFormData = (formData) => {
        setPriorAuthFormData(formData);
    }

    useEffect(() => { }, [priorAuthList]);

    return (
        <>
            <div className="dashboard-content clearfix">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Membership Data </a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Prior Authorizations</a></li>
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
                    <SearchPriorAuthorization onSearch={onSearch} />
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <div className='row'>
                                <div className="col-md-4 mb-3">
                                    <PriorAuthorizationList priorAuthList={priorAuthList} fillFormData={fillFormData} />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <div className="data">
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <Link to="authorization" className={'nav-link' + (currentpath == 'authorization' ? ' active' : '')}>Authorization</Link>
                                            <Link to="pricing" className={'nav-link' + (currentpath == 'pricing' ? ' active' : '')}>Pricing/Misc</Link>
                                            <Link to="notes" className={'nav-link' + (currentpath == 'notes' ? ' active' : '')}>Notes</Link>
                                        </div>
                                    </div>
                                    <div>
                                        <Outlet context={[priorAuthFormData, setPriorAuthFormData]} />
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

function SearchPriorAuthorization(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Prior Authorization</small>
                                <input type="text" onKeyUp={e => props.onSearch(e)} className="form-control" placeholder='Start typing member ID/ person code/ customer ID/ client ID/ Group ID to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PriorAuthorizationList(props) {

    const listArray = [];

    for (let i = 0; i < props.priorAuthList.length; i++) {
        listArray.push(<PriorAuthRow priorAuthRow={props.priorAuthList[i]} fillFormData={props.fillFormData} />);
    }

    return (
        <>

            <div style={{ height: "600px", overflowY: "scroll" }}>
                <table className="table table-bordered">
                    <thead className='stickt-thead'>
                        <tr>
                            <th width="20%">Auth. Number</th>
                            <th width="20%">Auth. Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listArray}
                    </tbody>
                </table>
            </div>
            {/* </div>
                        
                    </div>
                </div>
            </div> */}
        </>
    )
}

function PriorAuthRow(props) {
    return (
        <>
            <tr onClick={e => props.fillFormData(props.priorAuthRow)}>
                <td>{props.priorAuthRow.prior_auth_code_num}</td>
                <td>{props.priorAuthRow.prior_auth_type}</td>
            </tr>
        </>
    )
}

export function Authorization() {
    const [priorAuthFormData, setPriorAuthFormData] = useOutletContext();
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    useEffect(() => { reset(priorAuthFormData) }, [priorAuthFormData]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className='row'>
                        <div className="col-md-12 mb-3">
                            <h5 className="mb-2">General</h5>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Customer ID</small>
                                        <input type="text" className="form-control" {...register("customer_id",{required:true})} placeholder="Customer ID" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Client ID</small>
                                        <input type="text" className="form-control" {...register("client_id",{required:true})} placeholder="Client ID" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Group ID</small>
                                        <input type="text" className="form-control" {...register("client_group_id",{required:true})} placeholder="Group ID" readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mb-1">Prior Authorization</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Auth Number</small>
                                        <input type="text" className="form-control" {...register("prior_auth_code_num",{required:true})} placeholder="Name" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Auth type</small>
                                        <select className="form-select" {...register("prior_auth_type",{required:true})}>
                                            <option value="">Select Type</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Member ID</small>
                                        <input type="text" className="form-control" {...register("member_id",{required:true})} placeholder="" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Person Code</small>
                                        <input type="text" className="form-control" {...register("person_code",{required:true})} placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>PIN</small>
                                        <input type="text" className="form-control" {...register("patient_pin_number",{required:true})} placeholder="Country" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Eff Date</small>
                                        <input type="date" className="form-control" {...register("effective_date",{required:true})} placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Term Date</small>
                                        <input type="date" className="form-control" {...register("termination_date",{required:true})} placeholder="" />
                                    </div>
                                </div>

                                <div className="clearfix mb-3"></div>

                                <div className="col-md-12 mb-2">
                                    <h5 className="mb-1">NDC / GPI Authorization</h5>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>NDC</small>
                                        <input type="text" className="form-control" {...register("ndc",{required:true})} placeholder="" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>GPI</small>
                                        <input type="text" className="form-control" {...register("generic_product_id",{required:true})} placeholder="" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Generic Indicator</small>
                                        <select className="form-select" {...register("generic_indicator",{required:true})}>
                                            <option value="">Select Type</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-5">
                            <h5 className="mb-1">Eligibility Information</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Date of Birth</small>
                                        <input type="date" className="form-control" {...register("birth_date",{required:true})} placeholder="Address 1" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Relationship</small>
                                        <select className="form-select" {...register("relationship",{required:true})}>
                                            <option value="">Relationship Type</option>
                                            <option value=""></option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Plan ID</small>
                                        <input type="text" className="form-control" {...register("plan_id",{required:true})} placeholder="" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                            </div>
                            <h5 className="mb-1">Error Category Override Flags</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group mt-2">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Eligibility" className="d-none" {...register("elig_error_cat_ovr",{required:true})}/>
                                                <label htmlFor="Eligibility">Eligibility</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Days" className="d-none" {...register("days_supply_error_cat_ovr",{required:true})}/>
                                                <label htmlFor="Days">Days Supply</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Prescriber" className="d-none" {...register("prescriber_id",{required:true})}/>
                                                <label htmlFor="Prescriber">Prescriber</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Refil" className="d-none" {...register("refill_error_cat_ovr",{required:true})}/>
                                                <label htmlFor="Refil">Refil Top Soon</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Provider" className="d-none" {...register("provider_type",{required:true})}/>
                                                <label htmlFor="Provider">Provider</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Accum" className="d-none" {...register("accum_bene_error_cat_ovr",{required:true})}/>
                                                <label htmlFor="Accum">Accum Benefit</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Drug" className="d-none" {...register("drug_error_cat_ovr",{required:true})}/>
                                                <label htmlFor="Drug">Drug</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Other" className="d-none" {...register("all_oth_error_cat_ovr",{required:true})}/>
                                                <label htmlFor="Other">All Other</label>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input type="checkbox" id="Quantity" className="d-none" {...register("max_quantity",{required:true})}/>
                                                <label htmlFor="Quantity">Quantity</label>
                                            </div>
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

export function PriorPricing() {
    const [priorAuthFormData, setPriorAuthFormData] = useOutletContext();
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    useEffect(() => { reset(priorAuthFormData) }, [priorAuthFormData]);
    return (
        <>
            <div className='row'>
                <div className="col-md-9">
                    <div class='row'>
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">OLTP Information</h5>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group mb-3">
                                <small>Date Used</small>
                                <input type="date" className="form-control" {...register("oltp_date_used",{required:true})} />
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group mb-3">
                                <small>Fils Used</small>
                                <input type="date" className="form-control" {...register("num_fills_used",{required:true})}  />
                            </div>
                        </div>

                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12">
                            <h5 className="mb-2">Mail Service Pricing Information</h5>
                        </div>

                        <div className="col-md-4 mb-2">
                            <div className="form-group mb-3">
                                <small>Copay Sched Ovrd</small>
                                <input type="text" className="form-control" {...register("copay_sched_ovr_mail",{required:true})} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group mb-3">
                                <small>Brand Copay Amt</small>
                                <input type="text" className="form-control" {...register("brand_copay_amt_mail",{required:true})} />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group mb-3">
                                <small>Generic Copay Amt</small>
                                <input type="text" className="form-control" {...register("generic_copay_amt_mail",{required:true})} />
                            </div>
                        </div>


                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12">
                            <h5 className="mb-2">Pricing Information</h5>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Price Sched Ovrd</small>
                                <input type="text" className="form-control" {...register("price_sched_ovr",{required:true})} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Copay Sched Ovrd</small>
                                <input type="text" className="form-control" {...register("copay_sched_ovr",{required:true})} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Accum Bene Excl</small>
                                <select className="form-select" {...register("accum_bene_exclude_flag",{required:true})}>
                                    <option value="">Select..</option>
                                    <option value="">1 </option>
                                    <option value="">2 </option>
                                    <option value="">3 </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Pat. Pd. Diff Ovrd</small>
                                <select className="form-select" {...register("patient_paid_diff_flag",{required:true})}>
                                    <option value="">Select..</option>
                                    <option value="">1 </option>
                                    <option value="">2 </option>
                                    <option value="">3 </option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Brand Copay Amt</small>
                                <input type="text" className="form-control" {...register("brand_copay_amt",{required:true})} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Generic Copay Amt</small>
                                <input type="text" className="form-control" {...register("generic_copay_amt",{required:true})} />
                            </div>
                        </div>

                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12">
                            <h5 className="mb-2">Provider Information</h5>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>Provider</small>
                                <input type="text" className="form-control" {...register("oltp_date_used",{required:true})} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>Status</small>
                                <select className="form-select" {...register("pharmacy_status_override",{required:true})}>
                                    <option value="">Select..</option>
                                    <option value="">1 </option>
                                    <option value="">2 </option>
                                    <option value="">3 </option>
                                </select>
                            </div>
                        </div>

                        <div className="clearfix mb-2"></div>

                        <div className="col-md-12">
                            <h5 className="mb-2">Prescriber Information</h5>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>Prescriber</small>
                                <input type="text" className="form-control" {...register("prescriber_id",{required:true})} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>Status</small>
                                <select className="form-select" {...register("prescriber_status_override",{required:true})}>
                                    <option value="">Select..</option>
                                    <option value="">1 </option>
                                    <option value="">2 </option>
                                    <option value="">3 </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div class='row'>
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Maximums</h5>
                        </div>

                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <small>Daily Dose</small>
                                <input type="text" className="form-control" {...register("max_daily_dose",{required:true})} />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <small>Quantity</small>
                                <input type="text" className="form-control" {...register("max_quantity",{required:true})} />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <small>Days</small>
                                <input type="text" className="form-control" {...register("max_days",{required:true})} />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <small>Doller Amount</small>
                                <input type="text" className="form-control" {...register("max_dollar_amt",{required:true})} />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <small>Number of Pils</small>
                                <input type="text" className="form-control" {...register("max_num_fills",{required:true})} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export function PriorNotes() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <h5>Notes</h5>
                        </div>
                        <div className="col-md-12 mb-2">
                            <textarea className="form-control" rows="15" style={{ border: 'solid 1px #ccc' }}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}