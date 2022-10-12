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

import SearchProvider, { Provider,Effectivedates,PharmistSystem } from './pages/dashboard/user/provider/SearchProvider';





import Membership, { SearchById, SearchByName } from './pages/dashboard/members/Membership';
import PlanAuthorisation, { Authorisation, PANotes, Pricing } from './pages/dashboard/members/PlanAuthorisation';
import PlanValidation from './pages/dashboard/members/PlanValidation';
import useToken from './hooks/useToken';



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



          </Route>





        </Route>

















    </Routes>
    </>

  );
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