import Github from 'assets/github.svg';
import { Linkedin } from 'lucide-react';

export function Footer() {
	return (
		<footer className="bg-zinc-200 p-2 px-3">
			<div className="flex gap-2 text-md">
				<span className="text-xs">Created by </span>
				<div className="flex gap-1 items-center">
					<img src={Github} alt="github-icon" width="15" />
					<strong className="text-xs">
						<a
							href="https://github.com/vinicius377"
							rel="noreferrer"
							target="_blank"
						>
							@vinicius377
						</a>
					</strong>
				</div>
				<div className="flex gap-1">
					<Linkedin size="20" />
					<strong className="text-xs">
						<a
							href="https://www.linkedin.com/in/vinicius-aguiar11/"
							rel="noreferrer"
							target="_blank"
						>
							Vinicius Aguiar
						</a>
					</strong>
				</div>
			</div>
		</footer>
	);
}
