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
import Benifits from './pages/dashboard/code/Benefits';
import Procedure from './pages/dashboard/code/Procedure';
import Diagnosis from './pages/dashboard/code/Diagnosis';
import Reason from './pages/dashboard/code/Reason';
import CauseOfLoss from './pages/dashboard/code/CauseOfLoss';
import ServiceModifiers from './pages/dashboard/code/ServiceModifiers';
import ServiceType from './pages/dashboard/code/ServiceType';
import ProviderType from './pages/dashboard/code/ProviderType';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PriceSchedule from './pages/dashboard/third party pricing/PriceSchedule';
import MacList from './pages/dashboard/third party pricing/MacList';
import TaxSchedule from './pages/dashboard/third party pricing/TaxSchedule';
import CopayStepSchedule from './pages/dashboard/third party pricing/CopayStepSchedule';
import CopaySchedule from './pages/dashboard/third party pricing/CopaySchedule';
import ProcedureUCRList from './pages/dashboard/third party pricing/ProcedureUCRList';
import RVAList from './pages/dashboard/third party pricing/RVAList';
import NDC, { ProcessRule, RXLimitationPricing, ValidationsOverride } from './pages/dashboard/exceptionlist/ndc';
import GPI, { GPIProcessRule, GPIRXLimitationPricing, GPIValidationsOverride } from './pages/dashboard/exceptionlist/gpi';
import TherapyClass, { TCProcessRule, TCRXLimitationPricing, TCValidationsOverride } from './pages/dashboard/exceptionlist/TherapyClass';
import DrugClassification from './pages/dashboard/exceptionlist/DrugClassification';
import ExceptionProcedure from './pages/dashboard/exceptionlist/ExceptionProcedure';
import ExceptionReason from './pages/dashboard/exceptionlist/ExceptionReason';
import BenefitList from './pages/dashboard/exceptionlist/BenefitList';
import BenefitDerivation from './pages/dashboard/exceptionlist/BenefitDerivation';
import Benefits from './pages/dashboard/code/Benefits';
import DiagnosisValidation from './pages/dashboard/validation_lists/DiagnosisValidation';
import SpecialityValidation from './pages/dashboard/validation_lists/SpecialityValidation';
import EligibilityValidation from './pages/dashboard/validation_lists/EligibilityValidation';
import ProviderValidation from './pages/dashboard/validation_lists/ProviderValidation';
import PrescriberValidation from './pages/dashboard/validation_lists/PrescriberValidation';
import DiagnosisPrioritization from './pages/dashboard/validation_lists/DiagnosisPrioritization';
// import AccumulatedBenefits from './pages/dashboard/accumulated_benefits/AccumulatedBenefits';

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
          {/* <Route index element={<Navigate to="d" replace />} />

          <Route path='d' element={<Dashboardpage />} /> */}
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

          <Route path="code/benefits" element={<Benefits />}>

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

          {/* codes routes start  */}

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

          {/* codes routes ends  */}

          {/* third party pricing started  */}
          <Route path="third-party-pricing/price-schedule" element={<PriceSchedule />}>
          </Route>

          <Route path="third-party-pricing/copay-schedule" element={<CopaySchedule />}>
          </Route>

          <Route path="third-party-pricing/copay-step-schedule" element={<CopayStepSchedule />}>
          </Route>

          <Route path="third-party-pricing/MAC-list" element={<MacList />}>
          </Route>

          <Route path="third-party-pricing/procedure-UCR-list" element={<ProcedureUCRList />}>
          </Route>

          <Route path="third-party-pricing/tax-schedule" element={<TaxSchedule />}>
          </Route>

          <Route path="third-party-pricing/RAV-list" element={<RVAList />}>
          </Route>

          {/* third party pricing ends  */}

          {/* exception list route starts  */}

          <Route path="exception-list/ndc" element={<NDC />}>
            <Route index element={<Navigate to="process-rule" replace />} />
            <Route path='process-rule' element={<ProcessRule />} />
            <Route path='rx-limitation-pricing' element={<RXLimitationPricing />} />
            <Route path='validation-override' element={<ValidationsOverride />} />
          </Route>

          <Route path="exception-list/gpi" element={<GPI />}>
            <Route index element={<Navigate to="process-rule" replace />} />
            <Route path='process-rule' element={<GPIProcessRule />} />
            <Route path='rx-limitation-pricing' element={<GPIRXLimitationPricing />} />
            <Route path='validation-override' element={<GPIValidationsOverride />} />
          </Route>



          <Route path="exception-list/therapy-class" element={<TherapyClass />}>
            <Route index element={<Navigate to="process-rule" replace />} />
            <Route path='process-rule' element={<TCProcessRule />} />
            <Route path='rx-limitation-pricing' element={<TCRXLimitationPricing />} />
            <Route path='validation-override' element={<TCValidationsOverride />} />
          </Route>

          <Route path="exception-list/drug-classification" element={<DrugClassification />}>
          </Route>

          <Route path="exception-list/procedure" element={<ExceptionProcedure />}>
          </Route>

          <Route path="exception-list/reason" element={<ExceptionReason />}>
          </Route>

          <Route path="exception-list/benefit-list" element={<BenefitList />}>
          </Route>

          <Route path="exception-list/benefit-derivation" element={<BenefitDerivation />}>
          </Route>


          {/* exception list route ends  */}

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



          {/* validation list route starts  */}
          <Route path="validation-lists/diagnosis" element={<DiagnosisValidation />}>
          </Route>

          <Route path="validation-lists/speciality" element={<SpecialityValidation />}>
          </Route>

          <Route path="validation-lists/eligibility" element={<EligibilityValidation />}>
          </Route>

          <Route path="validation-lists/provider" element={<ProviderValidation />}>
          </Route>

          <Route path="validation-lists/prescriber" element={<PrescriberValidation />}>
          </Route>

          <Route path="validation-lists/diagnosis-prioritization" element={<DiagnosisPrioritization />}>
          </Route>

          {/* validation list route ends  */}

          {/* Accumulated Benefit Route Starts  */}

          {/* <Route path="accumulated-benefits/all" element={<AccumulatedBenefit />}>
          </Route> */}

          {/* Accumulated Benefit Route Ends  */}


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