module.exports = {

    // dataServer: 'http://10.8.45.130:8080/mockjs/8',
    dataServer: 'http://temai-api.byted.org/mockjs/59b5459c59e58d001dc5e66b',

    isAjax: function(req) {
        return req.xhr || req.query.isAjax || req.path.indexOf('/common/index/imgupload') >= 0;
    },
    isStatic: function(req) {
        return true;
    },
    isTemplate: function(req) {
        return false;
    },

    getHeader: function() {
        return {
            'Shop-Name': 'huanggaomin',
            'User-Type': 2
        };
    }

}
