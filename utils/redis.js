import Redis from 'ioredis';
import { Store } from 'koa-session2';


export default class RedisStore extends Store {
  constructor(host, port, db, key) {
    super();
    this.redis = new Redis({
      host: host,
      port: port,
      db: db,
    });
    this.key = key;
    this.redis.on('error', (err) => {
      throw err;
    });
  }

  async get(sid) {
    const data = await this.redis.get(`${this.key}:${sid}`);
    return JSON.parse(data);
  }

  async set(session, opts) {
    if (!opts.sid) {
      opts.sid = this.getID(24);
    }
    await this.redis.set(`${this.key}:${opts.sid}`, JSON.stringify(session));
    return opts.sid;
  }

  async destory(sid) {
    return await this.redis.del(sid);
  }
}
