import React, { useEffect, useState } from "react";
import axios from 'axios';

// const [query, setQuery] = useState("");
// const [data, setData] = useState([]);
// const [searchList, setSearchList] = useState([]);

// useEffect(() => {
//     const fetchData = async () => {
//         const res = await axios.get('http://localhost:8000/api/administrator/zipcode/search');
//         setData(res.data);
//     };
//     fetchData();
// }, []);

// useEffect(() => {
//     setSearchList(data.filter((authorData) => authorData['author'].toLowerCase().includes(query)));
// }, [query, data]);


function Zipcodes() {

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

            <div className="card mt-3 mb-3">
                <div className="card-body">
                    <Ziptable/>
                    <Zipform/>
                </div>
            </div>




        </>

    );
}




export function Ziptable(props) {

    return (
        <>
            <div className="row">

                <div className="col-md-12">
                    {/* <input placeholder="Search.." onChange={(e) => setQuery(e.target.value.toLowerCase())}/> */}
                    <input placeholder="Search.." onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
                    {/* <div>{searchList}</div> */}
                </div>

                <div className="col-md-12 mb-3">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Zip Code</th>
                                <th>City</th>
                                <th>State</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>Kingston</td>
                                <td>Tr</td>
                            </tr>
                            <tr>
                                <td>02</td>
                                <td>St Andrew</td>
                                <td>Tr</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}


export function Zipform(props) {

    return (
        <>

            <div className="row">
                <div className="col-md-12">
                    <h5 className="mb-2">Zip Code</h5>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <small>Zip Code</small>
                        <input type="text" className="form-control" name="" id="" placeholder="" required />
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <small>City</small>
                        <input type="text" className="form-control" name="" id="" placeholder="" required />

                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <small>State / Country</small>
                        <div className="row">
                            <div className="col-md-6">
                                <select className="form-select">
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <select className="form-select">
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="form-group">
                        <small>County</small>
                        <input type="text" className="form-control" name="" id="" placeholder="" required />
                    </div>
                </div>
            </div>

            <div className="row text-end">
                <div className="col">
                    <button className="btn btn-primary btn-lg">Add</button>
                    <button className="btn btn-secondary btn-lg" style={{marginLeft:'5px'}}>Reset</button>
                </div>
            </div>

        </>
    )
}



export default Zipcodes;