import api from './core.js';

import goods from './modules/goods.js'
import order from './modules/order.js'

api.goods = goods;
api.order = order;

export default api;
