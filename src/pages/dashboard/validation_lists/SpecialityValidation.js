import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import LoadingSpinner from '../../../loader/loader';
import EmptyRowComponent from '../../../shared/NoDataFound';
import Footer from '../../../shared/Footer';
import { useAuth } from '../../../hooks/AuthProvider';
import { toast } from 'react-toastify';


export default function SpecialityValidation()
{

    const scollToRef = useRef();


    const [specialityValidationLists, setSpecialityValidationLists] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    const [selctedSpecialityValidationRow, setSelctedSpecialityValidationRow] = useState('');
    const [selectedSpecialityId, setSelectedSpecialityId] = useState('');
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(false);
    const [specialityFormData, setSpecialityFormData] = useState('');
    const [adding, setAdding] = useState(false);

    const clearForm = (e) => {
        setAdding(false);
        setSpecialityFormData('');
        setSelectedSpecialityId('');
        document.getElementById('specialityForm').reset();

    }

    const searchSpeciality = (fdata) => {
        setLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/speciality/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setSpecialityValidationLists([]);
                    return Promise.reject(error);

                } else {
                    setSpecialityValidationLists(data.data);
                    setSpecialityFormData();
                    setLoading(false);
                    return;
                }



            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    const getSpecialityLists = (specialty_list) => {
        setLoader(true);
        var test = {};
        test.specialty_list = specialty_list;
        setSelctedSpecialityValidationRow(test);

        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/speciality/get/${specialty_list}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setSpeciality([]);
                    return Promise.reject(error);
                } else {
                    setSpeciality(data.data);
                    setLoader(false);
                    setSelectedSpecialityId('');
                    setSpecialityFormData();
                    // scollToRef.current.scrollIntoView()
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    //form data
    const getSpecialityRow = (data) => {
        var speciality_id = data.specialty_id;
        var specialty_list = data.specialty_list;
        var test = {};
        test.speciality_id = speciality_id;
        setSelectedSpecialityId(test);

        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/speciality/details/${speciality_id}/${specialty_list}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setSpecialityFormData(data.data);
                    setAdding(true);
                    scollToRef.current.scrollIntoView();
                }


            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return(
        <>
         <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Validation List</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Speciality</a></li>
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
            <SearchSpeciality searchSpeciality={searchSpeciality} />


            <SpecialityList loader={loader} loading={loading} specialityValidationListsData={specialityValidationLists} specialityListsData={speciality} getSpecialityList={getSpecialityLists} getSpecialityRow={getSpecialityRow} selctedSpecialityValidationRow={selctedSpecialityValidationRow} selectedSpecialityId={ selectedSpecialityId}  />
            <div ref={scollToRef}>
                <SpecialityForm viewSpecialityFormData={specialityFormData} adding={adding } clearForm={clearForm} />
            </div>
            <Footer/>


        </>
    )
}

function SearchSpeciality(props)
{

    const searchSpeciality = (fdata) => {

        props.searchSpeciality(fdata);
    }
    return(
        <>
         <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Speciality Validation ID/Name</small>
                                <input type="text"  onKeyUp={(e) => searchSpeciality(e)} className="form-control" placeholder='Start typing speciality validation ID/name to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}



function SpecialityValidationRow(props) {

    return (
        <>
            <tr className={(props.selected && props.specialityValidationRow.specialty_list == props.selected.specialty_list ? ' tblactiverow ' : '')}

                onClick={() => props.getSpecialityList(props.specialityValidationRow.specialty_list)}
            >
                <td>{props.specialityValidationRow.specialty_list}</td>
                <td >{props.specialityValidationRow.exception_name}</td>
            </tr>
        </>
    )
}


function SpecialityDataRow(props) {

    useEffect(() => {

    }, [props.selected]);

    return (
        <>
            <tr
                className={(props.selected && props.specialityDataRow.specialty_id == props.selected.speciality_id ? ' tblactiverow ' : '')}
                onClick={() => props.getSpecialityRow(props.specialityDataRow)}

            >
                <td>{props.specialityDataRow.specialty_id}</td>
                <td>{props.specialityDataRow.specialty_status}</td>
            </tr>
        </>
    )
}

function SpecialityList(props) {


    const scollToRef = useRef();

    useEffect(() => { }, [props.selctedNdc]);

    const getSpecialityList = (speciality_id) => {
        props.getSpecialityList(speciality_id);
    }

    const getSpecialityRow = (specility_id) => {
        props.getSpecialityRow(specility_id);
    }

    //speciality Validation list rows
    const specialityValidationListsArray = [];
    if(props.specialityValidationListsData.length>0){
        for (let i = 0; i < props.specialityValidationListsData.length; i++) {
            specialityValidationListsArray.push(<SpecialityValidationRow specialityValidationRow={props.specialityValidationListsData[i]} getSpecialityList={getSpecialityList} selected={props.selctedSpecialityValidationRow} />);
        }
    }else{
        specialityValidationListsArray.push(<EmptyRowComponent colSpan='2'/>)
    }

    //speciality list rows
    const specialityDataArray = [];
    if (props.specialityListsData.length > 0) {
        for (let j = 0; j < props.specialityListsData.length; j++) {
            specialityDataArray.push(<SpecialityDataRow specialityDataRow={props.specialityListsData[j]} getSpecialityRow={getSpecialityRow} selected={props.selectedSpecialityId} />);
        }
    } else {
        specialityDataArray.push(<EmptyRowComponent colSpan='2'/>)
    }

    return (
        <>
          <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <h5>Speciality Validation List</h5>
                        </div>
                        <div className="col-md-4 mb-3 text-end">
                        </div>
                        <div className="col-md-6">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Speciality Validation ID</th>
                                                    <th>Speciality Validation Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            {props.loading?<LoadingSpinner colSpan='2'/>:specialityValidationListsArray}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card mt-3 mb-3">
                                <div className="card-body">
                                    <div style={{ height: '400px', overflowY: 'scroll' }}>
                                        <table className="table table-striped table-bordered" style={{ position: 'relative' }}>
                                            <thead className='stickt-thead'>
                                                <tr>
                                                    <th>Speciality ID</th>
                                                    <th>Speciality Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {props.loader?<LoadingSpinner colSpan='2'/>:specialityDataArray}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </>
    );
}

function SpecialityForm(props) {

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();

    const addSpecialityFormData = (specialityFormData) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(specialityFormData)
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/validationlist/speciality/submit-speciality-form`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('Content-Type')?.includes('application/json');
                const data = isJson && await response.json();
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
                }else {
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
                console.error('There was an error !', error);
            });
    }

    useEffect(() => {
        if (props.adding) {
            reset({ specialty_list: '', exception_name: '', specialty_id: '', specialty_status: '', new: 1 }, {
                keepValues: false,
            });
        } else {
            reset(props.viewSpecialityFormData);
        }
        if (!props.viewSpecialityFormData) {
            reset({ specialty_list: '', exception_name: '', specialty_id: '', specialty_status: '', new: 1 }, {
                keepValues: false,
            });
        }
    },[props.viewSpecialityFormData, props.adding])

    useEffect(() => { reset(props.viewSpecialityFormData) }, [props.viewSpecialityFormData]);
    return (
        <>
            <div className="card mt-3 mb-3">
                <form id="specialityForm" name="specialityForm" onSubmit={handleSubmit(addSpecialityFormData)}>
                    <input type="hidden" name="user_name" value={user.name} {...register('user_name')} />
                <div className="card-body">
                        <div className="col-md-12">
                                <h5 className="mb-2">Specialty Validations</h5>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Specialty List ID: </small>
                                    <input type="text" name="specialty_list" {...register('specialty_list', { required: true})} placeholder="Specialty List ID" className="form-control" />
                                    {errors.specialty_list && <span><p className="notvalid">This field is required!</p></span>}
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Specialty List Name: </small>
                                    <input type="text" name="exception_name" {...register('exception_name',{required:true})} placeholder="Specialty List Name" className="form-control" />
                                    {errors.exception_name && <span><p className="notvalid">This field is required!</p></span>}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group ">
                                         <small> Specialty ID: </small>
                                        <div className="searchmodal">
                                        <input type="text" name="specialty_id" {...register('specialty_id' ,{required:true })} className="form-control" placeholder="Specialty ID" autoComplete="off" />
                                        {errors.specialty_id && <span><p className="notvalid">This field is required!</p></span>}
                                       </div>
                                    </div>
                                </div>
                                 <div className="col-md-4 mb-3">
                                    <div className="form-group">
                                        <small> Specialty Status: </small>
                                            <select className="form-select" name="specialty_status" {...register('specialty_status', {required:true})}>
                                                <option value="">--select--</option>
                                                <option value="A">Approved</option>
                                                <option value="R">Rejected</option>
                                    </select>
                                    {errors.specialty_status && <span><p className="notvalid">This field is required!</p></span>}
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="col-md-12 text-end">
                        <button type="submit" className="btn btn-primary ">{ props.viewSpecialityFormData ?'Update':'Add' } </button>
                                     <button onClick={e=>props.clearForm(e)} type="button" className="btn btn-danger"> Clear </button>
                                </div>
                </form>

                    </div>
        </>
    );
}
