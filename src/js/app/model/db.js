import Dexie from 'dexie'
const Db = new Dexie('hyperion');

Db.version(1).stores({
  histories: '++id,url,topic,partition,message'
});

Db.version(2).stores({
  histories: '++id,url,topic,partition,message',
  template_collections: '++id,name'
});

Db.version(3).stores({
  histories: '++id,url,topic,partition,message',
  template_collections: '++id,name',
  templates: '++id,url,topic,partition,message,name,templateCollectionID'
});
export default Db;
