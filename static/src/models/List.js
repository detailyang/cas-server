import _ from 'underscore'
import Backbone from 'backbone'
import ajax from '../utils/ajax'

export default Backbone.Model.extend({

    // 获取列表数据的API地址
    url: '',

    defaults: {
        // 列表数据
        value: [],
        // 总条数
        total: 0,
        // 每页多少条
        per_page: 20,
        // 当前页码
        page: 1,
        loading: true,
        // keyword的搜索字段
        field: 'name',
        // 搜索关键字
        keyword: ''
    },

    fetch() {
        // 停止上一次请求
        if (this.fetchDefer) {
            this.abortXMLHttpRequest(this.fetchDefer.xhr)
        }

        this.fetchDefer = ajax({
            url: this.url,
            data: this.generateQueryData()
        }).done((data) => {
            this.set(this.parseResponseData(data))
            this.trigger('sync')
        }).fail((msg, resp) => {
            if (resp.code == -1) return
            this.trigger('error', msg)
        })

        return this.fetchDefer
    },

    // 生成请求数据
    generateQueryData() {
        const query = this.toJSON()

        delete query.value
        delete query.total
        delete query.loading

        return query
    },

    // 解析返回数据
    parseResponseData(data) {
        data.value = _.map(data.value, (item) => {
            item.key = item.id
            return item
        })

        return {
            value: data.value,
            total: data.total,
            per_page: data.per_page,
            page: data.page,
            loading: false
        }
    },

    // 保存对象
    save(item) {
        item = item || {}
        const url = item.id ? `${this.url}${item.id}/` : this.url

        return ajax({
            url: url,
            type: item.id ? 'PUT' : 'POST',
            data: item
        })
    },

    // 根据ID删除对象
    delete: function(id) {
        return ajax({
            url: `${this.url}${id}/`,
            type: 'DELETE'
        })
    },

    abortXMLHttpRequest(xhr) {
        if (xhr && xhr.readyState > 0 && xhr.readyState < 4) {
            xhr.abort();
        }
    }

})
