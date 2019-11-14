import React from 'react'

class Child extends React.Component {
  state = {
    count: 0
  };

  componentWillMount(){
    console.log('will mount');
  }

  componentDidMount(){
    console.log('did mount');
  }

  componentWillReceiveProps(nextProps){
    const { count } = nextProps;
    console.log('will props, nextCount = ' + count)
  }

  shouldComponentUpdate(){
    console.log('should upate')
    return true;
  }

  componentWillUpdate(){
    console.log('will upate')
  }

  componentDidUpdate(){
    console.log('did upate')
  }

  render(){
    const { count } = this.props;
    return <div>
        <p>这里是子组件，测试子组件的生命周期</p>
        <p>{count}</p>
    </div>
  }
}

export default Child;