const initialState = { id: 1 };

export default function city(state = initialState, action) {

    switch (action.type) {

        case 'CITY_CHANGE':

            return { id: action.payload };

    }

    return state;

}