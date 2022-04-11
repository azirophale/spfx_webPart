import * as React from 'react';
import styles from './StudentMarks.module.scss';
import { EmployeeState } from './EmployeeState';
import * as ReactDOM from 'react-dom';
import { times } from '@microsoft/sp-lodash-subset';

let employeeDetails = [];

export default class Employees extends React.Component<{}, EmployeeState>{
    constructor(props) {
        super(props);
        this.state = {
            empName: "",
            Address: "",
            DOB: "",
            Details: [],
        };
    }
    public onChangeHandler = (e) => {
        if (e.target.id === "Name") {
            this.setState({ empName: e.target.value });
        }
        if (e.target.id === "address") {
            this.setState({ Address: e.target.value });
        }
        if (e.target.id === "DOB") {
            this.setState({ DOB: e.target.value });
        }
    }
    public submitValues = () => {
        employeeDetails.push({
            name: this.state.empName,
            add: this.state.Address,
            dob: this.state.DOB,
        });
        this.setState({
            empName: "",
            Address: "",
            DOB: ""
        });

    }

    public render(): React.ReactNode {
        return (
            <div className={styles.employee}>
                <div className={styles.container}>
                    <h1 className={styles.header}> Employee Details  </h1>
                    <div>
                        <input type='text' id="Name" onChange={this.onChangeHandler} value={this.state.empName} className={styles.textBox} placeholder='Name'></input>
                        <input type='text' id="address" onChange={this.onChangeHandler} value={this.state.Address} className={styles.textBox} placeholder='Last Name'></input>
                        <input type='date' id="DOB" onChange={this.onChangeHandler} value={this.state.DOB} className={styles.textBox} placeholder='Maths'></input>
                        <div>
                            <button type='submit' onClick={this.submitValues} className={styles.SubmitBTN}>Submit</button>
                        </div>
                        <div >
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th> Name</th>
                                        <th>Address</th>
                                        <th>Date-Of-Birth</th>
                                    </tr>
                                </thead>
                                <tbody id="employeeTableBody">
                                    <tr>
                                        <td>hii</td>
                                        <td>fff</td>
                                        <td>yo</td>
                                    </tr>
                                    {employeeDetails.map(dattus => 
                                        // console.log("")
                                        // console.log(data)
                                        <tr>
                                            <td>{dattus.name}</td>
                                            <td>{dattus.add}</td>
                                            <td>{dattus.dob}</td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}