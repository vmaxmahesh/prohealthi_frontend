import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';


function SearchProvider() {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();

    const [provider, setProvider] = useState([]);
    const [ProviderData, setProviderdata] = useState([]);






    const fillProviderData = (e) => {
        // API  
        // var staticProviderType =; 
        var arr = [
            { id: '123', name: 'Mahesh', storenumber: '101', chain: 'Hyderabad' },
            { id: '1234', name: 'Mahesh', storenumber: '101', chain: 'Hyderabad' },

        ];

        setProviderdata(arr);
    }


    useEffect(() => {
    }, [ProviderData]);



    const clearForm = () => {
        document.getElementById("search-form").reset();
    }



    return (
        <>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Provider Data</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Provider</a></li>
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
            <SearchProviderId />
            <ProviderList />
            <div className="card mt-3 mb-3">
                <div className="card-body">


                    {ProviderData.length > 0 ?
                        <Results typedata={ProviderData} />
                        : ''}
                       
                    <div className="row">
                    </div>

                    
                    <div className="nav nav-tabs col-md-12" id="nav-tab" role="tablist">
                        <Link to="provider" className={'nav-link' + (currentpath == 'provider' ? ' active' : '')}>Provider</Link>
                        <Link to="effectivedates" className={'nav-link' + (currentpath == 'effectivedates' ? ' active' : '')}>Effective Dates</Link>
                        <Link to="pharmistsystem" className={'nav-link' + (currentpath == 'pharmistsystem' ? ' active' : '')}>Pharmacist/System</Link>
                        <Link to="networkparticipation" className={'nav-link' + (currentpath == 'networkparticipation' ? ' active' : '')}>Network Participation</Link>

                    </div>

                    <div className="tab-content" id="nav-tabContent">
                        <Outlet context={[provider, setProvider]} />

                    </div>
                    </div>
                    
                </div>
                
            <Footer />
        </>
    );
}

function SearchProviderId()
{
    return(
        <>
          <div className="card mt-3 mb-3">
                    <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <small>Provider </small>
                                    <input type="text" className="form-control" placeholder='Start typing provider id/ name/ store no. to search'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

function ProviderList()
{
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                        <div className="col-md-12">
                            <h5 className="mb-2">Provider List </h5>
                        </div>
                    <div className="row">
                    <div className="col-md-12">                        
                        <table className= "table  table-bordered">
                            <thead>
                                <tr>
                                    <th>Provider ID</th>
                                    <th>Name</th>
                                    <th>Store ID</th>
                                    <th>Chain</th>
                                </tr>
                            </thead>
                            <tbody>
                               
                            </tbody>
                        </table>                        
                    </div>   
            </div>
           </div>
         </div> 
        </>
    )
}

function ProviderTypeRow(props) {

    const currentpath = location.pathname.split('/').pop();
    return (
        <>
            <tr>
                <td>{props.datar.id}</td>
                <td>{props.datar.name}</td>
                <td>{props.datar.storenumber}</td>
                <td>{props.datar.chain}</td>
                <td><Link to="allproviders" className="btn btn-sm btn-info"><i className="fa fa-eye"></i> View</Link></td>
            </tr>
        </>
    )
}


function Results(props) {


    var ProviderData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        ProviderData.push(<ProviderTypeRow datar={props.typedata[index]}
        />);
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let modalData = {
        show: 'true',
        hide: 'false'
    }


    return (
        <>

            <div className="row">
                <div className="col-md-12 mb-3">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Provider ID</th>
                                <th>Provider Name</th>
                                <th>Store Number</th>
                                <th>Chain</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ProviderData}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )




}




export function Provider(props) {



    const [formData, setFormData] = useState({
        id: '123',
        name: 'mahesh',
        firstName: 'merugu',
        lastName: 'Mahesh',
        phone: '8712186367',
        fax: '7878787',
        contact: '78878787',
        edi_address: 'movva krishna dt',
        aba_routing: 'kosuru road',
        record_usage: '2',
        based_id: '676',
        ncpdp_provider_class: '1',
        provider_type_id: '2',
        store_address_1: 'hfhfghf',
        store_address_2: 'hrftyrhtrtr',
        city: 'hyderabad',
        state: '1',
        country: '1',
        zip_code: '52135',
        ext: 'qwrqwerre',
        region: 'east',
        district: 'krishna',
        market: 'kaleswararao',
        mailing_address_1: 'gfddgdfghfdgf',
        mailing_address_2: 'fdgsdfgdsfg',
        mailing_city: 'hyderabad',
        mailing_chain: 'gfyghfgf',
        mailing_state: '1',
        mailing_country: '2',
        mailing_zip_code: '6786767',
        mailing_ext: 'ghjghjgjhgjg',
        mailing_store_no: '78989898',
        mail_order: 'true',
        mail_head_office_indicator: true,
    });
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <form method="" action="">
                        <div className="row mb-4">
                            <div className="col-md-12 mb-2">
                                <h5>Provider</h5>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>ID</small>
                                    <input type="text" className="form-control" placeholder="ID" value={formData.id} name="id" id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Name</small>
                                    <input type="text" className="form-control" placeholder="Name" name="name" value={formData.name} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>First Name</small>
                                    <input type="text" className="form-control" placeholder="First ID" name="firstName" value={formData.firstName} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Last Name</small>
                                    <input type="text" className="form-control" placeholder="Last Name" name="lastName" value={formData.lastName} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Phone</small>
                                    <input type="text" className="form-control" placeholder="Phone" name="phone" id="" value={formData.phone} required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Fax</small>
                                    <input type="text" className="form-control" placeholder="Fax" name="fax" value={formData.fax} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Contact</small>
                                    <input type="text" className="form-control" placeholder="Contact" name="contact" value={formData.contact} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>EDI Address</small>
                                    <input type="text" className="form-control" placeholder="Address" name="edi_address" value={formData.edi_address} id="" required="" />
                                </div>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>ABA Routing #</small>
                                    <input type="text" className="form-control" placeholder="Routing Name" name="aba_routing" value={formData.aba_routing} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Record Usage</small>
                                    <select className="form-select" name="record_usage" value={formData.record_usage}  >
                                        <option value="">Select Usage</option>
                                        <option value="1">option1</option>
                                        <option value="2">option 2</option>
                                        <option value="3">option 3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Based ID</small>
                                    <input type="text" className="form-control" placeholder="" name="based_id" value={formData.based_id} id="" required="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="clearfix mb-2"></div>
                            <div className="col-md-12 mb-2">
                                <h6>Informational Only: Fields not Used in Processing</h6>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>NCPDP Provider Class</small>
                                    <select className="form-select" name="ncpdp_provider_class" value={formData.ncpdp_provider_class}>
                                        <option value="">Select Usage</option>
                                        <option value="1">option 1 </option>
                                        <option value="2">option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Provider Type</small>
                                    <input type="text" className="form-control" placeholder="" name="provider_type_id" value={formData.provider_type_id} id="" required="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>

                            <div className="clearfix mb-3"></div>

                            <div className="col-md-12 mb-2">
                                <h5>Store Address</h5>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Address</small>
                                    <input type="text" className="form-control" placeholder="Address" name="store_address_1" value={formData.store_address_1} id="" required="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Address Line 2 </small>
                                    <input type="text" className="form-control" placeholder="Address 2" value={formData.store_address_2} name="store_address_2" id="" required="" />
                                </div>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>City</small>
                                    <input type="text" className="form-control" placeholder="City" name="city" value={formData.city} id="" required="" />
                                </div>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>State/Country</small>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <select className="form-select" name="state" value={formData.state}>
                                                <option value="">--select--</option>
                                                <option value="1">andhra</option>
                                                <option value="2">telangana</option>
                                                <option value="3"></option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <select className="form-select" name="country" value={formData.country}>
                                                <option value="">--select--</option>
                                                <option value="1">india</option>
                                                <option value="">us</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>ZIP Code</small>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <input type="text" className="form-control" placeholder="ZIP" name="zip_code" value={formData.zip_code} id="" required="" />
                                        </div>

                                        <div className="col-md-4">
                                            <input type="text" className="form-control" placeholder="Ext" name="ext" value={formData.ext} id="" required="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Region</small>
                                    <input type="text" className="form-control" placeholder="Address" name="region" value={formData.region} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>District</small>
                                    <input type="text" className="form-control" placeholder="Address" name="district" value={formData.district} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Market</small>
                                    <input type="text" className="form-control" placeholder="Address" name="market" value={formData.market} id="" required="" />
                                </div>
                            </div>

                            <div className="clearfix mb-2"></div>

                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-12 mb-2">
                                        <h5>Mailing Address</h5>
                                    </div>

                                    <div className="col-md-4 mb-2">
                                        <div className="form-group">
                                            <small>Address</small>
                                            <input type="text" className="form-control" placeholder="Address" name="mailing_address_1" value={formData.mailing_address_1} id="" required="" />
                                            <a href=""><span className="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <div className="form-group">
                                            <small>Address Line 2 </small>
                                            <input type="text" className="form-control" placeholder="Address 2" name="mailing_address_2" value={formData.mailing_address_2} id="" required="" />
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-2">
                                        <div className="form-group">
                                            <small>City</small>
                                            <input type="text" className="form-control" placeholder="City" name="mailing_city" value={formData.mailing_city} id="" required="" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-2">
                                        <div className="form-group">
                                            <small>State/Country</small>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <select className="form-select" name="mailing_state" value={formData.mailing_state}>
                                                        <option value="">--select--</option>
                                                        <option value="1">andhra</option>
                                                        <option value="2">telangana</option>
                                                        <option value="3"></option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <select className="form-select" name="mailing_country" value={formData.mailing_country}>
                                                        <option value="">--select--</option>
                                                        <option value="1">india</option>
                                                        <option value="2">us</option>
                                                        <option value=""></option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="form-group">
                                            <small>ZIP Code</small>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <input type="text" className="form-control" placeholder="ZIP" name="mailing_zip_code" value={formData.mailing_zip_code} id="" required="" />
                                                </div>
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control" placeholder="Ext" name="mailing_ext" value={formData.mailing_ext} id="" required="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="mb-2">Store Information</h5>
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <div className="form-group">
                                            <small>Chain</small>
                                            <input type="text" className="form-control" placeholder="Address" name="mailing_chain" value={formData.mailing_chain} id="" required="" />
                                            <a href=""><span className="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <div className="form-group">
                                            <small>Store No.</small>
                                            <input type="text" className="form-control" placeholder="Address" name="mailing_store_no" value={formData.mailing_store_no} id="" required="" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-2 pe-0">
                                        <div className="form-group mt-2">
                                            <input type="checkbox" id="male" name="mail_order" defaultChecked={formData.mail_order} className="d-none" />
                                            <label for="male">Mail Order</label> &nbsp; &nbsp;

                                        </div>
                                        <div className="form-group mb-2">
                                            <input type="checkbox" name="mail_head_office_indicator" defaultChecked={formData.mail_head_office_indicator} id="female" className="d-none" />
                                            <label for="female">Head Office Indicator</label>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </form>

                </div>
            </div>


        </>
    )

}


export function Effectivedates(props) {


    const [formData, setFormData] = useState({
        effective_date_1: "2022-01-10",
        effective_date_2: '2022-01-10',
        effective_date_3: '2022-01-10',


        termination_date_1: '2022-01-10',
        termination_date_2: '2022-01-10',
        termination_date_3: '2022-01-10',


        tax_information_effective_date_1: '2022-01-10',
        tax_information_effective_date_2: '2022-01-10',
        tax_information_effective_date_3: '2022-01-10',


        tax_termination_date_1: '2022-01-10',
        tax_information_termination_date_2: '2022-01-10',
        tax_termination_date_3: '2022-01-10',
        schedule_id_1: '42334',
        schedule_id_2: '234235',
        provider_status: '1',
        payment_cycle: '2',
        individual_store: true,
        head_office: true,
        paid: '3453453',
        rejected: '45345',
        cash_pricing: '345345345',












    });

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Effective Dates</h5>
                                </div>

                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <small>Effective</small>
                                        <input type="date" name="effective_date_1" value={formData.effective_date_1} class="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <small>Termination</small>
                                        <input type="date" name="termination_date_1" value={formData.termination_date_1} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <small>Provider Status</small>
                                        <select className="form-select" name="provider_status" value={formData.provider_status}>
                                            <option value="">Select Status</option>
                                            <option value="1">option 1</option>
                                            <option value="2">option 2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <input type="date" class="form-control" name='effective_date_2' value={formData.effective_date_2} />

                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <input type="date" name="termination_date_2" value={formData.termination_date_2} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <p><i>Determined by Effective Date</i></p>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <input type="date" name="effective_date_3" value={formData.effective_date_3} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <input type="date" name="termination_date_3" value={formData.termination_date_3} class="form-control" />

                                    </div>
                                </div>

                                <div className="clearfix mb-3"></div>

                                <div className="col-md-12 mb-2">
                                    <h5>Tax Infromation</h5>
                                </div>

                                <div className="col-md-4">
                                    <div className="from-group">
                                        <small>Effective</small>
                                        <input type="date" name="tax_information_effective_date_1" value={formData.tax_information_effective_date_1} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="from-group">
                                        <small>Termination</small>
                                        <input type="date" name="tax_termination_date_1" value={formData.tax_termination_date_1} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <small>Schedule ID</small>
                                        <input type="text" className="form-control" name="schedule_id_1" value={formData.schedule_id_1} placeholder="" id="" required="" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="from-group">
                                        <input type="date" name="tax_information_effective_date_2" value={formData.tax_information_effective_date_2} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="from-group">
                                        <input type="date" name="tax_information_termination_date_2" value={formData.tax_information_termination_date_2} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" name="schedule_id_2" value={formData.schedule_id_2} placeholder="" id="" required="" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>Payment Cycle</small>
                                        <select className="form-select" name="payment_cycle" value={formData.payment_cycle}>
                                            <option value="">Select Effective</option>
                                            <option value="1"> 1</option>
                                            <option value="2"> 2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="clearfix mb-2"></div>

                                <div className="col-md-12 mb-2">
                                    <h5>Payment Locations</h5>
                                </div>
                                <div className="col-md-12 mb-3">



                                    <div className="col-md-12 mb-2">
                                        <div className="form-group mt-2">
                                            <input type="checkbox" id="male" name="individual_store" defaultChecked={formData.individual_store} className="d-none" />
                                            <label for="male">Individual Store</label> &nbsp; &nbsp;

                                        </div>
                                        <div className="form-group mb-2">
                                            <input type="checkbox" name="head_office" defaultChecked={formData.head_office} id="female" className="d-none" />
                                            <label for="female">Head Office</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <h5>Comm Charges</h5>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <small>Paid</small>
                                        <input type="text" className="form-control" name="paid" placeholder="" value={formData.paid} id="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <div className="form-group mb-3">
                                        <small>Rejected</small>
                                        <input type="text" className="form-control" name="rejected" value={formData.rejected} placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <h5>Cash Pricing</h5>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <small>Senior Citizen Discount Age Threshold</small>
                                        <input type="text" className="form-control" name="cash_pricing" value={formData.cash_pricing} placeholder="" id="" required="" />
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


export function PharmistSystem(props) {

    const mystyle = {
        color: "black",
        padding: "10px",
        border: "1px"
    };



    const [formData, setFormData] = useState({
        name: 'mahesh',
        title: 'test title',
        note: 'dfasdfasdfasdfsdafsdf',
        transmit_all: true,
        claims_3rd_party: 'sdfasdfasdfsdf',
        claims_3rd_party_select: '1',
        claims_cash: '989898',
        switch_provider: '1',
        store_hours: '5',
        switch_trans_rate: '53453',
        open24_hours: true,
        injectable_prov: true,
        system_version: '15.33',
        operating_system: '2',
        modem_type: 'test',
        modem_speed: '1',
        terminals: 'hgfghf'


    });



    return (
        <>

            <div class="card mt-3 mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-12 mb-2">
                                    <h5>Pharmacist</h5>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <div class="form-group mb-3">
                                        <small>Name</small>
                                        <input type="text" class="form-control" name="name" value={formData.name} placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <div class="form-group mb-3">
                                        <small>Title</small>
                                        <input type="text" class="form-control" name="title" value={formData.title} placeholder="" id="" required="" />
                                    </div>
                                </div>

                                <div class="clearfix mb-2"></div>

                                <div class="col-md-12 mb-2">
                                    <h5>Providers</h5>
                                </div>
                                <div class="col-md-12 mb-3">
                                    <div class="form-group mt-2">
                                        <input type="checkbox" id="Transmit" name="transmit_all" defaultChecked={formData.transmit_all} class="d-none" />
                                        <label for="Transmit">Transmit All Claims</label>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>% Claims 3rd Party</small>
                                        <input type="text" class="form-control" name="claims_3rd_party" value={formData.claims_3rd_party} placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>&nbsp;</small>
                                        <select class="form-select" name="claims_3rd_party_select" value={formData.claims_3rd_party_select}>
                                            <option value="">Select</option>
                                            <option value="1">option 1</option>
                                            <option value="2">option 2</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>% Claims Cash</small>
                                        <input type="text" class="form-control" name="claims_cash" value={formData.claims_cash} placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Switch Provider</small>
                                        <select class="form-select" name='switch_provider' value={formData.switch_provider}>
                                            <option value="">Select Provider</option>
                                            <option value="1">option 1</option>
                                            <option value="2">option 2</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Store Hours</small>
                                        <input type="text" class="form-control" name="store_hours" value={formData.store_hours} placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Switch Trans Rate</small>
                                        <input type="text" class="form-control" name="switch_trans_rate" value={formData.switch_trans_rate} placeholder="" id="" required="" />
                                    </div>
                                </div>



                                <div className="col-md-12 mb-2">

                                    <div className="form-group mt-2">
                                        <input type="checkbox" id="Open" class="d-none" name="open24_hours" defaultChecked={formData.open24_hours} />
                                        <label for="Open">Open 24 Hours</label>

                                    </div>
                                    <div className="form-group mb-2">
                                        <input type="checkbox" id="Injectable" name="injectable_prov" defaultChecked={formData.injectable_prov} class="d-none" />
                                        <label for="Injectable">Injectable Prov</label>
                                    </div>
                                </div>


                                <div class="clearfix mb-2"></div>

                                <div class="col-md-12 mb-2">
                                    <h5>Provider System</h5>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>System Version</small>
                                        <input type="text" class="form-control" name="system_version" value={formData.system_version} placeholder="" id="" required="" />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Operating System</small>
                                        <select class="form-select" name="operating_system" value={formData.operating_system}>
                                            <option value="">Select System</option>
                                            <option value="1">windows</option>
                                            <option value="2">Linux</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Modem Type</small>
                                        <input type="text" class="form-control" name="modem_type" value={formData.modem_type} placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Modem Speed</small>
                                        <select class="form-select" name="modem_speed" value={formData.modem_speed}>
                                            <option value="">Select Speed</option>
                                            <option value="1">10</option>
                                            <option value="2">20</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Terminals</small>
                                        <input type="text" class="form-control" name="terminals" value={formData.terminals} placeholder="" id="" required="" />
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="mb-2">
                                <h5>Notes</h5>
                            </div>
                            <div class="form-group">
                                <textarea name="note" value={formData.note} class="form-control" rows="25" style={mystyle} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}


export function NetworkParticipation(props) {




    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm({
        mode: "onBlur",
    });

    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [customer, setCustomer] = useOutletContext();


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const traditionalhandleShow = () => setShow(true);
    const [networkData, setNetworkData] = useState([]);

    const [flexibleData, setFlexibleData] = useState([]);



    const fillProviderData = (e) => {
        // API  
        // var staticProviderType =; 
        var arr = [
            { traditional_id: '123', name: 'Mahesh', priceschedule: '101', denied: 'Hyderabad', effective_date: '2022-08-2022', termination_date: '02-20-2022' },

        ];

        // setNetworkData(arr);
    }

    useEffect(() => {
    }, [flexibleData]);

    const onSubmit = data => {

        setNetworkData([data]);
        console.log(data);


    }

    const onSubmit2 = data => {

        console.log(data);
        setFlexibleData([data]);




    }







    return (
        <>


            <form key={1} onSubmit={handleSubmit(onSubmit)}>


                <div class="card mt-3 mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 mb-2">
                                <h5>Treditional Networks</h5>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group mb-2">
                                    <small>Treditional ID</small>
                                    <input type="text" class="form-control" name="traditional_id" {...register('traditional_id', {
                                        required: true,
                                    })} id="" required="" />
                                    <a href=""><span class="fa fa-search form-icon"></span></a>

                                    {errors.traditional_id?.type === 'required' && <p role="alert" className="notvalid">Treditional ID is required </p>}

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group mb-2">
                                    <small>Network Name</small>
                                    <input type="text" class="form-control" name="network_name" {...register('network_name', {
                                        required: true,
                                    })} id="" />
                                    {errors.network_name?.type === 'required' && <p role="alert" className="notvalid">Network Name is required </p>}

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group mb-2">
                                    <small>Price Schedule</small>
                                    <input type="text" class="form-control" name="price_schedule" {...register('price_schedule', {
                                        required: true,
                                    })} id="" required="" />
                                    <a href=""><span class="fa fa-search form-icon"></span></a>
                                    {errors.price_schedule?.type === 'required' && <p role="alert" className="notvalid">Price Schedule is required </p>}

                                </div>

                            </div>
                            <div class="col-md-4">
                                <div class="form-group mt-4">
                                    <input type="checkbox" name="denied" id="Denied" {...register('denied', {
                                        required: true,
                                    })} class="d-none" />
                                    <label for="Denied">Participation Denied</label>
                                    {errors.denied?.type === 'required' && <p role="alert" className="notvalid">Participation Denied is required </p>}

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group mb-2">
                                    <small>Effective Date</small>
                                    <input type="date" class="form-control" name="effective_date" {...register('effective_date', {
                                        required: true,
                                    })} id="" />
                                    {errors.effective_date?.type === 'required' && <p role="alert" className="notvalid">Effective Date is required </p>}

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group mb-2">
                                    <small>Termination Date</small>
                                    <input type="date" class="form-control" name="termination_date"  {...register('termination_date', {
                                        required: true,
                                    })} id="" required="" />
                                    {errors.termination_date?.type === 'required' && <p role="alert" className="notvalid">Termination Date is required </p>}

                                </div>
                            </div>

                            <div class="col-md-12 mt-3 mb-3 text-end">
                                {/* <button class="btn btn-sm btn-warning">Remove Item</button> &nbsp;&nbsp; */}
                                <button type="submit" class="btn btn-sm btn-info">Add Item</button>
                            </div>

                            {/* <div class="col-md-12">
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price Schedule</th>
                                        <th>Denied</th>
                                        <th>Effective Date</th>
                                        <th>Termination Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>GOJ_Pre</td>
                                        <td>GOJ</td>
                                        <td>--</td>
                                        <td>No</td>
                                        <td>2010-01-01</td>
                                        <td>9999-12-31</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> */}


                            {/* {networkData.length > 0 ? */}
                            <TraditionalResults typedata={networkData} />
                            {/* // : ''} */}


                        </div>
                    </div>
                </div>





            </form>

            <form key={2} onSubmit={handleSubmit2(onSubmit2)}>
                <div class="card-body">
                    <div class="row">


                        <div class="clearfix mb-3"></div>


                        <div class="col-md-12 mb-2">
                            <h5>Flexible Networks</h5>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-2">
                                <small>Flexible Network ID</small>
                                <input type="text" class="form-control"   {...register2('flexible_network_id', {
                                    required: true,
                                })} name="flexible_network_id" id="" />
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                {errors2.flexible_network_id?.type === 'required' && <p role="alert" className="notvalid">Flexible Network ID is required </p>}

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-2">
                                <small>Network Name</small>
                                <input type="text" class="form-control" {...register2('flexible_network_name', {
                                    required: true,

                                })} name="flexible_network_name" id="" required="" />
                                {errors2.flexible_network_name?.type === 'required' && <p role="alert" className="notvalid">Network Name is required </p>}

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-2">
                                <small>Price Schedule</small>
                                <input type="text" class="form-control" {...register2('flexible_price_schedule', {
                                    required: true,

                                })} name="flexible_price_schedule" id="" required="" />
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                {errors2.flexible_price_schedule?.type === 'required' && <p role="alert" className="notvalid">Price Schedule is required </p>}

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-2">
                                <small>Inclusion By</small>
                                <input type="date" class="form-control" {...register2('inclusion_by', {
                                    required: true,

                                })} name="inclusion_by" id="" required="" />
                                                                {errors2.inclusion_by?.type === 'required' && <p role="alert" className="notvalid">Inclusion By is required </p>}

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-2">
                                <small>Exclusion By</small>
                                <input type="date" class="form-control" {...register2('exclusion_by', {
                                    required: true,

                                })} name="exclusion_by" id="" required="" />
                                                                {errors2.exclusion_by?.type === 'required' && <p role="alert" className="notvalid">Exclusion By is required </p>}

                            </div>
                        </div>

                        <div class="col-md-12 mt-3 mb-3 text-end">
                            <button type="submit" class="btn btn-sm btn-info">add Item</button>
                        </div>



                        {/* {networkData.length > 0 ? */}
                        <FlexibleResults typedata={flexibleData} />
                        {/* // : ''} */}



                    </div>
                </div>
            </form>


        </>
    )
}




function TraditionalResults(props) {




    var networkData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        networkData.push(<TraditionalTypeRow datar={props.typedata[index]}
        />);
    }




    return (
        <>

            <form>

            </form>
            <div className="card mt-3 mb-3 data" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-
bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price Schedule</th>
                                        <th>Denied</th>
                                        <th>Effective Date</th>
                                        <th>Termination Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {networkData}

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-3 ms-auto text-end">
                            {/* <button className="btn  btn-info" data-bs-
toggle="modal" data-bs-target="#exampleModal"> 
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button> */}
                            {/* <button className="btn  btn-info" onClick={e =>
                                handleShow()}>
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* <Add show={show} handleClose={handleClose()}/> */}
            {/* <Add props={modalData} /> */}
        </>
    )
}


function FlexibleResults(props) {



    var networkData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        networkData.push(<FlexibleTypeRow datar={props.typedata[index]}
        />);
    }




    return (
        <>

            <form>

            </form>
            <div className="card mt-3 mb-3 data" >
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-
bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price Schedule</th>
                                        {/* <th>Denied</th> */}
                                        <th>Inclusion By</th>
                                        <th>Exclusion By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {networkData}

                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-3 ms-auto text-end">
                            {/* <button className="btn  btn-info" data-bs-
toggle="modal" data-bs-target="#exampleModal"> 
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button> */}
                            {/* <button className="btn  btn-info" onClick={e =>
                                handleShow()}>
                                Add Provider Types <i className="fa fa-plus-
circle"></i></button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* <Add show={show} handleClose={handleClose()}/> */}
            {/* <Add props={modalData} /> */}
        </>
    )
}

function TraditionalTypeRow(props) {


    const currentpath = location.pathname.split('/').pop();
    const ischecked = true;


    const deleteRow = (e) => {

        alert(e.currentTarget.value);

    }

    return (
        <>
            <tr>
                <td>{props.datar.traditional_id}</td>
                <td>{props.datar.network_name}</td>
                <td>{props.datar.price_schedule}</td>
                {props.datar.denied == ischecked ? (
                    <td>Yes</td>
                ) : (

                    <td>No</td>

                )}
                <td>{props.datar.effective_date}</td>
                <td>{props.datar.termination_date}</td>
                <td><button onClick={deleteRow} value={props.datar.traditional_id} className='btn btn-sm btn-warning'><i className='fa fa-trash-alt'></i></button></td>



            </tr>
        </>
    )
}

function FlexibleTypeRow(props) {


    const currentpath = location.pathname.split('/').pop();
    const ischecked = true;


    const flexdeleteRow = (e) => {

        alert(e.currentTarget.value);

    }

    return (
        <>
            <tr>
                <td>{props.datar.flexible_network_id}</td>
                <td>{props.datar.flexible_network_name}</td>
                <td>{props.datar.flexible_price_schedule}</td>

                <td>{props.datar.inclusion_by}</td>
                <td>{props.datar.exclusion_by}</td>
                <td><button onClick={flexdeleteRow} value={props.datar.flexible_network_id} className='btn btn-sm btn-warning'><i className='fa fa-trash-alt'></i></button></td>



            </tr>
        </>
    )
}


export default SearchProvider;