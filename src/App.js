import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Router, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Clientgroup, { Charges as CGCharges, Identification as Cgi, Eligibility as CGEligibility, Indicators as CGIndicators, Strategy as CGStrategy } from './pages/dashboard/user/clientgroup/Clientgroup';
import Customer, { Eligibility, Exceptions, Identification, Indicators, Strategy } from './pages/dashboard/user/customer/Customer';
import Client, { Eligibility as Ce, Identification as Ci, Indicators as Cin, Coverage as CS } from './pages/dashboard/user/client/Client';
import Member, { ChnageLog, ClaimHistory, Coverage, CoverageHistory, Health, MemberForm, Notes, Overrides, PriorAuthorisation, ProviderSearch } from './pages/dashboard/members/Member';

import SearchProvider, { Provider, Effectivedates, PharmistSystem, NetworkParticipation } from './pages/dashboard/user/provider/SearchProvider';

import TraditionalNetworks, { Network, Providers } from './pages/dashboard/user/provider/TraditionalNetworks';

import FlexibleNetworks, { Rules } from './pages/dashboard/user/provider/FlexibleNetworks';

import Membership, { SearchById, SearchByName } from './pages/dashboard/members/Membership';
import PlanAuthorisation, { Authorisation, PANotes, Pricing } from './pages/dashboard/members/PlanAuthorisation';
import PlanValidation from './pages/dashboard/members/PlanValidation';
import useToken from './hooks/useToken';
import Benifits from './pages/dashboard/code/Benifits';
import Procedure from './pages/dashboard/code/Procedure';
import Diagnosis from './pages/dashboard/code/Diagnosis';
import Reason from './pages/dashboard/code/Reason';
import CauseOfLoss from './pages/dashboard/code/CauseOfLoss';
import ServiceModifiers from './pages/dashboard/code/ServiceModifiers';
import ServiceType from './pages/dashboard/code/ServiceType';
import ProviderType from './pages/dashboard/code/ProviderType';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));

}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const { token, setToken } = useToken();

console.log('app.js');

  // if (!token) {
  //   return <Navigate to="login" replace />
  // }

  return (

    <>


      <Routes>
        <Route exact path="/">
          {/* <Home /> */}
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path='user/client' element={<Client />} >
            <Route index element={<Navigate to="identification" replace />} />
            <Route path='identification' element={<Ci />} />
            <Route path='strategy' element={<CS />} />
            <Route path='eligibility' element={<Ce />} />
            <Route path='indicators' element={<Cin />} />

          </Route>

          <Route path='user/client-group' element={<Clientgroup />} >
            <Route index element={<Navigate to="identification" replace />} />
            <Route path='identification' element={<Cgi />} />
            <Route path='strategy' element={<CGStrategy />} />
            <Route path='eligibility' element={<CGEligibility />} />
            <Route path='indicators' element={<CGIndicators />} />
            <Route path='charges' element={<CGCharges />} />
          </Route>

          <Route path='user/customer' element={<Customer />} >
            <Route index element={<Navigate to="identification" replace />} />
            <Route path='identification' element={<Identification />} />
            <Route path='strategy' element={<Strategy />} />
            <Route path='eligibility' element={<Eligibility />} />
            <Route path='indicators' element={<Indicators />} />
            <Route path='exceptions' element={<Exceptions />} />
          </Route>

          <Route path="member" element={<Member />}>
            <Route index element={<Navigate to="member" replace />} />
            <Route path='member' element={<MemberForm />} />
            <Route path='overrides' element={<Overrides />} />
            <Route path='coverage' element={<Coverage />} />
            <Route path='coverage-history' element={<CoverageHistory />} />
            <Route path='health-conditions' element={<Health />} />
            <Route path='notes' element={<Notes />} />
            <Route path='claim-History' element={<ClaimHistory />} />
            <Route path='authorizations' element={<PriorAuthorisation />} />
            <Route path='provider' element={<ProviderSearch />} />
            <Route path='change' element={<ChnageLog />} />
          </Route>

          <Route path="membership" element={<Membership />}>
            <Route index element={<Navigate to="search-by-id" replace />} />
            <Route path='search-by-id' element={<SearchById />} />
            <Route path='search-by-name' element={<SearchByName />} />
          </Route>

          <Route path="plan-authorisations" element={<PlanAuthorisation />}>
            <Route index element={<Navigate to="authorization" replace />} />
            <Route path='authorization' element={<Authorisation />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='notes' element={<PANotes />} />
          </Route>


          <Route path="plan-validations" element={<PlanValidation />}>

          </Route>


          <Route path='user/searchprovider' element={<SearchProvider />}>
            <Route index element={<Navigate to="provider" replace />} />

            <Route path='provider' element={<Provider />} />
            <Route path='effectivedates' element={<Effectivedates />} />
            <Route path='pharmistsystem' element={<PharmistSystem />} />

            <Route path='networkparticipation' element={<NetworkParticipation />} />


          </Route>


          <Route path='user/provider/traditionalnetworks' element={<TraditionalNetworks />}>
            <Route index element={<Navigate to="network" replace />} />

            <Route path='network' element={<Network />} />
            <Route path='providers' element={<Providers />} />



          </Route>



          <Route path='user/provider/flexiblenetworks' element={<FlexibleNetworks />}>
            <Route index element={<Navigate to="network" replace />} />

            <Route path='network' element={<Network />} />
            <Route path='rules' element={<Rules />} />



          </Route>

          <Route path="code/benefits" element={<Benifits />}>

          </Route>

          <Route path="code/procedure" element={<Procedure />}>

          </Route>

          <Route path="code/diagnosis" element={<Diagnosis />}>

          </Route>

          <Route path="code/reason" element={<Reason />}>

          </Route>

          <Route path="code/cause-of-loss" element={<CauseOfLoss />}>
          </Route>

          <Route path="code/service-modifiers" element={<ServiceModifiers />}>
          </Route>

          <Route path="code/service-type" element={<ServiceType />}>
          </Route>

          <Route path="code/provider-type" element={<ProviderType />}>
          </Route>



        </Route>

















      </Routes>

      <ToastContainer />
    </>

  );
}

export function Loading(props) {
  return (
    <>
      <svg
        style={{ margin: 'auto', background: 'rgb(255, 255, 255)', display: 'block', shapRendering: 'auto', animationPlayState: 'running', animationDelay: '0s' }}
        width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <path fill="none" stroke="#e90c59" stroke-width="8" stroke-dasharray="42.76482137044271 42.76482137044271"
          d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
          stroke-linecap="round"
          style={{ transform: 'scale(0.8)', transformOrigin: '50px 50px', animationPlayState: 'running', animationDelay: '0s' }}>
          <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1"
            values="0;256.58892822265625" style="animation-play-state: running; animation-delay: 0s;"></animate>
        </path>
      </svg>
    </>
  )
}

export function UnAuthRoutes(params) {
  const { token, setToken } = useToken();



  return (
    <>
      <Routes >
        <Route path="/login" element={<Login setToken={setToken} />} />

      </Routes>
    </>
  )

}
// const PrivateRoute = ({ children, authed, ...rest }) =>
//   <Route
//     {...rest}
//     render={(props) => authed ?
//       <div>
//         {children.map(children, child => cloneElement(child, { ...child.props }))}
//       </div>
//       :
//       <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
//   />

// export  PrivateRoute;

// export function PrivateRoute({ children, authed, ...rest }) {
//   {

//     return (
//       <>
//         <Route
//           {...rest}
//           render={(props) => authed ?
//             <div>
//               {children.map(children, child => cloneElement(child, { ...child.props }))}
//             </div>
//             :
//             <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
//         />
//       </>
//     )
//   }

// }

export default App