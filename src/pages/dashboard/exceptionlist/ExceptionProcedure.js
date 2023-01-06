import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Tab, Tabs } from 'react-bootstrap';
<style>

</style>

export default function ExceptionProcedure() {
    return(
        <>

       
            <div  className="row">
                    <div  className="col-md-6 mb-3">
                        <div  className="breadcrum">
                            <ul>
                                <li><a href="">Home</a></li>
                                <li><i  className="fas fa-angle-right"></i></li>
                                <li><a href="">Exception List</a></li>
                                <li><i  className="fas fa-angle-right"></i></li>
                                <li><a href="">Procedure Code list</a></li>
                            </ul>
                        </div>
                    </div>
                    <div  className="col-md-6 mb-3">
                        <div  className="breadcrum ">
                            <ul>
                                <li  className="float-end m-0"><a href="">Page Hint <i  className="fa-solid fa-lightbulb"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>


                <SearchDrugClassification  />

                <div className='card mt-3 mb-3'>
                    <div className='card-body'>
                           <div className="col-md-12 mb-3">
                                <h5>Procedure Codes</h5>
                            </div>
                        <div className='row'>
                            <div className='col-md-4'>
                            <table className='table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Canopy_EX1</td>
                                        <td>Canopy Exceptions</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            <div className='col-md-8'>
                            <table className='table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Procedure Code List Id</th>
                                        <th>Effective Date</th>
                                        <th>New Claim Status</th>
                                        <th>Process Rule</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                      <td>***</td>
                                      <td>2015-03-02 </td>
                                      <td>NF</td>
                                      <td>R</td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>


                <ExceptionListItems />

        </>
    )
}




function SearchDrugClassification(props)
{
    const{register, handleSubmit, watch, formState : {errors}} = useForm();
    const[drugClassificationList, setdrugClassificationList] = useState('');
    const[drugClassificationClass, setdrugClassificationClass] = useState('');



    const searchException = (fdata) => {
        // alert(fdata);

        props.searchException(fdata);
    }


    const showSearchResult = (e) => {
        var arr = [
            {drug_classification_id : '5621', name : 'drug clssification one'},
            {drug_classification_id : '5372', name : 'drug clssification two'},
            {drug_classification_id : '8368', name : 'drug clssification three'}
        ];
        var class_arr = [
            {class : 'clas one', eff_date : '12/12/2022', progress_status : 'success/true', process_rule : 'rule 1'},
            {class : 'clas two', eff_date : '15/12/2022', progress_status : 'success/true', process_rule : 'rule 2'},
            {class : 'clas three', eff_date : '18/12/2022', progress_status : 'success/true', process_rule : 'rule 3'},
            {class : 'clas four', eff_date : '120/12/2022', progress_status : 'success/true', process_rule : 'rule 4'},
        ];
        setdrugClassificationList(arr);
        setdrugClassificationClass(class_arr);
    }
    useEffect(() => {}, [drugClassificationList, drugClassificationClass]);

    return(
        <>
        <form onSubmit={handleSubmit(showSearchResult)}>
        <div className="card mt-3 mb-3">
                <div className="card-body">                    
                        <div className="row mb-2">
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <small>ID</small>
                                <input type="text" className="form-control" onKeyUp={(e) => searchException(e)} placeholder='Enter drug classification ID to search' {...register("drug_classification_id",{required:true})}/>
                                {errors.drug_classification_id && <span><p className='notvalid'>This field is required</p></span>}
                                </div>
                            </div>
                            
                        </div>
                    </div>
        </div>
        </form>
        </>
    )
}



{ /* Nav Tabs*/ }

 export function ExceptionListItems() {
  return (
    <div>
      <>
      <Tabs defaultActiveKey="home">
            <Tab eventKey="home" title="Procedure Rules">
                <Procedure />
            </Tab>            
            <Tab eventKey="profile" title="Procedure Limitations" id="prlimit">
                <PRLimitation />
            </Tab>
        </Tabs>
      </>
    </div>
  )
}

function Procedure() {
    return (
        <>
    <div className="tab-pane fade show active " id="Rules" role="tabpanel" aria-labelledby="nav-home-tab">
       <div className='card'>
        <div className='card-body'>
            <form>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <p>ID:</p>
                            <input type={'text'} className='form-control'></input>
                            </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='form-group'>
                            <p>Name:</p>
                            <input type={'text'} className='form-control'></input>
                            </div>
                    </div>
                </div>
                <h5 className='mb-3 mt-3'>Procedure Rules</h5>
                <div className='row'>
                    <div className='col-md-6 p-relative'>
                        <label>Proc.Code List ID :</label>
                        <input type={'text'} className='form-control'></input>
                        <a href="" className=''><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>Service Modifier:</label>
                        <input type={'text'} className='form-control'></input>
                        <a href=""><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>Diognosis ID:</label>
                        <input type={'text'} className='form-control'></input>
                        <a href=""><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>Benefit Code:</label>
                        <input type={'text'} className='form-control'></input>
                        <a href=""><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-6'>
                        <label>Effective Date:</label>
                        <input type={'date'} className='form-control'></input>
                    </div>
                    <div className='col-md-6 '>
                        <label>Termination Date:</label>
                        <input type={'date'} className='form-control'></input>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>Service Type:</label>
                        <input type={'text'} className='form-control'></input>
                        <a href=""><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>Provider Type:</label>
                        <input type={'text'} className='form-control'></input>
                        <a href=""><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>New Claim Status:</label>
                      <select className='form-select'>
                      <option>Select</option>
                        <option>Approved.NonFormularly</option>
                      </select>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>Process Rule:</label>
                        <select className='form-select'>
                        <option>Select</option>
                        <option>Reject if status indicates or limitations are exceeded</option>
                      </select>
                    </div>

                    <div className='col-md-6'>
                        <div className="form-group mt-3">
                            <input type="checkbox" id="user" className="d-none" />
                            <label htmlFor="user">User will Exit will not be Invoked for this Section</label>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-6'>
                    <h5 className='mb-3 mt-3'>List Validations</h5>
                      </div>
                      <div className='col-md-6'>
                    <h5 className='mb-3 mt-3'>Strategy Validations</h5>
                      </div>
                    </div>

                    <div className='row'>
                    <div className='col-md-6 p-relative'>
                        <label>Prescriber List:</label>
                        <input type={'text'} className='form-control'></input>
                        <a href=""><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>Pricing Strategy:</label>
                        <input type={'text'} className='form-control'></input>
                        <a href=""><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>Specially List:</label>
                        <input type={'text'} className='form-control'></input>
                        <a href=""><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>Acc Bene Strategy ID:</label>
                        <input type={'text'} className='form-control'></input>
                        <a href=""><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>Diagnosis List:</label>
                        <input type={'text'} className='form-control'></input>
                        <a href=""><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-6 p-relative'>
                        <label>Copy Strategy ID:</label>
                        <input type={'text'} className='form-control'></input>
                        <a href=""><span class="fa fa-search form-icon"></span></a>
                    </div>
                    <div className='col-md-12'>
                        <h5 className='mb-3 mt-3'>Message</h5>
                    </div>
                    <div className='col-md-6'>
                        <label>Message:</label>
                        <input type={'text'} className='form-control'></input>
                    </div>
                    <div className='col-md-6'>
                        <label>Stop Date:</label>
                        <input type={'date'} className='form-control'></input>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group mt-3">
                            <input type="checkbox" id="reject" className="d-none" />
                            <label htmlFor="reject">Message Sent Only When Transaction is Rejected</label>
                        </div>
                    </div>
                    </div>
            </form>
        </div>
       </div>
    </div>
    </>
    )
}


function PRLimitation() {
    return (
        <>
    <div className="tab-pane fade show active" id="prlimit" role="tabpanel" aria-labelledby="nav-home-tab">
       <div className='card'>
    <div className='card-body'>
        <form>
            <h5 className='mt-3 mb-3'>Limitations</h5>
            <div className='row align-items-center'>
                <div className='col-md-4'>
                </div>
                <div className='col-md-4'>
                        <p>Min</p>
                </div>
                <div className='col-md-4'>
                        <p>Max</p>
                </div>

                <div className='col-md-4'>
                  <p>Price</p>
                </div>
                <div className='col-md-4'>
                   <input type={'text'} className='form-control'></input>
                </div>
                <div className='col-md-4'>
                   <input type={'text'} className='form-control'></input>
                </div>

                <div className='col-md-4'>
                  <p>Age:</p>
                </div>
                <div className='col-md-4'>
                   <input type={'text'} className='form-control'></input>
                </div>
                <div className='col-md-4'>
                   <input type={'text'} className='form-control'></input>
                </div>

                <div className='col-md-4'>
                  <p>Quantity Over Time:</p>
                </div>
                <div className='col-md-4'>
                 
                </div>
                <div className='col-md-4'>
                   <input type={'text'} className='form-control'></input>
                </div>

                <div className='col-md-4'>
                  <p>Coverage Start Days:</p>
                </div>
                <div className='col-md-4'>
                 
                </div>
                <div className='col-md-4'>
                   <input type={'text'} className='form-control'></input>
                </div>

                <div className='col-md-4'>
                  <p>UCR:</p>
                </div>
                <div className='col-md-4'>
                 
                </div>
                <div className='col-md-4'>
                   <input type={'text'} className='form-control'></input>
                </div>

                <div className='col-md-12'>
                <h5 className='mt-3 mb-3'>Member Restrictions</h5>
                </div>

                <div className='col-md-6'>
                    <div className='form-group'>
                        <p>Valid Relationship</p>
                        <select className='form-select'>
                            <option>Select</option>
                        </select>
                    </div>
                </div>

                <div className='col-md-6'>
                    <div className='form-group'>
                        <p>Gender Restriction: </p>
                        <div className='d-flex mt-2'>
                <div className="radio">
                    <span className='form-check'>
                        <input type="radio" value="Male" checked={true} className=' me-3 form-check-input'/>
                        Male
                    </span>
                    </div>
                    <div className="radio">
                    <span className='form-check'>
                        <input type="radio" value="Female" className='me-3 ms-3 form-check-input'/>
                        Female
                    </span>
                    </div>
                    <div className="radio">
                    <span className='form-check'>
                        <input type="radio" value="None" className='me-3 ms-3 form-check-input' />
                        None
                    </span>
                </div>
            </div>
                    </div>
                </div>
            </div>
        </form>
        </div>
       </div>
    </div>
    </>
    )
}

