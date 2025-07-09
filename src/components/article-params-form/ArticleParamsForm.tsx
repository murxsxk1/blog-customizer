import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

export const ArticleParamsForm = ({
	onApply,
}: {
	onApply: (settings: typeof defaultArticleState) => void;
}) => {
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

	const handleArrowClick = () => {
		setIsPanelOpen(!isPanelOpen);
	};

	const handleApplyClick = () => {
		const applyStates = {
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		};
		onApply(applyStates);
	};

	const handleResetClick = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isPanelOpen &&
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsPanelOpen(false);
			}
		};

		if (isPanelOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isPanelOpen]);

	useEffect(() => {
		const handleClickEscape = (event: KeyboardEvent) => {
			event.key === 'Escape' && setIsPanelOpen(false);
		};

		if (isPanelOpen) {
			document.addEventListener('keydown', handleClickEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleClickEscape);
		};
	});

	return (
		<>
			<ArrowButton isOpen={isPanelOpen} onClick={handleArrowClick} />
			<aside
				ref={containerRef}
				className={clsx(styles.container, {
					[styles.container_open]: isPanelOpen,
				})}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<Text uppercase={true} size={31} weight={800}>
						задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={setFontFamily}
					/>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						name='размер шрифта'
						selected={fontSize}
						onChange={setFontSize}
					/>
					<Select
						title='цвет шрифта'
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
					/>
					<Select
						title='ширина контента'
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleResetClick}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleApplyClick}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
