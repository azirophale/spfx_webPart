import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import styles from './StudentMarks.module.scss';

let g_StudentsData = [
    {
        "Name": "Larsen",
        "Lname": "Tubro",
        "Maths": 82,
        "English": 91,
    },
    {
        "Name": "Mahindra",
        "Lname": "Mahindra",
        "Maths": 2,
        "English": 2,
    },
    {
        "Name": "Johnsons",
        "Lname": "Johnsons",
        "Maths": 2,
        "English": 2,
    },
];
let g_BrightStudents = [];




export default function StudentFucntionalComponent() {

    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [Maths, setMaths] = useState(0);
    const [english, setenglish] = useState(0);

    function onChangeHandler(e) {
        if (e.target.id === "StudentName" || e.target.id === "TableStudentName") {
            setFname(e.target.value);
        }
        if (e.target.id === "LastName" || e.target.id === "TableStudentLname") {
            setLname(e.target.value);
        }
        if (e.target.id === "MathsMarks" || e.target.id === "TableStudentMaths") {
            setMaths(e.target.value);
        }
        if (e.target.id === "EnglishMarks" || e.target.id === "TableStudentEnglish") {
            setenglish(e.target.value);
        }
    }

    function submitData() {
        let data = {
            "Name": Fname,
            "Lname": Lname,
            "Maths": Maths,
            "English": english,
        };
        g_StudentsData.push(data);
        console.log(g_StudentsData);

        //Clearing Vlaues
        setFname("");
        setLname("");
        setMaths(0);
        setenglish(0);

    }

    function showStudents() {
        //Clearing Vlaues
        setFname("");
        setLname("");
        setMaths(0);
        setenglish(0);

        ReactDOM.render(<> {g_StudentsData.map((marks, index) =>
            <tr>
                <td>{marks.Name}</td>
                <td>{marks.Lname}</td>
                <td>{marks.Maths}</td>
                <td>{marks.English}</td>
                <td><a onClick={() => EditData(index)}> Edit</a></td>
                <td><a onClick={() => DeleteData(index)}>Delete</a></td>
            </tr>
        )}</>, document.getElementById("tableBody"));
    }

    function ShowBrigntStudents() {
        g_BrightStudents = [];

        g_StudentsData.map(res => {
            if (res.Maths > 80) {
                g_BrightStudents.push(res);
            }
        });
        //Clearing Vlaues
        setFname("");
        setLname("");
        setMaths(0);
        setenglish(0);


        ReactDOM.render(<>
            {g_BrightStudents.map(marks =>
                <tr>
                    <td>{marks.Name}</td>
                    <td>{marks.Lname}</td>
                    <td>{marks.Maths}</td>
                    <td>{marks.English}</td>
                </tr>
            )}</>, document.getElementById("BrightTableBody"));

        console.log(g_BrightStudents);
    }
    function updateHandler(i: number) {
        // StudentsData.filter(word => console.log(word));

        let AppendData = {
            "Name": Fname,
            "Lname": Lname,
            "Maths": Maths,
            "English": english,
        };

        g_StudentsData.splice(i, 1, AppendData);
        showStudents();

    }
    function EditData(i: number) {

        ReactDOM.render(<> {g_StudentsData.map((marks, index) =>

            <tr>
                <td>{index == i ? <input type="text" id="TableStudentName" onChange={onChangeHandler} className={styles.tableText} /> : null}</td>
                <td>{index == i ? <input type="text" id="TableStudentLname" onChange={onChangeHandler} className={styles.tableText} /> : null}</td>
                <td>{index == i ? <input type="number" id="TableStudentMaths" onChange={onChangeHandler} className={styles.tableText} /> : null}</td>
                <td>{index == i ? <input type="number" id="TableStudentEnglish" onChange={onChangeHandler} className={styles.tableText} /> : null}</td>
                <td><a onClick={() => updateHandler(index)}> Update</a></td>
                <td><a onClick={() => DeleteData(index)}>Delete</a></td>
            </tr>

        )}</>, document.getElementById("tableBody"));


    }
    function DeleteData(i: number) {
        g_StudentsData.splice(i, 1);

        ReactDOM.render(<> {g_StudentsData.map((marks, index) =>
            <tr>
                <td>{marks.Name}</td>
                <td>{marks.Lname}</td>
                <td>{marks.Maths}</td>
                <td>{marks.English}</td>
                <td><a onClick={() => EditData(index)}> Edit</a></td>
                <td><a onClick={() => DeleteData(index)}>Delete</a></td>
            </tr>
        )}</>, document.getElementById("tableBody"));

    }

    function showEmployee() {
        // ReactDOM.render(<Employees></Employees>, document.getElementById("EmployeeDiv"))
    }

    return (
        <div className={styles.studentMarks} >
            <div className={styles.container}>
                <h1 className={styles.header}> Student Marks </h1>
                <h2>Functional Component</h2>
                <div>
                    <input type='text' id="StudentName" onChange={onChangeHandler} value={Fname} className={styles.textBox} placeholder='Name'></input>
                    <input type='text' id="LastName" onChange={onChangeHandler} value={Lname} className={styles.textBox} placeholder='Last Name'></input>
                    <input type='number' id="MathsMarks" onChange={onChangeHandler} value={Maths} className={styles.textBox} placeholder='Maths'></input>
                    <input type='number' id="EnglishMarks" onChange={onChangeHandler} value={english} className={styles.textBox} placeholder='english'></input>
                    <div>
                        <button type='submit' onClick={submitData} className={styles.SubmitBTN}>Submit</button>
                        <button type='submit' onClick={showStudents} className={styles.SubmitBTN}>Show Students</button>

                        <div >
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Maths</th>
                                        <th>EngLish</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">

                                </tbody>
                            </table>
                        </div>

                    </div>
                    <button onClick={ShowBrigntStudents} >Bright Students</button>
                </div>

                <div id="brightGuys">
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Maths</th>
                                <th>EngLish</th>
                            </tr>
                        </thead>
                        <tbody id="BrightTableBody">

                        </tbody>
                    </table>
                </div>
                <button onClick={showEmployee}>Show Employee</button>
                <div id="EmployeeDiv">

                </div>
            </div>
        </div>
    );

}