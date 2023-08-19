export default async function stopUnauthourizedActions(uid:string|null){
  if(!uid){
   throw new Error("Unauthourized Action, Please Login")
  }
}