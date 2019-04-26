export default (requestMapHttp,RequestContext)=>{
  console.log(RequestContext)
  requestMapHttp.location=(data)=>RequestContext.create().request('https://www.baidu.com','POST',data)
}
