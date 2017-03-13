const initialState = [];

export default function tasks(state = initialState, action) {
    if (action.type === 'TASK_CREATE') {

        return [...state, action.payload];

    } else if (action.type === 'TASK_DELETE') {

        _.remove(state, task => task.id === action.payload);

        return [...state];

    } else if (action.type === 'TASK_SAVE') {

        let found = _.find(state, task => task.id === action.payload.id);

        for (let k in action.payload) {
            found[k] = action.payload[k];
        }

        return [...state];

    } else if (action.type === 'TASK_TOGGLE') {

        let found = _.find(state, task => task.id === action.payload);

        found.isHidden = ! found.isHidden;

        return [...state];

    } else if (action.type === 'TASK_STATUS') {

        let found = _.find(state, task => task.id === action.payload.taskId);

        found.status = action.payload.status;

        return [...state];

    } else if (action.type === 'TASK_LIKE') {

        let found = _.find(state, task => task.id === action.payload.taskId);
        const pos = found.likes.indexOf(action.payload.userId);

        if (pos === -1) {
            found.likes.push(action.payload.userId);
        } else {
            found.likes.splice(pos, 1);
        }

        return [...state];

    } else if (action.type === 'TASK_APPLICANT') {

        let found = _.find(state, task => task.id === action.payload.taskId);
        const pos = found.applicants.indexOf(action.payload.userId);

        if (pos === -1) {
            found.applicants.push(action.payload.userId);
        } else {
            found.applicants.splice(pos, 1);
        }

        return [...state];

    } else if (action.type === 'TASK_LOAD') {

        return [...state];

    } else if (action.type === 'TASK_GET') {

        return action.payload;

    }

    return state;
}