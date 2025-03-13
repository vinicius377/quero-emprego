import { NavLink } from 'react-router-dom';

export function UserType() {
  return (
    <div className="flex justify-between max-w-[22rem] m-auto">
      <NavLink role="button" to="empresa" className="w-full text-center">
        Empresa
      </NavLink>
      <NavLink role="button" to="candidato" className="w-full text-center">
        Candidato
      </NavLink>
    </div>
  );
}
