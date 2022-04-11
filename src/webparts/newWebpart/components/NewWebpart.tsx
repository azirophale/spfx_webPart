import * as React from 'react';
import styles from './NewWebpart.module.scss';

export interface CalculatorState {
    answer: any;
    num1: number;
    num2: number;
}

export default class Calculator extends React.Component<{}, CalculatorState>{
    constructor(props: any) {
        super(props);
        this.state = {
            num1: 0,
            num2: 0,
            answer: "",
        };
    }
    public addition = () => {
        let sum = this.state.num1 + this.state.num2;
        this.setState({ answer: sum });
    }
    public subctraction = () => {
        this.setState({ answer: this.state.num1 - this.state.num2 });
    }
    public division = () => {
        this.setState({ answer: this.state.num1 / this.state.num2 });
    }
    public multiplication = () => {
        this.setState({ answer: this.state.num1 * this.state.num2 });
    }
    public onChangeHandler = (e: any) => {
        if (e.target.id == "no1") {
            this.setState({ num1: parseInt(e.target.value) });
        }
        if (e.target.id == "no2") {
            this.setState({ num2: parseInt(e.target.value) });
        }

    }
    public render(): React.ReactNode {
        return (
            <div className={styles.newWebpart}>
                <div className={styles.container}>
                    <h1 className={styles.header}>Calculator </h1>
                    <div>
                        <input type="number" id="no1" placeholder="No 1" value={this.state.num1} onChange={() => this.onChangeHandler(event)} className={styles.inpotBox}></input>
                        <input type="number" id="no2" placeholder="No 2" value={this.state.num2} onChange={() => this.onChangeHandler(event)} className={styles.inpotBox}></input>
                    </div>
                    <input type="text" id="answer" placeholder="Answer" value={this.state.answer} className={styles.inpotBox} disabled />
                    <div>
                        <button className={styles.button2} onClick={this.addition} >+</button>
                        <button className={styles.button2} onClick={this.subctraction} >-</button>
                        <button className={styles.button2} onClick={this.multiplication} >*</button>
                        <button className={styles.button2} onClick={this.division} >/</button>
                    </div>
                </div>
            </div>
        );
    }
}