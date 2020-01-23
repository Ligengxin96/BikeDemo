# 获取被connect, Form包裹的组件的ref

## connect:  

[原文地址](https://itnext.io/advanced-react-redux-techniques-how-to-use-refs-on-connected-components-e27b55c06e34)

    // 父组件的写法
    <EnhancedForm ref={(myFrom) => { if (myFrom) { this.myFrom = myFrom.getWrappedInstance(); } }} />
    
    // 子组件的写法(connect方法可以接收4个入参)
    export default (connect(({ userModel }) => ({
      user: userModel.user,
    }), null, null, { withRef: true })(Form));  // Form是类名

## Form:  
    <EnhancedForm wrappedComponentRef={(from) => { this.from = from; }} />

## 同时被Form,connect两者包裹着的组件:  
    待续(目前没遇到过, 感觉可以用上面的withRef方法)

## 是否应该使用ref
  [传送门](https://github.com/Ligengxin96/BikeDemo/issues/6)
