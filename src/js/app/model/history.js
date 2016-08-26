import Db from './db'

class HistoryCollection {
  constructor(){
    this.conn   = Db.histories;
    this.limit  = 20;
  }

  add(params={}, callback=(()=>{}) ){
    this.conn.add(params).then(callback);

    this.conn.count(function(total){
      if(total > this.limit){
        this.conn.last().destroy();
      }
    }.bind(this));
  }

  fetchAll(callback){
    return this.conn.orderBy(':id').limit(this.limit).toArray(callback);
  };
}

export const History = new HistoryCollection();
