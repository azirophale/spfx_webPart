import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';

export interface HelloWorldState {
  count: number;
  class: any;
}

export default class HelloWorld extends React.Component<IHelloWorldProps, HelloWorldState, {}> {
  constructor(props: IHelloWorldProps) {
    super(props);
    this.state = {
      count: 0,
      class: styles.label,
    };
  }
  public minus = () => {
    this.setState({ count: this.state.count - 1 });
    this.changeClass();
  }
  public addition = () => {
    this.setState({ count: this.state.count + 1 });
    this.changeClass();
  }
  public changeClass = () => {

  }
  public render(): React.ReactElement<HelloWorldState> {

    function changecolor() {
      // alert("calling this fucntion")
      if (this.state.count < 0) {
        alert();
        this.setState({ class: styles.redLabel });
      }
      else if (this.state.count > 0) {
        alert();
        this.setState({ class: styles.greenlabel });
      }
      else if (this.state.count == 0) {
        this.setState({ class: styles.label });
      }
    }
    return (
      <div className={styles.helloWorld} >
        <h1>This is counter webpart</h1>
        <div className={styles.counterDiv}>
          <button className={styles.button} onClick={() => { this.minus(); changecolor(); }}>-</button>
          <label className={this.state.count<0 ? styles.redLabel:styles.greenlabel} >{this.state.count}</label>
          <button className={styles.button} onClick={() => { this.addition(); changecolor(); }}>+</button>
        </div>
      </div>
    );
  }
}
