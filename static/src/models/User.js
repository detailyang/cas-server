import List from './List'
import ajax from '../utils/ajax'


export default List.extend({
    // 获取列表数据的API地址
    url: '/admin/users/',

    reset(id) {
        const url = `/admin/users/${id}`

        return ajax({
            url: url,
            type: 'PUT',
            data: {reset: true}
        })
    }
})
