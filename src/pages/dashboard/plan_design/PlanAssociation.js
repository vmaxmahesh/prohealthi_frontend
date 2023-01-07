import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function PlanAssociation() {
    const scollToRef = useRef();

    const [planList, setPlanList] = useState([]);
    const [planForm, setPlanForm] = useState(false);
    const onSearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-association/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setPlanList(data.data);
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

    const getFormData = (plan_data) => {
        setPlanForm(plan_data);
        scollToRef.current.scrollIntoView()
    }

    useEffect(() => { }, [planList, planForm]);
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
                            <li><a href="">Plan Association</a></li>
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
            <SearchPlanAssociation onSearch={onSearch} />
            <PlanAssociationList planList={planList} getFormData={getFormData} planForm={planForm} />
            <div ref={scollToRef}>
                <PlanAssociationForm planForm={planForm} />

            </div>
        </>
    )
}

function SearchPlanAssociation(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Plan Association </small>
                                <input type="text" onKeyUp={e => props.onSearch(e)} className="form-control" placeholder='Start typing bin number/ process control number/ group/ plan ID to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function PlanAssociationList(props) {
    const listArray = [];
    for (let i = 0; i < props.planList.length; i++) {
        listArray.push(<PlanRow planRow={props.planList[i]} getFormData={props.getFormData} planForm={props.planForm} />);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Plan Association List</h5>
                        </div>
                        {/* <div className="col-md-4 mb-3 text-end"> */}
                        {/* <button className="btn btn-sm btn-warning" id="show" onClick={e => handleShow()}><i className="fa plus-circle"></i> Add NDC List</button> */}
                        {/* </div> */}

                        <div className="col-md-12">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Bin No.</th>
                                                    <th>Process Control No.</th>
                                                    <th>Group</th>
                                                    <th>Plan ID</th>
                                                    <th>Bin Suffix</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listArray}
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

function PlanRow(props) {
    return (
        <>
            <tr onClick={e => props.getFormData(props.planRow)}
                className={props.planForm && props.planRow.bin_number == props.planForm.bin_number ? 'tblactiverow' : ''}>
                <td>{props.planRow.bin_number}</td>
                <td>{props.planRow.process_control_number}</td>
                <td>{props.planRow.group_number}</td>
                <td>{props.planRow.plan_id}</td>
                <td>{props.planRow.pin_number_suffix}</td>
            </tr>
        </>
    )
}

function PlanAssociationForm(props) {
    const { register, handleSubmit, watch, reset, formState: { error } } = useForm();
    useEffect(() => { reset(props.planForm) }, [props.planForm]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Plan Association</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small>Bin Number</small>
                                        <input type="text" className="form-control" {...register("bin_number", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small>Process Control Number</small>
                                        <input type="text" className="form-control" {...register("process_control_number", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small>Group Number</small>
                                        <input type="text" className="form-control" {...register("group_number", { required: true })} />
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small>Pharmacy Chain</small>
                                        <input type="text" className="form-control" {...register("pharmacy_chain", { required: true })} />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small>Plan ID</small>
                                        <input type="text" className="form-control" {...register("plan_id", { required: true })} />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small>Mail Plan Server ID</small>
                                        <input type="text" className="form-control" {...register("plan_id_mail_order", { required: true })} />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small className="required">Membership Proc Flag</small>
                                        <select className="form-select" {...register("membership_processing_flag", { required: true })}>
                                            <option value="">Select</option>
                                            <option value="0">Not Required</option>
                                            <option value="1">Required</option>
                                        </select>
                                        <p className="input-hint">Required</p>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small>Pin Suffix</small>
                                        <input type="text" className="form-control" {...register("pin_number_suffix", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small className="required">Transaction Type</small>
                                        <select className="form-select" {...register("transaction_type", { required: true })}>
                                            <option value="">Select</option>
                                            <option value="EV">EV - Eligibility Verification</option>
                                            <option value="CC">CC - Claims Capture</option>
                                            <option value="CA">CA - Claims Adjudication</option>
                                            <option value="WC">WC - Workers Compensation Group</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small className="required">Transaction Association</small>
                                        <select className="form-select" {...register("bin_number", { required: true })}>
                                            <option value="">Select</option>
                                            <option value="0">Not Applicable</option>
                                            <option value="1">Billable Source For Plans W/O Eligibility</option>
                                            <option value="2">Restrictive Eligibility</option>
                                        </select>
                                        <p className="input-hint">Not Applicable</p>
                                    </div>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small>Customer</small>
                                        <input type="text" className="form-control" {...register("bin_number", { required: true })} />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small>Client</small>
                                        <input type="text" className="form-control" {...register("bin_number", { required: true })} />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-2">
                                    <div className="form-group">
                                        <small>Group</small>
                                        <input type="text" className="form-control" {...register("bin_number", { required: true })} />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-info">Add Plan Association</button>
                </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}