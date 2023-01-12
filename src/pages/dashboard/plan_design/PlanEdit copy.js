import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, Outlet, resolvePath, useLocation, useOutletContext } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../loader/loader';

export default function PlanEdit() {

    const [planEditList, setPlanEditList] = useState([]);
    const [planEditForm, setPlanEditForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState('');
    const scollToRef = useRef();

    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];

    const onSearch = (search) => {
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setPlanEditList(data.data);
                setLoading(false);
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
                setSelected(data.data);
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

        scollToRef.current.scrollIntoView()
    }

    useEffect(() => { }, [planEditList, planEditForm, selected]);

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
            <PlanEditList planEditList={planEditList} getFormData={getFormData} loading={loading} planEditForm={planEditForm} selected={selected} />
            <div ref={scollToRef}>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <Link to="plan-formulary" className={'nav-link' + (currentpath == 'plan-formulary' ? ' active' : '')}>Plan / Formularly</Link>
                    <Link to="rx-limitations" className={'nav-link' + (currentpath == 'rx-limitations' ? ' active' : '')}>Rx Limitations</Link>
                    <Link to="date-limitations" className={'nav-link' + (currentpath == 'date-limitations' ? ' active' : '')}>Date Limitations</Link>
                    <Link to="refill-limitations" className={'nav-link' + (currentpath == 'refill-limitations' ? ' active' : '')}>Refill Limitations</Link>
                    <Link to="notes" className={'nav-link' + (currentpath == 'notes' ? ' active' : '')}>Notes</Link>
                </div>
                <Outlet context={[planEditForm, setPlanEditForm]} />
            </div>
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
        editListArray.push(<EditListRow editListRow={props.planEditList[i]} getFormData={props.getFormData} selected={props.selected} />);
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
                                                {props.loading ? <LoadingSpinner /> : editListArray}
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
            <tr onClick={e => props.getFormData(props.editListRow.plan_id)}
                className={props.selected && props.editListRow.plan_id == props.selected.plan_id ? 'tblactiverow' : ''} >
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
    const { register, handleSubmit, watch, reset, control, formState: { error } } = useForm();
    const [planClassification, setPlanClassification] = useState('');
    const [expFlag, setExpFlag] = useState('');
    const [pharmExpFlag, setPharmExpFlag] = useState('');
    const [priscExpFlag, setPriscExpFlag] = useState('');
    const [exhausted, setExhausted] = useState('');
    const [formulary, setFormulary] = useState('');

    const handlePlanClassificationInput = (pclass_input) => {
        setPlanClassification(pclass_input);
    }

    const loadPlanClassificationOptions = (planClassification) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get-plan-classification?search=${planClassification}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ pclass_value, pclass_label }) => ({
                            pclass_value: pclass_value,
                            pclass_label: pclass_label
                        }))
                    )
                })
        })
    }

    const handleExpFlagInput = (exp_flag_input) => {
        setExpFlag(exp_flag_input);
    }

    const loadExpFlagOptions = (expFlag) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get-exp-flag?search=${expFlag}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ exp_flag_value, exp_flag_label }) => ({
                            exp_flag_value: exp_flag_value,
                            exp_flag_label: exp_flag_label
                        }))
                    )
                })
        })
    }

    const handlePharmExpFlagInput = (pharm_exp_flag_input) => {
        setPharmExpFlag(pharm_exp_flag_input);
    }

    const loadPharmExpFlagOptions = (pharmExpFlag) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get-pharm-exp-flag?search=${pharmExpFlag}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ pharm_exp_flag_value, pharm_exp_flag_label }) => ({
                            pharm_exp_flag_value: pharm_exp_flag_value,
                            pharm_exp_flag_label: pharm_exp_flag_label
                        }))
                    )
                })
        })
    }

    const handlePriscExpFlagInput = (prisc_exp_flag_input) => {
        setPriscExpFlag(prisc_exp_flag_input);
    }

    const loadPriscExpFlagOptions = (priscExpFlag) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get-prisc-exp-flag?search=${priscExpFlag}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ prisc_exp_flag_value, prisc_exp_flag_label }) => ({
                            prisc_exp_flag_value: prisc_exp_flag_value,
                            prisc_exp_flag_label: prisc_exp_flag_label
                        }))
                    )
                })
        })
    }

    const handleExhaustedInput = (exhausted_input) => {
        setExhausted(exhausted_input);
    }

    const loadExhaustedOptions = (exhausted) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get-exhausted?search=${exhausted}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ exhausted_value, exhausted_label }) => ({
                            exhausted_value: exhausted_value,
                            exhausted_label: exhausted_label
                        }))
                    )
                })
        })
    }

    const handleFormularyInput = (formulary_input) => {
        setFormulary(formulary_input);
    }

    const loadFormularyOptions = (formulary) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get-formulary?search=${formulary}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ formulary_value, formulary_label }) => ({
                            formulary_value: formulary_value,
                            formulary_label: formulary_label
                        }))
                    )
                })
        })
    }

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
                                    <input type="text" className="form-control" placeholder="" {...register("plan_name", { required: true })} />
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
                                        <Controller name="plan_classification"
                                            control={control}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                    {...field}
                                                    cacheOptions
                                                    defaultOptions
                                                    // value={selectedValue}
                                                    getOptionLabel={e => e.pclass_label}
                                                    getOptionValue={e => e.pclass_value}
                                                    loadOptions={loadPlanClassificationOptions}
                                                    onInputChange={handlePlanClassificationInput}
                                                    // onChange={handleChange}
                                                    placeholder="Select Plan Classification"
                                                />
                                            )} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <h5 className="mb-1">Plan Participation</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Eligibility</small>
                                        <Controller name="eligibility_exceptions_flag"
                                            control={control}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                    {...field}
                                                    cacheOptions
                                                    defaultOptions
                                                    // value={selectedValue}
                                                    getOptionLabel={e => e.exp_flag_label}
                                                    getOptionValue={e => e.exp_flag_value}
                                                    loadOptions={loadExpFlagOptions}
                                                    onInputChange={handleExpFlagInput}
                                                    // onChange={handleChange}
                                                    placeholder="Select Eligibility Exception Flag"
                                                />
                                            )} />
                                    </div>
                                    <small style={{ fontSize: "9px", fontWeight: "600" }}>Check Eligibilty by Member Date of Birth & Gender</small>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Provider</small>
                                        <Controller name="pharmacy_exceptions_flag"
                                            control={control}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                    {...field}
                                                    cacheOptions
                                                    defaultOptions
                                                    // value={selectedValue}
                                                    getOptionLabel={e => e.pharm_exp_flag_label}
                                                    getOptionValue={e => e.pharm_exp_flag_value}
                                                    loadOptions={loadPharmExpFlagOptions}
                                                    onInputChange={handlePharmExpFlagInput}
                                                    // onChange={handleChange}
                                                    placeholder="Select Pharmacy Exception Flag"
                                                />
                                            )} />
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
                                        <Controller name="prescriber_exceptions_flag"
                                            control={control}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                    {...field}
                                                    cacheOptions
                                                    defaultOptions
                                                    // value={selectedValue}
                                                    getOptionLabel={e => e.prisc_exp_flag_label}
                                                    getOptionValue={e => e.prisc_exp_flag_value}
                                                    loadOptions={loadPriscExpFlagOptions}
                                                    onInputChange={handlePriscExpFlagInput}
                                                    // onChange={handleChange}
                                                    placeholder="Select Prescriber Exception Flag"
                                                />
                                            )} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Exhausted Benefits Opt</small>
                                        <Controller name="exhausted_benefit_opt"
                                            control={control}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                    {...field}
                                                    cacheOptions
                                                    defaultOptions
                                                    // value={selectedValue}
                                                    getOptionLabel={e => e.exhausted_label}
                                                    getOptionValue={e => e.exhausted_value}
                                                    loadOptions={loadExhaustedOptions}
                                                    onInputChange={handleExhaustedInput}
                                                    // onChange={handleChange}
                                                    placeholder="Select Exhausted Benefits Opt"
                                                />
                                            )} />
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
                                        {/* <select className="form-select" {...register("plan_id", { required: true })}>
                                            <option value="">Select </option>
                                            <option value="FA">Approved, Formularly</option>
                                            <option value="NF">Approved, Non Formularly</option>
                                            <option value="CF">Rejected</option>
                                            <option value="NR">Rejected-No Rx Coverage</option>
                                        </select> */}

                                        <Controller name="plan_id"
                                            control={control}
                                            render={({ field }) => (
                                                <AsyncSelect
                                                    {...field}
                                                    cacheOptions
                                                    defaultOptions
                                                    // value={selectedValue}
                                                    getOptionLabel={e => e.formulary_label}
                                                    getOptionValue={e => e.formulary_value}
                                                    loadOptions={loadFormularyOptions}
                                                    onInputChange={handleFormularyInput}
                                                    // onChange={handleChange}
                                                    placeholder="Select Formularly Type"
                                                />
                                            )} />
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
                                    <input type="text" className="form-control" placeholder="" {...register("min_rx_qty", { required: true })} />
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_rx_qty", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Quantity Over Time</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_qty_over_time", { required: true })} />
                                </div>

                                <div className="col-md-6">
                                    <p>Days Supply</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                                </div>

                                <div className="col-md-6">
                                    <p> Days Over Time</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_days_over_time", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> CTS Days Supply</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Retails Fills</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("retail_max_fills_opt", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Days Per Time</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_days_per_fill", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Quantity Per Fill</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_qty_per_fill", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Daily Dose</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_dose", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Starter Dose Days</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("starter_dose_days", { required: true })} />
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
                                    <input type="text" className="form-control" placeholder="" {...register("starter_dose_bypass_days", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Strt. Dose. Maint. By. Days</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("starter_dose_maint_bypass_days", { required: true })} />
                                </div>

                                <div className="col-md-6">
                                    <p>Days Untill Cover Effective</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                                </div>

                                <div className="col-md-6">
                                    <p> Age</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("min_age", { required: true })} />
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_age", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Price</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("min_price", { required: true })} />
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_price", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> RX / Patient</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_rxs_patient", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> accum Benefit / Patient</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("accum_bene_strategy_id", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Coverage Start Days</p>
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("coverage_start_days", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p> Brand Copay Amount</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("min_brand_copay_amt", { required: true })} />
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_brand_copay_amt", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p>Generic Copay</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("min_generic_copay_amt", { required: true })} />
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("max_generic_copay_amt", { required: true })} />
                                </div>
                                <div className="col-md-6">
                                    <p>DFLT Brand Copay</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("brand_copay_amt", { required: true })} />
                                </div>
                                <div className="col-md-3 ">
                                </div>
                                <div className="col-md-6">
                                    <p>DFLT Generic Copay</p>
                                </div>
                                <div className="col-md-3 ">
                                    <input type="text" className="form-control" placeholder="" {...register("generic_copay_amt", { required: true })} />
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
    const { register, handleSubmit, watch, control, reset, formState: { error } } = useForm();
    const [tax, setTax] = useState('');
    const [uCPlan, setUCPlan] = useState('');

    const handleTaxInput = (tax_input) => {
        setTax(tax_input);
    }

    const loadTaxOptions = (tax) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get-tax?search=${tax}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ tax_value, tax_label }) => ({
                            tax_value: tax_value,
                            tax_label: tax_label
                        }))
                    )
                })
        })
    }

    const handleUCPlanInput = (uc_plan_input) => {
        setUCPlan(uc_plan_input);
    }

    const loadUCPlanOptions = (uCPlan) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get-uc-plan?search=${uCPlan}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ uc_plan_value, uc_plan_label }) => ({
                            uc_plan_value: uc_plan_value,
                            uc_plan_label: uc_plan_label
                        }))
                    )
                })
        })
    }

    useEffect(() => { reset(planEditForm) }, [planEditForm, tax]);
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
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                        </div>

                        <div className="col-md-6">
                            <p>Days from Days Filled to date Submitted (On line)</p>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                        </div>

                        <div className="col-md-6">
                            <p>Days from Days Filled to date Submitted (DMR / UCF)</p>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                        </div>

                        <div className="col-md-6">
                            <p>Days from Days Submitted to Date Filled (Future Fill)</p>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                        </div>

                        <div className="col-md-6">
                            <p>Days of Reversal</p>
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder=""  {...register("plan_id", { required: true })} />
                        </div>
                        <div className="col-md-3">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                        </div>

                    </div>


                    <div class='row'>
                        <div className="col-md-12 mt-3 mb-3">
                            <h5 className="mb-2">Miscellaneous Flags</h5>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Tax Status (static)</small>
                                <Controller name="plan_id"
                                    control={control}
                                    render={({ field }) => (
                                        <AsyncSelect
                                            {...field}
                                            cacheOptions
                                            defaultOptions
                                            // value={selectedValue}
                                            getOptionLabel={e => e.tax_label}
                                            getOptionValue={e => e.tax_value}
                                            loadOptions={loadTaxOptions}
                                            onInputChange={handleTaxInput}
                                            // onChange={handleChange}
                                            placeholder="Select Tax Status"
                                        />
                                    )} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-2">
                                <small>Mandatory U and C Plan</small>
                                {/* <select className="form-select" {...register("plan_id", { required: true })}>
                                    <option value=""> Not Specified </option>
                                    <option value="0">No</option>
                                    <option value="1">Yes </option>
                                </select> */}

                                <Controller name="plan_id"
                                    control={control}
                                    render={({ field }) => (
                                        <AsyncSelect
                                            {...field}
                                            cacheOptions
                                            defaultOptions
                                            // value={selectedValue}
                                            getOptionLabel={e => e.uc_plan_label}
                                            getOptionValue={e => e.uc_plan_value}
                                            loadOptions={loadUCPlanOptions}
                                            onInputChange={handleUCPlanInput}
                                            // onChange={handleChange}
                                            placeholder="Select Tax Status"
                                        />
                                    )} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="text" className="form-control" placeholder="" {...register("plan_id", { required: true })} />
                        </div>

                        <div className="col-md-8  mb-3">
                            <p>Syringes With Issuling Same Day</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="ReturnMax" className="d-none" {...register("plan_id", { required: true })} />
                                <label htmlFor="ReturnMax"></label>
                            </div>
                        </div>

                        <div className="col-md-8 mb-3">
                            <p>Exclude System NDC/GPI Formularly Edits for Out of Network Claim</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="ReturnMaxQ" className="d-none" {...register("plan_id", { required: true })} />
                                <label htmlFor="ReturnMaxQ">  </label>
                            </div>
                        </div>

                        <div className="col-md-8 mb-3">
                            <p>Exclude Plan NDC/GPI Formularly Edits for Out of Network Claim</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="ReturnMax1" className="d-none" {...register("plan_id", { required: true })} />
                                <label htmlFor="ReturnMax1">  </label>
                            </div>
                        </div>

                        <div className="col-md-8 mb-3">
                            <p>Reject Claim for Missing Cardholder ID</p>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="form-group">
                                <input type="checkbox" id="ReturnMax2" className="d-none" {...register("plan_id", { required: true })} />
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
    const { register, reset, handleSubmit, watch, control, formState: { errors } } = useForm();
    const [searchIndication, setSearchIndication] = useState('');

    const handleSearchIndicationInputChange = (search_indication_input) => {
        setSearchIndication(search_indication_input);
    }

    const loadSearchIndicationOptions = (searchIndication) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/plan-design/plan-edit/get-search-indication?search=${searchIndication}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ search_indication_value, search_indication_label }) => ({
                            search_indication_value: search_indication_value,
                            search_indication_label: search_indication_label
                        }))
                    )
                })
        })
    }

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
                            {/* <select className="form-select">
                                <option value="">Select</option>
                                <option value="N">Name Portion of GPI</option>
                                <option value="F">Full GPI</option>
                            </select> */}

                            <Controller name="plan_id"
                                control={control}
                                // rules={{ required: false }}
                                render={({ field }) => (
                                    <AsyncSelect
                                        cacheOptions
                                        defaultOptions
                                        {...field}
                                        // value={selectedValue}
                                        getOptionLabel={e => e.search_indication_label}
                                        getOptionValue={e => e.search_indication_value}
                                        loadOptions={loadSearchIndicationOptions}
                                        onInputChange={handleSearchIndicationInputChange}
                                        // onChange={handleChange}
                                        isClearable
                                    />
                                )} />
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
                            {/* <select className="form-select">
                                <option value="">Select</option>
                                <option value="N">Name Portion of GPI</option>
                                <option value="F">Full GPI</option>
                            </select> */}
                            <Controller name="plan_id"
                                control={control}
                                // rules={{ required: false }}
                                render={({ field }) => (
                                    <AsyncSelect
                                        cacheOptions
                                        defaultOptions
                                        {...field}
                                        // value={selectedValue}
                                        getOptionLabel={e => e.search_indication_label}
                                        getOptionValue={e => e.search_indication_value}
                                        loadOptions={loadSearchIndicationOptions}
                                        onInputChange={handleSearchIndicationInputChange}
                                        // onChange={handleChange}
                                        isClearable
                                    />
                                )} />


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