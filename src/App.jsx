import React, { useState } from 'react';
import styles from './App.module.css';

function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueValid = value.length >= 3;

	const onInputButtonClick = () => {
		const promptValue = prompt();

		if (promptValue.length >= 3) {
			setValue(promptValue);
			setError('');
		} else {
			setError('Введенное значение должно содержать минимум 3 символа');
		}
	};

	const onAddButtonClick = () => {
		if (value.length >= 3) {
			const date = new Date();

			const day = String(date.getDate()).padStart(2, '0');
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();
			const hours = String(date.getHours()).padStart(2, '0');
			const minutes = String(date.getMinutes()).padStart(2, '0');
			const seconds = String(date.getSeconds()).padStart(2, '0');

			const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
			setList((prev) => [...prev, { id: Date.now(), value, formattedDate }]);
			setValue('');
			setError('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: "
				<output className={styles.currentValue}>{value}</output>"
			</p>
			{error !== '' ? <div className={styles.error}>{error}</div> : ''}
			<div className={styles.buttonsContainer}>
				<button onClick={onInputButtonClick} className={styles.button}>
					Ввести новое
				</button>
				<button
					onClick={onAddButtonClick}
					className={styles.button}
					disabled={!isValueValid}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{list.length ? (
					<ul className={styles.list}>
						{list.map(({ value, id, formattedDate }) => (
							<li key={id}>
								{value} <span>{formattedDate}</span>
							</li>
						))}
					</ul>
				) : (
					<p className={styles.noMarginText}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	);
}
export default App;
