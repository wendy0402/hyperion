import Db from './db'

class TemplateCollectionModel{
  constructor(){
    this.conn   = Db.template_collections;
  }

  add(params={}){
    _params = {
      id: params.id,
      name: params.name
    }
    return this.conn.add(_params);
  }

  fetchAll(callback){
    return this.conn.orderBy('name').toArray(callback);
  };
}

export const TemplateCollection = new TemplateCollectionModel();
