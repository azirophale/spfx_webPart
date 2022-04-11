import * as React from 'react';
import styles from './SpfxApiCall.module.scss';
import { ISpfxApiCallProps } from './ISpfxApiCallProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as $ from 'jquery';
import { IItemAddResult, sp, Web } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import pnp, { Items } from "sp-pnp-js";
import * as ReactDOM from 'react-dom';


export default class SpfxApiCall extends React.Component<ISpfxApiCallProps, {}> {
  //GET Method
  public _callingGetApi = async () => {
    let listname = "Books";
    let url = "https://sonorasoftware0.sharepoint.com/sites/AnilTest";
    let web = Web(this.props.url);
    try {
      const items: any[] = await web.lists.getByTitle("MyList").items.get();
      console.log(items);
      let newarr = items;
      ReactDOM.render(<>{items.map(item => <tr><td>{item.Id}</td><td>{item.Title}</td><td>{item.Created}</td></tr>)}</>, document.getElementById("allItems"));
    }
    catch (e) {
      console.error(e);
    }
  }

  //PUT Method
  public _callingPutApi = async () => {
    let web = Web(this.props.url);
    try {
      // const items: any[] = await web.lists.getByTitle("Books").items.get();
      // console.log(items);
      let list = web.lists.getByTitle("MyList");

      const i = await list.items.getById(1).update({
        Title: "My New Title",
        Description: "Here is a new description"
      });
      console.log(i);
    }
    catch (e) {
      console.error(e);
    }
  }

  //POST Method
  public _callingPostApi = async () => {
    let web = Web(this.props.url);
    try {
      // const items: any[] = await web.lists.getByTitle("Books").items.get();
      // console.log(items);
      const iar: IItemAddResult = await web.lists.getByTitle("MyList").items.add({
        Title: "Anil Koli",
        Description: "Software Engg",
        Age: 15
      });
      console.log("Sucessfully Post Data");
    }
    catch (e) {
      console.error(e);
    }
  }

  //DELETE Method
  public _callingDeleteApi = async () => {
    let web = Web(this.props.url);
    try {
      // const items: any[] = await web.lists.getByTitle("Books").items.get();
      // console.log(items);
      let list = web.lists.getByTitle("MyList");

      await list.items.getById(3).delete();
    }
    catch (e) {
      console.error(e);
    }
  }
  public _getTopItems = async () => {
    let web = Web(this.props.url);
    try {
      const items2: any[] = await web.lists.getByTitle("MyList").items.select("Title").top(5).orderBy("Title", true)();
      console.log(items2);
      ReactDOM.render(<>{items2.map(item => <tr><td>{item.Id}</td><td>{item.Title}</td><td>{item.Created}</td></tr>)}</>, document.getElementById("allItems"));
    }
    catch (e) {
      console.log(e);
    }
  }
  public _getAllData = async () => {
    let web = Web(this.props.url);
    let arr: any = [];
    try {
      // const items2: any[] = await web.lists.getByTitle("Books").items.select("Borrowedby")();
      // console.log(items2);
      // sp.web.lists.getByTitle("MyList").items.getById(_item.Id).select("DeptContact", "Lookup/Name", "Lookup/ID").expand("Lookup").get().then((item: any[]) => {
      //   console.log(item);
      // });
      // web.lists.getByTitle("Books").items.select("Author")().then((item: any[]) => {
      //   console.log(item);
      // });
      let list = await web.lists.getByTitle("MyList").items.select("imageCLM").get();
      console.log(list);
      list.map(itm => arr.push(JSON.parse(itm.imageCLM)));
      let list2 = await web.lists.getByTitle("MyList").items.get();

      console.log(arr);
      ReactDOM.render(<><thead>
        <tr><th>Title</th><th>Description</th><th>Age</th><th>Link</th><th>Choice</th><th>Image</th></tr>
      </thead>
        <tbody>
          {list2.map((item, index) => <tr>
            <td>{item.Title}</td><td>{item.Description}</td><td>{item.Age}</td><td>{item.link.Url}</td><td>{item.choiceClm}</td>
            <td>{
              <img src={arr[index].serverUrl + arr[index].serverRelativeUrl} width={"50px"} height={"50px"} />}
            </td></tr>)}
        </tbody>
      </>, document.getElementById("table"));


      // web.lists.getByTitle("MyList").items.getById(1).select("BookNameId", "BookNameId/Name", "BookNameId/ID").expand("BookNameId").get().then((item: any[]) => {
      //   console.log(item);
      // });

    }
    catch (e) {
      console.log(e);
    }
  }

  public _lookUpData = async () => {

    let web = Web(this.props.url);
    try {
      // LookUp function
      web.lists.getByTitle("Customers").items.select("BookName/Author0", "BookName/Title").expand("BookName").get().then((item: any[]) => {
        console.log(item);
      });
    }
    catch (e) {
      console.log(e);
    }

  }
  public _CurrentUser = async () => {
    let web = Web(this.props.url);
    try {
      // web.currentUser.groups().then(itm =>
      //   console.log(itm)
      //   // ReactDOM.render(<>{itm.map(mapps => <li>{mapps}</li>)}</>, document.getElementById("outputDiv"))
      // )
      await web.currentUser.get().then(Item =>

        console.log("User Name : " + Item.Title + "/n Is Admin :" + Item.IsSiteAdmin)

      );
    }
    catch (e) {
      console.log(e);
    }
  }
  public _currentUserGroup = async () => {
    let web = Web(this.props.url);
    try {
      await web.currentUser.groups().then(itm =>

        console.log(itm)
        // console.log("User Name : " + itms[i].Title + " Is Admin " + itms[i].IsSiteAdmin)

        // ReactDOM.render(<>{itm}</>, document.getElementById("outputDiv"))
      );

    }
    catch (e) {
      console.log(e);
    }
  }
  public _siteGroup = async () => {
    let web = Web(this.props.url);
    try {
      await web.siteGroups().then(itm => console.log(itm));
    }
    catch (e) {
      console.log(e);
    }
  }
  public _siteUers = async () => {

    let web = Web(this.props.url);
    try {
      await web.siteUsers().then(itm => console.log(itm));
    }
    catch (e) {
      console.log(e);
    }
  }

  public _customData = async () => {
    let web = Web(this.props.url);

    // Get Visit Group Deatils
    await web.associatedVisitorGroup().then(itm =>
      console.log("Visit Group ", itm));

    // Get Member Group Details
    await web.associatedMemberGroup().then(itm =>
      console.log("Member Group ", itm));

    // Get Owner Group details
    await web.associatedOwnerGroup().then(itm =>
      console.log("Owner Group ", itm));

    //Get Visit Group Members 
    await web.siteGroups.getById(5).users().then(itm =>
      console.log("Visitor Users", itm));
  }

  public _GetPermissions = async () => {
    let web = Web(this.props.url);

    await web.roleAssignments().then(itm =>
      console.log("Role Assignments ", itm));

    await web.firstUniqueAncestorSecurableObject().then(itm =>
      console.log("First Unique obj ", itm));
  }


  public render(): React.ReactElement<ISpfxApiCallProps> {
    return (
      <div className={styles.spfxApiCall}>
        {/* <div> */}
        <h1>For Fechting </h1>
        <input type='text' id="title" placeholder='Title'></input>
        <input type='text' id="description" placeholder='Description'></input>
        <input type='text' id="age" placeholder='Age'></input>
        <div>
          <button type='button' onClick={this._callingGetApi}>Get </button>
          <button type='button' onClick={this._callingPutApi}>Put </button>
          <button type='button' onClick={this._callingPostApi}>Post </button>
          <button type='button' onClick={this._callingDeleteApi}>Delete </button>
          <button type='button' onClick={this._getTopItems}>Get Top 5 items </button>
          <button type="button" onClick={this._lookUpData}> Lookup </button>
          <button type='button' onClick={this._getAllData}>Get All Data </button>

        </div>
        <div>
          <button type='button' onClick={this._CurrentUser}>Current User </button>
          <button type='button' onClick={this._currentUserGroup}> Current User Group </button>
          <button type='button' onClick={this._siteGroup}> Site Group </button>
          <button type='button' onClick={this._siteUers}> Site Users </button>
          <button type='button' onClick={this._customData}> Group And its users </button>
          <button type='button' onClick={this._GetPermissions}> Permissions </button>
        </div>
        <div id="">
          <table id="table">
            <thead>
              <tr><th>ID</th><th>Full Name</th><th>Age</th></tr>
            </thead>
            <tbody id="allItems">

            </tbody>
          </table>
        </div>
        <div id="outputDiv">

        </div>
      </div>
    );
  }
}

// function failure(data: JQuery.jqXHR<any>) {
//   throw new Error('Function not implemented.');
// }

// function complete(data: any) {
//   throw new Error('Function not implemented.');
// }

