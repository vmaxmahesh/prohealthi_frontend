import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

export default function MembersData() {

    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();

    const [memberList, setMemberList] = useState([]);
    const [memberFormData, setMemberFormData] = useState(false);

    const onSearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/membership/memberdata/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setMemberList(data.data);

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

    const getFormData = (formdata) => {
        setMemberFormData(formdata);
    }


    useEffect(() => { }, [memberList, memberFormData]);

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
                                <li><a href="">Member</a></li>
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
                    <SearchMember onSearch={onSearch} />
                    <MemberList memberList={memberList} getFormData={getFormData} memberFormData={memberFormData} />
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <Link to="member" className={'nav-link' + (currentpath == 'member' ? ' active' : '')}>Member</Link>
                        <Link to="overrides" className={'nav-link' + (currentpath == 'overrides' ? ' active' : '')}>Overrides</Link>
                        <Link to="coverage-history" className={'nav-link' + (currentpath == 'coverage-history' ? ' active' : '')}>Coverage History</Link>
                        <Link to="health-conditions" className={'nav-link' + (currentpath == 'health-conditions' ? ' active' : '')}>Health Conditions</Link>
                        <Link to="notes" className={'nav-link' + (currentpath == 'notes' ? ' active' : '')}>Notes</Link>
                        <Link to="claim-history" className={'nav-link' + (currentpath == 'claim-history' ? ' active' : '')}>Claim History</Link>
                        <Link to="prior-authorization" className={'nav-link' + (currentpath == 'prior-authorization' ? ' active' : '')}>Prior Authorizations</Link>
                        <Link to="provider-search" className={'nav-link' + (currentpath == 'provider-search' ? ' active' : '')}>Provider Search</Link>
                        <Link to="change-log" className={'nav-link' + (currentpath == 'change-log' ? ' active' : '')}>Change Log</Link>
                    </div>
                    <div>
                        <Outlet context={[memberFormData, setMemberFormData]} />
                    </div>
                </div>
            </div>
        </>
    )
}

function SearchMember(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Member </small>
                                <input type="text" onKeyUp={e => props.onSearch(e)} className="form-control" placeholder='Start typing customer ID/ customer name/ client ID/ client name/ last name/ first name/ DOB to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function MemberList(props) {

    const memListArray = [];
    for (let i = 0; i < props.memberList.length; i++) {
        memListArray.push(<MemberRow memRow={props.memberList[i]} getFormData={props.getFormData} />);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                        <table className="table table-bordered">
                            <thead className='stickt-thead'>
                                <tr>
                                    <th width="20%">Customer</th>
                                    <th width="20%">Client</th>
                                    <th width="20%">Group</th>
                                    <th width="20%">Member ID</th>
                                    <th width="20%">Person Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {memListArray}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

function MemberRow(props) {
    return (
        <>
            <tr onClick={e => props.getFormData(props.memRow)}>
                <td colSpan="5" className="p-0">

                    <table className="table table-borderless table-striped ">
                        <tr>
                            <td width="20%">{props.memRow.customer_id}</td>
                            <td width="20%">{props.memRow.client_id}</td>
                            <td width="20%">{props.memRow.client_group_id}</td>
                            <td width="20%">{props.memRow.member_id}</td>
                            <td width="20%">{props.memRow.person_code}</td>
                        </tr>
                        <tr>
                            <td colSpan="2" width="60%">
                                <div className="row">
                                    <div className="col-md-4 mb-2">
                                        <small>First Name</small>
                                        <p>{props.memRow.member_first_name}</p>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <small>Last Name</small>
                                        <p>{props.memRow.member_last_name}</p>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <small>Date of Birth</small>
                                        <p>{props.memRow.date_of_birth} </p>
                                    </div>
                                    <div className="col-md-4">
                                        <small>Effective Date</small>
                                        <p>{props.memRow.effective_date_override}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <small>Termination Date</small>
                                        <p>{props.memRow.person_code}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <small>Plan ID</small>
                                        <p>--</p>
                                    </div>
                                </div>
                            </td>
                            <td width="20%">
                                <div className="col-md-12 mb-2">
                                    <small>Eligibility</small>
                                    <p>{props.memRow.eligibility_ovrd}</p>
                                </div>
                                {/* <div className="col-md-12">
                                    <small>Eligibility</small>
                                    <p>Member Only (Individual)</p>
                                </div> */}
                            </td>
                            <td width="20%">(member Flag)</td>
                            {/* <td width="20%">All_Mild</td> */}
                        </tr>
                        {/* <tr>
                            <td colSpan="2" width="60%">
                                <div className="row">
                                    <div className="col-md-4 mb-2">
                                        <small>First Name</small>
                                        <p>AARONS</p>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <small>Last Name</small>
                                        <p>Derrick</p>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <small>Date of Birth</small>
                                        <p>11-05-1996 </p>
                                    </div>
                                </div>
                            </td>
                            <td width="20%">
                                <div className="col-md-12 mb-2">
                                    <small>Eligibility</small>
                                    <p>Member Only (Individual)</p>
                                </div>
                            </td>
                            <td width="20%">NHF</td>
                            <td width="20%">All_Mild</td>
                        </tr> */}
                    </table>
                </td>
            </tr>
        </>
    )
}

export function MemberTab() {
    const [memberFormData, setMemberFormData] = useOutletContext();
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    useEffect(() => { reset(memberFormData) }, [memberFormData]);

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-11 mb-1">
                            <h5 className="mb-2">General</h5>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col align-items-center">
                            <p className="mt-2">Customer ID</p>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>Customer ID</small>
                                <input type="text" className="form-control" placeholder="Enter Customer ID" {...register("customer_id", { required: true })} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>ID Details </small>
                                <input type="text" className="form-control" placeholder="ID Full Name" {...register("customer_name", { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>Effective Date</small>
                                <input type="date" className="form-control" {...register("cust_eff_date", { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <small>Termination Date</small>
                                <input type="date" className="form-control" {...register("cust_term_date", { required: true })} />
                            </div>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col align-items-center">
                            <p>Client ID</p>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter Customer ID" {...register("client_cust_id", { required: true })} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="ID Full Name" {...register("client_name", { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" {...register("client_eff_date", { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" {...register("client_term_date", { required: true })} />
                            </div>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col align-items-center">
                            <p>Group ID</p>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter Customer ID" {...register("client_group_cust_id", { required: true })} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="ID Full Name" {...register("group_name", { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" {...register("client_group_eff_date", { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" {...register("client_group_term_date", { required: true })} />
                            </div>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col align-items-center">
                            <p>Card Holder</p>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" />
                            </div>
                        </div>

                        <div className="clearfix"></div>

                        <div className="col align-items-center">
                            <p>Member ID</p>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="" {...register("member_id", { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="" {...register("member_first_name", { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" {...register("effective_date_override", { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" {...register("member_first_name", { required: true })} />
                            </div>
                        </div>
                    </div>

                    <div className="clearfix mb-3"></div>

                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Eligibility</h5>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Elgiibility</small>
                                <select className="form-select" {...register("eligibility_ovrd", { required: true })}>
                                    <option value="1">Member Only</option>
                                    <option value="2">Member - Spouse</option>
                                    <option value="3">Member Childred Only</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Validation ID</small>
                                <input type="text" className="form-control" placeholder="Enter Customer ID" {...register("elig_validation_id", { required: true })} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Status</small>
                                <select className="form-select" {...register("status", { required: true })}>
                                    <option value="">Active</option>
                                    <option value="">Pending</option>
                                    <option value="">Tereminated</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="clearfix mb-3"></div>

                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Dates / Misc</h5>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Elgiibility Lock Date</small>
                                <input type="date" className="form-control" placeholder="" {...register("elig_lock_date", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Member Flag ID</small>
                                <input type="text" className="form-control" placeholder="Enter Customer ID" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Load Process Date</small>
                                <input type="date" className="form-control" placeholder="" {...register("load_process_date", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Prim. Cvg. Ins. Carrier</small>
                                <input type="text" className="form-control" placeholder="Enter Customer ID" {...register("prim_coverage_ins_carrier", { required: true })} />
                            </div>
                        </div>
                    </div>

                    <div className="clearfix mb-3"></div>

                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Member Identification</h5>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>First Name</small>
                                <input type="text" className="form-control" placeholder="First Name" {...register("member_first_name", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Last Name</small>
                                <input type="text" className="form-control" placeholder="Last Name" {...register("member_last_name", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Address 1</small>
                                <input type="text" className="form-control" placeholder="Address" {...register("address_1", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Address 2</small>
                                <input type="text" className="form-control" placeholder="Address" {...register("address_2", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>City</small>
                                <select className="form-select" {...register("city", { required: true })}>
                                    <option value="">Select City / State</option>
                                    <option value="">City 1</option>
                                    <option value="">City 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Country</small>
                                <select className="form-select" {...register("country", { required: true })}>
                                    <option value="">Select Country</option>
                                    <option value="">Jamaica</option>
                                    <option value="">Jamaica</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Date of Birth</small>
                                <input type="date" className="form-control" placeholder="Address" {...register("date_of_birth", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Relationship</small>
                                <select className="form-select" {...register("relationship", { required: true })}>
                                    <option value="">Select Relationship</option>
                                    <option value="">1 Cardholder</option>
                                    <option value="">2 Souse</option>
                                    <option value="">3 Child</option>
                                    <option value="">4 Other</option>
                                    <option value="">5 Student</option>
                                    <option value="">6 Disable</option>
                                    <option value="">7 Adult Dependent</option>
                                    <option value="">8 Sigificant Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Anniversary</small>
                                <input type="date" className="form-control" placeholder="Address" {...register("anniv_date", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Patient ID Number</small>
                                <input type="text" className="form-control" placeholder="Address" {...register("patient_pin_number", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Alternate Member ID</small>
                                <input type="date" className="form-control" placeholder="Address" {...register("alt_member_id", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Gender</small>
                                <div className="form-group mt-2">
                                    <input type="checkbox" {...register("sex_of_patient", { required: true })} checked={memberFormData.sex_of_patient == 1 ? '1' : '0'} className="d-none" />
                                    <label htmlFor="male">Male</label> &nbsp; &nbsp;
                                    <input type="checkbox" {...register("sex_of_patient", { required: true })} checked={memberFormData.sex_of_patient == 2 ? '1' : '0'} className="d-none" />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function OverridesTab() {
    const [memberFormData, setMemberFormData] = useOutletContext();
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    useEffect(() => { reset(memberFormData) }, [memberFormData]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Copay Schedule Overrides</h5>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <small>Option</small>
                                <select className="form-select" {...register("copay_sched_ovr_flag", { required: true })}>
                                    <option value="">Policy Ann. Month</option>
                                    <option value="">Select City</option>
                                    <option value="">Select City</option>
                                    <option value="">Select City</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <small>Schedule Override</small>
                                <input type="text" className="form-control" {...register("copay_sched_ovr", { required: true })} />
                                <span className="fa fa-search form-icon"></span>
                            </div>
                        </div>

                        <div className="clearfix mb-3"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Accumulated Benefits Override / Adjustment</h5>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Option</small>
                                <select className="form-select" {...register("accum_bene_ovr_flag", { required: true })}>
                                    <option value="">Policy Ann. Month</option>
                                    <option value="">Select City</option>
                                    <option value="">Select City</option>
                                    <option value="">Select City</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <small>Plan Override</small>
                                <input type="text" className="form-control" {...register("accum_bene_plan_ovr", { required: true })} />
                                <span className="fa fa-search form-icon"></span>
                            </div>
                        </div>

                        <div className="clearfix mb-3"></div>


                        <div className="col-md-2">
                            <p className="mt-4">Tier 1</p>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <small>Effective Date</small>
                                <input type="date" className="form-control" {...register("accum_bene_eff_date_1", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <small>Termination Date</small>
                                <input type="date" className="form-control" {...register("accum_bene_term_date_1", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <small>Adjestment Member Paid</small>
                                <input type="text" className="form-control" placeholder="$0.000" {...register("accum_adjmnt_mbr_paid_amt", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <small>Adjestment Plan Paid</small>
                                <input type="text" className="form-control" placeholder="$0.000" {...register("accum_adjmnt_plan_paid_amt", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <small>Adjestment Out of Pocket</small>
                                <input type="text" className="form-control" placeholder="$0.000" {...register("accum_adjmnt_mbr_paid_mop_1", { required: true })} />
                            </div>
                        </div>

                        <div className="col-md-2">
                            <p className="mt-1">Tier 2</p>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" {...register("accum_bene_eff_date_2", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <input type="date" className="form-control" {...register("accum_bene_term_date_2", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="$0.000" {...register("accum_adjmnt_mbr_paid_amt_2", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="$0.000" {...register("accum_adjmnt_plan_paid_amt_2", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group mb-3">
                                <input type="text" className="form-control" placeholder="$0.000" {...register("accum_adjmnt_mbr_paid_mop_2", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-2 ms-auto mb-1">
                            <a href="" className="btn btn-theme btn-sm p-1" style={{ width: "100%" }}>Add Tier <i className="fa fa-plus"></i></a>
                        </div>
                        <div className="clearfix mb-3"></div>

                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12 mb-1">
                                    <h5 className="mb-2">Primary Provider / Network</h5>
                                </div>

                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Provider Network ID</small>
                                        <input type="text" className="form-control" {...register("rx_network_id", { required: true })} />
                                        <span className="fa fa-search form-icon"></span>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2">
                                    <div className="form-group">
                                        <small>Provider ID</small>
                                        <input type="text" className="form-control" name="" id="" />
                                        <span className="fa fa-search form-icon"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12 mb-1">
                                    <h5 className="mb-2">Primary Prescriber</h5>
                                </div>

                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Prescriber ID</small>
                                        <input type="text" className="form-control" {...register("primary_prescriber", { required: true })} />
                                        <span className="fa fa-search form-icon"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="clearfix mb-3"></div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Other</h5>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Misc Group 1</small>
                                <input type="text" className="form-control" {...register("misc_grouping_1", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Misc Group 2</small>
                                <input type="text" className="form-control" {...register("misc_grouping_2", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Misc ID</small>
                                <input type="text" className="form-control"  {...register("misc_id", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>User Code 1</small>
                                <input type="text" className="form-control" {...register("user_defined_code_1", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>User Code 2</small>
                                <input type="text" className="form-control" {...register("user_defined_code_2", { required: true })} />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export function CoverageHistoryTab() {
    const [memberFormData, setMemberFormData] = useOutletContext();
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    const [coverageHistoryList, setCoverageHistoryList] = useState(false);
    const [cHFormData, setCHForm] = useState(false);
    const getMemeberDataList = (member_id) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/membership/memberdata/get-member-coverage-history-data?search=${member_id}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setCoverageHistoryList(data.data);
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

    const fillCHForm = (chRow) => {
        setCHForm(chRow);
    }

    useEffect(() => {
        reset(cHFormData)
        if (!coverageHistoryList) {
            getMemeberDataList(memberFormData.member_id);
        }
    }, [memberFormData, cHFormData]);

    const coverageHistoryArray = [];
    for (let i = 0; i < coverageHistoryList.length; i++) {
        coverageHistoryArray.push(<CHRow chRow={coverageHistoryList[i]} fillCHForm={fillCHForm} formdata={cHFormData} />);
    }

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <h5>Coverage Information</h5>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>Effective Date</small>
                                <input type="date" className="form-control" {...register("effective_date", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>Termination Date</small>
                                <input type="date" className="form-control" {...register("termination_date", { required: true })} />
                            </div>
                        </div>


                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Plan ID</small>
                                <input type="text" className="form-control" {...register("plan_id", { required: true })} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Copay Strategy ID</small>
                                <input type="text" className="form-control" {...register("copay_strategy_id", { required: true })} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Accum Bene Start ID</small>
                                <input type="text" className="form-control" {...register("accum_benefit_strategy_id", { required: true })} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Pricing Strategy</small>
                                <input type="text" className="form-control" {...register("pricing_strategy_id", { required: true })} />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>

                        <div className="col-md-12 mb-4 d-flex justify-content-end">
                            <a href="" className="btn btn-sm btn-secondary">Clear</a> &nbsp;&nbsp;
                            <a href="" className="btn btn-sm btn-warning">Remove Coverage</a> &nbsp;&nbsp;
                            <a href="" className="btn btn-sm btn-info">Add Coverage</a>
                        </div>

                        <div className="col-md-12">
                            <div style={{ height: '400px', overflowY: 'scroll' }}>
                                <table className="table table-striped table-bordered">
                                    <thead className='stickt-thead'>
                                        <tr>
                                            <th>Effective Date</th>
                                            <th>Termination Date</th>
                                            <th>Plan ID</th>
                                            <th>Pricing Start ID</th>
                                            <th>Copay Start ID</th>
                                            <th>Accum Benifit Start ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coverageHistoryArray}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function CHRow(props) {

    console.log(props.formdata);
    // if (props.cHFormData) {
    //     console.log(props.cHFormData.client_group_id);
    // }
    // useEffect(() => {

    // }, [props.cHFormData]);

    return (
        <>
         {/* && props.CHRow.person_code == props.cHFormData.person_code */}
         {/* <tr onClick={e => props.fillCHForm(props.chRow)} 
         className={(props.formdata && 
            props.CHRow.client_group_id 
            == props.formdata.client_group_id
            ) ? 'tblactiverow' : ''} > */}
            <tr onClick={e => props.fillCHForm(props.chRow)}>
                <td>{props.chRow.effective_date}</td>
                <td>{props.chRow.termination_date}</td>
                <td>{props.chRow.plan_id}</td>
                <td>{props.chRow.pricing_strategy_id}</td>
                <td>{props.chRow.copay_strategy_id}</td>
                <td>{props.chRow.accum_benefit_strategy_id}</td>
            </tr>
        </>
    )
}

export function HealthConditionsTab() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Date/Time Modified</th>
                                        <th>User ID</th>
                                        <th>Chagne Type Indicator</th>
                                        <th>Org Eff. Date</th>
                                        <th>Org Term Date</th>
                                        <th>New Eff Date</th>
                                        <th>New Term Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2010-01-24 14:57:23</td>
                                        <td>Shekar</td>
                                        <td>Coverage Line was Added</td>
                                        <td>0000-00-00</td>
                                        <td>0000-00-00</td>
                                        <td>2010-01-01</td>
                                        <td>9999-12-31</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function NotesTab() {
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

export function ClaimHistoryTab() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <h5>View Hostory</h5>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <ul className="radios">
                                    <li><input type="radio" name="tab" value="igotnone" onClick={e => show1()} /> Claim History</li>
                                    <li><input type="radio" name="tab" value="igottwo" onClick={e => show2()} /> Accumulated Benifits</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-8 mb-3">
                            <div className="row">
                                <div className="col-md-12 mb3">
                                    <h6>Date Creteria</h6>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <small>Date</small>
                                        <input type="date" name="" className="form-control" id="" />
                                    </div><br />
                                    <ul className="radios">
                                        <li><input type="radio" name="tab" id="date" /> Date</li>
                                        <li><input type="radio" name="tab" id="month" /> Month</li>
                                        <li className="m-0"><input type="radio" name="tab" id="year" /> Year</li>
                                    </ul>

                                </div>
                                <div className="col-md-4 mt-2">
                                    <div className="form-group mt-4">
                                        <input type="checkbox" id="html" className="d-none" />
                                        <label htmlFor="html">View All Dates</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <small>View Limitations</small>
                                        <select className="form-select">
                                            <option value=""></option>
                                            <option value=""></option>
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-1 ms-auto mb-3">
                            <a href="" className="btn btn-info btn-sm p-1" style={{ width: "100%" }}>Load</a>
                        </div>


                        <div className="col-md-12" id="div1">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Date of SVC</th>
                                        <th>Provider ID</th>
                                        <th>Claim Ref. #</th>
                                        <th>Rx. #</th>
                                        <th>New/Refil</th>
                                        <th>Procedure Code</th>
                                        <th>Label Name / Procedure Discription</th>
                                        <th>Cardholder ID</th>
                                        <th>Person Code</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Bin#</th>
                                        <th>Plan ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2010-01-24</td>
                                        <td>NPP001</td>
                                        <td>3000000456</td>
                                        <td>000006</td>
                                        <td>0</td>
                                        <td>200</td>
                                        <td>Flomax Cap 0.4 MG</td>
                                        <td>1548796</td>
                                        <td>001</td>
                                        <td>.00</td>
                                        <td>Rejected</td>
                                        <td>200010</td>
                                        <td>NIB_PLAN</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12 Hide" id="div2">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Date of SVC</th>
                                        <th>Provider ID</th>
                                        <th>App to Periodic Ded.</th>
                                        <th>App to MOP</th>
                                        <th>Patient Paid Diff.</th>
                                        <th>App to Max Benifit</th>
                                        <th>Acc. Excl</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2010-01-24</td>
                                        <td>NPP001</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>Yes</td>
                                        <td>R</td>
                                    </tr>
                                    <tr>
                                        <td>2010-01-24</td>
                                        <td>NPP001</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>.00</td>
                                        <td>Yes</td>
                                        <td>P</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export function PriorAuthorizationTab() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <h5>Prior Authorizations</h5>
                        </div>


                        <div className="col-md-12" id="div1">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Auth. Number</th>
                                        <th>Auth Type</th>
                                        <th>NDC</th>
                                        <th>GPI</th>
                                        <th>Eff. Date</th>
                                        <th>Term Date</th>
                                        <th>Customer ID</th>
                                        <th>Client ID</th>
                                        <th>Group ID</th>
                                        <th>Member ID</th>
                                        <th>0 Person Code</th>
                                        <th>0 Prior Auth</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function ProviderSearchTab() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <h5>Criteria</h5>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Plan ID</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>City</small>
                                <select className="form-select">
                                    <option value="">Select City</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>State</small>
                                <select className="form-select">
                                    <option value="">Select State</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>County</small>
                                <select className="form-select">
                                    <option value="">Select County</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>ZIP</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Area Code</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Exchange</small>
                                <input type="text" className="form-control" name="" id="" required="" />
                                <a href=""><span className="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4 d-flex justify-content-end">
                            <a href="" className="btn btn-sm btn-secondary">Clear</a> &nbsp;&nbsp;
                            <a href="" className="btn btn-sm btn-info">Search</a>
                        </div>


                        <div className="col-md-12" id="div1">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Provider ID</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>State</th>
                                        <th>Country</th>
                                        <th>ZIP</th>
                                        <th>Area Code</th>
                                        <th>Exchange</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function ChangeLogTab() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12" id="div1">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>User ID Changed</th>
                                        <th>Date Changed</th>
                                        <th>Time Changed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}