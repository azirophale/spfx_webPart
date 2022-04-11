import * as React from 'react';
import styles from './ShoppingCart.module.scss';
import { IShoppingCartProps } from './IShoppingCartProps';
import { ShoppingCartState } from './IShoppingCartState';
import ShoppingCartComponent from './ShoppingFunctionalComponent';


let g_jsonData = [];

export default class ShoppingCart extends React.Component<IShoppingCartProps, ShoppingCartState, {}> {
  constructor(props: IShoppingCartProps) {
    super(props);
    this.state = {
      addText: "",
      removeText: "",
      findText: "",
    };
  }
  public ChangeEventHandler = (e) => {

    if (e.target.id === "AddItems") {
      this.setState({ addText: e.target.value });
    }
    if (e.target.id === "DeleteItems") {
      this.setState({ removeText: e.target.value });
    }
    if (e.target.id === "FindItems") {
      this.setState({ findText: e.target.value });
    }
  }
  public addValues = () => {
    g_jsonData = [...g_jsonData, this.state.addText];

    this.setState({ addText: "" });

  }
  public findValues = () => {


    !g_jsonData.indexOf(this.state.findText) ? alert("Found at ") : alert("Not Found");
  }
  public removeValues = () => {

    let index = g_jsonData.indexOf(this.state.removeText);
    alert(index);
    g_jsonData.splice(index, 1);

    this.setState({ removeText: "" });
    console.log(g_jsonData);

  }

  public render(): React.ReactElement<IShoppingCartProps> {
    return (
      <div className={styles.shoppingCart}>
        {/* <h1 className={styles.header}>Shopping Cart</h1>
        <div>
          <div>
            <input id="AddItems" onChange={this.ChangeEventHandler} value={this.state.addText} className={styles.inputbox} placeholder='Add items'></input>
            <button type='button' onClick={this.addValues} className={styles.button} >Add Items</button>
          </div>
          <div>
            <input id="DeleteItems" onChange={this.ChangeEventHandler} value={this.state.removeText}className={styles.inputbox} placeholder='Delete items'></input>
            <button type='button' onClick={this.removeValues} className={styles.button} >Remove items</button>
          </div>
          <div>
            <input id="FindItems" onChange={this.ChangeEventHandler} value={this.state.findText}className={styles.inputbox} placeholder='Find items'></input>
            <button type='button' onClick={this.findValues} className={styles.button} >Find items</button>
          </div>
        </div>
        <textarea value={jsonData} className={styles.textarea}></textarea> */}

        {/* calling Function component here */}
        <ShoppingCartComponent />
      </div>
    );
  }
}