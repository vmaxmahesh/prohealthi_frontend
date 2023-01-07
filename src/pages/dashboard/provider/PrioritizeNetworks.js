import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Footer from '../../../../shared/Footer';
import { ToastContainer, toast } from 'react-toastify';


function PrioritizeNetworks(props) {
    const location = useLocation();
    const currentpath = location.pathname.split('/').pop();

    const [provider, setProvider] = useState([]);

      
        var ProviderData = [
            { name: 'Mahesh', network_id: '121' },

        ];
console.log(props.datar);
    



    return(
        <>
        <div class="card mt-3 mb-3">
                    <div class="card-body">

                        <div class="row">
                        <ProviderSearchResults typedata={ProviderData} />

                        </div>
                    </div>
                </div>

               
        </>
    )



}


function ProviderSearchResults(props) {

    console.log(props.typedata);
    var myData = [];
    for (let index = 0; index < props.typedata.length; index++) {
        myData.push(<ProviderDataRow datar={props.typedata[index]}
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
                    <table  className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Network ID</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myData}

                        </tbody>
                    </table>
                </div>
            </div>

          
        </>
    )




}


function ProviderDataRow(props) {

    const currentpath = location.pathname.split('/').pop();

    const [display, setDisplay] = useState('none');


    const [show, setShow] = useState('none');

    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
        console.log(show);
                setShow('');
        
      };
  

    return (



        <>



            <tr>
                <td>{props.datar.name}</td>
                <td>{props.datar.network_id}</td>


                <td><button type="submit" value={props.datar.network_id} onClick={handleClick} className="btn btn-sm btn-info" ><i className="fa fa-eye"></i> View</button></td>




            </tr>

            {/* <div class="row" style={{display:show}}>
                <div class="col-md-8">
                    <div class="row">
                    <div class="col-md-12">
                        <h5 class="mb-2">Prioritize Networks</h5>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <small>Super Network ID</small>
                            <input type="text" class="form-control" name="" value="" id="" placeholder="" required=""/>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="form-group">
                            <small>Super Network Name</small>
                            <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                        </div>
                    </div>
                    
                        <div class="col-md-12">
                            <h5 class="mb-2">Provider Network</h5>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-group">
                                <small>Provider Network ID</small>
                                <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-group">
                                <small>Super Network Priority</small>
                                <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        
                        <div class="col-md-6 mb-3">
                            <div class="form-group">
                                <small>Effective Date</small>
                                <input type="date" class="form-control" name="" id="" placeholder="" required=""/>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-group">
                                <small>Termination Date</small>
                                <input type="date" class="form-control" name="" id="" placeholder="" required=""/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <h5 class="mb-2">Pricing</h5>
                        </div>
                        <div class="col-md-12 mb-3">
                            <div class="form-group">
                                <small>Price Schedule Override</small>
                                <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                <a href=""><span class="fa fa-search form-icon"></span></a>
                            </div>
                        </div>
                        
                        
                        <div class="col-md-12">
                            <h5 class="mb-2">Communication Charges</h5>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-group">
                                <small>Paid/Accepted</small>
                                <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="form-group">
                                <small>Reject/Reversal</small>
                                <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="mb-2">Rx Limitations</h5>
                        </div>

                        <div class="col-md-12 mb-3">
                            <div class="form-group">
                                <small>Rx Quantity</small>
                                <div class="row">
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" name="" id="" placeholder="Minimum" required=""/>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" name="" id="" placeholder="Maximum" required=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 mb-3">
                            <div class="form-group">
                                <small>Days Supply</small>
                                <div class="row">
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" name="" id="" placeholder="Minimum" required=""/>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" name="" id="" placeholder="Maximum" required=""/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 mb-3">
                            <div class="form-group">
                                <small>Retail Fills</small>
                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required=""/>
                            </div>
                        </div>
                        <div class="col-md-12 mb-3">
                            <div class="form-group">
                                <small>Fills</small>
                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required=""/>
                            </div>
                        </div>
                        <div class="col-md-12 mb-3">
                            <div class="form-group">
                                <small>Starter Dose Date</small>
                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required=""/>
                            </div>
                        </div>
                        <div class="col-md-12 mb-3">
                            <div class="form-group">
                                <small>Starter Dose Bypass Days</small>
                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required=""/>
                            </div>
                        </div>
                        <div class="col-md-12 mb-3">
                            <div class="form-group">
                                <small>St. Dose Maint. Bypass Days</small>
                                <input type="text" class="form-control" name="" id="" placeholder="Maximum" required=""/>
                            </div>
                        </div>

                    </div>
                </div>


            </div> */}

            <div class="card mt-3 mb-3" style={{display:show}}>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <h5 class="mb-2">Prioritize Networks</h5>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <div class="form-group">
                                        <small>Super Network ID</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <div class="form-group">
                                        <small>Super Network Name</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <div class="form-group">
                                        <small>Network ID</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <div class="form-group">
                                        <small>Effective Date</small>
                                        <input type="date" class="form-control" name="" id="" placeholder="" required=""/>
                                    </div>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <div class="form-group">
                                        <small>Priority</small>
                                        <input type="text" class="form-control" name="" id="" placeholder="" required=""/>
                                        <a href=""><span class="fa fa-search form-icon"></span></a>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                                <p>Click on Network and Drag to New Position to Assign New Priority</p>
                            </div>
                        </div>
                    </div>
      

            
       
         </>

         
    )
}


   

export default PrioritizeNetworks;