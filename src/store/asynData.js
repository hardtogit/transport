import { observable } from 'mobx'
import * as dataSign from '../config/dataSign'
import dataSignMapToRequest from '../config/dataSignMapToRequest'


const defaultShape={
  loading:false,
  data:{},
}
const defaultState=Object.keys(dataSign).reduce((total, item)=>{return{...total,[item]:defaultShape}},{})

const counterStore = observable({
    ...defaultState,
  a:2,
  Fetch(sign) {
      console.log(this[sign])
      this[sign]={...this[sign],loading:true}
    return new Promise((resolve,reject)=>{
      dataSignMapToRequest[sign]().then((data)=>{
        console.log(data)
        resolve(data)
        setTimeout(()=>{this[sign].loading=false},3000)
        console.log('aa')
      }).catch(()=>{
        setTimeout(()=>{this[sign].loading=false},3000)
        reject('错误')
        console.log('bb')
      })
    })
  }
})
export default counterStore
