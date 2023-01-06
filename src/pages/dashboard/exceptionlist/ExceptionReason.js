import React, { useEffect, useRef, useState } from 'react';

export default function ExceptionReason()
{
    return(

        <div>
        <>
                <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="breadcrum">
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Exception List</a></li>
                            <li><i className="fas fa-angle-right"></i></li>
                            <li><a href="">Reason Codes</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="breadcrum ">
                        <ul>
                          <li className="float-end m-0">
                            <a href="">Page Hint <i className="fa-solid fa-lightbulb"></i></a>
                          </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-4'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className='col-md-8'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>-</th>
                            <th>-</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
                </div>
          </div>

          <div className='card'>
            <div className='card-body'>

           

          <form>
          <div className='row'>
              <h5 className=' mb-3'>Reason Code List</h5>
              <div className='col-md-6'>
              <div className='form-group'>
                <p>ID</p>
                <input type={'text'} className='form-control'></input>
              </div>
              </div>
              <div className='col-md-6'>
              <div className='form-group'>
                <p>Name</p>
                <input type={'text'} className='form-control'></input>
              </div>
              </div>
          </div>

          <div className='row'>
              <h5 className=' mt-3 mb-3'>Reason Code</h5>
              <div className='col-md-6'>
              <div className='form-group'>
                <p >Reject Code:</p>
                <select className='form-select'>
                    <option>Select</option>
                </select>
              </div>
              </div>
              <div className='col-md-6'>
              <div className='form-group'>
                <p className=''>Reason Code:</p>
                <input type={'text'}    className='form-control'></input>
                <a href=""><span class="fa fa-search form-icon"></span></a>
              </div>
              </div>

              <div className='col-md-6'>
              <div className='form-group'>
                <p>Effective Date:</p>
                <input type={'date'} className='form-control'></input>
              </div>
              </div>
              <div className='col-md-6'>
              <div className='form-group'>
                <p>Temination Date:</p>
                <input type={'date'} className='form-control'></input>
              </div>
              </div>
          </div>


        </form>
        </div>
          </div>
        </>
        </div>

        

    )
}



