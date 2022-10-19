import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, Route, Routes, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '../../../shared/Footer';


function Prescriber() {
    // const location = useLocation();
    // const currentpath = location.pathname.split('/').pop();

    const [provider, setProvider] = useState([]);
    const [ProviderData, setProviderdata] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();






    const fillProviderData = (e) => {
        // API  
        // var staticProviderType =; 
        var arr = [
            { id: '1234', name: 'Mahesh', storenumber: '101', chain: 'Hyderabad' },

        ];

        setProviderdata(arr);
    }


    useEffect(() => {
    }, [ProviderData]);



    const clearForm = () => {
        document.getElementById("search-form").reset();
    }


    const onSubmit = data => {


        // console.log(Identificationdata);

       
        console.log(data);




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


            <div className="card mt-3 mb-3">
                <div className="card-body">


                    <form id="search-form" onSubmit={handleSubmit(onSubmit)}>

                        <div class="row">
                            <div class="col-md-12">
                                <h5 class="mb-2">Prescriber Search</h5>
                            </div>
                            <div class="col-md-3 mb-3">
                                <div class="form-group">
                                    <small>Phys. Grouping ID</small>
                                    <input type="text" class="form-control" {...register('grouping_id',{
                                        required:true,
                                    })} name="grouping_id" id="" placeholder=""  />
                                    {errors.grouping_id?.type === 'required' && <p role="alert" className="notvalid">Phys. Grouping ID is  required</p>}

                                </div>
                            </div>
                            <div class="col-md-3 mb-3">
                                <div class="form-group">
                                    <small>Prescriber ID</small>
                                    <input type="text" class="form-control" name="prescriber_id"  {...register('prescriber_id',{
                                        required:true,
                                    })} id="" placeholder="" required="" />
                                    {errors.prescriber_id?.type === 'required' && <p role="alert" className="notvalid">Prescriber ID is  required</p>}

                                </div>
                            </div>
                            <div class="col-md-3 mb-3">
                                <div class="form-group">
                                    <small>Last Name</small>
                                    <input type="text" class="form-control" name="last_name" {...register('last_name',{
                                        required:true,
                                    })} id="" placeholder="" required="" />

                                    {errors.last_name?.type === 'required' && <p role="alert" className="notvalid">Last Name is  required</p>}

                                </div>
                            </div>
                            <div class="col-md-3 mb-3">
                                <div class="form-group">
                                    <small>First Name</small>
                                    <input type="text" class="form-control" name="first_name" {...register('first_name',{
                                        required:true,
                                    })} id="" placeholder="" required="" />
                                    {errors.first_name?.type === 'required' && <p role="alert" className="notvalid">First Name is  required</p>}

                                </div>
                            </div>


                        </div>


                  
                    <div class="col-md-6 ms-auto text-end mb-3">

                        <a onClick={e => clearForm()} class="btn btn-warning ">Clear</a>&nbsp;&nbsp;
                        {/* <button  id="show" class="btn btn-info">Search</button> */}
                        <button onClick={e =>
                            fillProviderData()} className="btn btn-info">Search</button>
                    </div>

                    </form>


                    {ProviderData.length > 0 ?
                    <Results typedata={ProviderData} />
                     : ''} 





                </div>
            </div>




            <Footer />
        </>
    );
}


function ProviderTypeRow(props) {

    const currentpath = location.pathname.split('/').pop();

    const [show, showDisplay] = useState('none');

    const { register, handleSubmit, formState: { errors } } = useForm();




    const closeBtn = () => {
        showDisplay('block')
    }


    const closeModal = () => {
        showDisplay('none')
    }


    const onsubmit=(data)=>{
        console.log(data);
    }

    const [formData, setFormData] = useState({
        id: '123',
        p_grouping_id: '234234',
        address: 'hfhfghf',
        last_name:'Merugu',
        first_name:'Mahesh',
        city: 'hyderabad',
        state: '1',
        specility:'medicine',
        title:'Test title',
        license:'driving',
        country: '1',
        zip_code: '52135',
        dea:'diwali',
        spin_number:'3534534',
        medical_group:'34554',
        phone:'56345345345',
       
       


    });



    return (
        <>
            <tr>
                <td>{props.datar.id}</td>
                <td>{props.datar.name}</td>
                <td>{props.datar.storenumber}</td>
                <td>{props.datar.chain}</td>
                <td><button class="btn btn-sm btn-info" onClick={e =>
                    closeBtn()}><i class="fa fa-eye"></i> View</button></td>



            </tr>



            <div class="modal fade show" style={{ display: show }} aria-modal="true" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Prescriber Data</h5>
                            <button type="submit" onClick={e =>
                                closeModal()} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>


                        </div>

                        <form onSubmit={handleSubmit(onsubmit)}>

                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="row">
                                        <div class="col-md-12 mb-2">
                                            <h5>Prescriber</h5>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <small>ID</small>
                                                <input type="text" class="form-control"  {...register('id')} name="id" value={formData.id} id=""  readonly="" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <small>Prescriber Groupoing ID</small>
                                                <input type="text" class="form-control" name="p_grouping_id"  {...register('p_grouping_id')} value={formData.p_grouping_id} id="" placeholder="" readonly="" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <small>Last Name</small>
                                                <input type="text" class="form-control" name="last_name" id="" {...register('last_name')} value={formData.last_name} placeholder="" readonly="" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <small>First Name</small>
                                                <input type="text" class="form-control" name="first_name" {...register('first_name')} id="" value={formData.first_name} placeholder="" readonly="" />
                                            </div>
                                        </div>

                                        <div class="col-md-4 mb-2">
                                            <div class="form-group">
                                                <small>Specility</small>
                                                <input type="text" class="form-control" name="specility"   {...register('specility')} value={formData.specility} id="" placeholder="" readonly="" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-2">
                                            <div class="form-group">
                                                <small>Title</small>
                                                <input type="text" class="form-control" name="title" id=""  {...register('title')} value={formData.title} placeholder="" readonly="" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-2">
                                            <div class="form-group">
                                                <small>License</small>
                                                <input type="text" class="form-control" name="license"  {...register('license')} value={formData.license} id="" placeholder="" readonly="" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-2">
                                            <div class="form-group">
                                                <small>DEA</small>
                                                <input type="text" class="form-control" name="dea" id=""  {...register('dea')} value={formData.dea} placeholder="" readonly="" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-2">
                                            <div class="form-group">
                                                <small>Spin Number</small>
                                                <input type="text" class="form-control" name="spin_number"   {...register('spin_number')} value={formData.spin_number} id="" placeholder="" readonly="" />
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-2">
                                            <div class="form-group">
                                                <small>Medical Group</small>
                                                <input type="text" class="form-control" name="medical_group" {...register('medical_group')} value={formData.medical_group} id="" placeholder="" readonly="" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="row">
                                        <div class="col-md-12 mb-2">
                                            <h5>Address &amp; Phone Number</h5>
                                        </div>
                                        <div class="col-md-12 mb-2">
                                            <div class="form-group">
                                                <small>Address</small>
                                                <textarea class="form-control" name='address'   {...register('address')} value={formData.address} rows="1"></textarea>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <small>City</small>
                                                <input type="text" class="form-control" name="city" {...register('city')} value={formData.city} id="" placeholder="" required="" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <small>State</small>
                                                <input type="text" class="form-control" name="state" {...register('state')}  value={formData.state} id="" placeholder="" required="" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <small>Country</small>
                                                <input type="text" class="form-control" name="country"  {...register('country')} value={formData.country} id="" placeholder="" required="" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <small>Zip Code</small>
                                                <input type="text" class="form-control" name="zip_code"  {...register('zip_code')}  value={formData.zip_code} id="" placeholder="" required="" />
                                            </div>
                                        </div>
                                        <div class="col-md-12 mb-2">
                                            <div class="form-group">
                                                <small>Phone</small>
                                                <input type="text" class="form-control" name="phone"  {...register('phone')} value={formData.phone} id="" placeholder="" required="" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a onClick={e =>
                                closeModal()} class="btn btn-secondary" >Close</a>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                        </form>
                    </div>
                </div>
        </div>
            


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




    return (
        <>

            <div className="row">
                <div className="col-md-12 mb-3">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Prescriber ID</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Group ID</th>
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




















export default Prescriber;