import Db from './db'

class HistoryModel {
  constructor(){
    this.conn   = Db.histories;
    this.limit  = 20;
  }

  add(params={}, callback=()=>{} ){
    this.conn.add(params)
    .then((id) => {
      this.conn.count().then((total) =>{
        if(total > this.limit){
          let totalNeedToDestroyed = total - this.limit;
          // @TODO cleaning up this
          return this.conn.orderBy(':id').limit(totalNeedToDestroyed).delete().then((totalDestroyed) => {
              callback(id);
            });
        } else{
          callback(id);
        }
      });
    })
  }

  fetchAll(callback){
    return this.conn.orderBy(':id').limit(this.limit).toArray(callback);
  };
}

export const History = new HistoryModel();
