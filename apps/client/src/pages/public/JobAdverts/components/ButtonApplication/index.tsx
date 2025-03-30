import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import type { JobAdvert } from '@/types/JobAdvert';
import type { TokenData } from '@/types/TokenData';
import { Role, StatusJob } from '@packages/types/enums';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ButtonApplicationProps {
	user: TokenData | null;
	job: JobAdvert;
	onDone: () => void;
}

export function ButtonApplication({
	user,
	job,
	onDone,
}: ButtonApplicationProps) {
	const isClosedAndWasApplied = job.applied && job.status !== StatusJob.opened;
	const navigate = useNavigate();

	const applyToJob = (id: string) => async () => {
		if (!user) {
			navigate('/login/candidato');
			toast.info('Faça o login primeiro');
			return;
		}

		try {
			await trpc.jobApplication.apply.mutate({
				jobAdvertId: id,
			});
			onDone();
		} catch (e) {
			if (e.message === 'Token invalido') {
				navigate('/login/candidato');
			}
			toast.error(e.message);
		}
	};

	return (
		<div className="flex w-full">
			{job.status !== StatusJob.opened && !isClosedAndWasApplied ? (
				<span className="ml-auto text-sm text-gray-500">
					A vaga não aceita mais candidatos.
				</span>
			) : (
				user?.role !== Role.business && (
					<Button
						disabled={job.applied}
						type="button"
						onClick={applyToJob(job._id)}
						className="ml-auto mt-auto cursor-pointer"
					>
						{job.applied ? 'Aplicado' : 'Aplicar'}
					</Button>
				)
			)}
		</div>
	);
}
