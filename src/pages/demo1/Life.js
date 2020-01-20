import React from 'react';
import { Button, Row } from 'antd';
import Child from './Child';
import './index.less'

class Life extends React.Component{
  state={
    count: 0,
 }

 handleAddClick = () => {
    const { count } = this.state; 
    this.setState({ count: count + 1 });
 }
 handleSubClick = () => {
    const { count } = this.state; 
    this.setState({ count: count - 1 });
 }

  render(){
    const { count } = this.state;
    return(
         <React.Fragment>
             <Row className="content">
                <Button onClick={this.handleAddClick}>点击加1</Button>
                <Button onClick={this.handleSubClick}>点击减1</Button>
                <div>当前Count:<p>{count}</p></div>
                <Child count={count} />
            </Row>
         </React.Fragment>
     )
 }
}

export default Life;
