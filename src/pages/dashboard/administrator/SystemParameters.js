import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, Outlet, useLocation } from "react-router-dom";
import AsyncSelect from 'react-select/async';

function SystemParameter() {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Administrator</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">System Parameters</a></li>
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
            <div>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    {/* <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#Rules" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Member</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Pricing" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Group</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Override" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Plan</button>
                     */}

                    <Link to="parameters-maintanace" className={"nav-link" + (currentpath == 'parameters-maintanace' ? ' active' : '')}>Parameters / Maintenance / Processor</Link>
                    <Link to="systemlimit-eligibility" className={"nav-link" + (currentpath == 'systemlimit-eligibility' ? ' active' : '')}>System Limits / Eligibility Parameters</Link>

                </div>
                <div className="tab-content" id="nav-tabContent">
                    <Outlet />
                </div>
            </div>

            <div className="footer">
                <div className="">
                    <small>© 2022 All Rights Reserved by ProHealthi</small>
                </div>
            </div>
        </>
    )
}

export function ParametersMaintanace(props) {
    const { register, handleSubmit, reset, watch, control, formState: { errors } } = useForm();
    const [systemParameter, setSystemParameter] = useState();

    const [stateValue, setStateValue] = useState('');
    const [countryValue, setCountryValue] = useState('');
    const [countryid, setCountryId] = useState('');


    const getParameterData = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/system-parameter/get-parameters`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setSystemParameter(data.data);
            })
    }

    const onFormSubmit = (formData) => {
        // console.log(formData);
    }

    const handleStateInputChange = value => {
        setStateValue(value);
        // console.log(stateValue);
    };

    const loadStateOptions = (stateValue) => {
        // alert(countryid);
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/states?search=${stateValue}`)
                // fetch(process.env.REACT_APP_API_BASEURL + `/api/states/${ countryid }`)            
                .then((response) => response.json())
                .then(({ data }) => {
                    // console.log(data);
                    resolve(
                        data.map(({ state_code }) => ({
                            svalue: state_code,
                            slabel: state_code,
                        })),
                    );
                });
        });
    };

    const handleCountryInputChange = (country_value) => {
        setCountryValue(country_value);
    }

    const loadCountryOptions = (countryValue) => {
        return new Promise((resolve, reject) => {
            //fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/system-parameters/get-countries?search=${countryValue}`)
            fetch(process.env.REACT_APP_API_BASEURL + `/api/countries?search=${countryValue}`)
                .then((response) => response.json())
                .then(({ data }) => {
                    // console.log(data);
                    resolve(
                        data.map(({ country_code, description }) => ({
                            cvalue: country_code,
                            clabel: description,
                        })),
                    );
                });
        });
    }

    const onChangeSelectedOption = (e) => {
        setCountryId(e); // <---- this will be selected object not event
        // const selectedOption = e.value; // <--- you can get value from object directly
        // setSelectedOption(selectedOption);
    };


    useEffect(() => {
        if (!systemParameter) {
            getParameterData();
        }
        reset(systemParameter);
    }, [systemParameter, countryid]);


    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="mb-2">Parameters</h5>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <small>Number of Routers</small>
                                        {/* <input type="text" className="form-control" {...register("num_routers")} /> */}
                                        <input type="text" className="form-control" {...register('num_routers')} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Client ID</small>
                                        <input type="text" className="form-control"  {...register("client_id")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Router Priority  </small>
                                        <input type="text" className="form-control" {...register("router_priority")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Net Start Sleep Interval (Minutes)</small>
                                        <input type="text" className="form-control" {...register("sleep_mins")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>PriAdi Message Priority</small>
                                        <input type="text" className="form-control" {...register("preadj_msg_priority")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>TPA Message Priority</small>
                                        <input type="text" className="form-control" {...register("tpa_msg_priority")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>PostAdi Message Priority</small>
                                        <input type="text" className="form-control" name="" id="" />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>General Processor Priority</small>
                                        <input type="text" className="form-control" {...register("gen_priority")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Number of General Processes</small>
                                        <input type="text" className="form-control" {...register("num_gens")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Version Number </small>
                                        <input type="text" className="form-control" {...register("version_number")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Third Party Type</small>
                                        <select className="form-select" {...register("third_party_type")}>
                                            <option value="">None</option>
                                            <option value="G">G Government</option>
                                            <option value="P">P Private</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Immediate Shutdown </small>
                                        <div className="form-group mt-2">
                                            <input type="checkbox" id="shutdown" {...register("immediate_shutdown")} className="d-none" />
                                            <label htmlFor="shutdown"></label>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Reject Transaction if Plan Association not found </small>
                                        <div className="form-group mt-2">
                                            <input type="checkbox" id="shutdown1" className="d-none" />
                                            <label htmlFor="shutdown1"></label>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="mb-2 mt-3">Maintenance</h5>
                                <h6 className="mb-2 mt-3">Number of days to retain information</h6>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <small>Performance Statisticcs</small>
                                        <input type="text" className="form-control" {...register("retain_perf_stats_days")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>RX Transactions</small>
                                        <input type="date" className="form-control" name="" id="" />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>RX Transaction Log</small>
                                        <input type="date" className="form-control" name="" id="" />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Time of day maintenance will occur</small>
                                        <input type="date" className="form-control" name="" id="" />
                                    </div>

                                </div>

                                <h5 className="mb-2 mt-3">Processor</h5>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <small>Processor #</small>
                                        <input type="text" className="form-control" name="" id="" />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Name</small>
                                        <input type="date" className="form-control" {...register("processor_name")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Address</small>
                                        <input type="text" className="form-control" {...register("processor_address")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>City</small>
                                        <input type="text" className="form-control" {...register("processor_city")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small> Country / State / Zip</small>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <Controller name="country"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <AsyncSelect
                                                            {...field}
                                                            cacheOptions
                                                            defaultOptions
                                                            getOptionLabel={e => e.clabel}
                                                            getOptionValue={e => e.cvalue}
                                                            loadOptions={loadCountryOptions}
                                                            onInputChange={handleCountryInputChange}
                                                            onClick={e => onChangeSelectedOption(e.cvalue)}
                                                            placeholder="Select Country"
                                                        />
                                                    )} />
                                            </div>
                                            <div className="col-md-4">
                                                {/* <select className="form-select" {...register("processor_state")}>
                                                    <option>1</option>
                                                    <option></option>
                                                </select> */}

                                                <Controller name="processor_state"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <AsyncSelect
                                                            {...field}
                                                            cacheOptions
                                                            defaultOptions
                                                            // value={selectedUserIdValue}
                                                            getOptionLabel={e => e.slabel}
                                                            getOptionValue={e => e.svalue}
                                                            loadOptions={loadStateOptions}
                                                            onInputChange={handleStateInputChange}
                                                            placeholder="Select State"
                                                        />
                                                    )} />

                                            </div>

                                            <div className="col-md-4">
                                                <input type="text" className="form-control" {...register("processor_zip")} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <small>Phone</small>
                                        <input type="text" className="form-control" {...register("processor_phone")} />
                                    </div>
                                </div>

                                <h5 className="mb-2 mt-3">System Flags</h5>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <small>System Use</small>
                                        <div className="d-flex">
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="radio1" {...register("system_use")} value="1" />TPA
                                                <label className="form-check-label" htmlFor="radio1"></label>
                                            </div>
                                            <div className="form-check">
                                                <input type="radio" className="form-check-input" id="radio2" {...register("system_use")} value="2" />Retail
                                                <label className="form-check-label" htmlFor="radio2"></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Audit Trail</small>
                                        <div className="form-group mt-2">
                                            <input type="checkbox" id="shutdown3" {...register("front_end_record_audit")} className="d-none" />
                                            <label htmlFor="shutdown3"></label>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Case Sensitivity</small>
                                        <div className="form-group mt-2">
                                            <input type="checkbox" id="shutdown5" {...register("case_sensitive_flag")} className="d-none" />
                                            <label htmlFor="shutdown5"></label>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>DMR Review Flag</small>
                                        <div className="form-group mt-2">
                                            <input type="checkbox" id="shutdown6" {...register("sys_date_filled_to_sub_dmr")} className="d-none" />
                                            <label htmlFor="shutdown6"></label>
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Tax Status</small>
                                        <select className="form-select">
                                            <option value="0">Taxable</option>
                                            <option value="1">Tax Exempt</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Mandatory U and C Plan</small>
                                        <select className="form-select">
                                            <option value="0">No</option>
                                            <option value="1">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );

}



export function SystemlimitsEligibility() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [systemParameter, setSystemParameter] = useState(false);

    const getParameterData = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/system-parameter/get-parameters`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // console.log(data.data);
                setSystemParameter(data.data);
            })
    }

    useEffect(() => {
        if (!systemParameter) {
            getParameterData();
        }
        reset(systemParameter);
    }, [systemParameter]);
    return (
        <>
            <form>
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="mb-2">System Level Date Limitations</h5>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <small>Days From date written to first fill</small>
                                        <input type="text" className="form-control" {...register("sys_date_written_to_first_fill")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Days From date filled to date submitted (On-line)</small>
                                        <input type="text" className="form-control" {...register("sys_date_filled_to_sub_online")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Days From date filled to date submitted (DMR)</small>
                                        <input type="text" className="form-control" {...register("sys_date_filled_to_sub_dmr")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Days From date submitted  to date filled (future fill)</small>
                                        <input type="text" className="form-control" {...register("sys_date_sub_to_filled_future")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Days for reversals</small>
                                        <input type="text" className="form-control"  {...register("sys_days_for_reversals")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Days untill user password expires</small>
                                        <input type="text" className="form-control" {...register("pswd_expire_days")} />
                                    </div>

                                </div>

                                <h5 className="mb-2 mt-3">Ap Processes</h5>
                                <div className="row">
                                    <div className="col-md-3">
                                        <small>Start Date</small>
                                        <input type="text" className="form-control" {...register("ap_from_date")} />
                                    </div>
                                    <div className="col-md-3">
                                        <small>Finish Date</small>
                                        <input type="date" className="form-control" {...register("ap_to_date")} />
                                    </div>
                                    <div className="col-md-3">
                                        <small>Excecution Flag</small>
                                        <div className="form-group mt-2">
                                            <input type="checkbox" id="shutdown11" className="d-none" />
                                            <label htmlFor="shutdown11"></label>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="mb-2 mt-3">Miscellaneous</h5>
                                <div className="row">
                                    <div className="col-md-3">
                                        <small>Front End Version # </small>
                                        <input type="text" className="form-control" {...register("front_end_version_number")} />
                                    </div>
                                    <div className="col-md-3">
                                        <small>Confidentiality Flag 1</small>
                                        <div className="form-group mt-2">
                                            <input type="checkbox" id="shutdown11" className="d-none" {...register("confidentiality_flag_1")} />
                                            <label htmlFor="shutdown11"></label>
                                        </div>

                                    </div>
                                    <div className="col-md-3">
                                        <small>Quanity # Pkgs Limits </small>
                                        <input type="text" className="form-control" {...register("qty_num_of_pkg_limit")} />
                                    </div>

                                </div>

                                <h5 className="mb-2 mt-3">Eligibility Load Parameters</h5>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <small>Automated Termination Level</small>
                                        <select className="form-select" {...register("auto_term_level")}>
                                            <option value="0">Overlap allowed within database</option>
                                            <option value="1">Automated termination within client</option>
                                            <option value="2">Automated termination within customer</option>
                                            <option value="4">Automated termination within database</option>
                                            <option value="5">No automated termination-Reject-within database</option>
                                            <option value="">Not specified</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Eligibility Load Pending Days</small>
                                        <input type="text" className="form-control" {...register("elig_load_pend_days")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Eligibility Load Rejecting Days</small>
                                        <input type="text" className="form-control" {...register("elig_load_reject_days")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small> Termination By Absence Percent</small>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Coverage Criteria</small>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>


                                <h5 className="mb-2 mt-3">Eligibility Processing Parameters</h5>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <small>Overlap Coverage Tie Breaker</small>
                                        <select className="form-select" {...register("overlap_coverage_tie_breaker")}>
                                            <option value="G">Use group submited by provider. If not match - use last added</option>
                                            <option value="A">Use member last added</option>
                                            <option value="U">Use member record last updated</option>
                                            <option value=""> None</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Processor Control Number Flag</small>
                                        <select className="form-select" {...register("processor_cntl_num_flag")}>
                                            <option value="N">Do not use processor control number to retrive eligibility</option>
                                            <option value="C">Customer will be determined from processor control number</option>
                                            <option value="B">Both customer and clerk will be determined from processor control number</option>
                                            <option value="">Not specified</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Processor Control Num Cust Length</small>
                                        <input type="text" className="form-control" {...register("processor_cntl_num_cust_length")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small> Eligibility  Change Log  Indicator</small>
                                        {/* <input type="text" className="form-control" name="" id="" /> */}
                                        <select className="form-select" {...register("member_change_log_opt")}>
                                            <option value="0">Member record changes will not be logged</option>
                                            <option value="1">Member record changes will be logged</option>
                                            <option value="">none</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small>Coverage Criteria</small>
                                        <select className="form-select" {...register("sys_date_written_to_first_fill")}>
                                            <option>1</option>
                                            <option></option>
                                        </select>
                                    </div>
                                </div>

                                <h5 className="mb-2 mt-3">Major Medical</h5>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <small>RVA List</small>
                                        <input type="text" className="form-control" {...register("rva_list_id")} />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <small> Maximum UCR</small>
                                        <input type="text" className="form-control" {...register("max_ucr")} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>

    );

}

export default SystemParameter;