import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
// import Footer from '../../../shared/Footer';


function SearchProvider() {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();

    const [provider, setProvider] = useState([]);
    const [ProviderData, setProviderdata] = useState([]);



    const [ndcData, setNdcData] = useState([]);
    const [ndcClass, setNdClass] = useState([]);


    const [selctedNdc, setSelctedNdc] = useState('');




    const searchException = (fdata) => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/provider/provider/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                // console.log(data.data);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setNdcData([]);
                    return Promise.reject(error);

                } else {
                    setNdcData(data.data);
                    return;
                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const getNDCItems = (ndcid) => {
        // ndc_exception_list
        // var test = {};
        // test.ndc_exception_list = ndcid;
        // setSelctedNdc(test);

        // //  console.log(customerid);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/provider/provider/get/details/${ndcid}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setProvider([]);
                    return Promise.reject(error);
                } else {
                    // console.log(data.data);
                    setProvider(data.data);

                }


                if (response === '200') {
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
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
            <SearchProviderId searchException={searchException} />

            {/* < /> */}
            <ProviderList ndcListData={ndcData} ndcClassData={ndcClass} getNDCItem={getNDCItems} selctedNdc={selctedNdc} />

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

function SearchProviderId(props) {


    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const searchException = (fdata) => {

        props.searchException(fdata);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Provider </small>
                                <input type="text" className="form-control" onKeyUp={(e) => searchException(e)} placeholder='Start typing provider id/ name/ store no. to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function NdcRow(props) {

    useEffect(() => {

    }, [props.selected]);



    return (
        <>
            <tr className={(props.selected && props.ndcRow.pharmacy_nabp == props.selected.pharmacy_nabp ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.ndcRow.pharmacy_nabp)}
            >
                <td >{props.ndcRow.pharmacy_nabp}</td>
                <td>{props.ndcRow.pharmacy_name}</td>
                <td>{props.ndcRow.store_number}</td>
                <td>{props.ndcRow.pharmacy_chain}</td>




                {/* <td><button className="btn btn-sm btn-info" id="" ><i className="fa fa-eye"></i> View</button></td> */}
            </tr>
        </>
    )
}

function ProviderList(props) {

    const [selctedNdc, setSelctedNdc] = useState('');


    const scollToRef = useRef();

    useEffect(() => { }, [props.selctedNdc]);
    // //  console.log(props.selctedNdc);

    const getNDCItem = (ndciemid) => {
        alert(ndciemid);
        props.getNDCItem(ndciemid);



    }




    const ndcListArray = [];
    for (let i = 0; i < props.ndcListData.length; i++) {
        ndcListArray.push(<NdcRow ndcRow={props.ndcListData[i]} getNDCItem={getNDCItem} selected={props.selctedNdc} />);
    }


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Provider List </h5>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                        <th>Provider ID</th>
                                        <th>Name</th>
                                        <th>Store ID</th>
                                        <th>Chain</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ndcListArray}

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


    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();

    const [provider, setProvider] = useOutletContext();


    useEffect(() => { reset(provider) }, [provider]);

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
                                    <input type="text" className="form-control" placeholder="ID" name="pharmacy_nabp" {...register('pharmacy_nabp')} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Name</small>
                                    <input type="text" className="form-control" placeholder="Name" name="pharmacy_name"  {...register('pharmacy_name')} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>First Name</small>
                                    <input type="text" className="form-control" placeholder="First ID" name="provider_first_name"  {...register('provider_first_name')} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Last Name</small>
                                    <input type="text" className="form-control" placeholder="Last Name" name="provider_last_name"  {...register('provider_last_name')} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Phone</small>
                                    <input type="text" className="form-control" placeholder="Phone" name="phone" {...register('phone')} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Fax</small>
                                    <input type="text" className="form-control" placeholder="Fax" name="fax" {...register('fax')} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Contact</small>
                                    <input type="text" className="form-control" placeholder="Contact" name="contact" {...register('contact')} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>EDI Address</small>
                                    <input type="text" className="form-control" placeholder="Address" name="edi_address" {...register('edi_address')} id="" required="" />
                                </div>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>ABA Routing #</small>
                                    <input type="text" className="form-control" placeholder="Routing Name" name="aba_rtn" {...register('aba_rtn')} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Record Usage</small>
                                    <select className="form-select" name="record_usage"  {...register('record_usage')}  >
                                        <option value="">--Select Usage--</option>
                                        <option value="∞">Base NABP</option>
                                        <option value="1">Base NABP</option>

                                        <option value="2">Medicare ID</option>
                                        <option value="3">Medical Id Pharmacy</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Based ID</small>
                                    <input type="text" className="form-control" placeholder="" name="base_pharmacy_nabp"  {...register('base_pharmacy_nabp')} id="" required="" />
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
                                    <select className="form-select" name="pharmacy_class" {...register('pharmacy_class')}>
                                        <option value="">Select Usage</option>
                                        <option value="1">option 1 </option>
                                        <option value="2">option 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Provider Type</small>
                                    <input type="text" className="form-control" placeholder="" name="dispenser_type" {...register('dispenser_type')} id="" required="" />
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
                                    <input type="text" className="form-control" placeholder="Address" name="address_1" {...register('address_1')} id="" required="" />
                                    <a href=""><span className="fa fa-search form-icon"></span></a>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Address Line 2 </small>
                                    <input type="text" className="form-control" placeholder="Address 2" name="address_2"  {...register('address_2')} id="" required="" />
                                </div>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>City</small>
                                    <input type="text" className="form-control" placeholder="City" name="city" {...register('city')} id="" required="" />
                                </div>
                            </div>

                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>State/Country</small>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <select className="form-select" name="state" {...register('state')} >
                                                <option value="">--select--</option>
                                                <option value="1">andhra</option>
                                                <option value="2">telangana</option>
                                                <option value="3"></option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <select className="form-select" name="country" {...register('country')} >
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
                                            <input type="text" className="form-control" placeholder="ZIP" name="zip_code"  {...register('zip_code')} id="" required="" />
                                        </div>

                                        <div className="col-md-4">
                                            <input type="text" className="form-control" placeholder="Ext" name="ext" id="" required="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Region</small>
                                    <input type="text" className="form-control" placeholder="Address" name="region" {...register('region')} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>District</small>
                                    <input type="text" className="form-control" placeholder="Address" name="district" {...register('district')} id="" required="" />
                                </div>
                            </div>
                            <div className="col-md-3 mb-2">
                                <div className="form-group">
                                    <small>Market</small>
                                    <input type="text" className="form-control" placeholder="Address" name="market"  {...register('market')} id="" required="" />
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
                                            <input type="text" className="form-control" placeholder="Address" name="mailing_address_1" {...register('mailing_address_1')} id="" required="" />
                                            <a href=""><span className="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <div className="form-group">
                                            <small>Address Line 2 </small>
                                            <input type="text" className="form-control" placeholder="Address 2" name="mailing_address_2" {...register('mailing_address_2')} id="" required="" />
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-2">
                                        <div className="form-group">
                                            <small>City</small>
                                            <input type="text" className="form-control" placeholder="City" name="mailing_city"  {...register('mailing_city')} id="" required="" />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-2">
                                        <div className="form-group">
                                            <small>State/Country</small>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <select className="form-select" name="mailing_state" {...register('mailing_state')} >
                                                        <option value="">--select--</option>
                                                        <option value="1">andhra</option>
                                                        <option value="2">telangana</option>
                                                        <option value="3"></option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <select className="form-select" name="mailing_country" {...register('mailing_country')} >
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
                                                    <input type="text" className="form-control" placeholder="ZIP" name="mailing_zip_code" {...register('mailing_zip_code')} id="" required="" />
                                                </div>
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control" placeholder="Ext" name="mailing_ext" id="" required="" />
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
                                            <input type="text" className="form-control" placeholder="Address" name="mailing_chain" id="" required="" />
                                            <a href=""><span className="fa fa-search form-icon"></span></a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-2">
                                        <div className="form-group">
                                            <small>Store No.</small>
                                            <input type="text" className="form-control" placeholder="Address" name="mailing_store_no" id="" required="" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-2 pe-0">
                                        <div className="form-group mt-2">
                                            <input type="checkbox" id="male" name="mail_order"  {...register('mail_order')} className="d-none" />
                                            <label for="male">Mail Order</label> &nbsp; &nbsp;

                                        </div>
                                        <div className="form-group mb-2">
                                            <input type="checkbox" name="head_office_ind"  {...register('head_office_ind')} id="female" className="d-none" />
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


    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();

    const [provider, setProvider] = useOutletContext();


    useEffect(() => { reset(provider) }, [provider]);


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
                                        <input type="date" name="effective_date_1" {...register('effective_date_1')} class="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <small>Termination</small>
                                        <input type="date" name="termination_date_1" {...register('termination_date_1')} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <small>Provider Status</small>
                                        <select className="form-select" name="provider_status" {...register('pharmacy_status')} >
                                            <option value="">Select Status</option>
                                            <option value="1">option 1</option>
                                            <option value="2">option 2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <input type="date" class="form-control" name='effective_date_2' {...register('effective_date_2')} />

                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <input type="date" name="termination_date_2"    {...register('termination_date_2')} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <p><i>Determined by Effective Date</i></p>
                                </div>
                                <div className="clearfix"></div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <input type="date" name="effective_date_3" {...register('effective_date_3')} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4 mb-2">
                                    <div className="from-group">
                                        <input type="date" name="termination_date_3"   {...register('termination_date_3')} class="form-control" />

                                    </div>
                                </div>

                                <div className="clearfix mb-3"></div>

                                <div className="col-md-12 mb-2">
                                    <h5>Tax Infromation</h5>
                                </div>

                                <div className="col-md-4">
                                    <div className="from-group">
                                        <small>Effective</small>
                                        <input type="date" name="tax_effective_date_1"  {...register('tax_effective_date_1')} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="from-group">
                                        <small>Termination</small>
                                        <input type="date" name="tax_termination_date_1" {...register('tax_termination_date_1')} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <small>Schedule ID</small>
                                        <input type="text" className="form-control" name="tax_schedule_id_1" {...register('tax_schedule_id_1')} placeholder="" id="" required="" />
                                        <a href=""><span className="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="from-group">
                                        <input type="date" name="tax_effective_date_2"    {...register('tax_effective_date_2')} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="from-group">
                                        <input type="date" name="tax_termination_date_2"  {...register('tax_termination_date_2')} class="form-control" />

                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" name="tax_schedule_id_2" {...register('tax_schedule_id_2')} placeholder="" id="" required="" />
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
                                        <select className="form-select" name="payment_cycle" >
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
                                            <input type="checkbox" id="male" name="individual_store" className="d-none" />
                                            <label for="male">Individual Store</label> &nbsp; &nbsp;

                                        </div>
                                        <div className="form-group mb-2">
                                            <input type="checkbox" name="head_office" id="female" className="d-none" />
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
                                        <input type="text" className="form-control" name="paid" placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <div className="form-group mb-3">
                                        <small>Rejected</small>
                                        <input type="text" className="form-control" name="rejected" placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <h5>Cash Pricing</h5>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group mb-3">
                                        <small>Senior Citizen Discount Age Threshold</small>
                                        <input type="text" className="form-control" name="cash_pricing" placeholder="" id="" required="" />
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



    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();

    const [provider, setProvider] = useOutletContext();


    useEffect(() => { reset(provider) }, [provider]);




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
                                        <input type="text" class="form-control" name="name" placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <div class="form-group mb-3">
                                        <small>Title</small>
                                        <input type="text" class="form-control" name="title" placeholder="" id="" required="" />
                                    </div>
                                </div>

                                <div class="clearfix mb-2"></div>

                                <div class="col-md-12 mb-2">
                                    <h5>Providers</h5>
                                </div>
                                <div class="col-md-12 mb-3">
                                    <div class="form-group mt-2">
                                        <input type="checkbox" id="Transmit" name="transmit_all" class="d-none" />
                                        <label for="Transmit">Transmit All Claims</label>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>% Claims 3rd Party</small>
                                        <input type="text" class="form-control" name="claims_3rd_party" placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>&nbsp;</small>
                                        <select class="form-select" name="claims_3rd_party_select" >
                                            <option value="">Select</option>
                                            <option value="1">option 1</option>
                                            <option value="2">option 2</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>% Claims Cash</small>
                                        <input type="text" class="form-control" name="claims_cash" placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Switch Provider</small>
                                        <select class="form-select" name='switch_provider' >
                                            <option value="">Select Provider</option>
                                            <option value="1">option 1</option>
                                            <option value="2">option 2</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Store Hours</small>
                                        <input type="text" class="form-control" name="store_hours" placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Switch Trans Rate</small>
                                        <input type="text" class="form-control" name="switch_trans_rate" placeholder="" id="" required="" />
                                    </div>
                                </div>



                                <div className="col-md-12 mb-2">

                                    <div className="form-group mt-2">
                                        <input type="checkbox" id="Open" class="d-none" name="open24_hours" />
                                        <label for="Open">Open 24 Hours</label>

                                    </div>
                                    <div className="form-group mb-2">
                                        <input type="checkbox" id="Injectable" name="injectable_prov" class="d-none" />
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
                                        <input type="text" class="form-control" name="system_version" placeholder="" id="" required="" />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Operating System</small>
                                        <select class="form-select" name="operating_system" >
                                            <option value="">Select System</option>
                                            <option value="1">windows</option>
                                            <option value="2">Linux</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Modem Type</small>
                                        <input type="text" class="form-control" name="modem_type" placeholder="" id="" required="" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Modem Speed</small>
                                        <select class="form-select" name="modem_speed" >
                                            <option value="">Select Speed</option>
                                            <option value="1">10</option>
                                            <option value="2">20</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group mb-2">
                                        <small>Terminals</small>
                                        <input type="text" class="form-control" name="terminals" placeholder="" id="" required="" />
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="mb-2">
                                <h5>Notes</h5>
                            </div>
                            <div class="form-group">
                                <textarea name="note" class="form-control" rows="25" style={mystyle} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}


export function NetworkParticipation(props) {


    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();

    const [provider, setProvider] = useOutletContext();

    const [selctedNdc, setSelctedNdc] = useState('');



    useEffect(() => { reset(provider) }, [provider]);




    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
    } = useForm({
        mode: "onBlur",
    });



    const [formData, setFormData] = useState(false);
    const handleClose = () => setShow(false);
    const traditionalhandleShow = () => setShow(true);
    const [networkData, setNetworkData] = useState([]);
    const [traditionalData, setTraditionalData] = useState([]);

    const [data, setData] = useState([])
    const [adding, setAdding] = useState(false);
    const [show, setShow] = useState(false);

    const [flexibleData, setFlexibleData] = useState([]);
    // useEffect(() => { reset(traditionalData) }, [traditionalData]);

    const [benifitsData, setBenifitData] = useState(false);




    const AddForm = () => {
        setBenifitData(false);
        setAdding(true);



    }

    function loadData() {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/provider/traditionalnetwork/all`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                // console.log(data.data);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setNetworkData([]);
                    return Promise.reject(error);

                } else {
                    setNetworkData(data.data);
                    return;
                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }



    const getNDCItem = (rowdata) => {
        // console.log(rowdata);
        // setFormData(rowdata);
        // setBenifitData(true);
        setSelctedNdc(rowdata);


    }






    useEffect(() => {
        loadData()
        reset(formData);

    }, [flexibleData, formData]);

    const onSubmit = data => {

        setNetworkData([data]);
        // console.log(data);


    }

    

    const addCode = (data) => {
        // console.log(data);
        const requestOptions = {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        };
        // console.log(watch(data)); 
        if (process.env.REACT_APP_API_BASEURL == 'NOT') {
            toast.success('Added Successfully...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        } else {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/provider/traditionalnetwork/add`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    // console.log(response);

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        reset(data.data);
                        var msg = props.adding ? 'Added Successfully...!' : 'Updated Successfully..'
                        toast.success(msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,

                        });
                    }


                    if (response === '200') {
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }

    }
    const onSubmit3 = (e) => {
        e.preventDefault();
    }





    useEffect(() => {


        if (props.adding) {
            reset({ accum_bene_strategy_name: '', description: '', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ accum_bene_strategy_name: '', accum_bene_strategy_id: '', description: '', pharm_type_variation_ind: '', network_part_variation_ind: '', claim_type_variation_ind: '', plan_accum_deduct_id: '', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);


    useEffect(() => { reset(props.selected) }, [props.selected]);


    useEffect(() => {
        if (benifitsData) {
            setAdding(false);

        } else {
            setAdding(true);
            setBenifitData(false);
        }

        document.title = 'Benefit Code | ProHealthi';

    }, [benifitsData, adding]);



    return (
        <>


            <div className="col-md-3 ms-auto text-end">
                <button className="btn  btn-info btn-sm" onClick={e => AddForm()}>
                    Add Traditional Network <i className="fa fa-plus-circle"></i></button>
            </div>


            <TraditionalNetworksForm show={show} adding={adding} handleClose={handleClose} selected={selctedNdc} />


            <TraditionalResults getNDCItem={getNDCItem} selected={selctedNdc} typedata={networkData} />


            {/* <FlixibleNetworksForm /> */}

            <FlexibleNetworks  />






        </>
    )
}


function FlexibleNetworks(props){

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const [formData, setFormData] = useState(false);


    const [provider, setProvider] = useOutletContext();

    const [selctedNdc, setSelctedNdc] = useState('');

    const [show, setShow] = useState(false);

    const [adding, setAdding] = useState(false);

    const [flexibleData, setFlexibleData] = useState(false);



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(() => { reset(provider) }, [provider]);

    const [benifitsData, setBenifitData] = useState(false);




    const AddForm = () => {
        setBenifitData(false);
        setAdding(true);



    }


    const addCode = (data) => {
        // console.log(data);
        const requestOptions = {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        };
        // console.log(watch(data)); 
        if (process.env.REACT_APP_API_BASEURL == 'NOT') {
            toast.success('Added Successfully...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        } else {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/provider/flexiblenetwork/add`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    // console.log(response);

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        reset(data.data);
                        console.log(data.data);
                        var msg = props.adding ? 'Added Successfully...!' : 'Updated Successfully..'
                        toast.success(msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,

                        });
                    }


                    if (response === '200') {
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }

    }
    const onSubmit = (e) => {
        e.preventDefault();
    }
    const getNDCItem = (rowdata) => {
        // console.log(rowdata);
        // setFormData(rowdata);
        setBenifitData(true);
        setSelctedNdc(rowdata);


    }


    useEffect(() => {
        // reset(flexibleData);

        reset(formData);


        if(!flexibleData){
            loadData()
        }

    },[flexibleData,formData]);
    console.log(formData);



    useEffect(() => {
        if (benifitsData) {
            setAdding(false);

        } else {
            setAdding(true);
            setBenifitData(false);
        }

        document.title = 'Benefit Code | ProHealthi';

    }, [benifitsData, adding]);

    function loadData() {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/provider/flexiblenetwork/all`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);
                // console.log(data.data);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setFlexibleData([]);
                    return Promise.reject(error);

                } else {
                    setFlexibleData(data.data);
                    return;
                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }
    return (
        <>

<div className="col-md-3 ms-auto text-end">
                <button className="btn  btn-info btn-sm" onClick={e => AddForm()}>
                    Add Flexible Network <i className="fa fa-plus-circle"></i></button>
            </div>

<FlixibleNetworksForm  show={show} adding={adding} handleClose={handleClose} selected={selctedNdc} />


<FlexibleResults getNDCItem={getNDCItem} typedata={flexibleData}   selected={selctedNdc}/>





        
        
        </>
    )
}



 function FlixibleNetworksForm(props) {


    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();


    const addCode = (data) => {
        // console.log(data);
        const requestOptions = {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        };
        // console.log(watch(data)); 
        if (process.env.REACT_APP_API_BASEURL == 'NOT') {
            toast.success('Added Successfully...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        } else {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/provider/flexiblenetwork/add`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    // console.log(response);

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        reset(data.data);
                        console.log(data.data);
                        var msg = props.adding ? 'Added Successfully...!' : 'Updated Successfully..'
                        toast.success(msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,

                        });
                    }


                    if (response === '200') {
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }

    }
    const onSubmit = (e) => {
        e.preventDefault();
    }


    useEffect(() => {

        console.log(props.selected);

        if (props.adding) {
            reset({ network_id: '', network_name: '', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ network_id: '', network_name: '', description: '', pharm_type_variation_ind: '', network_part_variation_ind: '', claim_type_variation_ind: '', plan_accum_deduct_id: '', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);


    useEffect(() => { reset(props.selected) }, [props.selected]);
   



    return (
        <>

               <form key={1} onSubmit={handleSubmit(addCode)} >
                <div class="card-body">
                    <div class="row">


                        <div class="clearfix mb-3"></div>


                        <div class="col-md-12 mb-2">
                            <h5 className="mb-2">Flexible Networks  {props.adding ? ' - (Adding)' : '- (' + props.selected.rx_network_rule_id + ' )'}</h5>

                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-2">
                                <small>Flexible Network ID</small>
                                <input  type="text" class="form-control"   {...register('rx_network_rule_id', {
                                })} name="rx_network_rule_id" id=""  />
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                {errors.flexible_network_id?.type === 'required' && <p role="alert" className="notvalid">Flexible Network ID is required </p>}

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-2">
                                <small>Network Name</small>
                                <input type="text" class="form-control" {...register('rx_network_rule_name', {

                                })} name="rx_network_rule_name" id="" required="" />
                                {errors.rx_network_rule_name?.type === 'required' && <p role="alert" className="notvalid">Network Name is required </p>}

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-2">
                                <small>Price Schedule</small>
                                <input type="text" class="form-control" {...register('price_schedule_ovrd', {

                                })} name="price_schedule_ovrd" id="" required="" />
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                                {errors.flexible_price_schedule?.type === 'required' && <p role="alert" className="notvalid">Price Schedule is required </p>}

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-2">
                                <small>Inclusion By</small>
                                <input type="text" class="form-control" {...register('inclusion_by', {

                                })} name="inclusion_by" id="" required="" />
                                {errors.inclusion_by?.type === 'required' && <p role="alert" className="notvalid">Inclusion By is required </p>}

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group mb-2">
                                <small>Exclusion By</small>
                                <input type="text" class="form-control" name="exclude_rule" {...register('exclude_rule', {
                                    // required: true,

                                })}  id="" required="" />
                                {errors.exclusion_by?.type === 'required' && <p role="alert" className="notvalid">Exclusion By is required </p>}

                            </div>
                        </div>

                        <div class="col-md-12 mt-3 mb-3 text-end">
                            <button type="submit" class="btn btn-sm btn-info">add Item</button>
                        </div>



                        {/* {networkData.length > 0 ? */}
                        {/* // : ''} */}



                    </div>
                    {console.log(props.adding)}
                    <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>

                </div>

            </form>




        </>
    )

}


function TraditionalNetworksForm(props) {

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();




    const addCode = (data) => {
        // console.log(data);
        const requestOptions = {
            method: 'POST',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        };
        // console.log(watch(data)); 
        if (process.env.REACT_APP_API_BASEURL == 'NOT') {
            toast.success('Added Successfully...!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
        } else {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/provider/traditionalnetwork/add`, requestOptions)
                .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    // console.log(response);

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    } else {
                        reset(data.data);
                        console.log(data.data);
                        var msg = props.adding ? 'Added Successfully...!' : 'Updated Successfully..'
                        toast.success(msg, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,

                        });
                    }


                    if (response === '200') {
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }

    }
    const onSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {

        // console.log(props.selected);

        if (props.adding) {
            reset({ rx_network_rule_id: '', rx_network_rule_name: '',price_schedule_ovrd:'', new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ rx_network_rule_id: '', rx_network_rule_name: '',price_schedule_ovrd:'', description: '', pharm_type_variation_ind: '', network_part_variation_ind: '', claim_type_variation_ind: '', plan_accum_deduct_id: '', new: 1 }, {
                keepValues: false,
            })
        }


    }, [props.selected, props.adding]);


    useEffect(() => { reset(props.selected) }, [props.selected]);
    return (
        <>

            <form key={1} onSubmit={handleSubmit(addCode)} >



                <div class="card mt-3 mb-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 mb-2">
                                <h5 className="mb-2">Traditional Networks  {props.adding ? ' - (Adding)' : '- (' + props.selected.network_id + ' )'}</h5>

                            </div>
                            <div class="col-md-4">
                                <div class="form-group mb-2">
                                    <small>Treditional ID</small>
                                    <input type="text" class="form-control" name="traditional_id"  {...register('network_id', {
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
                                    <input type="text" class="form-control" name="price_schedule_ovrd" {...register('price_schedule_ovrd', {
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

                                    })} id="" />
                                    {errors.effective_date?.type === 'required' && <p role="alert" className="notvalid">Effective Date is required </p>}

                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group mb-2">
                                    <small>Termination Date</small>
                                    <input type="date" class="form-control" name="termination_date"  {...register('termination_date', {
                                    })} id="" required="" />
                                    {errors.termination_date?.type === 'required' && <p role="alert" className="notvalid">Termination Date is required </p>}

                                </div>
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
                            {/* // : ''} */}


                        </div>
                    </div>
                </div>


                <Button type='submit' variant="primary">{props.adding ? ' Add' : 'Update'}</Button>



            </form>




        </>
    )
}





function TraditionalResults(props) {

    // console.log(props.data)


    var networkData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        networkData.push(<TraditionalTypeRow getNDCItem={props.getNDCItem} datar={props.typedata[index]}
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
                        <div style={{height:"200px", overflowY:"scroll"}}>

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
        networkData.push(<FlexibleTypeRow getNDCItem={props.getNDCItem}   datar={props.typedata[index]}
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
                            <div style={{height:"200px", overflowY:"scroll"}}>
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



    const alert = () => {
        alert(props.datar.network_id)
    }
    const deleteRow = (e) => {

        alert(e.currentTarget.value);

    }

    return (
        <>
            <tr className={(props.selected && props.datar.pharmacy_nabp == props.selected.pharmacy_nabp ? ' tblactiverow ' : '')}

                onClick={() => props.getNDCItem(props.datar)}
            >
                <td>{props.datar.network_id}</td>
                <td>{props.datar.network_name}</td>
                <td>{props.datar.price_schedule_ovrd}</td>
                {/* <td>{rops.datar.}</td> */}
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

                
            <tr className={(props.selected && props.datar.pharmacy_nabp == props.selected.pharmacy_nabp ? ' tblactiverow ' : '')}

onClick={() => props.getNDCItem(props.datar)}
>
                <td>{props.datar.rx_network_rule_id}</td>
                <td>{props.datar.rx_network_rule_name}</td>
                <td>{props.datar.price_schedule_ovrd}</td>

                <td>{props.datar.inclusion_by}</td>
                <td>{props.datar.exclude_rule}</td>
                <td><button onClick={flexdeleteRow} value={props.datar.flexible_network_id} className='btn btn-sm btn-warning'><i className='fa fa-trash-alt'></i></button></td>



            </tr>
        </>
    )
}


export default SearchProvider;