import Dexie from 'dexie'
const Db = new Dexie('hyperion');

Db.version(1).stores({
  histories: '++id,url,topic,partition,message'
});

export default Db;
