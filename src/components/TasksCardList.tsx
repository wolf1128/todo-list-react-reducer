import React, { useContext } from 'react';
import TaskContext from '../context/task/taskContext';
import Input from './Input';
import styles from './TasksCardList.module.css';

const TasksCardList = () => {
	const taskContext = useContext(TaskContext);
	const { tasks, removeTask, updateTaskTitle, updateTaskStatus } = taskContext;

	const [updatedTask, setUpdatedTask] = React.useState('');
	const [showUpdateInput, setShowUpdateInput] = React.useState(false);
	const [selectedTaskId, setSelectedTaskId] = React.useState<number>();

	const updateTaskHandler = (
		taskId: number,
		task: string,
		updatedTask: string
	) => {
		setUpdatedTask(task);
		if (updatedTask.length === 0) return;

		updateTaskTitle(taskId, updatedTask);
		setUpdatedTask('');
		setShowUpdateInput(false);
	};

	return (
		<ul className={styles.TasksList}>
			{tasks.map((item, index) => {
				return (
					<div key={index}>
						{/* React tracks the elements in the list in the child element. */}
						<li className={styles.TaskItem}>
							{showUpdateInput && selectedTaskId === item.id ? (
								<>
									<Input
										placeholder={item.title}
										value={updatedTask}
										onChangeHandler={setUpdatedTask}
									/>

									<button
										className={styles.TaskItemButton}
										onClick={() =>
											updateTaskHandler(item.id, item.title, updatedTask)
										}
									>
										Apply
									</button>
								</>
							) : (
								<>
									<div>
										<input
											id={'taskTitle-' + item.id}
											type="checkbox"
											onChange={() => updateTaskStatus(item.id)}
											checked={item.isFinished}
										/>
										<label
											htmlFor={'taskTitle-' + item.id}
											style={
												item.isFinished
													? { textDecoration: 'line-through' }
													: {}
											}
										>
											{item.title}
										</label>
									</div>
									<span className={styles.TaskItemButtons}>
										<button
											className={styles.TaskItemButton}
											onClick={() => {
												setShowUpdateInput((prevValue) => !prevValue);
												setSelectedTaskId(item.id);
											}}
										>
											UPDATE
										</button>
										<button
											className={styles.TaskItemButton}
											onClick={() => removeTask(item.id)}
										>
											DELETE
										</button>
									</span>
								</>
							)}
						</li>
					</div>
				);
			})}
		</ul>
	);
};

export default TasksCardList;
