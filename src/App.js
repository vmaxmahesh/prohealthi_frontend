import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Router, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Clientgroup, { Charges as CGCharges, Identification as Cgi, Eligibility as CGEligibility, Indicators as CGIndicators, Strategy as CGStrategy } from './pages/dashboard/user/clientgroup/Clientgroup';
import Customer, { Eligibility, Exceptions, Identification, Indicators, Strategy } from './pages/dashboard/user/customer/Customer';
import Client, { Eligibility as Ce, Identification as Ci, Indicators as Cin, Coverage as CS } from './pages/dashboard/user/client/Client';
import Member, { ChnageLog, ClaimHistory, Coverage, CoverageHistory, Health, MemberForm, Notes, Overrides, PriorAuthorisation, ProviderSearch } from './pages/dashboard/members/Member';
import SearchProvider, { Provider, Effectivedates, PharmistSystem, NetworkParticipation } from './pages/dashboard/provider/SearchProvider';
import TraditionalNetworks, { Network, Providers } from './pages/dashboard/provider/TraditionalNetworks';
import FlexibleNetworks, { Rules } from './pages/dashboard/provider/FlexibleNetworks';
import PrioritizeNetwork from './pages/dashboard/provider/PrioritizeNetwork';
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
import PriceSchedule, { BrandItem, BrandItemGeneric, GetGenericItem } from './pages/dashboard/third party pricing/PriceSchedule';
import MacList from './pages/dashboard/third party pricing/MacList';
import TaxSchedule from './pages/dashboard/third party pricing/TaxSchedule';
import CopayStepSchedule from './pages/dashboard/third party pricing/CopayStepSchedule';
import CopaySchedule, { Generic, GenericItem, NonGeneric } from './pages/dashboard/third party pricing/CopaySchedule';
import ProcedureUCRList from './pages/dashboard/third party pricing/ProcedureUCRList';
import RVAList from './pages/dashboard/third party pricing/RVAList';
import NDC, { ProcessRule, RXLimitationPricing, ValidationsOverride } from './pages/dashboard/exceptionlist/ndc';
import GPI, { GPIProcessRule, GPIRXLimitationPricing, GPIValidationsOverride } from './pages/dashboard/exceptionlist/gpi';
import TherapyClass, { TCProcessRule, TCRXLimitationPricing, TCValidationsOverride } from './pages/dashboard/exceptionlist/TherapyClass';
import DrugClassification from './pages/dashboard/exceptionlist/DrugClassification';
import ExceptionProcedure from './pages/dashboard/exceptionlist/ExceptionProcedure';
import ExceptionReason from './pages/dashboard/exceptionlist/ExceptionReason';
import BenefitList from './pages/dashboard/exceptionlist/BenefitList';
import SuperProvider from './pages/dashboard/provider/SuperProvider';
import Prescriber from './pages/dashboard/prescriber/Prescriber'
import BenefitDerivation from './pages/dashboard/exceptionlist/BenefitDerivation';
import Benefits from './pages/dashboard/code/Benefits';
import DiagnosisValidation from './pages/dashboard/validation_lists/DiagnosisValidation';
import SpecialityValidation from './pages/dashboard/validation_lists/SpecialityValidation';
import EligibilityValidation from './pages/dashboard/validation_lists/EligibilityValidation';
import ProviderValidation from './pages/dashboard/validation_lists/ProviderValidation';
import PrescriberValidation from './pages/dashboard/validation_lists/PrescriberValidation';
import DiagnosisPrioritization from './pages/dashboard/validation_lists/DiagnosisPrioritization';
import AccumulatedBenefits, { ExclusionLimitation, Deductible } from './pages/dashboard/accumulated_benefits/AccumulatedBenefits';
import GPIExclusion from './pages/dashboard/accumulated_benefits/GPIExclusion';
import NDCExclusion from './pages/dashboard/accumulated_benefits/NDCExclusion';
import MajorMedicalMaximums from './pages/dashboard/accumulated_benefits/MajorMedicalMaximums';
import DrugDatabase, { Distribution, General, IDCodes, Pricing as DrugInformationPricing } from './pages/dashboard/drug_information/DrugDatabase';
import NDCCrossReference from './pages/dashboard/drug_information/NDCCrossReference';
import PricingStrategies from './pages/dashboard/strategies/PricingStrategies';
import CopayStrategy from './pages/dashboard/strategies/CopayStrategy';
import AccumulatedBenefitStrategy from './pages/dashboard/strategies/AccumulatedBenefitStrategy';
import PlanAssociation from './pages/dashboard/plan_design/PlanAssociation';
import PlanEdit, { DateLimitations, PlanEditNotes, PlanFormulary, RefillLimitations, RxLimitations } from './pages/dashboard/plan_design/PlanEdit';
import SuperProvider from './pages/dashboard/provider/SuperProvider';
import PrioritizeNetwork from './pages/dashboard/provider/PrioritizeNetworks';
import Prescriber from './pages/dashboard/prescriber/Prescriber';
import ProviderTypeValidation from './pages/dashboard/exceptionlist/ProviderTypeValidation';
import ProcedureCode from './pages/dashboard/exceptionlist/ProcedureCode';
import SuperBenefitList from './pages/dashboard/exceptionlist/SuperBenefitList';
import MembersData, { ChangeLogTab, ClaimHistoryTab, CoverageHistoryTab, HealthConditionsTab, MemberTab, NotesTab, OverridesTab, PriorAuthorizationTab, ProviderSearchTab } from './pages/dashboard/membership/MembersData';
import PriorAuthorization, { Authorization, PriorNotes, PriorPricing } from './pages/dashboard/membership/PriorAuthorization';
import PlanValidations from './pages/dashboard/membership/PlanValidation';
import { ProtectedRoute } from './hooks/ProtectedRoute';
import UserDefinition, { DataAccessTab, GroupForm, UDefinitionTab, UserDF } from './pages/dashboard/administrator/UserDefinition';

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

  // console.log('app.js');

  // if (!token) {
  //   return <Navigate to="login" replace />
  // }

  // useEffect(() => {
  //   //  if(!token) {
  //   // AuthMiddlware();
  //   //  }
  // }, [token]);

  const AuthMiddlware = () => {
    if (!token) {
      return <Navigate to="login" replace />
    }
  }

  return (

    <>

      <Routes>
        <Route exact path="/">
          {/* <Home /> */}
        </Route>

        {/* <ProtectedRoute> */}
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

          {/* <Route path="member" element={<Member />}>
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
          </Route> */}

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
        <Route path='provider' element={<SearchProvider />}>
          <Route index element={<Navigate to="provider" replace />} />

          <Route path='provider' element={<Provider />} />
          <Route path='effectivedates' element={<Effectivedates />} />
          <Route path='pharmistsystem' element={<PharmistSystem />} />

          <Route path='networkparticipation' element={<NetworkParticipation />} />
        </Route>

        <Route path='provider/superprovider' element={<SuperProvider />} />


        <Route path='provider/traditionalnetworks' element={<TraditionalNetworks />}>
          <Route index element={<Navigate to="network" replace />} />
          <Route path='network' element={<Network />} />
          <Route path='providers' element={<Providers />} />
        </Route>

        <Route path='provider/flexiblenetworks' element={<FlexibleNetworks />}>
          <Route index element={<Navigate to="network" replace />} />
          <Route path='network' element={<Network />} />
          <Route path='rules' element={<Rules />} />
        </Route>

        <Route path='provider/prioritizenetworks' element={<PrioritizeNetwork />}>

        </Route>


        <Route path='prescriber/' element={<Prescriber />}>

        </Route>


        <Route path='provider/superprovider' element={<SuperProvider />}></Route>

        <Route path='provider/prioritize-networks' element={<PrioritizeNetwork />}></Route>

        {/* codes routes start  */}

        <Route path="code/benefits" element={<Benifits />}>
          {/* third party pricing started  */}
          <Route path="third-party-pricing/price-schedule" element={<PriceSchedule />}>
            <Route index element={<Navigate to="brand-item" replace />} />
            <Route index path="brand-item" element={<BrandItem />} />
            <Route path="brand-item-generic" element={<BrandItemGeneric />} />
            <Route path="generic-item" element={<GetGenericItem />} />
          </Route>

          <Route path="third-party-pricing/copay-schedule" element={<CopaySchedule />}>
            <Route index element={<Navigate to="brand-item" replace />} />
            <Route path="brand-item" element={<NonGeneric />} />
            <Route path="brand-item-generic" element={<Generic />} />
            <Route path="generic-item" element={<GenericItem />} />
          </Route>

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
          <Route index element={<Navigate to="brand-item" replace />} />
          <Route index path="brand-item" element={<BrandItem />} />
          <Route path="brand-item-generic" element={<BrandItemGeneric />} />
          <Route path="generic-item" element={<GetGenericItem />} />
        </Route>

        <Route path="third-party-pricing/copay-schedule" element={<CopaySchedule />}>
          <Route index element={<Navigate to="brand-item" replace />} />
          <Route index path="brand-item" element={<NonGeneric />} />
          <Route path="brand-item-generic" element={<BrandItemGeneric />} />
          <Route path="generic-item" element={<GetGenericItem />} />
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

        <Route path="exception-list/provider-type-validation" element={<ProviderTypeValidation />}>
        </Route>

        <Route path="exception-list/procedure-code-list" element={<ProcedureCode />}>
        </Route>

        <Route path="exception-list/super-benefit-list" element={<SuperBenefitList />}>
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

        <Route path="accumulated-benefits/all" element={<AccumulatedBenefits />}>
          <Route index element={<Navigate to="exclusion-limitation" replace />} />
          <Route path="exclusion-limitation" element={<ExclusionLimitation />} />
          <Route path="deductible" element={<Deductible />} />
        </Route>

        <Route path="accumulated-benefits/gpi-exclusion" element={<GPIExclusion />}>
        </Route>

        <Route path="accumulated-benefits/ndc-exclusion" element={<NDCExclusion />}>
        </Route>

        <Route path="accumulated-benefits/major-medical-maximums" element={<MajorMedicalMaximums />}>
        </Route>
        {/* Accumulated Benefit Route Ends  */}

        {/* Drug Information Route starts */}
        <Route path="drug-information/drug-database" element={<DrugDatabase />}>
          <Route index element={<Navigate to="general" replace />} />
          <Route path='general' element={<General />} />
          <Route path='id-codes' element={<IDCodes />} />
          <Route path='distribution' element={<Distribution />} />
          <Route path='pricing' element={<DrugInformationPricing />} />
        </Route>

        <Route path='drug-information/ndc-gpi-cross-reference' element={<NDCCrossReference />}>
        </Route>
        {/* Drug information route ends */}

        {/* strategies route started */}
        <Route path="strategies/pricing-startegy" element={<PricingStrategies />} />
        <Route path="strategies/copay-strategy" element={<CopayStrategy />} />
        <Route path="strategies/accumulated-benefits-strategy" element={<AccumulatedBenefitStrategy />} />
        {/* strategies route ends  */}

        {/* plan design route starts  */}
        <Route path="plan-design/plan-association" element={<PlanAssociation />} />
        <Route path="plan-design/plan-edit" element={<PlanEdit />} >
          <Route index element={<Navigate to="plan-formulary" replace />} />
          <Route path="plan-formulary" element={<PlanFormulary />} />
          <Route path="rx-limitations" element={<RxLimitations />} />
          <Route path="date-limitations" element={<DateLimitations />} />
          <Route path="refill-limitations" element={<RefillLimitations />} />
          <Route path="notes" element={<PlanEditNotes />} />
        </Route>
        {/* plan design route ends  */}

        {/* Prescriber route starts  */}
        <Route path="prescriber-data/prescriber" element={<Prescriber />}></Route>
        {/* Prescriber route ends  */}

        {/* Membership route starts  */}
        <Route path="membership/member" element={<MembersData />}>
          <Route index element={<Navigate to="member" />}></Route>
          <Route path="member" element={<MemberTab />} />
          <Route path="overrides" element={<OverridesTab />} />
          <Route path="coverage-history" element={<CoverageHistoryTab />} />
          <Route path="health-conditions" element={<HealthConditionsTab />} />
          <Route path="notes" element={<NotesTab />} />
          <Route path="claim-history" element={<ClaimHistoryTab />} />
          <Route path="prior-authorization" element={<PriorAuthorizationTab />} />
          <Route path="provider-search" element={<ProviderSearchTab />} />
          <Route path="change-log" element={<ChangeLogTab />} />
        </Route>

        <Route path='membership/prior-authorization' element={<PriorAuthorization />}>
          <Route index element={<Navigate to="authorization" />}></Route>
          <Route path='authorization' element={<Authorization />} />
          <Route path='pricing' element={<PriorPricing />} />
          <Route path='notes' element={<PriorNotes />} />
        </Route>

        <Route path='membership/plan-validations' element={<PlanValidations />}>
        </Route>
        {/* membership route ends  */}

        {/* administrator route starts  */}
        <Route path='administrator/user-definition' element={<UserDefinition />}>
          <Route index element={<Navigate to="definition" />} />
          <Route path='definition' element={<UDefinitionTab />} />

          <Route path='data-access' element={<DataAccessTab />} />
          <Route path='group' element={<GroupForm />} />

        </Route>


        {/* administrator route ends  */}
        {/* </Route> */}
        {/* </ProtectedRoute> */}
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