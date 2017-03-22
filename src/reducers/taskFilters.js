export default function taskFilters(state = '', action) {

    switch (action.type) {

        case 'TASK_FIND':

            return action.payload;

    }

    return state;

}