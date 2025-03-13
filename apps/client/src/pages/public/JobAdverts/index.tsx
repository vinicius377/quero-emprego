import { useQuery } from '@tanstack/react-query';
import { trpc } from 'lib/trpc';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as moneyMask from '@/utils/moneyMask';
import { Button } from '@/components/ui/button';
import { userService } from '@/services/user.service';
import { useAtomValue } from 'jotai';

export function JobsAdverts() {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ['job-advert'],
    queryFn: () => trpc.jobAdvert.list.query({ page: 1, size: 10 }),
  });
  const navigate = useNavigate();
  const user = useAtomValue(userService.user);

  if (isLoading) return <div>Carregando</div>;

  const applyToJob = (id: string) => async () => {
    try {
      const appliedJob = await trpc.jobApplication.apply.mutate({
        jobAdvertId: id,
      });
    } catch (e) {
      if (e.message === 'Token invalido') {
        navigate('/login/candidato');
      }
      toast.error(e.message);
    }
  };

  return (
    <section className="space-y-2">
      {jobs?.map((job) => (
        <div
          className="rounded p-2"
          key={job._id}
          style={{ boxShadow: '0 0 4px 0 rgba(0,0,0,0.3)' }}
        >
          <div className="flex justify-between">
            <span>{job.title}</span>
            <span>{moneyMask.appy(job.remuneration || 0)}</span>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-[#828282]">{job.description}</p>
            {user?.role === 'candidate' && (
              <Button
                disabled={job.applied}
                type="button"
                onClick={applyToJob(job._id)}
                className="cursor-pointer"
              >
                Aplicar
              </Button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
