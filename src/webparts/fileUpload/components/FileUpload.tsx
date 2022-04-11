import * as React from 'react';
import styles from './FileUpload.module.scss';
import { IFileUploadProps } from './IFileUploadProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
// import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Web } from '@pnp/sp/webs';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack, IStackTokens } from '@fluentui/react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { IItemAddResult } from '@pnp/sp/presets/all';



// State for FileUpload class
export interface ISpfxPnpFilepickerState {
  ImageURL: string;
  filePickerResult: any;
  pushItem: any[];
}

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

let g_arryOne = [];


export default class FileUpload extends React.Component<IFileUploadProps, ISpfxPnpFilepickerState> {

  constructor(props: IFileUploadProps, state: ISpfxPnpFilepickerState) {
    super(props);
    sp.setup({
      spfxContext: this.props.context
    });

    this.state = {
      ImageURL: "https://via.placeholder.com/200",
      filePickerResult: "",
      pushItem: ["LOL"],
    };
  }


  public _sendFile = async () => {
    let web = Web(this.props.url);
    let r = this.state.filePickerResult;

    // Send the data with/Without metadata into sp doc library and set image
    try {
      let fileresult = await web.getFolderByServerRelativeUrl("/sites/AnilTest/Shared%20Documents/").files.add(r.name, r, true);
      console.log(fileresult.data);
      this.setState({ ImageURL: document.location.origin + fileresult.data.ServerRelativeUrl });
    }
    catch (e) {
      console.log(e);
    }
  }

  private async saveIntoSharePoint(file: any) {

    let web = Web(this.props.url);
    console.log(file);

    if (file && file.length > 0) {
      for (var i = 0; i < file.length; i++) {
        const item = file[i];
        console.log(web);
        await item.downloadFileContent().then(async r => {
          console.log("Printing R", r);
          this.setState({ filePickerResult: r });
          // let fileresult = await web.getFolderByServerRelativeUrl("/sites/AnilTest/Shared%20Documents/").files.add(r.name, true);
          // console.log(fileresult.data);
          // this.setState({ ImageURL: document.location.origin + fileresult.data.ServerRelativeUrl });
        });
      }
    }


  }

  private _onFilePickerSave = async (filePickerResult: IFilePickerResult[]) => {
    let web = Web(this.props.url);
    debugger;
    this.setState({ filePickerResult: filePickerResult });
    console.log(filePickerResult);
    if (filePickerResult && filePickerResult.length > 0) {
      for (var i = 0; i < filePickerResult.length; i++) {
        const item = filePickerResult[i];
        const fileResultContent = await item.downloadFileContent();
        console.log(fileResultContent);
      }
    }
  }
  /**
   * _alertClicked
   */
  public _alertClicked() {
    alert("fashfdkjahsgdfjkgsadjffhhffhhffhh");
  }
  /**
   * _onDropdownChange
   */
  public _onDropdownChange(event: any, item: any) {
    let temparr = g_arryOne;
    if (item.selected) {
      console.log(item.key);
      let value = { Title: item.key };
      temparr.push(value);
      console.log(temparr);
    }

  }


  public _buttonCall = async () => {
    let web = Web(this.props.url);
    try {
      // await web.lists.getByTitle("countries").items.add({
      //   Title: g_arryOne[0]
      // }).then(items =>
      //   console.log(items))
      // let i=Number
      for (var i = 0; i <= g_arryOne.length; i++) {
        await web.lists.getByTitle("countries").items.add(g_arryOne[i]).then(() =>
          alert("sucessfully done")
        );
      }
    }
    catch (e) {
      console.log(e);
    }
    g_arryOne = [];
    // try {
    //   let result: any[] = await web.lists.getByTitle("countries").get();
    //   console.log(result);
    // }
    // catch (e) {
    //   console.log(e);
    // }

  }

  public render(): React.ReactElement<IFileUploadProps> {
    return (
      <div className={styles.fileUpload}>
        <img src={this.state.ImageURL} height={'150px'} width={'150px'}></img>
        <br></br>
        <br></br>
        <h1>Hiii</h1>
        <FilePicker
          // bingAPIKey="<BING API KEY>"
          accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg", ".txt"]}
          buttonIcon="FileImage"
          // onSave={(filePickerResult: IFilePickerResult[]) => { this.setState({ filePickerResult }); console.log(filePickerResult) }}
          onSave={(filePickerResult: any[]) => { this.saveIntoSharePoint(filePickerResult); }}
          // onSave={(filePickerResult: any[]) => this._onFilePickerSave(filePickerResult)}

          onChange={(filePickerResult: IFilePickerResult[]) => { this.setState({ filePickerResult }); }}
          context={this.props.context}

        />
        <Stack horizontal >
          {/* <PrimaryButton text="Primary" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={true} />
          <PrimaryButton text="Primary" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={true} />
          <PrimaryButton text="Primary" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={true} />
          <PrimaryButton text="Primary" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={true} /> */}

        </Stack>
        <Stack horizontal>
          {/* <PrimaryButton text="New Stack" onClick={this._alertClicked} allowDisabledFocus disabled={false} checked={true} /> */}
          <Dropdown
            placeholder="Select an option"
            label="Countries"
            multiSelect
            options={[{ key: "Anil", text: "Anil", }, { key: "Sunil", text: "Sunil" }, { key: "Rahul", text: "Rahul" }, { key: "Govind", text: "Govind" }, { key: "Shinu", text: "Shinu" }, { key: "Rakesh", text: "Rakesh" }]}
            styles={dropdownStyles}
            onChange={this._onDropdownChange}
          />
        </Stack >
        <button type="button" onClick={this._sendFile}>Save</button>
        <button type="button" onClick={this._buttonCall}>Countries</button>
      </div>
    );
  }
}
