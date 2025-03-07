import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { SignUpBusiness } from './SignUp/Business';
import { SignUpCandidate } from './SignUp/Candidate';
import { BusinessLogin } from './Login/Business';
import { CandidateLogin } from './Login/Candidate';

export function RoutePages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} >
          <Route path="empresa" element={<BusinessLogin />}/>
          <Route path="candidato" element={<CandidateLogin />}/>
        </Route>
        <Route path="signup" element={<SignUp />}>
          <Route index path="empresa" element={<SignUpBusiness />}/>
          <Route index path="candidato" element={<SignUpCandidate />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
