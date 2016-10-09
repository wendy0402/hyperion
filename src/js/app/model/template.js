import Db from './db'

class TemplateModel{
  constructor(){
    this.conn = Db.templates;
  }

  add(params={}){
    let _params = {
      url: params.url,
      name: params.name,
      topic: params.topic,
      message: params.message,
      partition: params.partition,
      collection_id: params.collection_id
    }
    return this.conn.add(_params);
  }

  fetchAll(callback){
    return this.conn.orderBy('name').toArray(callback);
  };

  findByCollectionIds(collectionIds, callback){
    return this.conn.filter((template) => {
      let collectionID = template.collection_id ? template.collection_id.toString() : "";
      return collectionIds.indexOf(collectionID) != -1;
    }).toArray(callback);
  }
}

export const Template = new TemplateModel();
