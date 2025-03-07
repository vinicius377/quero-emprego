import { Outlet, useNavigate } from 'react-router-dom';

export function SignUp() {
  const navigate = useNavigate();

  return (
    <section>
      <button type="button" onClick={() => navigate('business')}>
        Empresa
      </button>
      <button type="button" onClick={() => navigate('candidate')}>
        Candidato
      </button>
      <Outlet />
    </section>
  );
}
