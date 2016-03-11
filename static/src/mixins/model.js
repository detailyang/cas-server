import Antd from 'antd';

export default {
  componentWillMount() {
    this.model
      .on('sync', this.onSync, this)
      .on('error', this.onError, this);
    this.model.fetch();
  },

  componentWillUnmount() {
    this.model.off(null, null, this);
  },

  onSync() {
    this.setState(this.model.toJSON());
  },

  onError(msg) {
    this.setState({
      loading: false,
    });
    Antd.message.error(msg, 3);
    this.forceUpdate();
  },
};
