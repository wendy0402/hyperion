export function arrayModelToObj(models=[]){
  return models.reduce((prev, curr) =>{
    prev[curr.id] = curr
    return prev
  }, {});
}
