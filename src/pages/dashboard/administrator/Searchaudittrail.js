import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { json, Link, Outlet, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import SelectSearch, { useSelect } from 'react-select-search';
import { toast } from "react-toastify";
import 'react-select-search/style.css';
import AsyncSelect from 'react-select/async';
import { PuffLoader } from "react-spinners";





<style>

</style>
function SearchAudit() {
    const [searchResult, setSearchResult] = useState(false);

    const [loading, setloading] = useState(false);

    const submitSearchForm = (toSearch) => {
        setloading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(toSearch)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/search-audit-trial/search-user-log`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setSearchResult(data.data);   
                setloading(false);
            })
    }
    const [formDetails, setFormDetails] = useState(false);
    const showDetails = (formDetails) => {
        setFormDetails(formDetails);
    }

    useEffect(() => { }, [searchResult]);
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
                            <li><a href="">Audit Trial</a></li>
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

            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <SearchAuditform submitSearchForm={submitSearchForm} />
                    {/* <SearchAudittable searchResult={searchResult}/> */}
                </div>
            </div>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <SearchAudittable searchResult={searchResult} showDetails={showDetails} loading={loading}/>
                </div>
            </div>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <AuditForm formDetails={formDetails} />
                </div>
            </div>

            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <AuditBottomTable />
                </div>
            </div>
        </>
    );
}



function SearchAuditform(props) {

    const { register, handleSubmit, control, watch, reset, field, formState: { errors } } = useForm();

    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(false);

    const [inputUserIdValue, setUserIdValue] = useState('');
    const [selectedUserIdValue, setSelectedUserIdValue] = useState(null);

    const [inputRecordValue, setRecordValue] = useState('');
    const [selectedRecordValue, setSelectedRecordValue] = useState(null);

    const [searchResult, setSearchResult] = useState(false);

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
        // console.log(inputValue);
    };

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
        // console.log(selectedValue);
    }

    // load options using API call
    const loadOptions = (inputValue) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/search-audit-trial/get-tables?search=${inputValue}`)
                .then((response) => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ table_name }) => ({
                            value: table_name,
                            label: table_name,
                        })),
                    );
                });
        });
    };

    //select user_id
    const handleUserIdInputChange = uvalue => {
        setUserIdValue(uvalue);
    }
    const handleUserIdChange = uvalue => {
        setSelectedUserIdValue(uvalue);
    }
    const loadUserIdOptions = (inputUserIdValue) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/search-audit-trial/get-user_ids?search=${inputUserIdValue}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ user_id }) => ({
                            uvalue: user_id,
                            ulabel: user_id
                        }))
                    )
                })
        })
    }

    //select record action
    const handleRecordInputChange = uvalue => {
        setRecordValue(uvalue);
    }
    const handleRecordChange = uvalue => {
        setSelectedRecordValue(uvalue);
    }
    var arr = [
        { rvalue: 'IN', rlabel: 'Insert' },
        { rvalue: 'UP', rlabel: 'Update' },
        { rvalue: 'DE', rlabel: 'Delete' },
    ];
    const loadRecordOptions = (inputRecordValue) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/search-audit-trial/get-record-actions?search=${inputRecordValue}`)
                .then(response => response.json())
                .then(({ data }) => {
                    resolve(
                        arr.map(({ rvalue, rlabel }) => ({
                            rvalue: rvalue,
                            rlabel: rlabel
                        }))
                    )
                })
        })
    }

    //Submit Search Form
    // const submitSearchForm = (toSearch) => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'content-type': 'application/json' },
    //         body: JSON.stringify(toSearch)
    //     }
    //     fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/search-audit-trial/search-user-log`, requestOptions)
    //         .then(async response => {
    //             const isJson = response.headers.get('content-type')?.includes('application/json');
    //             const data = isJson && await response.json();
    //             setSearchResult(data.data);
    //         })
    // }

    useEffect(() => { }, [searchResult]);
    return (
        <>
            <form onSubmit={handleSubmit(props.submitSearchForm)}>
                <div className="row">

                    <div className="col-md-12 mb-2">
                        <h5>Search Audit Trail</h5>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Mandatory Selection</small>
                            <div className="col-md-3 mb-3">
                                <div className="form-group ">
                                    Table Name
                                </div>
                            </div>
                            {/* <SelectSearch className="form-select"
                            // options={[]}
                            // multiple
                            getOptions={(query) => {
                                return new Promise((resolve, reject) => {
                                    fetch(
                                        process.env.REACT_APP_API_BASEURL + `/api/administrator/search-audit-trial/get-tables??search=${query}`
                                    )
                                        .then((response) => response.json())
                                        .then(({ data }) => {
                                            resolve(
                                                data.map(({ table_name }) => ({
                                                    value: table_name,
                                                    name: table_name,
                                                })),
                                            );
                                        })
                                        .catch(reject);
                                });
                            }}
                            search="true"
                            placeholder="Choose Table Name"
                        /> */}
                        </div>
                    </div>

                    <Controller name="table_name"
                        control={control}
                        render={({ field }) => (
                            <AsyncSelect
                                {...field}
                                cacheOptions
                                defaultOptions
                                // value={selectedValue}
                                // getOptionLabel={e => e.label}
                                // getOptionValue={e => e.value}
                                loadOptions={loadOptions}
                                onInputChange={handleInputChange}
                                // onChange={handleChange}
                                placeholder="Select Table Name"

                            />
                        )} />

                    <div className="clearfix"></div>

                    <div className="col-md-8 mb-2">
                        <h5>Optional Selections</h5>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>User ID</small>
                            <Controller name="user_id"
                                control={control}
                                render={({ field }) => (
                                    <AsyncSelect
                                        {...field}
                                        cacheOptions
                                        defaultOptions
                                        // value={selectedUserIdValue}
                                        getOptionLabel={e => e.ulabel}
                                        getOptionValue={e => e.uvalue}
                                        loadOptions={loadUserIdOptions}
                                        onInputChange={handleUserIdInputChange}
                                        // onChange={handleUserIdChange}
                                        placeholder="Select User ID"
                                    />
                                )} />
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>Record Action</small>
                            <Controller name="record_action"
                                control={control}
                                render={({ field }) => (
                                    <AsyncSelect
                                        {...field}
                                        cacheOptions
                                        defaultOptions
                                        // value={selectedRecordValue}
                                        getOptionLabel={e => e.rlabel}
                                        getOptionValue={e => e.rvalue}
                                        loadOptions={loadRecordOptions}
                                        onInputChange={handleRecordInputChange}
                                        // onChange={handleRecordChange}
                                        placeholder="Select User ID"
                                    />
                                )} />
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>From Date</small>
                            <input type="date" className="form-control"  {...register("from_date")} />
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="form-group">
                            <small>To Date</small>
                            <input type="date" className="form-control" {...register("to_date")} />
                        </div>
                    </div>
                    <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                        {/* <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                        <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                        <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp; */}
                        <button type="submit" className="btn btn-info">Search</button>
                    </div>

                </div>
            </form>
            {/* <SearchAudittable searchResult={searchResult} /> */}

            {/* <AuditForm />

            <AuditBottomTable /> */}

        </>

    );
}


export function SearchAudittable(props) {
    const searchArray = [];
    const LoadingSpinner = props => {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <PuffLoader
                    color="#59d8f1" />
            </div>

        );
    }
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    for (let i = 0; i < props.searchResult.length; i++) {
        searchArray.push(<SearchRow searchRow={props.searchResult[i]} showDetails={props.showDetails} />)
    }
    
    return (
        <>
            <div className="col-md-12">
                <div style={{ height: "400px", overflowY: "scroll" }}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Date Created</th>
                                <th>Time Created</th>
                                <th>User ID</th>
                                <th>Action</th>
                                <th>Application</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {searchArray} */}
                            {props.loading ? <LoadingSpinner /> : searchArray}
                        </tbody>
                    </table>
                </div>

            </div>
        </>

    );
}

function SearchRow(props) {
    return (
        <>
            <tr onClick={e => props.showDetails(props.searchRow)}>
                <td>{props.searchRow.date_created}</td>
                <td>{props.searchRow.time_created}</td>
                <td>{props.searchRow.user_id}</td>
                <td>{props.searchRow.record_action}</td>
                <td>{props.searchRow.application}</td>
            </tr>
        </>
    )
}

function AuditForm(props) {
    const { register, handleSubmit, watch, reset, formState } = useForm(false);

    const auditFormSubmit = (auditFormData) => {
        console.log(auditFormData);
    }

    useEffect(() => { reset(props.formDetails) }, [props.formDetails]);
    return (
        <>
            <form handleSubmit={auditFormSubmit}>
                <Row>
                    <div className="col-md-12 mb-2">
                        <h5>Details</h5>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Application</small>
                            <input type="text" className="form-control" {...register("application")} />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>User ID</small>
                            <input type="text" className="form-control" {...register("user_id")} />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Table Name</small>
                            <input type="text" className="form-control" {...register("table_name")} />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Action</small>
                            <input type="text" className="form-control" {...register("record_action")} />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Date</small>
                            <input type="date" className="form-control" {...register("date_created")} />
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="form-group">
                            <small>Time</small>
                            <input type="time" className="form-control" {...register("time_created")} />
                        </div>
                    </div>


                    <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                        <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                        <a href="" className="btn btn-danger">Select</a>&nbsp;&nbsp;
                        <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                        <button href="provider-search.html" className="btn btn-info">Search</button>
                    </div>
                </Row>
            </form>
        </>

    );
}

export function AuditBottomTable(props) {
    return (
        <>
            <div className="col-md-12 mb-3">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Old Record</th>
                            <th>Field Name</th>
                            <th>New Record</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>

    );
}


export default SearchAudit;