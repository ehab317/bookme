import { combineReducers } from 'redux';

import { user } from './user';
import { menu } from './menu';
import { business } from './business';
import { units } from './units';
import { events } from './event';

export default combineReducers ({
    user,
    menu,
    business,
    units,
    events
});