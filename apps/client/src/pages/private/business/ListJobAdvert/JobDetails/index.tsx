import { PrivateRoute } from '@/components/shared/PrivateRoute';
import { trpc } from '@/lib/trpc';
import { useQueries } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as moneyMask from '@/utils/moneyMask';
import parse from 'html-react-parser';
import { Role, StatusJob } from '@packages/types/enums';
import { StatusJobUtils } from '@/utils/status';
import { PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

function JobDetailsComponent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [
    { data: job, isLoading: jobLoading },
    { data: applications, isLoading: applicationLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['job-by-id'],
        queryFn: () => trpc.jobAdvert.getById.query(id as string),
        enabled: !!id,
      },
      {
        queryKey: ['list-application-by-job'],
        queryFn: () => trpc.jobApplication.listByJobAdvert.query(id as string),
        enabled: !!id,
      },
    ],
  });
  const currentStatus = StatusJobUtils[job?.status ?? StatusJob.opened]

  useEffect(() => {
    if (!id) {
      navigate('/listar-empregos');
    }
  }, [id, navigate]);

  if (jobLoading || applicationLoading || !job || !applications)
    return <div>Carregando...</div>;

  return (
    <section>
      <div
        className="rounded p-2 px-[2rem]"
        style={{ boxShadow: '0 0 4px 0 rgba(0,0,0,0.3)' }}
      >
        <div className="flex justify-between">
          <span>{job.title}</span>
          <span>{moneyMask.apply(job.remuneration || 0)}</span>
        </div>
        <div className="flex justify-between max-h-60 overflow-auto">
          <p className="text-sm text-[#828282]">{parse(job.description)}</p>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className='w-4 h-4 rounded-[50%]' style={{ background: currentStatus.color }}></div>
            <span>{currentStatus.label}</span>
          </div>
          <Button onClick={() => navigate("editar")}>
            <div className='flex gap-2'>
              Editar
              <PencilLine />
            </div>
          </Button>
        </div>

      </div>
      <section>
        {applications.map((x) => (
          <div key={x._id}>
            <div>
              <h2>{x.candidateId.name}</h2> <span>{x.candidateId.title}</span>
            </div>
            <p>{x.candidateId.description}</p>
          </div>
        ))}
      </section>
    </section>
  );
}

export const JobDetails = (
  <PrivateRoute role={Role.business}>
    <JobDetailsComponent />
  </PrivateRoute>
);
