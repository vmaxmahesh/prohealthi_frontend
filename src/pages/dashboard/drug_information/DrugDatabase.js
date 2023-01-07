import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function DrugDatabase() {
    const [listData, setListData] = useState(false);
    const [formData, setFormData] = useState(false);

    const location = useLocation();
    const currentpath = location.pathname.split('/')[4];

    const onSearch = (search) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/drug-information/drug-database/get?search=${search.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setListData(data.data);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    const getFormData = (formdata) => {
        setFormData(formdata);
    }


    useEffect(() => { }, [listData]);
    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Drug Information</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Drug database</a></li>
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
            <SearchDrugDatabase onSearch={onSearch} />
            <DrugDatabaseList listData={listData} getFormData={getFormData} formData={formData} />

            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <Link to="general" className={'nav-link' + (currentpath == 'general' ? ' active' : '')}>General</Link>
                <Link to="id-codes" className={'nav-link' + (currentpath == 'id-codes' ? ' active' : '')}>ID Codes</Link>
                <Link to="distribution" className={'nav-link' + (currentpath == 'distribution' ? ' active' : '')}>Distribution/Packag</Link>
                <Link to="pricing" className={'nav-link' + (currentpath == 'pricing' ? ' active' : '')}>Pricing</Link>
            </div>
            <div>
                <Outlet context={[formData, setFormData]} />
            </div>
        </>
    )
}

function SearchDrugDatabase(props) {
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-3">
                            <div className="col-md-12 mb-2">
                                <h5>Search for NDC</h5>
                            </div>

                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className="row mb-2">
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>NDC/ Label Name/ Generic Name</small>
                                                <input type="text" className="form-control" onKeyUp={e => props.onSearch(e)} placeholder='Start typing NDC/ label name/ generic name to search'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Return the Following</h5>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <small>NDC</small>
                                        <input type="text" name="" id="" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="checkbox" id="html" className="d-none" />
                                        <label htmlFor="html">All Lebeler's Products</label>
                                        <div className="clearfix mb-3"></div>
                                        <input type="checkbox" id="html" className="d-none" />
                                        <label htmlFor="html">All Package Sizes</label><br />
                                        <div className="clearfix mb-3"></div>
                                        <input type="checkbox" id="html" className="d-none" />
                                        <label htmlFor="html">NDC</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                            <a href="" className="btn btn-secondary">Cancel</a>&nbsp;&nbsp;
                            <a href="" className="btn btn-danger">Select NDC</a>&nbsp;&nbsp;
                            <a href="" className="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                            <button href="provider-search.html" className="btn btn-info">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function DrugDatabaseList(props) {
    const listArray = [];
    if(props.listData && props.listData.length >0){

    for (let i = 0; i < props.listData.length; i++) {
        listArray.push(<DrugRow drugRow={props.listData[i]} getFormData={props.getFormData} formData={props.formData} />);
    }
}

   
    return (
        <>
            <div className="card mt-3 mb-3 data">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ height: '400px', overflowY: 'scroll' }}>
                                <table className="table table-striped table-bordered">
                                    <thead className='stickt-thead'>
                                        <tr>
                                            <th>NDC</th>
                                            <th>Label Name</th>
                                            <th>Manufacturer Name</th>
                                            <th>Package Size</th>
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
        </>
    )
}

function DrugRow(props) {
    return (
        <>
            <tr onClick={e => props.getFormData(props.drugRow)}
                className={(props.drugRow && props.formData.ndc == props.drugRow.ndc ? 'tblactiverow' : '')} >
                <td>{props.drugRow.ndc}</td>
                <td>{props.drugRow.label_name}</td>
                <td>{props.drugRow.manufacturer_name}</td>
                <td>{props.drugRow.package_size}</td>
            </tr>
        </>
    )
}


export function General() {
    const [formData, setFormData] = useOutletContext();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    useEffect(() => { reset(formData) }, [formData]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">NDC Information</h5>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>NDC</small>
                                        <input type="text" className="form-control" {...register("ndc", { required: true })} placeholder="Customer ID" readonly="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Label Names</small>
                                        <input type="text" className="form-control" {...register("label_name", { required: true })} placeholder="Client ID" readonly="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Superceded NDC</small>
                                        <input type="text" className="form-control" {...register("superceded_ndc", { required: true })} placeholder="Client ID" readonly="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Preceded NDC</small>
                                        <input type="text" className="form-control" {...register("preceded_ndc", { required: true })} placeholder="Client ID" readonly="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Drug Status</small>
                                        <select className="form-select" {...register("drug_status", { required: true })}>
                                            <option value="">Select Status</option>
                                            <option value="">A</option>
                                            <option value="">B</option>
                                            <option value="">C</option>
                                        </select>
                                        <p className="input-hint">Active</p>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <h5 className="mb-1">Generic Information</h5>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Product ID</small>
                                        <input type="text" className="form-control" {...register("generic_product_id", { required: true })} placeholder="Name" readonly="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2">
                                        <small>Product Name</small>
                                        <input type="text" className="form-control" {...register("generic_name", { required: true })} placeholder="Address 1" readonly="" />
                                    </div>
                                </div>

                                <div className="col-md-12 mt-2">
                                    <h5 className="mb-1">Manufacturer Information</h5>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>ID</small>
                                        <input type="text" className="form-control" {...register("ndc", { required: true })} placeholder="Address 1" readonly="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Name</small>
                                        <input type="text" className="form-control" {...register("manufacturer_name", { required: true })} placeholder="Address 1" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Abbreviation</small>
                                        <input type="text" className="form-control" {...register("manufacturer_name_abbr", { required: true })} placeholder="Address 1" />
                                    </div>
                                </div>

                                <div className="col-md-12 mt-2">
                                    <h5 className="mb-1">Product Information</h5>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Legend Change Date</small>
                                        <input type="date" className="form-control" {...register("legend_change_date", { required: true })} />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Next Smaller Suffix</small>
                                        <input type="text" className="form-control" {...register("next_smlr_suffix", { required: true })} placeholder="Address 1" readonly="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group mb-2">
                                        <small>Next Larger Suffix</small>
                                        <input type="text" className="form-control" {...register("next_lrgr_suffix", { required: true })} placeholder="Address 1" readonly="" />
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

export function IDCodes() {
    const [formData, setFormData] = useOutletContext();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    useEffect(() => { reset(formData) }, [formData]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">ID Codes</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Generic Code</small>
                                <select className="form-select" {...register("generic_code", { required: true })}>
                                    <option value="">Select Code</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Original with Generics</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>DEA Class Code</small>
                                <select className="form-select" {...register("dea_class_code", { required: true })}>
                                    <option value="">Select DEA Class Code</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">A DEA Class Code is not Applicable</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Therapeutic Class</small>
                                <select className="form-select" {...register("therapeutic_class_code", { required: true })}>
                                    <option value="">Select Class</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Miscellaneous Anagesics and Antipyretics</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Therapeutic Equiv</small>
                                <select className="form-select" {...register("therapeutic_equiv_code", { required: true })}>
                                    <option value="">Select Equiv</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Information is unavailable or not applicable</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Rx OCT Indicator</small>
                                <select className="form-select" {...register("rx_otc_indicator", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Rx Multi-source</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>OTC Equiv Indicator</small>
                                <input type="text" className="form-control" {...register("otc_equiv_ind", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>3rd Party Restriction</small>
                                <select className="form-select" {...register("third_party_rest_code", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">No Third-Party Restrication Code Applicable</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>DESI Code</small>
                                <select className="form-select" {...register("desi_code", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Non DESI/IRS drugs or DESI/IRS drugs intermined to be safe and effective</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Internal/External Code</small>
                                <select className="form-select" {...register("int_ext_code", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Internally Administered</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Maint Drug Code</small>
                                <select className="form-select"  {...register("maintenance_drug_code", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Oil</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Dispensing Unit</small>
                                <select className="form-select" {...register("dispensing_unit_code", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Old Amount 3</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Route Admin Code</small>
                                <select className="form-select" {...register("route_admin_code", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Oral</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Form Type code</small>
                                <select className="form-select" {...register("form_type_code", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Solid</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Dollar Rank code</small>
                                <input type="text" className="form-control" {...register("dollar_rank_code", { required: true })} />
                                <p className="input-hint">Description</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Rx Rank code</small>
                                <input type="text" className="form-control" {...register("rx_rank_code", { required: true })} />
                                <p className="input-hint">Description</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <small>Single Combo Code</small>
                                <select className="form-select" {...register("single_comb_code", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Standard Packaging</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function Distribution() {
    const [formData, setFormData] = useOutletContext();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    useEffect(() => { reset(formData) }, [formData]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Distribution Information</h5>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Metric Strength</small>
                                <input type="text" className="form-control" {...register("metric_strength", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Unit Dose code</small>
                                <select className="form-select" {...register("unit_dose_code", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Standard Packaging</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Strngth Unit Mesr</small>
                                <select className="form-select" {...register("strength_uom", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Milligram</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Dosage From</small>
                                <select className="form-select" {...register("dosage_form", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Tablet</p>
                            </div>
                        </div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Packaging Information</h5>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Gen Prod Package Code</small>
                                <input type="text" className="form-control" {...register("gppc_code", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Package Size</small>
                                <input type="text" className="form-control" {...register("package_size", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Package Description</small>
                                <input type="text" className="form-control" {...register("pkg_description", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Package Unit of Measure</small>
                                <select className="form-select" {...register("package_uom", { required: true })}>
                                    <option value="">Select</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                                <p className="input-hint">Each</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Package Quantity</small>
                                <input type="text" className="form-control" {...register("package_qty", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Total Package Quantity</small>
                                <input type="text" className="form-control" {...register("total_package_qty", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group mb-3">
                                <small>Repackage Index</small>
                                <input type="text" className="form-control" {...register("repackager_ind", { required: true })} />
                            </div>
                        </div>

                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Date Information</h5>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>Medi-Span Last change Date</small>
                                <input type="date" className="form-control" {...register("last_change_date", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <small>System Effective Date</small>
                                <input type="date" className="form-control" {...register("effective_date", { required: true })} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export function Pricing() {
    const [formData, setFormData] = useOutletContext();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [table, setTable] = useState(false);
    const [formFillData, setFormFillData] = useState(false);

    const getNdcPrices = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/drug-information/drug-database/get-drug-prices?search=${formData.ndc}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                setTable(data.data);
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }

    const getFormFill = (formFill) => {
        setFormFillData(formFill);
    }

    useEffect(() => {
        reset(formFillData);
        getNdcPrices();
        console.log(formFillData);
    }, [formData, formFillData]);


    const arr = [];
    for (let i = 0; i < table.length; i++) {
        arr.push(<PriceRow priceRow={table[i]} getFormFill={getFormFill} formData={formFillData} />);
    }
    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-1">
                            <h5 className="mb-2">Pricing</h5>
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>NDC</small>
                            <input type="text" className="form-control" {...register("ndc", { required: true })} />
                        </div>
                        <div className="col-md-6 mb-2">
                            <small>Label Name</small>
                            <input type="text" className="form-control" {...register("label_name", { required: true })} readOnly />
                        </div>
                        <div className="col-md-12 mt-2">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Price Source</th>
                                        <th>Price Type</th>
                                        <th>Effective Date1</th>
                                        <th>Amount 1</th>
                                        <th>Effective Date 2</th>
                                        <th>Amount 2</th>
                                        <th>Effective Date 3</th>
                                        <th>Amount 3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arr}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <h5 className="mb-2">Pricing Group</h5>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Price Source</small>
                                <select className="form-select" {...register("price_source", { required: true })}>
                                    <option value="">Select Price Source</option>
                                    <option value="FDB">First Data Bank</option>
                                    <option value="MDS">Medi span</option>
                                    <option value="NATL">National</option>
                                    <option value="USR">User Defined</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Effectiv Date 1</small>
                                <input type="date" className="form-control" {...register("price_eff_date_1", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <small>Price 1</small>
                                <input type="text" className="form-control" {...register("price_amt_1", { required: true })} />
                            </div>
                        </div>

                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Price Type</small>
                                <select className="form-select" {...register("price_type", { required: true })}>
                                    <option value="">Select Price Type</option>
                                    <option value="SBC">Store billing(Acquisition) Cost</option>
                                    <option value="WAC">Warehouse Acquisition Cost</option>
                                    <option value="USR">User Defined</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Effectiv Date 2</small>
                                <input type="date" className="form-control" {...register("price_eff_date_2", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Price 2</small>
                                <input type="text" className="form-control" {...register("price_amt_2", { required: true })} />
                            </div>
                        </div>

                        <div className="col-md-4 mb-2">
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Effectiv Date 3</small>
                                <input type="date" className="form-control" {...register("price_eff_date_3", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-4 mb-2">
                            <div className="form-group">
                                <small>Price 3</small>
                                <input type="text" className="form-control" {...register("price_amt_3", { required: true })} />
                            </div>
                        </div>
                        <div className="col-md-6 ms-auto text-end mb-3 mt-3">
                            <a href="" className="btn btn-secondary">Clear</a>&nbsp;&nbsp;
                            <a href="" className="btn btn-danger">Remove</a>&nbsp;&nbsp;
                            <button href="provider-search.html" className="btn btn-info">Add</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

function PriceRow(props) {
    return (
        <>
            <tr onClick={e => props.getFormFill(props.priceRow)}
                className={(props.formData && props.priceRow.price_eff_date_1 == props.formData.price_eff_date_1 ? 'tblactiverow' : '')}>
                <td>{props.priceRow.price_source}</td>
                <td>{props.priceRow.price_type}</td>
                <td>{props.priceRow.price_eff_date_1}</td>
                <td>{props.priceRow.price_amt_1}</td>
                <td>{props.priceRow.price_eff_date_2}</td>
                <td>{props.priceRow.price_amt_2}</td>
                <td>{props.priceRow.price_eff_date_3}</td>
                <td>{props.priceRow.price_amt_3}</td>

            </tr>
        </>
    )
}