import { Routes, Route } from 'react-router-dom';
import { Login } from './public/Login';
import { SignUp } from './public/SignUp';
import { SignUpBusiness } from './public/SignUp/Business';
import { SignUpCandidate } from './public/SignUp/Candidate';
import { BusinessLogin } from './public/Login/Business';
import { CandidateLogin } from './public/Login/Candidate';
import { CreateJobAdvert } from './private/business/CreateJobAdvert';
import { JobsAdverts } from './public/JobAdverts';
import { ListJobAdvert } from './private/business/ListJobAdvert';
import { JobDetails } from './private/business/ListJobAdvert/JobDetails';

export function RoutePages() {
  return (
    <Routes>
      <Route path="/" element={<JobsAdverts />} />
      <Route path="login" element={<Login />}>
        <Route path="empresa" element={<BusinessLogin />} />
        <Route path="candidato" element={<CandidateLogin />} />
      </Route>
      <Route path="signup" element={<SignUp />}>
        <Route index path="empresa" element={<SignUpBusiness />} />
        <Route index path="candidato" element={<SignUpCandidate />} />
      </Route>
      <Route path="criar-emprego" element={CreateJobAdvert} />
      <Route path="listar-empregos" element={ListJobAdvert} />
      <Route path="listar-empregos/:id" element={JobDetails} />
    </Routes>
  );
}
