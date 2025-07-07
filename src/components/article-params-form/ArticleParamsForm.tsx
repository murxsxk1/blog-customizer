import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

export const ArticleParamsForm = () => {
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	const handleArrowClick = () => {
		setIsPanelOpen(!isPanelOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isPanelOpen} onClick={handleArrowClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isPanelOpen,
				})}>
				<form className={styles.form}>
					<Text uppercase={true} size={31} weight={800}>
						задайте параметры
					</Text>
					<Select title='шрифт' selected={null} options={fontFamilyOptions} />
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						name=''
						selected={fontSizeOptions[0]}
					/>
					<Select title='цвет шрифта' selected={null} options={fontColors} />
					<Separator />
					<Select
						title='цвет фона'
						selected={null}
						options={backgroundColors}
					/>
					<Select
						title='ширина контента'
						selected={null}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
