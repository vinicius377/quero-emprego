import { StatusJobUtils } from '@/utils/status';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateJobAdvertValidator } from '@packages/validators/job/update-job-advert';
import { PrivateRoute } from '@/components/shared/PrivateRoute';
import { Role, StatusJob } from '@packages/types/enums';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/lib/trpc';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import JoditEditor from 'jodit-react';
import { Button } from '@/components/ui/button';
import type { z } from 'zod';
import { toast } from 'react-toastify';
import { TitleHead } from '@/components/shared/TitleHead';

type UpdateJobAdvert = z.infer<typeof updateJobAdvertValidator>;

function EditJobComponent() {
	const { id } = useParams();
	const { data: job } = useQuery({
		queryKey: ['job-by-id'],
		queryFn: () => trpc.jobAdvert.getById.query(id as string),
		enabled: !!id,
	});
	const {
		reset,
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm({
		resolver: zodResolver(updateJobAdvertValidator),
	});
	const navigate = useNavigate();
	const currentStatus = StatusJobUtils[watch('status') ?? StatusJob.opened];

	useEffect(() => {
		if (!id) {
			navigate('/listar-empregos');
		}
	}, [id, navigate]);

	useEffect(() => {
		if (job) {
			reset({
				...job,
				id: job._id,
			});
		}
	}, [job, reset]);

	const onSubmit = async (data: UpdateJobAdvert) => {
		try {
			await trpc.jobAdvert.edit.mutate(data);
			toast.success('Post de emprego atualizado');
		} catch (e) {
			toast.error(e.message);
		}
	};

	return (
		<section>
			<TitleHead
				title="Editar post"
				onBack={() => navigate(`/listar-empregos/${id}`)}
			/>
			<form
				className="rounded p-2 px-[2rem]"
				style={{ boxShadow: '0 0 4px 0 rgba(0,0,0,0.3)' }}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex justify-between gap-4">
					<Input {...register('title')} />
					<Input {...register('remuneration')} />
				</div>
				<div className="flex justify-between max-h-60 mt-2 overflow-auto">
					<JoditEditor
						value={watch('description')}
						onChange={(val) => setValue('description', val)}
					/>
				</div>
				<div className="flex justify-between mt-2">
					<div className="flex gap-2 items-center">
						<div
							className="w-4 h-4 rounded-[50%]"
							style={{ background: currentStatus.color }}
						/>
						<Select
							onValueChange={(val) => setValue('status', val as StatusJob)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Selecione um status" />
							</SelectTrigger>
							<SelectContent>
								{Object.values(StatusJobUtils).map((status) => (
									<SelectItem value={status.value} key={status.value}>
										{status.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<Button disabled={isSubmitting} type="submit">
						Salvar
					</Button>
				</div>
			</form>
		</section>
	);
}

export const EditJob = (
	<PrivateRoute role={Role.business}>
		<EditJobComponent />
	</PrivateRoute>
);
