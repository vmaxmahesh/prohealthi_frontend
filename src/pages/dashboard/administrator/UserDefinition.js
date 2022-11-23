import React from "react";
import { Form } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function UserDefinition() {
    const navigate = useNavigate();

    const loadUserDefinitionForm = (user) => {
        navigate('/dashboard/administrator/user-definition/definition');
    }

    const loadGroupDefinitionForm = (group) => {
        navigate('/dashboard/administrator/user-definition/group');
    }


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

            <SearchUserDefinition />

            <div className="card mt-3 mb-3">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="col-md-8 mb-2">
                                    <h5>User Definition</h5>
                                </div>
                                <UserDefinitionList loadUserDefinitionForm={loadUserDefinitionForm} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <div className="col-md-8 mb-2">
                                    <h5> User Group Definition </h5>
                                </div>
                                <UserGroupDefinitionList loadGroupDefinitionForm={loadGroupDefinitionForm} />
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
                                <UserDF />
                                <div className="tab-content" id="nav-tabContent">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

function SearchUserDefinition() {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>User Definition </small>
                                <input type="text" className="form-control" placeholder='Start typing price user id/ last name/ first name to search'
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
                        <tr onClick={e => props.loadUserDefinitionForm(e)}>
                            <td>User ID 1</td>
                            <td>User Last Name 1</td>
                            <td>User First Name 1</td>
                        </tr>
                        <tr onClick={e => props.loadUserDefinitionForm(e)}>
                            <td>User ID 2</td>
                            <td>User Last Name 2</td>
                            <td>User First Name 2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

function UserGroupDefinitionList(props) {
    const e = "group";
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
                        <tr onClick={e => props.loadGroupDefinitionForm(e)}>
                            <td>Group ID 1</td>
                            <td>Group Name 1</td>
                        </tr>
                        <tr onClick={e => props.loadGroupDefinitionForm(e)}>
                            <td>Group ID 2</td>
                            <td>Group Name 2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export function UserDF() {
    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];
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
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">

                    <div className="col-md-12 mb-2">
                        <h5>User Information</h5>
                    </div>
                    <Form>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <small>Group ID</small>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <small>Password</small>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>First Name</small>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>Last Name</small>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <div className="form-group">
                                    <small>Group</small>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </Form>


                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <h5>Default System User</h5>
                        </div>
                        <div className="col-md-2 mb-2">
                            <input type="radio" value="" /> ProHealthi
                        </div>
                        <div className="col-md-2 mb-2">
                            <input type="radio" value="" /> Client Site
                        </div>

                        <div className="col-md-3">
                            <div className="form-group">
                                <input type="checkbox" id="Return2" className="d-none" />
                                <label htmlFor="Return2">System Administrator</label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <input type="checkbox" id="Return2" className="d-none" />
                                <label htmlFor="Return2">Enforce Restrictive Member Security</label>
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
                </div>
            </div>
        </>
    )
}

export function DataAccessTab() {
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
                                    <input type="text" name="" id="" className="form-control" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <small>Client</small>
                                    <input type="text" name="" id="" className="form-control" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="form-group">
                                    <small>Client Group</small>
                                    <input type="text" name="" id="" className="form-control" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Status</small>
                                    <select className="form-select">
                                        <option value="">Select</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <small>Exclude Flag</small>
                                    <select className="form-select">
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
                        <table className="table table-striped table-bordered">
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