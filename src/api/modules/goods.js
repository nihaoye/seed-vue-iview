import api from '../core.js';

export default {
    addGoods(query) {
        return api.sendAjax({
            url: '/shopuser/tshopuser/adduser',
            method: 'post',
            data: query,
        })
    },
    getGoodsList(query, page, pageSize) {
        query.page = page;
        query.pageSize = pageSize
        return api.sendAjax({
            url: '/shopuser/tshopuser/oplist',
            params: query,
        })
    },
}
