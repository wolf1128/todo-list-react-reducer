import { createContext } from 'react';
import { initialState } from './TaskState';

const taskContext = createContext(initialState);

export default taskContext;