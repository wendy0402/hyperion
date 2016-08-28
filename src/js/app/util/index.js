export function arrayModelToObj(models=[]){
  return models.map((prev, curr){
    prev[curr.id] = curr
  }, {});
}
