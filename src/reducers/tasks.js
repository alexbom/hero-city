const initialState = [];

export default function tasks(state = initialState, action) {

    switch (action.type) {

        case 'TASK_CREATE':

            return [...state, action.payload];

        case 'TASK_DELETE':

            _.remove(state, task => task.id === action.payload);

            return [...state];

        case 'TASK_SAVE':

            var found = _.find(state, task => task.id === action.payload.id);

            for (let i in action.payload) {
                found[i] = action.payload[i];
            }

            return [...state];

        case 'TASK_TOGGLE':

            var found = _.find(state, task => task.id === action.payload);

            found.isHidden = ! found.isHidden;

            return [...state];

        case 'TASK_STATUS':

            var found = _.find(state, task => task.id === action.payload.taskId);

            found.status = action.payload.status;

            return [...state];

        case 'TASK_LIKE':

            var found = _.find(state, task => task.id === action.payload.taskId),
                index = found.likes.indexOf(action.payload.userId);

            if (index === -1) {
                found.likes.push(action.payload.userId);
            } else {
                found.likes.splice(index, 1);
            }

            return [...state];

        case 'TASK_APPLICANT':

            var found = _.find(state, task => task.id === action.payload.taskId),
                index = found.applicants.indexOf(action.payload.userId);

            if (index === -1) {
                found.applicants.push(action.payload.userId);
            } else {
                found.applicants.splice(index, 1);
            }

            return [...state];

        case 'TASK_GET':

            return action.payload;

    }

    return state;

}