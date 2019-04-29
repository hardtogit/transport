import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './index.scss'


@inject('counterStore')
@observer
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.Fetch('LOCATION').then((data)=>{
      console.log(data)
    })
  }

  render () {
    const { counterStore: { LOCATION} } = this.props
    return (
      <View className='index'>
        <Button onClick={this.incrementAsync}>{LOCATION.loading&&'数据获取中...'||'获取数据'}</Button>
        <Text>loading:{LOCATION.loading}</Text>
        <Text>姓名：{LOCATION.data.name}</Text>
      </View>
    )
  }
}

export default Index
