import * as React from 'react';
import styles from './ShoppingCart.module.scss';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';

let g_jsonData = [];

export default function ShoppingCartComponent() {

    const [shoppingList, setCartValues] = useState([]);
    const [addText, SetAddText] = useState("");
    const [findText, SetFindText] = useState("");
    const [deleteText, SetDeleteText] = useState("");

    function ChangeEventHandler(event) {
        // alert(event.target.id)
        if (event.target.id === "AddItems") {
            SetAddText(event.target.value);
        }
        if (event.target.id === "DeleteItems") {
            SetDeleteText(event.target.value);
        }
        if (event.target.id === "FindItems") {
            SetFindText(event.target.value);
        }
    }
    function clearValues() {
        SetAddText("");
        SetDeleteText("");
        SetFindText("");

    }

    function addValues() {
        let tempArry = shoppingList;
        tempArry.push(addText);
        setCartValues(tempArry);
        console.log(shoppingList);

        // clearing Values
        clearValues();

    }
    function removeValues() {
        // ReactDOM.render(<>  <textarea value={shoppingList} className={styles.textarea}></textarea></>, document.getElementById("Textarea"))
        let tempArry = shoppingList;
        let i = tempArry.indexOf(deleteText);
        tempArry.splice(i, 1);
        setCartValues(tempArry);
        console.log(shoppingList);

        // clearing Values
        clearValues();
    }
    function findValues() {
        let tempArry = shoppingList;
        let i = tempArry.indexOf(findText);
        if (i >= 0) {
            alert("is present at " + i);
        }
        else {
            alert("Not Present ");
        }

        // clearing Values
        clearValues();
    }

    return (
        <div className={styles.shoppingCart}>
            <h1 className={styles.header}>Shopping Cart</h1>
            <h2>Function Component</h2>
            <div>
                <div>
                    <input id="AddItems" onChange={ChangeEventHandler} value={addText} className={styles.inputbox} placeholder='Add items'></input>
                    <button type='button' onClick={addValues} className={styles.button} >Add Items</button>
                </div>
                <div>
                    <input id="DeleteItems" onChange={ChangeEventHandler} value={deleteText} className={styles.inputbox} placeholder='Delete items'></input>
                    <button type='button' onClick={removeValues} className={styles.button} >Remove items</button>
                </div>
                <div>
                    <input id="FindItems" onChange={ChangeEventHandler} value={findText} className={styles.inputbox} placeholder='Find items'></input>
                    <button type='button' onClick={findValues} className={styles.button} >Find items</button>
                </div>
            </div >
            <div id="Textarea">
                <textarea value={shoppingList} className={styles.textarea}>
                </textarea>
                <div>
                    {shoppingList.map(lists => <p>{lists}</p>)}
                </div>
            </div>
        </div>
    );
}
