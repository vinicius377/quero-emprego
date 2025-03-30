import { ChevronLeft } from 'lucide-react';

interface Props {
	title: string | React.ReactNode;
	onBack: () => void;
}

export function TitleHead({ title, onBack }: Props) {
	return (
		<div className="flex gap-2 min-h-10 items-center">
			<button onClick={onBack} type="button" className="cursor-pointer">
				<ChevronLeft color="#c4c4c4"/>
			</button>
			<h3 className="font-semibold text-zinc-900">{title}</h3>
		</div>
	);
}