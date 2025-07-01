import { useState, useRef, Dispatch, SetStateAction } from 'react';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from '../../constants/articleProps';
import { articleDefaultPageState, ArticleState } from '../App';

import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';
import cn from 'classnames';
import styles from './ArticleParamsForm.module.scss';
import { useClickOutside } from './hooks/useClickOutside';

export type ArticleFormState = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

type ArticleParamsFormProps = {
	changePageState: Dispatch<SetStateAction<ArticleState>>;
};

export const ArticleParamsForm = ({
	changePageState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useClickOutside(rootRef, () => setIsMenuOpen(false), isMenuOpen);

	const articleDefaultFormState: ArticleFormState = {
		fontFamily: fontFamilyOptions[0],
		fontSize: fontSizeOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
	};

	const [formState, setFormState] = useState<ArticleFormState>(
		articleDefaultFormState
	);

	const handleChange = (key: keyof ArticleFormState, value: OptionType) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};

	const handleApply = () => {
		changePageState({
			fontFamily: formState.fontFamily.value,
			fontSize: formState.fontSize.value,
			fontColor: formState.fontColor.value,
			backgroundColor: formState.backgroundColor.value,
			contentWidth: formState.contentWidth.value,
		});
	};

	const handleReset = () => {
		setFormState(articleDefaultFormState);
		changePageState(articleDefaultPageState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				isOpen={isMenuOpen}
			/>
			<aside
				className={cn(styles.container, isMenuOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}
					onReset={(e) => {
						e.preventDefault();
						handleReset();
					}}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamily}
						onChange={(val) => handleChange('fontFamily', val)}
						placeholder='Выберите шрифт'
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(val) => handleChange('fontColor', val)}
						placeholder='Выберите цвет'
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSize}
						onChange={(val) => handleChange('fontSize', val)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(val) => handleChange('backgroundColor', val)}
						placeholder='Выберите цвет фона'
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(val) => handleChange('contentWidth', val)}
						placeholder='Выберите ширину'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' htmlType='reset' />
						<Button title='Применить' type='apply' htmlType='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
