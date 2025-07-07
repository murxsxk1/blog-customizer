import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

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
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
