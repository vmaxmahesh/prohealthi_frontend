import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import Footer from '../../../shared/Footer';
import AsyncSelect from 'react-select/async';
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/AuthProvider";
import EmptyRowComponent from "../../../shared/NoDataFound";




function Zipcodes() {



    const scollToRef = useRef();

    const [zipCodeData, setZipCodeData] = useState([]);
    const [selectedZipCode, setSelectedZipCode] = useState('');
    const [adding, setAdding] = useState(false);

    const searchZipCode = (fdata) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        };

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/zipcode/search?search=${fdata.target.value}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setZipCodeData([]);
                    return Promise.reject(error);

                } else {
                    setZipCodeData(data.data);
                    return;
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const getZipCodes = (zip_code_id) => {

        var test = {};
        test.zip_code_list = zip_code_id;
        setSelectedZipCode(test);
        const requestOptions = {
            method: 'GET',
            // mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            // body: encodeURIComponent(data)
        };
        // //  console.log(watch(fdata));

        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/zipcode/get/${zip_code_id}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                //  console.log(response);

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    setSelectedZipCode([]);
                    return Promise.reject(error);
                } else {
                    // console.log(data.data);
                    setSelectedZipCode(data.data);
                    setAdding(true);

                    scollToRef.current.scrollIntoView()
                }

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const clearForm = (e) => {
        setAdding(false);
        setSelectedZipCode([]);
        document.getElementById('zipCodeForm').reset();
    }

    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Membership Data</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Zip Codes</a></li>
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
            <SearchZipCodes searchZipCode={searchZipCode} />
            <Ziptable zipCodeList={zipCodeData} getZipCode={getZipCodes} selectedZipCode={selectedZipCode} />
            <div ref={scollToRef}>
                <Zipform selectedZipCodeValue={selectedZipCode} clearForm={clearForm} adding={adding} />
            </div>
            <Footer />
        </>

    );
}

function SearchZipCodes(props) {
    const searchZipCode = (fdata) => {
        props.searchZipCode(fdata);
    }

    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="row mb-2">
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <small>Zip Codes Search </small>
                                <input type="text" onKeyUp={(e)=> searchZipCode(e)} className="form-control" placeholder='Start typing Zip Code/City to search'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// loop zip codes list here
function Ziptable(props) {

    const [selectedZipCode, setSelectedZipCode] = useState('');

    useEffect(() => { }, [props.selectedZipCode]);

    const getZipCode = (zip_code_id) => {
        props.getZipCode(zip_code_id);
    }

    const zipCodeListArray = [];
    if (props.zipCodeList.length > 0) {
        for (let i = 0; i < props.zipCodeList.length; i++){
            zipCodeListArray.push(<ZipCodeRowComp key={"zipCodeRow" + i} zipCodeRow={props.zipCodeList[i]} getZipCode={ getZipCode } selected={props.selectedZipCode} />);
        }
    } else {
        //for no data found
        zipCodeListArray.push(<EmptyRowComponent colspan='3' key='zipCodeRowEmpty'/>);
    }


    return (
        <>
            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <div className="col-md-12">
                        <h5 className="mb-2">Zip Code List</h5>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div style={{    height: '400px', overflowY: 'scroll'}}>
                                <table className="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Zip Code</th>
                                            <th>City</th>
                                            <th>State</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {zipCodeListArray}
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


function Zipform(props) {

    const { register, reset, handleSubmit, control , formState: { errorss } } = useForm();
    useEffect(() => { reset(props.selectedZipCodeValue) }, [props.selectedZipCodeValue]);

    const { user } = useAuth();

    // console.log(props.selectedZipCodeValue.state);
// for state-----------
    const [inputStateValue, setStateValue] = useState('');
    const [selectedStateValue, setSelectedStateValue] = useState(props.selectedZipCodeValue.state);

    // States - handle input change event
  const handleInputStateChange = value => {
    setStateValue(value);
    };

     //States - handle selection
  const handleStateChange = value => {
    setSelectedStateValue(value);
  }

//States -   load options using API call
    const loadStateOptions = (inputStateValue) => {
        // console.log(inputStateValue);
        return new Promise((resolve, reject) => {


            fetch(process.env.REACT_APP_API_BASEURL + `/api/state/search/${inputStateValue}`)
                .then((response) => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ state_code,description }) => ({
                            value: state_code,
                            label: description,
                        })),
                    );
                    // console.log(data);
                });
        });
    };

    // console.log(props.selectedZipCodeValue.country_code,'ssss');
//for country -----------
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(props.selectedZipCodeValue.country_code);

    // handle input change event
  const handleInputChange = value => {
    setValue(value);
    };

     // handle selection
    const handleChange = value => {
    setSelectedValue(value);
  }

//   load options using API call

    const loadOptions = (inputValue) => {
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_BASEURL + `/api/countries/search/${inputValue}`)
                .then((response) => response.json())
                .then(({ data }) => {
                    resolve(
                        data.map(({ country_code,description }) => ({
                            value: country_code,
                            label: country_code,
                        })),
                    );
                    // console.log(data);
                });
        });
    };

    useEffect(() => {

        if (props.adding) {
            reset({ zip_code: '',county:'',  new: 1 }, {
                keepValues: false,
            })
        } else {
            reset(props.selected);
        }

        if (!props.selected) {
            reset({ zip_code: '',county:'', new: 1 }, {
                keepValues: false,
            })
        }

    }, [props.selected, props.adding]);


    // form  submit add zip codes
    const addZipCode = (userFormData) => {
        var CryptoJS = require("crypto-js");

        const requestOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userFormData)
            // body: CryptoJS.AES.encrypt(JSON.stringify(userFormData), 'my-secret-key@123').toString()
        }
        fetch(process.env.REACT_APP_API_BASEURL + `/api/administrator/zipcode/submit`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                // console.log(data.data);
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
    // const onSubmit = (data) => console.log(data);

    return (
        <>
            <form id='zipCodeForm' name='zipCodeForm' onSubmit={handleSubmit(addZipCode)}>
                <div className="card mt-3 mb-3">
                    <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="mb-2">Zip Code</h5>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>Zip Code</small>
                                    <input type="text" className="form-control" name="zip_code"  {...register('zip_code', { required: true })} id="zip_code" placeholder="" required />
                                    <input type="hidden" className="form-control" name="user_name" {...register('user_name')} value={user.name} />
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>City</small>
                                    <input type="text" className="form-control" name="city" id="city" {...register('city',{required: true })} placeholder="" required />

                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">

                                <div className="row">
                                        <div className="col-md-6">
                                        <small>State</small>
                                        <Controller  name="state_code"
                                                control={control}
                                                // rules={{ required: false }}
                                                render={({ field }) => (
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                {...field}
                                                isClearable
                                                // value={selectedStateValue}
                                                // inputValue={props.selectedZipCodeValue.state_code}
                                                // getOptionLabel={e => e.label}
                                                // getOptionValue={e => e.value}
                                                loadOptions={loadStateOptions}
                                                onInputChange={handleInputStateChange}
                                                // onChange={handleStateChange}
                                                    />
                                                    )} />

                                    </div>
                                        <div className="col-md-6">
                                            <small>Country</small>
                                            <Controller  name="country_code"
                                                control={control}
                                                // rules={{ required: false }}
                                                render={({ field }) => (
                                                    <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                {...field}
                                                // value={selectedValue}
                                                // getOptionLabel={e => e.label}
                                                // getOptionValue={e => e.value}
                                                loadOptions={loadOptions}
                                                onInputChange={handleInputChange}
                                                // onChange={handleChange}
                                                isClearable
                                                                            />
                                                 )} />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="form-group">
                                <small>County</small>
                                <input type="text" {...register('county' )} className="form-control" name="county" id="county" placeholder="County" required />
                            </div>
                        </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-12 text-end">
                <button type='button' onClick={e => props.clearForm(e)} className='btn btn-outline btn-sm'>{props.adding ? "Clear" : "Add"} Item</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="submit"  className="btn btn-theme pt-2 pb-2">{props.adding ? 'Update' : 'Add'}</button>

                </div>
                <div className="form-group">

                </div>
            </form>


        </>
    )
}


function ZipCodeRowComp(props) {

    useEffect(() => {

    }, [props.selected]);

    return (
        <>
            <tr className={(props.selected && props.zipCodeRow.zip_code == props.selected.zip_code ? ' tblactiverow ' : '')}

                onClick={() => props.getZipCode(props.zipCodeRow.zip_code)}
            >
                <td>{props.zipCodeRow.zip_code}</td>
                <td >{props.zipCodeRow.city}</td>
                <td >{props.zipCodeRow.state}</td>
            </tr>
        </>
    )
}

export default Zipcodes;