import Db from './db'

class HistoryCollection {
  constructor(){
    this.conn   = Db.histories;
    this.limit  = 20;
  }

  add(params={}, callback=()=>{} ){
    var _conn = this.conn;
    var _limit = this.limit
    _conn.add(params)
    .then((id) => {
      _conn.count().then((total) =>{
        if(total > _limit){
          let totalNeedToDestroyed = total - _limit;
          // @TODO cleaning up this
          return _conn.orderBy(':id').limit(totalNeedToDestroyed).delete().then((totalDestroyed) => {
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

export const History = new HistoryCollection();
