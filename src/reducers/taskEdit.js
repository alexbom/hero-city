import { taskProps } from '../components/main/utils';

export default function taskEdit(state = taskProps(), action) {

    switch (action.type) {

        case 'TASK_CHANGE':

            return action.payload;

        case 'TASK_EDIT':

            return action.payload;

        case 'TASK_EDIT_CANCEL':

            return taskProps();

        case 'TASK_ITEM_SAVE':

            return action.payload;

    }

    return state;

}