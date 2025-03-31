import { Loading } from '@/components/layout/Loading';
import { Empty } from '@/components/shared/Empty';
import { PrivateRoute } from '@/components/shared/PrivateRoute';
import { TitleHead } from '@/components/shared/TitleHead';
import { trpc } from '@/lib/trpc';
import type { RouterOutput } from '@packages/trpc';
import { Role } from '@packages/types/enums';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as phoneMask from "utils/phoneMask"

type Candidate = RouterOutput["candidate"]["getById"]

function CandidateComponent() {
  const location = useLocation();
  const { id } = useParams();
  const { data: candidate, isLoading } = useQuery({
    queryKey: ['candidate-by-id'],
    queryFn: () => trpc.candidate.getById.query(id as string),
    enabled: !!id && !location.state,
    initialData: location.state as Candidate
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/listar-empregos');
    }
  }, [id, navigate]);


  if (!candidate || isLoading)
    return <Loading />

  return <section>
    <TitleHead
      title={
        <div className="flex gap-2 items-center">
          <h2 className="text-lg">{candidate.name}</h2>
          <span className="text-zinc-500">({candidate.title})</span>
        </div>
      }
      onBack={() => navigate("/listar-empregos")}
    />
    <section>
      <h1 className="font-semibold text-lg">Contato</h1>
      <span>{phoneMask.apply(String(candidate.phoneNumber))}</span>
    </section>
    <p className="whitespace-pre-line max-h-[20rem] overflow-auto text-sm mt-1">{candidate.description}</p>
    <section className="space-y-2 mt-6">
      <h1 className="font-semibold text-lg">Educação</h1>
      {candidate.education.length ? candidate.education.map((ed) => (
        <div key={ed.courseName} className="space-y-2 bg-white rounded p-2 border border-b-neutral-400 shadow-md">
          <div className="flex gap-2 justify-between">
            <h3 className="font-semibold">{ed.courseName}</h3>
            <span className="text-sm italic">{ed.institution}</span>
          </div>
          <div className="flex justify-between">
            <div><span className="font-semibold">Inicio:</span> <span>{format(ed.startDate, 'dd/MM/yyyy')}</span></div>
            <div><span className="font-semibold">Término:</span> <span>{format(ed.endDate, 'dd/MM/yyyy')}</span></div>
          </div>
        </div>
      )) : <Empty size="md" text="Ainda não há nenhum curso cadastrado." />}
    </section>
    <section className="space-y-2 mt-6">
      <h1 className="font-semibold text-lg">Experiência</h1>
      {candidate.experience.length ? candidate.experience.map((ex) => (
        <div key={ex.roleName} className="space-y-2 bg-white rounded p-2 border border-b-neutral-400 shadow-md">
          <div className="flex gap-2 justify-between">
            <h3 className="font-semibold">{ex.roleName}</h3>
            <span className="text-sm italic">{ex.businessName}</span>
          </div>
          <p className="max-h-60 overflow-auto whitespace-pre-line">
            {ex.description}
          </p>
          <div className="flex justify-between">
            <div><span className="font-semibold">Inicio:</span> <span>{format(ex.startDate, 'dd/MM/yyyy')}</span></div>
            <div><span className="font-semibold">Término:</span> <span>{format(ex.endDate, 'dd/MM/yyyy')}</span></div>
          </div>
        </div>
      )) : <Empty size="md" text="Ainda não há nenhum curso cadastrado." />}
    </section>
  </section>;
}

export const Candidate = (
  <PrivateRoute role={Role.business}>
    <CandidateComponent />
  </PrivateRoute>
)