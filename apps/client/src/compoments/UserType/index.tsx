import { useNavigate } from 'react-router-dom';

export function UserType() {
  const navigate = useNavigate();

  return (
    <div>
      <button type="button" onClick={() => navigate('empresa')}>
        Empresa
      </button>
      <button type="button" onClick={() => navigate('candidato')}>
        Candidato
      </button>
    </div>
  );
}
