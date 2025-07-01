import { useEffect } from 'react';

export const useClickOutside = (
	ref: React.RefObject<HTMLDivElement>,
	onClose: () => void,
	isOpen: boolean
) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (e: MouseEvent) => {
			if (
				ref.current &&
				e.target instanceof Node &&
				!ref.current.contains(e.target)
			) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, ref, onClose]);
};
