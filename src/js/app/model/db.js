import Dexie from 'dexie'
const Db = new Dexie('hyperion');

Db.version(1).stores({
  histories: '++id,url,topic,partition,message'
});

Db.version(2).stores({
  histories: '++id,url,topic,partition,message',
  template_collections: '++id,name'
});

export default Db;
