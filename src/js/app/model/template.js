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
      partition: params.partition
    }
    return this.conn.add(_params);
  }

  fetchAll(callback){
    return this.conn.orderBy('name').toArray(callback);
  };
}

export const Template = new TemplateModel();
