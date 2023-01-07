import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';



async function loginUser(credentials) {
    return fetch(process.env.REACT_APP_API_BASEURL + '/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .catch(e => console.log(e))
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const { login, errors, user } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {

        if (user) {
            navigate("/dashboard");
        }
    });

    const handleSubmit = async e => {
        e.preventDefault();

        console.log('logging>>>>>>')

        login({
            USER_ID: username,
            USER_PASSWORD: password
        });

        console.log('code completed');
    }

    useEffect(() => {
        // if (errors) {
            console.log(errors);
        // }
    }, [errors]);

    return (
        <>
            <div className="login-left">
                <div className="flight">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="images/login-slide1.png" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="images/login-slide2.png" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="images/login-slide3.png" className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev d-none" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next d-none" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="clearfix mt-5"></div>


                    <div className="row">
                        <div className="col-md-3 p-0">
                            <p className="news-title">Latest News</p>
                        </div>
                        <div className="col-md-9 p-0 bg-white">
                            {/* onMouseOver="this.stop()" onMouseOut="this.start()" */}
                            <marquee>
                                <p>In healthcare, the ability to diagnose early can be the difference between life and death </p>
                            </marquee>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-right text-center">
                <div className="login">
                    <center>
                        <img src="images/prohealthi-logo-black.png" className="img-fluid" alt="ProHealthi" title="ProHealthi" />
                    </center>
                    <h5 className="title"><b>Login</b></h5>
                    <center>
                        <img src="images/logos.png" className="img-fluid" alt="ProHealthi" title="ProHealthi" />
                    </center>
                    <form onSubmit={handleSubmit}>
                        <div className="gorm-group">
                            <select className="form-select">
                                <option>Select your Login Type</option>
                                <option>Login as a Admin</option>
                                <option>Login as a Super Admin</option>
                                <option>Login asa a Vendor</option>
                            </select>
                        </div>
                        <div className="gorm-group">
                            <input type="text" name="USER_ID" id="username" onChange={e => setUserName(e.target.value)} className="form-control" placeholder="Username" required />
                        </div>
                        <div className="gorm-group mb-4">
                            <input type="password" name="USER_PASSWORD" id="password" onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                        </div>
                        <button type="submit" className="btn btn-theme" value="" style={{ width: '100%' }}>login</button>
                    </form>
                </div>

                <div className="powered">
                    <small>Powered by SYNE Technologies</small>
                </div>

            </div>
        </>

    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}