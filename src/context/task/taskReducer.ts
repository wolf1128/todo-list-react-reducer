import { ADD_TASK, REMOVE_TASK, UPDATE_TASK_STATUS, UPDATE_TASK_TITLE } from '../types';

type State = {
	task?: {
		id: number;
		title: string;
		isFinished: boolean;
	};
	tasks?: {
		id: number;
		title: string;
		isFinished: boolean;
	}[];
	selectedTab?: number;
};

interface Payload {
	task: {
		id: number;
		title: string;
		isFinished: boolean;
	};
	tasks: {
		id: number;
		title: string;
		isFinished: boolean;
	}[];
	selectedTab: number;
}
interface Action {
	type:
		| 'ADD_TASK'
		| 'ADD_TASK'
		| 'REMOVE_TASK'
		| 'UPDATE_TASK_TITLE'
		| 'UPDATE_TASK_STATUS'
		| 'SEARCH_TASK';
	payload: Partial<Payload>;
}

const taskReducer = (state: State, action: Action) => {
	switch (action.type) {
		case ADD_TASK:
			return {
				...state,
				tasks: [...state.tasks!, action.payload.task!], // NOTE: The new tasks here will be replaced with the previous tasks in the state.
			};
		case REMOVE_TASK:
			return {
				...state,
				tasks: action.payload.tasks,
				selectedTab: action.payload.selectedTab,
			};
		case UPDATE_TASK_TITLE:
			return {
				...state,
				tasks: action.payload.tasks,
				selectedTab: action.payload.selectedTab,
			};
		case UPDATE_TASK_STATUS:
			return {
				...state,
				tasks: action.payload.tasks,
			};

		default:
			return state;
	}
};

export default taskReducer;
