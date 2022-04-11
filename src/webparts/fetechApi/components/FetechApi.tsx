import * as React from 'react';
import styles from './FetechApi.module.scss';
import { IFetechApiProps } from './IFetechApiProps';
import * as ReactDOM from 'react-dom';

export default class FetechApi extends React.Component<IFetechApiProps, {}> {
  constructor(props: IFetechApiProps) {
    super(props);
  }

  public callJson = async () => {
    let Responsedata = [];

    let vari = await fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(json => json.map(dataa => Responsedata.push(dataa)));

    ReactDOM.render(<>{Responsedata.map(dat => <tr key={dat.id}><td>{dat.id}</td><td>{dat.title}</td></tr>)}</>,
      document.getElementById("responseDiv"));
  }

  public CallJsonTwo = async () => {
    let Responsedata = [];

    await fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(json => json.data.map(dataa => Responsedata.push(dataa)));

    console.log(Responsedata);
    ReactDOM.render(<>{Responsedata.map((dat, index) => <tr key={index.toString()}><td>{dat.id}</td><td>{dat.first_name}</td></tr>)}</>,
      document.getElementById("responseDiv"));
  }
  public callJsonThree = async () => {
    let Responsedata = [];

    await fetch('http://dummy.restapiexample.com/api/v1/employees')
      .then(response => response.json())
      .then(json => json.map(dataa => Responsedata.push(dataa)));

    console.log("callJsonThree", Responsedata);
    ReactDOM.render(<>{Responsedata.map(dat => <tr key={dat.id}><td>{dat.id}</td><td>{dat.title}</td></tr>)}</>,
      document.getElementById("responseDiv"));

  }



  public pushData = async () => {
    let dataToPush: {
      name: "paul rudd",
      movies: ["I Love You Man", "Role Models"]
    };

    await fetch('https://reqres.in/api/users', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToPush),
    })
      .then(response => response.json())
      .then(dataa => {
        alert('Success:' + dataa);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
  public render(): React.ReactElement<IFetechApiProps> {
    return (
      <div className={styles.fetechApi} >
        <button onClick={this.callJson}>Call API (/todos) </button>
        <button onClick={this.CallJsonTwo}>Call API 2 (/albums)</button>
        <button onClick={this.callJsonThree}>Call API 3 (/posts)</button>
        <button onClick={this.pushData}>Push</button>
        <div >
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody id="responseDiv">

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
