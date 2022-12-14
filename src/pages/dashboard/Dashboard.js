import React, { useEffect } from 'react';
import { Link, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';

export default function Dashboard() {
    const location = useLocation();
    const currentpath = location.pathname.split('/')[3];
    // console.log(currentpath);
    const { user, logout } = useAuth();
    // console.log(currentpath);
    // const user  = useAuth();

    useEffect(() => {
        // console.log(user);
    });

    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <div className='dashboard'>
                <div className="dashboard-nav clearfix">
                    <div className="brand">
                        <img src="/images/prohealthi-logo-white.png" alt="" title="" />
                    </div>

                    <nav className="dashboard-nav-list">
                        <Link to="" className="dashboard-nav-item"><i className="fas fa-gauge"></i> Dashboard </Link>

                        <div className={'dashboard-nav-dropdown' + (['ndc', 'gpi', 'therapy-class', 'benefit-list'].includes(currentpath) ? ' show' : '')}>
                            <Link to="" className='dashboard-nav-item dashboard-nav-dropdown-toggle'>
                                <i className="fas fa-clipboard-list"></i> Exception Lists</Link>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/exception-list/ndc" className={'dashboard-nav-dropdown-item' + (currentpath == 'ndc' ? ' active' : '')}>NDC</Link>
                                <Link to="/dashboard/exception-list/gpi" className={'dashboard-nav-dropdown-item' + (currentpath == 'pgpiath' ? ' active' : '')}>GPI</Link>
                                <Link to="/dashboard/exception-list/therapy-class" className={'dashboard-nav-dropdown-item' + (currentpath == 'therapy-class' ? ' active' : '')}>Therapy Class</Link>
                                {/* <a href="/dashboard/exception-list/drug-classification" className={'dashboard-nav-dropdown-item' + (currentpath == 'path' ? ' active' : '')}>Drug Classification</a> */}
                                {/* <a href="/dashboard/exception-list/procedure" className={'dashboard-nav-dropdown-item' + (currentpath == 'path' ? ' active' : '')}>Procedure</a> */}
                                {/* <a href="/dashboard/exception-list/reason" className={'dashboard-nav-dropdown-item' + (currentpath == 'path' ? ' active' : '')}>Reason</a> */}
                                <Link to="/dashboard/exception-list/benefit-list" className={'dashboard-nav-dropdown-item' + (currentpath == 'benefit-list' ? ' active' : '')}>Benefit List</Link>
                                <Link to="/dashboard/exception-list/benefit-derivation" className={'dashboard-nav-dropdown-item' + (currentpath == 'benefit-derivation' ? ' active' : '')}>Benefit Derivation</Link>
                                <Link href="/dashboard/exception-list/provider-type-validation" className={'dashboard-nav-dropdown-item' + (currentpath == 'provider-type-validation' ? ' active' : '')}>Provider Type Validation</Link>
                                <Link to="/dashboard/exception-list/procedure-code-list" className={'dashboard-nav-dropdown-item' + (currentpath == 'procedure-code-list' ? ' active' : '')}>Procedure Code List</Link>
                                <Link to="/dashboard/exception-list/super-benefit-list" className={'dashboard-nav-dropdown-item' + (currentpath == 'super-benefit-list' ? ' active' : '')}>Super Benefit List</Link>
                            </div>
                        </div>
                        <div className={'dashboard-nav-dropdown' + (['benefits', 'procedure', 'diagnosis', 'reason', 'cause-of-loss', 'service-modifiers', 'service-type', 'provider-type'].includes(currentpath) ? ' show' : '')}>
                            {/* <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle"> */}
                            <Link to="" className='dashboard-nav-item dashboard-nav-dropdown-toggle'>
                                <i className="fas fa-table"></i> Code </Link>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/code/benefits" className={'dashboard-nav-dropdown-item' + (currentpath == 'benefits' ? ' active' : '')}>Benefit Codes</Link>
                                <Link to="/dashboard/code/procedure" className={'dashboard-nav-dropdown-item' + (currentpath == 'procedure' ? ' active' : '')}>Procedure Codes</Link>
                                <Link to="/dashboard/code/diagnosis" className={'dashboard-nav-dropdown-item' + (currentpath == 'diagnosis' ? ' active' : '')}>Diagnosis Codes</Link>
                                <Link to="/dashboard/code/reason" className={'dashboard-nav-dropdown-item' + (currentpath == 'reason' ? ' active' : '')}>Reason Codes</Link>
                                <Link to="/dashboard/code/cause-of-loss" className={'dashboard-nav-dropdown-item' + (currentpath == 'cause-of-loss' ? ' active' : '')}>Cause Of Loss Codes</Link>
                                <Link to="/dashboard/code/service-modifiers" className={'dashboard-nav-dropdown-item' + (currentpath == 'service-modifiers' ? ' active' : '')}>Service Modifiers</Link>
                                <Link to="/dashboard/code/service-type" className={'dashboard-nav-dropdown-item' + (currentpath == 'service-type' ? ' active' : '')}>Service Types</Link>
                                <Link to="/dashboard/code/provider-type" className={'dashboard-nav-dropdown-item' + (currentpath == 'provider-type' ? ' active' : '')}>Provider Types</Link>
                            </div>
                        </div>

                        <div className='dashboard-nav-dropdown'>

                            <Link to="" className='dashboard-nav-item dashboard-nav-dropdown-toggle'>
                                <i className="fa-solid fa-calendar-days"></i> Third Party Pricing </Link>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/third-party-pricing/price-schedule" className={'dashboard-nav-dropdown-item' + (currentpath == 'price-schedule' ? ' active' : '')}>Price Schedule</Link>
                                <Link to="/dashboard/third-party-pricing/copay-schedule" className={'dashboard-nav-dropdown-item' + (currentpath == 'copay-schedule' ? ' active' : '')}>Copay Schedule</Link>
                                <Link to="/dashboard/third-party-pricing/copay-step-schedule" className={'dashboard-nav-dropdown-item' + (currentpath == 'copay-step-schedule' ? ' active' : '')}>Copay Step Schedule</Link>
                                <Link to="/dashboard/third-party-pricing/MAC-list" className={'dashboard-nav-dropdown-item' + (currentpath == 'MAC-list' ? ' active' : '')}>MAC List</Link>
                                <Link to="/dashboard/third-party-pricing/tax-schedule" className={'dashboard-nav-dropdown-item' + (currentpath == 'tax-schedule' ? ' active' : '')}>Tax Schedule</Link>
                                <Link to="/dashboard/third-party-pricing/procedure-UCR-list" className={'dashboard-nav-dropdown-item' + (currentpath == 'benprocedure-UCR-listefits' ? ' active' : '')}>Procedure UCR List</Link>
                                <Link to="/dashboard/third-party-pricing/RAV-list" className={'dashboard-nav-dropdown-item' + (currentpath == 'RAV-list' ? ' active' : '')}>RVA List</Link>
                            </div>
                        </div>

                        <div className={'dashboard-nav-dropdown' + (['subpath', 'subpath2'].includes(currentpath) ? ' show' : '')}>
                            <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                                <i className="fa-solid fa-prescription-bottle-medical"></i> Drug Information </a>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/drug-information/drug-database" className={'dashboard-nav-dropdown-item' + (currentpath == 'drug-database' ? ' active' : '')}>Drug Database</Link>
                                <Link to="/dashboard/drug-information/ndc-gpi-cross-reference" className={'dashboard-nav-dropdown-item' + (currentpath == 'path' ? ' active' : '')}>NDC/GPI cross reference</Link>
                            </div>
                        </div>

                        <div className={'dashboard-nav-dropdown' + (['subpath', 'subpath2'].includes(currentpath) ? ' show' : '')}>
                            <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                                <i className="fa-solid fa-file-alt"></i> Validation Lists </a>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/validation-lists/diagnosis-validation" className={'dashboard-nav-dropdown-item' + (currentpath == 'diagnosis-validation' ? ' active' : '')}>Diagnosis </Link>
                                <Link to="/dashboard/validation-lists/speciality" className={'dashboard-nav-dropdown-item' + (currentpath == 'speciality' ? ' active' : '')}>Specialty </Link>
                                <Link to="/dashboard/validation-lists/eligibility" className={'dashboard-nav-dropdown-item' + (currentpath == 'eligibility' ? ' active' : '')}>Eligibility  </Link>
                                <Link to="/dashboard/validation-lists/provider" className={'dashboard-nav-dropdown-item' + (currentpath == 'provider' ? ' active' : '')}>Provider </Link>
                                <Link to="/dashboard/validation-lists/prescriber" className={'dashboard-nav-dropdown-item' + (currentpath == 'prescriber' ? ' active' : '')}>Prescriber </Link>
                                <Link to="/dashboard/validation-lists/diagnosis-prioritization" className={'dashboard-nav-dropdown-item' + (currentpath == 'diagnosis-prioritization' ? ' active' : '')}>Diagnosis Prioritization </Link>
                            </div>
                        </div>

                        <div className={'dashboard-nav-dropdown' + (['subpath', 'subpath2'].includes(currentpath) ? ' show' : '')}>
                            <Link to="/dashboard/searchprovider" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                                <i className="fa-solid fa-hand-holding-heart"></i> Provider Data </Link>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/provider/" className={'dashboard-nav-dropdown-item' + (currentpath == 'provider' ? ' active' : '')}>Provider</Link>

                                <Link to="/dashboard/provider/traditionalnetworks" className={'dashboard-nav-dropdown-item' + (currentpath == 'traditionalnetworks' ? ' active' : '')}>Traditional Networks</Link>
                                <Link to="/dashboard/provider/flexiblenetworks" className={'dashboard-nav-dropdown-item' + (currentpath == 'flexiblenetworks' ? ' active' : '')}>FlexibleNetworks</Link>
                                <Link to="/dashboard/provider/superprovider" className={'dashboard-nav-dropdown-item' + (currentpath == 'superprovider' ? ' active' : '')}>Super Provider</Link>
                                <Link to="/dashboard/provider/prioritize-networks" className={'dashboard-nav-dropdown-item' + (currentpath == 'prioritize-networks' ? ' active' : '')}>Prioritize Network</Link>



                                <Link to="/dashboard/user/provider/prioritizenetworks" className={'dashboard-nav-dropdown-item' + (currentpath == 'path' ? ' active' : '')}>PrioritizeNetworks</Link>
                                {/* <a href="#" className={'dashboard-nav-dropdown-item' + (currentpath == 'path' ? ' active' : '')}> Projections</a> */}
                            </div>
                        </div>

                        <div className={'dashboard-nav-dropdown' + (['subpath', 'subpath2'].includes(currentpath) ? ' show' : '')}>
                            <Link to="/dashboard/presciberdata"  className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                                <i className="fa-solid fa-prescription"></i> Prescriber Data </Link>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/prescriber-data/prescriber" className={'dashboard-nav-dropdown-item' + (currentpath == 'prescriber' ? ' active' : '')}>Prescriber</Link>
                                <Link to="/dashboard/presciberdata" className={'dashboard-nav-dropdown-item' + (currentpath == 'path' ? ' active' : '')}>Presciber</Link>


                            </div>
                        </div>

                        <div className={'dashboard-nav-dropdown' + (['subpath', 'subpath2'].includes(currentpath) ? ' show' : '')}>
                            <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                                <i className="fa-solid fa-credit-card"></i>  Strategies </a>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to='/dashboard/strategies/pricing-startegy' className={'dashboard-nav-dropdown-item' + (currentpath == 'pricing-startegy' ? ' active' : '')}>Pricing Strategy</Link>
                                <Link to="/dashboard/strategies/copay-strategy" className={'dashboard-nav-dropdown-item' + (currentpath == 'copay-strategy' ? ' active' : '')}>Copay Strategy</Link>
                                <Link to="/dashboard/strategies/accumulated-benefits-strategy" className={'dashboard-nav-dropdown-item' + (currentpath == 'accumulated-benefits-strategy' ? ' active' : '')}> Accumulated Benefits Strategy</Link>
                            </div>
                        </div>

                        <div className={'dashboard-nav-dropdown' + (['subpath', 'subpath2'].includes(currentpath) ? ' show' : '')}>
                            <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                                <i className="fa-solid fa-handshake"></i> Accumulated Benefits </a>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/accumulated-benefits/all" className={'dashboard-nav-dropdown-item' + (currentpath == 'all' ? ' active' : '')}>Accumulated benefits</Link>
                                <Link to="/dashboard/accumulated-benefits/gpi-exclusion" className={'dashboard-nav-dropdown-item' + (currentpath == 'gpi-exclusion' ? ' active' : '')}>GPI exclusion lists</Link>
                                <Link to="/dashboard/accumulated-benefits/ndc-exclusion" className={'dashboard-nav-dropdown-item' + (currentpath == 'ndc-exclusion' ? ' active' : '')}> NDC exclusion lists</Link>
                                <Link to="/dashboard/accumulated-benefits/major-medical-maximums" className={'dashboard-nav-dropdown-item' + (currentpath == 'ajor-medical-maximums' ? ' active' : '')}>Major medical maximums</Link>

                            </div>
                        </div>

                        <div className={'dashboard-nav-dropdown' + (['subpath', 'subpath2'].includes(currentpath) ? ' show' : '')}>
                            <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                                <i className="fa-solid fa-compass-drafting"></i> Plan Design </a>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/plan-design/plan-association" className={'dashboard-nav-dropdown-item' + (currentpath == 'plan-association' ? ' active' : '')}>Plan Association</Link>
                                <Link to="/dashboard/plan-design/plan-edit" className={'dashboard-nav-dropdown-item' + (currentpath == 'plan-edit' ? ' active' : '')}>Plan Edit</Link>
                            </div>
                        </div>

                        <div className={'dashboard-nav-dropdown' + (['member', 'membership', 'plan-authorisations', 'plan-validations'].includes(currentpath) ? ' show' : '')}>
                            <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                                <i className="fa-solid fa-address-card"></i> Membership Data </a>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/membership/member" className={'dashboard-nav-dropdown-item' + (currentpath == 'member' ? ' active' : '')}>Member</Link>
                                <Link to="/dashboard/membership/prior-authorization" className={'dashboard-nav-dropdown-item' + (currentpath == 'prior-authorization' ? ' active' : '')}>Prior Authorizations</Link>
                                <Link to="/dashboard/membership/plan-validations" className={'dashboard-nav-dropdown-item' + (currentpath == 'plan-validations' ? ' active' : '')}>Plan Validations</Link>
                            </div>
                        </div>

                        {/*    <div className={'dashboard-nav-dropdown' + (['subpath', 'subpath2'].includes(currentpath) ? ' show' : '')}>
                            <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                                <i className="fa-solid fa-calendar-days"></i> Price Schedules </a>
                            <div className='dashboard-nav-dropdown-menu'>
                                <a href="#" className={'dashboard-nav-dropdown-item' + (currentpath == 'path' ? ' active' : '')}>All</a>
                                <a href="#" className={'dashboard-nav-dropdown-item' + (currentpath == 'path' ? ' active' : '')}>Recent</a>
                                <a href="#" className={'dashboard-nav-dropdown-item' + (currentpath == 'path' ? ' active' : '')}> Projections</a>
                            </div>
                        </div> */}

                        <div className={'dashboard-nav-dropdown' + (['customer', 'client', 'client-group'].includes(currentpath) ? ' show' : '')}>
                            <a href="#!" className='dashboard-nav-item dashboard-nav-dropdown-toggle'>
                                <i className="fa-solid fa-users"></i> Users Data </a>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/user/customer" className={'dashboard-nav-dropdown-item' + (currentpath == 'customer' ? ' active' : '')}>Customer</Link>
                                <Link to="/dashboard/user/client" className={'dashboard-nav-dropdown-item' + (currentpath == 'client' ? ' active' : '')}>Client</Link>
                                <Link to="/dashboard/user/client-group" className={'dashboard-nav-dropdown-item' + (currentpath == 'client-group' ? ' active' : '')}>Client / Client Group</Link>
                            </div>
                        </div>

                        <div className={'dashboard-nav-dropdown' + (['subpath', 'subpath2'].includes(currentpath) ? ' show' : '')}>
                            <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle">
                                <i className="fa-solid fa-prescription"></i> Administrator </a>
                            <div className='dashboard-nav-dropdown-menu'>
                                <Link to="/dashboard/administrator/user-definition" className={'dashboard-nav-dropdown-item' + (currentpath == 'user-definition' ? ' active' : '')}>User Definition</Link>
                                <Link to="/dashboard/administrator/verify-drug-coverage" className={'dashboard-nav-dropdown-item' + (currentpath == 'verify-drug-coverage' ? ' active' : '')}>Verify Drug Coverage</Link>
                                <Link to="/dashboard/administrator/search-audit-trail" className={'dashboard-nav-dropdown-item' + (currentpath == 'search-audit-trail' ? ' active' : '')}>Search Audit Trail</Link>
                                <Link to="/dashboard/administrator/system-parameter" className={'dashboard-nav-dropdown-item' + (currentpath == 'system-parameter' ? ' active' : '')}>System Parameters</Link>
                                <Link to="/dashboard/administrator/zip-codes" className={'dashboard-nav-dropdown-item' + (currentpath == 'zip-codes' ? ' active' : '')}>Zip Codes</Link>
                                <Link to="/dashboard/administrator/audit-trail-maintanance" className={'dashboard-nav-dropdown-item' + (currentpath == 'audit-trail-maintanace' ? ' active' : '')}>Audit Trail Maintanance</Link>
                                <Link to="/dashboard/administrator/claims-history-search" className={'dashboard-nav-dropdown-item' + (currentpath == 'claims-history-search' ? ' active' : '')}>Claim History Search</Link>

                            </div>
                        </div>


                        <div className="nav-item-divider"></div>
                        <a href="#" className="dashboard-nav-item"><i className="fas fa-sign-out-alt"></i> Logout </a>
                    </nav>
                </div>

                <div className='dashboard-app'>
                    <header className='dashboard-toolbar'>

                        {/* <div className="row">
                            <div className="col-md-2">
                                <a href="#!" className="menu-toggle"><i className="fa-solid fa-bars-staggered"></i> Clients</a>
                            </div>
                        </div> */}


                        <div className="col-md-2 d-flex align-items-center">
                            <a href="#!" className="menu-toggle"><i className="fa-solid fa-bars-staggered"></i></a>
                            <h3 className="page-title"></h3>
                        </div>
                        <div className="col-md-10 ms-auto">
                            <ul className="menu-items align-items-center">
                                <li><a href="" className="btn btn-outline btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Claim History</a></li>
                                <li><a href="" className="btn btn-create btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal1">Add new</a></li>
                                <li className="dropdown"><a href="" className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="d-flex align-items-center">
                                        <div><small>Welcome </small>
                                            <p><b>{user.name}</b></p>
                                        </div>
                                        <div className="profile">
                                            <img src="images/profile-pic.png" className="img-fluid" alt="" />
                                        </div>
                                    </div>
                                </a>
                                    <div className="dropdown-menu user-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">My Profile</a>
                                        <a className="dropdown-item" href="#">Update Information</a>
                                        <Link className="dropdown-item" onClick={(e) => logout(e)}>Logout</Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </header>
                    <div className='dashboard-content clearfix'>
                        <Outlet />
                    </div>
                    {/* <div className='dashboard-content clearfix'>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="breadcrum">
                                    <ul>
                                        <li><a href="">Home</a></li>
                                        <li><i className="fas fa-angle-right"></i></li>
                                        <li><a href="">Users Data</a></li>
                                        <li><i className="fas fa-angle-right"></i></li>
                                        <li><a href="">Client</a></li>
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

                        <div className="col-md-12 mb-3">
                            <h4 style="font-weight: 600">Search Client/Group</h4>
                        </div>

                        <div className="card mt-3 mb-3">
                            <div className="card-body">
                                <form method="" action="">
                                    <div className="col-md-12">
                                        <h5 className="mb-2">Select Customer and Select ID</h5>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col mb-2">
                                            <div className="form-group">
                                                <small>Customer ID</small>
                                                <input type="text" className="form-control" placeholder="Customer ID" name="" id="" required />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div className="col mb-2">
                                            <div className="form-group">
                                                <small>Client ID</small>
                                                <input type="text" className="form-control" placeholder="Client ID" name="" id="" required />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>
                                        <div className="col mb-2">
                                            <div className="form-group">
                                                <small>Group ID</small>
                                                <input type="text" className="form-control" placeholder="Client Name" name="" id="" required />
                                            </div>
                                        </div>
                                        <div className="col-md-2 mb-2">
                                            <div className="form-group">
                                                <small>&nbsp;</small><br>
                                                    <button type="submit" className="btn m-0 p-2 btn-theme" style="width: 100%;font-size: 12px;">Search</button>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="checkbox" id="Return" className="d-none">
                                                    <label for="Return">Return all groups to my list</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Customer ID</th>
                                                    <th>Client ID</th>
                                                    <th>Group ID</th>
                                                    <th>Group Name</th>
                                                    <th>Eff. Date</th>
                                                    <th>Term Date</th>
                                                    <th>Customer Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Jamrech</td>
                                                    <td>Jamica Mechaidise</td>
                                                    <td>G1</td>
                                                    <td>Glass Ware Group</td>
                                                    <td>06-10-2022</td>
                                                    <td>06-12-2040</td>
                                                    <td>Jamaica Merchand</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#Identification" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Identification</button>
                                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#Strategy" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Strategy</button>
                                <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Eligibility" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Eligibility</button>
                                <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Indicators" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Indicators</button>
                                <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#Charges" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Charges/Misc</button>
                            </div>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="Identification" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <div className="card mt-3 mb-3">
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className="col-md-7 mb-3">
                                                    <h5 className="mb-2">Customer ID</h5>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Customer ID</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Customer ID" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>&nbsp;</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Customer ID" readonly />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <h5 className="mb-1">Address</h5>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Name</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Name" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Address 1</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Address 1" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Address 2</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Address 2" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>City / State</small>
                                                                <select className="form-select">
                                                                    <option value="">Select City</option>
                                                                    <option value="">Select City</option>
                                                                    <option value="">Select City</option>
                                                                    <option value="">Select City</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Country</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Country" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>ZIP Code</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="ZIP Code" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Phone</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Phone" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Fax</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Fax" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>EDI Address</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="EDI Address" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Contact</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Contact" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Test</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Test" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Type</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Type" readonly />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 mb-3">
                                                    <h5 className="mb-1">Data Ranges</h5>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Effective Date</small>
                                                                <input type="date" className="form-control" name="" id="" placeholder="Address 1" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Termination Date</small>
                                                                <input type="date" className="form-control" name="" id="" placeholder="Address 2" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Policy Ann. Month</small>
                                                                <select className="form-select">
                                                                    <option value="">Policy Ann. Month</option>
                                                                    <option value="">Select City</option>
                                                                    <option value="">Select City</option>
                                                                    <option value="">Select City</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Policy Ann. Day</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Enter" readonly />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h5 className="mb-1">Census</h5>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group mb-2">
                                                                <small>Census Date</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Census Date" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Active Contracts</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Active Contracts" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Active Memebers</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Active Memebers" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Termed Contracts</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Termed Contracts" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Termed Memebers</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Termed Memebers" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Pending Contracts</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Pending Contracts" readonly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-2">
                                                                <small>Pending Memebers</small>
                                                                <input type="text" className="form-control" name="" id="" placeholder="Pending Members" readonly />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <small>Marketing Group</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="Pending Members" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <small>Anniversary Date</small>
                                                        <input type="date" className="form-control" name="" id="" placeholder="Pending Members" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <small>Plan Classification</small>
                                                        <select className="form-select">
                                                            <option value="">Choose plan</option>
                                                            <option value="">Select City</option>
                                                            <option value="">Select City</option>
                                                            <option value="">Select City</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-1 float-end">
                                        <a href="" className="btn btn-theme pt-2 pb-2" style="width: 100%">Next</a>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="Strategy" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <div className="card mt-3 mb-3">
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className="col-md-11 mb-1">
                                                    <h5 className="mb-2">Coverage Strategy</h5>
                                                </div>
                                                <div className="col-md-1 mb-1">
                                                    <a href="" className="btn btn-theme btn-sm p-1" style="width: 100%;">Add <i className="fa fa-plus"></i></a>
                                                </div>
                                            </div>
                                            <div className="row align-items-center">
                                                <div className="col-md-3 align-items-center">
                                                    <p className="mt-2">Cov Eff Date:</p>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-3">
                                                        <small>Tier 1</small>
                                                        <input type="date" className="form-control" name="" id="" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-3">
                                                        <small>Tier 2</small>
                                                        <input type="date" className="form-control" name="" id="" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-3">
                                                        <small>Tier 3</small>
                                                        <input type="date" className="form-control" name="" id="" required />
                                                    </div>
                                                </div>

                                                <div className="col-md-3 align-items-center">
                                                    <p>Plan ID</p>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-3">
                                                        <input type="text" className="form-control" name="" id="" required />
                                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-3">
                                                        <div className="form-group mb-3">
                                                            <input type="text" className="form-control" name="" id="" required />
                                                            <a href=""><span className="fa fa-search form-icon"></span></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-3">
                                                        <div className="form-group mb-3">
                                                            <input type="text" className="form-control" name="" id="" required />
                                                            <a href=""><span className="fa fa-search form-icon"></span></a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-3 align-items-center">
                                                    <p>Miscellaneous Data</p>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-3">
                                                        <input type="text" className="form-control" name="" id="" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-3">
                                                        <input type="text" className="form-control" name="" id="" required />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="form-group mb-3">
                                                        <input type="text" className="form-control" name="" id="" required />
                                                    </div>
                                                </div>

                                                <div className="clearfix mb-3"></div>

                                                <div className="col-md-12">
                                                    <h5 className="mb-2">Provider Verification Options :</h5>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <small>Provider Options</small>
                                                        <select className="form-select">
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <small>Super Provider Networks</small>
                                                        <input type="text" className="form-control" name="" id="" required />
                                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                                    </div>
                                                </div>

                                                <div className="clearfix mb-2"></div>

                                                <div className="col-md-12">
                                                    <h5 className="mb-2">Prescriber Verification Options</h5>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-3">
                                                        <small>Prescriber Options</small>
                                                        <select className="form-select">
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-3">
                                                        <small>Prescriber Options 2</small>
                                                        <select className="form-select">
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-3">
                                                        <small>Prescriber Grouping ID</small>
                                                        <input type="text" className="form-control" name="" id="" required />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-1 float-end">
                                        <a href="" className="btn btn-theme pt-2 pb-2" style="width: 100%">Next</a>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="Eligibility" role="tabpanel" aria-labelledby="nav-contact-tab">
                                    <div className="card mt-3 mb-3">
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Eligibility Load Parameters</h5>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <small>Auto Termination Level</small>
                                                    <select className="form-select">
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                    <p className="input-hint">Overlap Allowed Within Database</p>
                                                </div>

                                                <div className="col-md-6 mb-2">
                                                    <small>Eligibility Type</small>
                                                    <select className="form-select">
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>

                                                <div className="clearfix mb-2"></div>

                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Eligibility Processing Parameters:</h5>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <small>Membership Processing Flag</small>
                                                    <select className="form-select">
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>

                                                <div className="clearfix mb-2"></div>

                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Eligibility Verification Options:</h5>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <small>Eligibility Options</small>
                                                    <select className="form-select">
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                    <p className="input-hint">Check Eligibility By Member:</p>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <small>Eligibility Validation List ID</small>
                                                    <div className="form-group mb-3">
                                                        <input type="text" className="form-control" name="" id="" required="" />
                                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                                    </div>
                                                </div>

                                                <div className="clearfix mb-2"></div>

                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Eligibility Change Logging</h5>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <small>Eligibility Change Log Indicator</small>
                                                    <select className="form-select">
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-1 float-end">
                                        <a href="" className="btn btn-theme pt-2 pb-2" style="width: 100%">Next</a>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="Indicators" role="tabpanel" aria-labelledby="nav-contact-tab">
                                    <div className="card mt-3 mb-3">
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Indicators:</h5>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <small>Accumelated Benifits Ind:</small>
                                                    <select className="form-select">
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <small>Secondory Coverage Ind</small>
                                                    <select className="form-select">
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                    <p className="input-hint">Family Accumulation By Member ID</p>
                                                </div>

                                                <div className="clearfix mb-2"></div>

                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Interim Member Maximums</h5>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <small>Maximum Number Of Transactions Allowed For An Interim..</small>
                                                    <select className="form-select">
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <small>Maximum Number Of Days That An Interim Member Will Be..</small>
                                                    <select className="form-select">
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>

                                                <div className="clearfix mb-2"></div>

                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Data Entry</h5>
                                                </div>
                                                <div className="col-md-7 mb-1">
                                                    <div className="form-group">
                                                        <input type="checkbox" id="html" className="d-none" />
                                                        <label for="html">Bypass Member Eligibility DAte Edits Against Customer Effective Dates</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 mb-1">
                                                    <div className="form-group">
                                                        <input type="checkbox" id="html" className="d-none" />
                                                        <label for="html">Require Person code on member data entry</label>
                                                    </div>
                                                </div>

                                                <div className="clearfix mb-3"></div>

                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Copy Schedule Override</h5>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Option</small>
                                                        <select className="form-select">
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>Shedule</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-1 float-end">
                                        <a href="" className="btn btn-theme pt-2 pb-2" style="width: 100%">Next</a>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="Charges" role="tabpanel" aria-labelledby="nav-contact-tab">
                                    <div className="card mt-3 mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Other Charges</h5>
                                                </div>

                                                <div className="col-md-4 mb-2">
                                                    <div className="form-group mb-2">
                                                        <small>Admin Fee</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <div className="form-group mb-2">
                                                        <small>Admin %</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <div className="form-group mb-2">
                                                        <small>DMR Free</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <div className="form-group mb-2">
                                                        <small>UCF Claim Fee</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <div className="form-group mb-2">
                                                        <small>Elig Update Fee</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-2">
                                                    <div className="form-group mb-2">
                                                        <small>Prior Auth Fee</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>

                                                <div className="clearfix mb-3"></div>

                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Exception List Processing</h5>
                                                </div>
                                                <div className="col-md-6 mb-1">
                                                    <div className="form-group">
                                                        <input type="checkbox" id="Plan" className="d-none" />
                                                        <label for="Plan">Bypass Plan NDC/GPI Exception List Processing</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-1">
                                                    <div className="form-group">
                                                        <input type="checkbox" id="System" className="d-none" />
                                                        <label for="System">Bypass System NDC/GPI Exception List Processing</label>
                                                    </div>
                                                </div>

                                                <div className="clearfix mb-3"></div>

                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Miscellaneous</h5>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <small>Number of Days from Date Written to First Fill</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <small>Number of Days from Date Filled to Date Submitted</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <small>Number of Days from Date Filled to Submitted (Manual)</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <small>Number of Days from DateFilled to Future Fill Date</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group mb-2">
                                                        <small>Number of Days for Reversal</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div className="clearfix mb-2"></div>
                                                <div className="col-md-4 mb-1">
                                                    <div className="form-group">
                                                        <input type="checkbox" id="Tax" className="d-none">
                                                            <label for="Tax">Tax Exempty Entity</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-1">
                                                    <div className="form-group">
                                                        <input type="checkbox" id="u&amp;c" className="d-none" />
                                                        <label for="u&amp;c">Mandatory U and C</label>
                                                    </div>
                                                </div>
                                                <div className="clearfix mb-3"></div>

                                                <div className="col-md-12 mb-1">
                                                    <h5 className="mb-2">Major Medical</h5>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <small>SMBPP</small>
                                                        <input type="text" className="form-control" name="" id="" placeholder="" required="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <small>RVA List ID</small>
                                                    <div className="form-group mb-3">
                                                        <input type="text" className="form-control" name="" id="" required="" />
                                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-1 float-end">
                                        <a href="" className="btn btn-theme pt-2 pb-2" style="width: 100%">Save</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <div className="">
                                <small>?? 2022 All Rights Reserved by Makemyfly.com</small>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </>
    );

}