import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { json, Link, Outlet, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserDefinition() {
    const navigate = useNavigate();

    const loadUserDefinitionForm = (user) => {
        navigate('/dashboard/administrator/user-definition/definition');
    }

    const loadGroupDefinitionForm = (group) => {
        navigate('/dashboard/administrator/user-definition/group');
    }

    const [userDefList, setUserDefList] = useState([]);
    const [formData, setFormData] = useState(false);

    const [groupData, setGroupData] = useState(false);

    const getGroupData = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/user-defination/get-group-data`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setGroupData(data.data);
                toast.success(response.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const onSearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/user-defination/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setUserDefList(data.data);
                
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const showFormData = (row) => {
        setFormData(row);
    }

    useEffect(() => { }, [userDefList, formData, groupData]);


    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a className=""> Administrator </a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a className="">User Definition</a></li>
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

            <SearchUserDefinition onSearch={onSearch} />

            <div className="card mt-3 mb-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="col-md-8 mb-2">
                                    <h5>User Definition</h5>
                                </div>
                                {/* <UserDefinitionList loadUserDefinitionForm={loadUserDefinitionForm} userDefList={userDefList} showFormData={showFormData} /> */}
                                <UserDefinitionList userDefList={userDefList} showFormData={showFormData} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="col-md-8 mb-2">
                                    <h5> User Group Definition </h5>
                                </div>
                                {/* <UserGroupDefinitionList loadGroupDefinitionForm={loadGroupDefinitionForm} getGroupData={getGroupData} groupData={groupData} /> */}
                                <UserGroupDefinitionList getGroupData={getGroupData} groupData={groupData} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card mt-3 mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <UserDF formData={formData} />
                                <div className="tab-content" id="nav-tabContent">
                                    <Outlet context={[formData, setFormData]} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

function SearchUserDefinition(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>User Definition </small>
                                <input type="text" onKeyUp={e => props.onSearch(e)} className="form-control" placeholder='Start typing price user id/ last name/ first name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function UserDefinitionList(props) {
    const userArry = [];
    for (let i = 0; i < props.userDefList.length; i++) {
        userArry.push(<UserDefRow userDefRow={props.userDefList[i]} showFormData={props.showFormData} />);
    }
    return (
        <>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
                <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                    <thead className='stickt-thead'>
                        <tr>
                            <th>User ID</th>
                            <th>User Last Name</th>
                            <th>User First Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr onClick={e => props.loadUserDefinitionForm(e)}>
                            <td>User ID 1</td>
                            <td>User Last Name 1</td>
                            <td>User First Name 1</td>
                        </tr>
                        <tr onClick={e => props.loadUserDefinitionForm(e)}>
                            <td>User ID 2</td>
                            <td>User Last Name 2</td>
                            <td>User First Name 2</td>
                        </tr> */}
                        {userArry}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function UserDefRow(props) {
    return (
        <>
            <tr onClick={e => props.showFormData(props.userDefRow)}>
                <td>{props.userDefRow.user_id}</td>
                <td>{props.userDefRow.user_last_name}</td>
                <td>{props.userDefRow.user_first_name}</td>
            </tr>
        </>
    )
}

function UserGroupDefinitionList(props) {
    const e = "group";
    useEffect(() => {
        if (!props.groupData) {
            props.getGroupData();
        }
    }, [props.groupData]);
    const groupList = [];
    for (let i = 0; i < props.groupData.length; i++) {
        groupList.push(<GroupRow groupRow={props.groupData[i]} loadGroupDefinitionForm={props.loadGroupDefinitionForm} />);
    }
    return (
        <>
            <div style={{ height: '400px', overflowY: 'scroll' }}>
                <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                    <thead className='stickt-thead'>
                        <tr>
                            <th>Group ID</th>
                            <th>Group Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupList}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function GroupRow(props) {
    return (
        <>
            <tr onClick={e => props.loadGroupDefinitionForm(e)}>
                <td>{props.groupRow.group_id}</td>
                <td>{props.groupRow.group_name}</td>
            </tr>
        </>
    )
}

export function UserDF(props) {
    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];
    const { register, handleSubmit, reset, watch, formState: { error } } = useForm();
    // const [formData, setFormData] = useState();

    useEffect(() => { reset(props.formData) }, [props.formData]);
    return (
        <>
            {/* <div className="card mt-3 mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mt-3 mb-3">
                            <div className="card-body"> */}
            {/* <div className="col-md-8 mb-2">
                                        <h5></h5>
                                    </div> */}
            {/* {currentpath == 'definition' ? ( */}
            <div className="data">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <Link to="definition" className={'nav-link' + (currentpath == 'definition' ? ' active' : '')}>Definition</Link>
                    <Link to="data-access" className={'nav-link' + (currentpath == 'data-access' ? ' active' : '')}>Data Access</Link>
                </div>
                {/* <hr /> */}
                {/* <div className="tab-content" id="nav-tabContent">
                    <Outlet />
                </div> */}
            </div>
            {/* ) : <GroupForm />} */}
            {/* </div>
                        </div>

                    </div>
                </div>
            </div> */}
        </>
    )
}
export function UDefinitionTab() {
    const [formData, setFormData] = useOutletContext();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [securityOption, setSecurityOption] = useState(false);
    const [adding, setAdding] = useState(false);
    const [groupError, setGroupError] = useState(false);
    const [defaultSystemType, setDefaultSystemType] = useState(false);

    useEffect(() => { }, [defaultSystemType]);

    const getSecurityOptions = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/user-defination/get-security-options`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    toast.error("There was an error!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {

                    setSecurityOption(data.data);

                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const addNew = () => {
        setAdding(true);
        setFormData(false);
        reset();
    }

    const checkValidGroup = (validate) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/user-defination/validate-group?search=${validate.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(data.data);
                if (data.data <= 0) {
                    setGroupError(true);
                } else {
                    setGroupError(false);
                }
                toast.success(response.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const addUser = (userFormData) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userFormData)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/user-defination/submit`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(data.data);
                if (!response.ok) {
                    toast.error("There was an error !", {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.success(data.message, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const changeDefaultSystem = (type) => {
        setDefaultSystemType(type.target.value);
        // alert(defaultSystemType);
    }

    useEffect(() => {
        if (!securityOption) {
            getSecurityOptions();
        }
        if (adding) {
            reset({ user_id: '', user_password: '', user_first_name: '', user_last_name: '', group_id: '', new: 1 }
                , { keepValues: false, });
        }
        reset(formData)
    }, [formData, groupError, defaultSystemType]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <form onSubmit={handleSubmit(addUser)}>
                        <div className="col-md-12 mb-2">
                            <h5>User Information</h5>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <small>User ID</small>
                                    <input type="text" className="form-control" {...register("user_id", { required: true })} disabled={formData ? true : false} />
                                    {errors.user_id && <span><p className="notvalid">This field is required</p></span>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <small>Password</small>
                                    <input type="text" className="form-control" {...register("user_password", { required: true })} />
                                    {errors.user_password && <span><p className="notvalid">This field is required</p></span>}
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>First Name</small>
                                    <input type="text" className="form-control" {...register("user_first_name")} />
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>Last Name</small>
                                    <input type="text" className="form-control" {...register("user_last_name")} />
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>Group</small>
                                    <input type="text" className="form-control" onKeyUp={e => checkValidGroup(e)} {...register("group_id")} />
                                    {groupError ? <span><p className='notvalid'>Please enter valid group id</p></span> : ''}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <h5>Default System User</h5>
                            </div>
                            <div className="col-md-2 mb-2">
                                <input type="radio" value="prohealthi" name="defaultSystemUser" onClick={changeDefaultSystem} /> ProHealthi
                            </div>
                            <div className="col-md-2 mb-2">
                                <input type="radio" value="client" name="defaultSystemUser" onClick={changeDefaultSystem} /> Client Site
                            </div>

                            <div className="col-md-3">
                                <div className="form-group">
                                    <input type="checkbox" id="Return2" className="d-none" disabled={defaultSystemType ? "client" : ''} />
                                    <label htmlFor="Return2">System Administrator</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <input type="checkbox" id="Return2" className="d-none" disabled={defaultSystemType ? "client" : ''} />
                                    <label htmlFor="Return2">Enforce Restrictive Member Security</label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <div className="col-md-3 mt-3">
                                    <button type="submit" className="btn btn-sm btn-info w-100"
                                        disabled={groupError ? true : false}
                                    >{adding || !formData ? "Add" : "Update"}</button>
                                </div>
                                <div className="col-md-3 mt-3">
                                    <button type="button" onClick={e => addNew(e)} className="btn btn-primary"
                                        disabled={groupError ? true : false}
                                    >Clear</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8 mb-2 mt-5">
                            <h5>Program Security Options</h5>
                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Program Section</th>
                                            <th>Privileges</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                        <td>Accumulated Benefits Strategies</td>
                                        <td>Read/Write</td>
                                    </tr>
                                    <tr>
                                        <td>Accumulated Benefits </td>
                                        <td>Read/Write</td>
                                    </tr>
                                    <tr>
                                        <td>Audit Trail Maintenance</td>
                                        <td>Read/Write</td>
                                    </tr> */}
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-md-4">
                                <Form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group mt-3">
                                                <input type="checkbox" id="Return2" className="d-none" />
                                                <label htmlFor="Return2">Read Only</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mt-3">
                                                <input type="checkbox" id="Return3" className="d-none" />
                                                <label htmlFor="Return3">Read / Write</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mt-3">
                                                <input type="checkbox" id="Return4" className="d-none" />
                                                <label htmlFor="Return4">Audit Trail </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 mt-3">
                                            <button className="btn btn-sm btn-info w-100">All</button>
                                        </div>
                                        <div className="col-md-3 mt-3">
                                            <button className="btn btn-sm btn-danger w-100">None</button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export function DataAccessTab() {
    const [formData, setFormData] = useOutletContext();
    const { register, handleSubmit, reset, watch, formState: { error } } = useForm();
    useEffect(() => { reset(formData) }, [formData]);
    return (
        <>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <h5>Data Access</h5>
                    </div>

                    <from>
                        <div className="row mb-3">
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <small>Customer</small>
                                    <input type="text" {...register("customer_id", { required: true })} className="form-control" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <small>Client</small>
                                    <input type="text" {...register("client_id", { required: true })} className="form-control" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <small>Client Group</small>
                                    <input type="text" {...register("client_group_id", { required: true })} className="form-control" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Status</small>
                                    <select className="form-select" {...register("customer_id", { required: true })}>
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Exclude Flag</small>
                                    <select className="form-select" {...register("customer_id", { required: true })}>
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                                <a href="" className="btn btn-danger">Clear</a>&nbsp;&nbsp;
                                <a href="" className="btn btn-warning ">Remove</a>&nbsp;&nbsp;
                                <button href="provider-search.html" className="btn btn-info">Add</button>
                            </div>
                        </div>
                    </from>

                    <div className="col-md-12">
                        <table className="table table-striped table-bordered" {...register("customer_id", { required: true })}>
                            <thead>
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Client ID</th>
                                    <th>Client Group ID</th>
                                    <th>Status</th>
                                    <th>Exclude</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
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
        </>
    )
}

export function GroupForm() {
    return (
        <>
            <div className="col-md-8 mb-2 mt-5">
                <h5>Group Information</h5>
            </div>
            <Form>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <small>Group ID</small>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <small>Group Name</small>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                </div>
            </Form>


            <div className="col-md-8 mb-2 mt-5">
                <h5>Program Security Options</h5>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Program Section</th>
                                <th>Privileges</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Accumulated Benefits Strategies</td>
                                <td>Read/Write</td>
                            </tr>
                            <tr>
                                <td>Accumulated Benefits </td>
                                <td>Read/Write</td>
                            </tr>
                            <tr>
                                <td>Audit Trail Maintenance</td>
                                <td>Read/Write</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col-md-4">
                    <Form>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <input type="checkbox" id="Return2" className="d-none" />
                                    <label htmlFor="Return2">Read Only</label>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <input type="checkbox" id="Return3" className="d-none" />
                                    <label htmlFor="Return3">Read / Write</label>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <input type="checkbox" id="Return4" className="d-none" />
                                    <label htmlFor="Return4">Audit Trail </label>
                                </div>
                            </div>

                            <div className="col-md-3 mt-3">
                                <button className="btn btn-sm btn-info w-100">All</button>
                            </div>
                            <div className="col-md-3 mt-3">
                                <button className="btn btn-sm btn-danger w-100">None</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}