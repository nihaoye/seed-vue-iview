import api from '../core.js';

export default {
    addOrder(query) {
        return api.sendAjax({
            url: '/shopuser/tshopuser/adduser',
            method: 'post',
            data: query,
        })
    },
    getOrderList(query, page, pageSize) {
        query.page = page;
        query.pageSize = pageSize
        return api.sendAjax({
            url: '/shopuser/tshopuser/oplist',
            params: query,
        })
    },
}
