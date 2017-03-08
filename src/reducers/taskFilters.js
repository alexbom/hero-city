export default function taskFilters(state = '', action) {
    if (action.type === 'TASK_FIND') {
        return action.payload;
    }
    return state;
}