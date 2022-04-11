import * as React from 'react';
import styles from './StudentMarks.module.scss';
import { IStudentMarksProps } from './IStudentMarksProps';
import { IStudentState } from './IStudentState';
import Employees from './employees';
import * as ReactDOM from 'react-dom';
import StudentFucntionalComponent from './StudentHooks';


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

export default class StudentMarks extends React.Component<IStudentMarksProps, IStudentState, {}> {
  constructor(props) {
    super(props);
    this.state = {
      Fname: "",
      Lname: "",
      Maths: 0,
      english: 0,
    };
  }
  public onChangeHandler = (e) => {
    if (e.target.id === "StudentName" || e.target.id === "TableStudentName") {
      this.setState({ Fname: e.target.value });
    }
    if (e.target.id === "LastName" || e.target.id === "TableStudentLname") {
      this.setState({ Lname: e.target.value });
    }
    if (e.target.id === "MathsMarks" || e.target.id === "TableStudentMaths") {
      this.setState({ Maths: e.target.value });
    }
    if (e.target.id === "EnglishMarks" || e.target.id === "TableStudentEnglish") {
      this.setState({ english: e.target.value });
    }
  }

  public submitData = () => {
    let data = {
      "Name": this.state.Fname,
      "Lname": this.state.Lname,
      "Maths": this.state.Maths,
      "English": this.state.english,
    };
    g_StudentsData.push(data);
    console.log(g_StudentsData);
    this.setState({
      Fname: "",
      Lname: "",
      Maths: 0,
      english: 0
    });
  }

  public showStudents = () => {
    this.setState({
      Fname: "",
      Lname: "",
      Maths: 0,
      english: 0
    });

    ReactDOM.render(<> {g_StudentsData.map((marks, index) =>
      <tr>
        <td>{marks.Name}</td>
        <td>{marks.Lname}</td>
        <td>{marks.Maths}</td>
        <td>{marks.English}</td>
        <td><a onClick={() => this.EditData(index)}> Edit</a></td>
        <td><a onClick={() => this.DeleteData(index)}>Delete</a></td>
      </tr>
    )}</>, document.getElementById("tableBody"));
  }

  public ShowBrigntStudents = () => {
    g_BrightStudents = [];

    g_StudentsData.map(res => {
      if (res.Maths > 80) {
        g_BrightStudents.push(res);
      }
    });
    this.setState({
      Fname: "",
      Lname: "",
      Maths: 0,
      english: 0,
    });
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
  public updateHandler = (i: number) => {
    // StudentsData.filter(word => console.log(word));

    let AppendData = {
      "Name": this.state.Fname,
      "Lname": this.state.Lname,
      "Maths": this.state.Maths,
      "English": this.state.english,
    };

    g_StudentsData.splice(i, 1, AppendData);
    this.showStudents();

  }
  public EditData = (i: number) => {

    ReactDOM.render(<> {g_StudentsData.map((marks, index) =>

      <tr>
        <td>{index == i ? <input type="text" id="TableStudentName" onChange={this.onChangeHandler} className={styles.tableText} /> : null}</td>
        <td>{index == i ? <input type="text" id="TableStudentLname" onChange={this.onChangeHandler} className={styles.tableText} /> : null}</td>
        <td>{index == i ? <input type="number" id="TableStudentMaths" onChange={this.onChangeHandler} className={styles.tableText} /> : null}</td>
        <td>{index == i ? <input type="number" id="TableStudentEnglish" onChange={this.onChangeHandler} className={styles.tableText} /> : null}</td>
        <td><a onClick={() => this.updateHandler(index)}> Update</a></td>
        <td><a onClick={() => this.DeleteData(index)}>Delete</a></td>
      </tr>

    )}</>, document.getElementById("tableBody"));


  }
  public DeleteData = (i: number) => {
    g_StudentsData.splice(i, 1);

    ReactDOM.render(<> {g_StudentsData.map((marks, index) =>
      <tr>
        <td>{marks.Name}</td>
        <td>{marks.Lname}</td>
        <td>{marks.Maths}</td>
        <td>{marks.English}</td>
        <td><a onClick={() => this.EditData(index)}> Edit</a></td>
        <td><a onClick={() => this.DeleteData(index)}>Delete</a></td>
      </tr>
    )}</>, document.getElementById("tableBody"));

  }

  public showEmployee = () => {
    ReactDOM.render(<Employees></Employees>, document.getElementById("EmployeeDiv"));
  }
  public render(): React.ReactElement<IStudentMarksProps> {
    return (
      // <div className={styles.studentMarks} >
      //   <div className={styles.container}>
      //     <h1 className={styles.header}> Student Marks </h1>
      //     <div>
      //       <input type='text' id="StudentName" onChange={this.onChangeHandler} value={this.state.Fname} className={styles.textBox} placeholder='Name'></input>
      //       <input type='text' id="LastName" onChange={this.onChangeHandler} value={this.state.Lname} className={styles.textBox} placeholder='Last Name'></input>
      //       <input type='number' id="MathsMarks" onChange={this.onChangeHandler} value={this.state.Maths} className={styles.textBox} placeholder='Maths'></input>
      //       <input type='number' id="EnglishMarks" onChange={this.onChangeHandler} value={this.state.english} className={styles.textBox} placeholder='english'></input>
      //       <div>
      //         <button type='submit' onClick={this.submitData} className={styles.SubmitBTN}>Submit</button>
      //         <button type='submit' onClick={this.showStudents} className={styles.SubmitBTN}>Show Students</button>

      //         <div >
      //           <table className={styles.table}>
      //             <thead>
      //               <tr>
      //                 <th>First Name</th>
      //                 <th>Last Name</th>
      //                 <th>Maths</th>
      //                 <th>EngLish</th>
      //                 <th>Edit</th>
      //                 <th>Delete</th>
      //               </tr>
      //             </thead>
      //             <tbody id="tableBody">

      //             </tbody>
      //           </table>
      //         </div>

      //       </div>
      //       <button onClick={this.ShowBrigntStudents} >Bright Students</button>
      //     </div>

      //     <div id="brightGuys">
      //       <table className={styles.table}>
      //         <thead>
      //           <tr>
      //             <th>First Name</th>
      //             <th>Last Name</th>
      //             <th>Maths</th>
      //             <th>EngLish</th>
      //           </tr>
      //         </thead>
      //         <tbody id="BrightTableBody">

      //         </tbody>
      //       </table>
      //     </div>
      //     <button onClick={this.showEmployee}>Show Employee</button>
      //     <div id="EmployeeDiv">

      //     </div>
      //   </div>
      // </div>

      // Calling Function Component
      <div>
        <StudentFucntionalComponent/>
      </div>
    );
  }
}
