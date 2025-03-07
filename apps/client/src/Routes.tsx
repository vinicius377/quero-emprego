import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { SignUpBusiness } from './pages/SignUp/Business';
import { SignUpCandidate } from './pages/SignUp/Candidate';

export function RoutePages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />}>
          <Route index path="business" element={<SignUpBusiness />}/>
          <Route index path="candidate" element={<SignUpCandidate />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
