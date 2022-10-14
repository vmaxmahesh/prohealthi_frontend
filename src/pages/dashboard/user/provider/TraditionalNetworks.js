import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { Alert } from 'react-bootstrap';


function TraditionalNetworks(props) {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();

    const [provider, setProvider] = useState([]);
    const [ProviderData, setProviderdata] = useState([]);


    const [tableData, settableData] = useState([]);


    const [traditionalnetwork, SetTraditionalNetwork] = useState([]);




   



    

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
        // fillProviderData();
    }, [ProviderData]);


    

    
    return (
        <>


<button onClick={e =>
                                    fillProviderData()} className="btn btn-info">Search</button>
            <div className="dashboard-content clearfix">

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Provider Data</a></li>
                                <li><i className="fas fa-angle-right"></i></li>
                                <li><a href="">Treditional Network</a></li>
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
                    <h4 >Search Client</h4>
                </div>

                <div className="card mt-3 mb-3">
                    <div className="card-body" onClick={e =>
                                    fillProviderData()}>

                        <div className="row">
                            <div className="col-md-12">

                            {ProviderData.length > 0 ?
                        <TraditionalNetworkResults typedata={ProviderData} />
                        : ''}
                                {/* <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>FreeDrug</td>
                                            <td>Free drug</td>
                                            <td><button type="submit" onClick={handleshow} className="btn btn-sm btn-info" id="show"><i className="fa fa-eye"></i> View</button></td>
                                        </tr>
                                    </tbody>
                                </table> */}
                            </div>
                        </div>
                    </div>
                </div>



                <div className="data" style={{ display: '' }} >
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">

                        <Link to="network" className={'nav-link' + (currentpath == 'network' ? ' active' : '')}>NetWork</Link>
                        <Link to="providers" className={'nav-link' + (currentpath == 'providers' ? ' active' : '')}>Providers</Link>

                    </div>
                    <div className="tab-content" id="nav-tabContent">


                        <Outlet context={[traditionalnetwork, SetTraditionalNetwork]} />


                        {/* const [traditionalnetwork, SetTraditionalNetwork] = useState([]); */}




                        <div className="tab-pane fade" id="Providers" role="tabpanel" aria-labelledby="nav-profile-tab">

                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5 className="mb-2">Providers within Network</h5>
                                        </div>
                                        <div className="col-md-12">

                                       
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Effective Date</th>
                                                        <th>Termination Date</th>
                                                        <th>Price Schedule</th>
                                                        <th>Denied</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>ANP0005</td>
                                                        <td>Mangrove Cay</td>
                                                        <td>2010-09-09</td>
                                                        <td>9999-12-31</td>
                                                        <td>--</td>
                                                        <td>No</td>
                                                    </tr>
                                                    <tr>
                                                        <td>ANP0005</td>
                                                        <td>Mangrove Cay</td>
                                                        <td>2010-09-09</td>
                                                        <td>9999-12-31</td>
                                                        <td>--</td>
                                                        <td>No</td>
                                                    </tr>
                                                    <tr>
                                                        <td>ANP0005</td>
                                                        <td>Mangrove Cay</td>
                                                        <td>2010-09-09</td>
                                                        <td>9999-12-31</td>
                                                        <td>--</td>
                                                        <td>No</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <small>Provider ID</small>
                                                <input type="text" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <small>Price Schedule</small>
                                                <input type="text" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group mb-3 mt-4">
                                                <small>&nbsp;</small>
                                                <input type="checkbox" id="male" className="d-none" />
                                                <label for="male">Parcipation Denied</label>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <small>Effective Date</small>
                                                <input type="date" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group mb-3">
                                                <small>Termination Date</small>
                                                <input type="date" className="form-control" name="" placeholder="Enter Customer ID" id="" required="" />
                                            </div>
                                        </div>
                                        <div className="clearfix mb-2"></div>

                                        <div className="col-md-6 ms-auto text-end mb-3">
                                            <a href="" className="btn btn-danger">Clear</a>&nbsp;&nbsp;
                                            <a href="" className="btn btn-warning ">Remove From List</a>&nbsp;&nbsp;
                                            <a href="provider-search.html" className="btn btn-info">Add to List</a>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 float-end">
                                {/* <a href="" className="btn btn-theme pt-2 pb-2" style="width: 100%">Next</a> */}
                            </div>
                        </div>
                    </div>

                </div>




            </div>


            <Footer />
        </>
    )


}


function TraditionalNetworkRow(props) {

    const currentpath = location.pathname.split('/').pop();

    const [display, setDisplay] = useState('');


    const [show, setShow] = useState(false);


    const handleshow = (e) => {
        setDisplay('show');

        // console.log(display);

        
    }

    return (



        <>



            <tr>
                <td>{props.datar.id}</td>

                <td><button type="submit" onClick={handleshow} className="btn btn-sm btn-info" id="show"><i className="fa fa-eye"></i> View</button></td>

               


            </tr>
        </>
    )
}




function TraditionalNetworkResults(props) {

console.log(props.typedata);
    var myData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        myData.push(<TraditionalNetworkRow datar={props.typedata[index]}
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
                                <th> ID</th>
                                <th> Name</th>
                              
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myData }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )




}

export function Network(props) {


    const { register, handleSubmit, formState: { errors } } = useForm();

    const [traditionalnetwork, SetTraditionalNetwork] = useOutletContext();

    const onsubmit = (data) => {


        const id = traditionalnetwork;
        id['networkdata'] = data;
        SetTraditionalNetwork(id);


    }
    return (
        <>

            <form onSubmit={handleSubmit(onsubmit)}>
                <div className="tab-pane fade show active" id="Network" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="card mt-3 mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <h5 className="mb-2">Network</h5>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <small>Network ID</small>
                                        <input type="text" className="form-control" name="network_id" {...register('network_id',{
                                            required:true,
                                        })} id="" placeholder="" required="" />
                                        {errors.network_id?.type === 'required' && <p role="alert" className="notvalid">Network ID is  required</p>}

                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="form-group">
                                        <small>Network Name</small>
                                        <input type="text" className="form-control" name="network_name" {...register('network_name',{
                                            required:true,
                                        })} id="" placeholder="" required="" />
                                        {errors.network_name?.type === 'required' && <p role="alert" className="notvalid">Network Name is  required</p>}

                                    </div>
                                </div>
                                <div className="clearfix mb-1"></div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5 className="mb-2">Pricing</h5>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Price Schedule Override</small>
                                                <input type="text" className="form-control" name="pricing_schedule_override" {...register('pricing_schedule_override',{
                                                    required:true,
                                                })} id="" placeholder="" required="" />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                                {errors.pricing_schedule_override?.type === 'required' && <p role="alert" className="notvalid">Price Schedule Override is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <h5 className="mb-2">Communication Charges</h5>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <small>Paid/Accepted</small>
                                                <input type="text" className="form-control" name="paid_accepted" {...register('paid_accepted',{
                                                    required:true,
                                                })} id="" placeholder="" required="" />
                                                {errors.paid_accepted?.type === 'required' && <p role="alert" className="notvalid">Paid/Accepted is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <small>Reject/Reversal</small>
                                                <input type="text" className="form-control" name="rejected" {...register('rejected',{
                                                    required:true,
                                                })} id="" placeholder="" required="" />
                                                {errors.rejected?.type === 'required' && <p role="alert" className="notvalid">Reject/Reversal is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <h5 className="mb-2">Formulary Exceptions</h5>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <small>By GPI List</small>
                                                <input type="text" className="form-control" name="by_gpi_list" {...register('by_gpi_list',{
                                                    required:true,
                                                })} id="" placeholder="" required="" />

                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                                {errors.by_gpi_list?.type === 'required' && <p role="alert" className="notvalid">By GPI List is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <div className="form-group">
                                                <small>By BDC List</small>
                                                <input type="text" className="form-control" name="by_bdc_list"  {...register('by_bdc_list',{
                                                    required:true,
                                                })} id="" placeholder="" required="" />
                                                <a href=""><span className="fa fa-search form-icon"></span></a>
                                                {errors.by_bdc_list?.type === 'required' && <p role="alert" className="notvalid">By BDC List is  required</p>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h5 className="mb-2">Rx Limitations</h5>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Rx Quantity</small>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control" name="rx_quantity_minium" {...register('rx_quantity_minium',{
                                                            required:true,
                                                        })} id="" placeholder="Minimum" required="" />
                                                        {errors.rx_quantity_minium?.type === 'required' && <p role="alert" className="notvalid">Rx Minium Quantity   is  required</p>}

                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control" name="rx_quantity_maxium" id=""  {...register('rx_quantity_maxium',{
                                                            required:true,
                                                        })} placeholder="Maximum" required="" />
                                                 {errors.rx_quantity_maxium?.type === 'required' && <p role="alert" className="notvalid">Rx Maxium Quantity  is  required</p>}

                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Days Supply</small>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control" name="minium_days_supply"  {...register('minium_days_supply',{
                                                            required:true,
                                                        })} id="" placeholder="Minimum" required="" />
                                                        {errors.minium_days_supply?.type === 'required' && <p role="alert" className="notvalid">Days Supply Minium is  required</p>}

                                                    </div>
                                                    <div className="col-md-6">
                                                        <input type="text" className="form-control" name="maxium_days_supply" {...register('maxium_days_supply',{
                                                            required:true,
                                                        })} id="" placeholder="Maximum" required="" />
                                                        {errors.maxium_days_supply?.type === 'required' && <p role="alert" className="notvalid">Days Supply Maxium is  required</p>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Retail Fills</small>
                                                <input type="text" className="form-control" name="retail_fills" {...register('retail_fills',{
                                                    required:true,
                                                })} id="" placeholder="Maximum" required="" />
                                                {errors.retail_fills?.type === 'required' && <p role="alert" className="notvalid">Retail Fills is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Fills</small>
                                                <input type="text" className="form-control" name="fills"   {...register('fills',{
                                                    required:true,
                                                })} id="" placeholder="Maximum" required="" />
                                                {errors.fills?.type === 'required' && <p role="alert" className="notvalid"> Fills is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Starter Dose Date</small>
                                                <input type="text" className="form-control" name="starter_dose_date" {...register('starter_dose_date',{
                                                    required:true,
                                                })} id="" placeholder="Maximum" required="" />
                                                {errors.starter_dose_date?.type === 'required' && <p role="alert" className="notvalid"> Starter Dose Date is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>Starter Dose Bypass Days</small>
                                                <input type="text" className="form-control" name="starter_dose_bypass_days"  {...register('starter_dose_bypass_days',{
                                                    required:true,
                                                })} id="" placeholder="Maximum" required="" />
                                                {errors.starter_dose_bypass_days?.type === 'required' && <p role="alert" className="notvalid"> Starter Dose Bypass Days is  required</p>}

                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <div className="form-group">
                                                <small>St. Dose Maint. Bypass Days</small>
                                                <input type="text" className="form-control" name="dose_maint_bypass_days" {...register('dose_maint_bypass_days',{
                                                    required:true,
                                                })} id="" placeholder="Maximum" required="" />

                                                {errors.dose_maint_bypass_days?.type === 'required' && <p role="alert" className="notvalid"> St. Dose Maint. Bypass Days is  required</p>}

                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="col-md-1 float-end">
                        <button type="submit" className="btn btn-theme pt-2 pb-2">submit</button>
                    </div>
                </div>
            </form>


        </>
    )
}


export default TraditionalNetworks;