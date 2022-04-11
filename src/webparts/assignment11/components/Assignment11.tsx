import * as React from 'react';
import styles from './Assignment11.module.scss';
import { IAssignment11Props } from './IAssignment11Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { Label } from '@fluentui/react/lib/Label';
import { MaskedTextField, TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackTokens, Modal, IStackProps, FontWeights, IIconProps, mergeStyleSets, getTheme, IDragOptions, Toggle, Dialog, DialogFooter, DialogType } from '@fluentui/react';
import { DefaultButton, IButtonStyles, IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { ChoiceGroup, Dropdown, IChoiceGroupOption } from '@pnp/spfx-controls-react/node_modules/office-ui-fabric-react';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ColumnControl } from '@pnp/sp/clientside-pages';
import { sp } from '@pnp/sp/presets/all';
import { Icon } from '@fluentui/react/lib/Icon';
import ListExapmle from './List';
import { DetailsListDocumentsExample } from './test';

//Setting Help Icon 
const helpIcon: IIconProps = { iconName: "Help" };
//Setting Cancle Icon 
const cancelIcon: IIconProps = { iconName: 'Cancel' };
//Used in Stack to for better performance
const token = { childrenGap: 15 };

const modalPropsStyles = { main: { maxWidth: 450 } };
//Submit Dailogue text defined 
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Missing Subject',
  subText: 'Do you Still want to Save this Feilds ?',
};
// Setting Theme 
const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
// styles for Icon Button 
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
// Choice group Optiions 
const options: IChoiceGroupOption[] = [
  { key: 'Male', text: 'Male' },
  { key: 'Female', text: 'Female' },
];
//Designation Dropdown Options
const options2: IDropdownOption[] = [
  { key: 'HR', text: 'HR' },
  { key: 'Manager', text: 'Manager' },
  { key: 'Developer', text: 'Developer' },
  { key: 'Sr Developer', text: 'Sr Developer' },
  { key: 'Engineer', text: 'Engineer' },
  { key: 'Acountant', text: 'Acountant' },
];

//State interface for the class
export interface Assignment11State {
  //Error Msg for all feilds
  nameError: string;
  lNameError: string;
  emailError: string;
  passError: string;
  cPassError: string;
  designationError: string;
  //Values of user
  fName: string;
  lName: string;
  designation: string;
  email: string;
  pass: string;
  cPass: string;
  gender: string;
  //Error Popup
  modalVisible: boolean;
  //On sucess popUp
  modalSucessVisible: boolean;
  //Saving Dialogue
  saveDialogue: boolean;
  //PopUp for Help Box
  helpModalVisible: boolean;
  //for Update value index
  updateId: number;
  //For Switching Submit and update
  submitOrUpdateBtn: boolean;
}


export default class Assignment11 extends React.Component<IAssignment11Props, Assignment11State, {}> {
  constructor(props: IAssignment11Props) {
    super(props);
    //setiing up Sp 
    sp.setup({
      spfxContext: this.props.context
    });
    this.state = {
      nameError: "",
      lNameError: "",
      emailError: "",
      passError: "",
      cPassError: "",
      designationError: "",
      fName: "",
      lName: "",
      designation: "",
      email: "",
      pass: "",
      cPass: "",
      gender: "",
      modalVisible: false,
      modalSucessVisible: false,
      saveDialogue: true,
      helpModalVisible: false,
      updateId: 0,
      submitOrUpdateBtn: true,
    };
  }
  //On Submit we check Empty Value and shwo error msg
  public _onSubmitClicked = async () => {

    if (this.state.fName === "") {
      this.setState({ nameError: "Enter Valid Name", modalVisible: true });
    }
    else if (this.state.lName === "") {
      this.setState({ lNameError: "Enter Valid Last Name", modalVisible: true });
    }
    else if (this.state.email === "") {
      this.setState({ emailError: "Enter Valid Email", modalVisible: true });
    }
    else if (this.state.pass === "") {
      this.setState({ passError: "Enter Valid Password", modalVisible: true });
    }
    else if (this.state.cPass === "") {
      this.setState({ cPassError: "Password doesnt match", modalVisible: true });
    }
    else if (this.state.designation === "") {
      this.setState({ designationError: "Choose Designation", modalVisible: true });
    }
    else {
      this.setState({ saveDialogue: false });
    }
  }
  // post value in SP List
  public _submitValues = async () => {
    this.setState({ saveDialogue: true });
    try {
      await sp.web.lists.getByTitle("Employee").items.add({
        Name: this.state.fName,
        LastName: this.state.lName,
        Email: this.state.email,
        Gender: this.state.gender,
        Designation: this.state.designation,
        Password: this.state.pass,
      }).then(() =>
        this.setState({ modalSucessVisible: true })),
        this.clearValues();
    }
    catch (e) {
      console.log(e);
    }
  }
  //OnChnage for Textfeilds
  public _onTextChange = (event: any) => {
    console.log(event.target.id);
    if (event.target.id === "fname") {
      this.setState({ fName: event.target.value });
    }
    if (event.target.id === "lname") {
      this.setState({ lName: event.target.value });
    }
    if (event.target.id === "email") {
      this.setState({ email: event.target.value });
    }
    if (event.target.id === "pass") {
      this.setState({ pass: event.target.value });
    }
    if (event.target.id === "confirmPass") {
      this.setState({ cPass: event.target.value });
    }

  }
  //OnChange For Dropdown
  public _onDesignationChange = (event: any, item: any) => {
    // console.log(item.key);
    this.setState({ designation: item.key });
  }
  //OnChange For Gender
  public _genderChoiceChanged = (event: any, item: any) => {
    console.log(event);
    console.log(item);
    this.setState({ gender: item.key });
  }
  //Clears all the textbox values
  public clearValues = () => {
    this.setState({
      nameError: "",
      lNameError: "",
      emailError: "",
      passError: "",
      cPassError: "",
      designationError: "",
      fName: "",
      lName: "",
      designation: "",
      email: "",
      pass: "",
      cPass: "",
      gender: "",
    });
  }
  public _hideModal = () => {
    this.setState({ modalVisible: false, modalSucessVisible: false, helpModalVisible: false });
  }
  public _showHelpModal = (event: any) => {
    this.setState({ helpModalVisible: true });
  }

  // this function will get called by button in List Component
  public _childEditFunction = (id: any, values: any) => {
    let indexOfValues;
    alert("called in parent class");
    console.log(id);
    console.log(values);

    values.map((element, index) => {
      id == element.Id ? indexOfValues = index : index;
    });

    this.setState({
      fName: values[indexOfValues].Name,
      lName: values[indexOfValues].LastName,
      email: values[indexOfValues].Email,
      designation: values[indexOfValues].Designation,
      updateId: values[indexOfValues].Id,
      submitOrUpdateBtn: false

    });

  }
  public _onUpdateClicked = async () => {
    alert("Updating Values");
    this.setState({ submitOrUpdateBtn: false });
    try {
      const i = await sp.web.lists.getByTitle("Employee").items.getById(this.state.updateId).update({
        Name: this.state.fName,
        LastName: this.state.lName,
        Email: this.state.email,
        Gender: this.state.gender,
        Designation: this.state.designation,
        Password: this.state.pass,
      }).then(() =>
        this.setState({ modalSucessVisible: true }));
      this.clearValues();
    }
    catch (e) {
      console.log(e);
    }

    this.setState({ submitOrUpdateBtn: true });
  }
  public _onDeleteClicked = async (id: any) => {
    alert("Updating Values");
    this.setState({ submitOrUpdateBtn: false });
    try {
      const list = await sp.web.lists.getByTitle("Employee").items.getById(id).delete().then(dt =>
        alert("sucessfully Deleted Item From list")
      );
    }
    catch (e) {
      console.log(e);
    }

    this.setState({ submitOrUpdateBtn: true });
  }

  public render(): React.ReactElement<IAssignment11Props> {
    return (
      <div className={styles.assignment11} >
        <h1>Employee Details </h1>
        <Stack >
          {/* Name Stack */}
          <Stack horizontal>
            <Label required>Name :</Label>
            <IconButton
              iconProps={helpIcon}
              onClick={this._showHelpModal} />
          </Stack>
          <TextField id="fname"
            placeholder='Name'
            value={this.state.fName}
            onChange={this._onTextChange}
            errorMessage={this.state.nameError}>
          </TextField>

          {/* For Last Name */}
          <Stack horizontal>
            <Label required>Last Name :</Label>
            <IconButton
              iconProps={helpIcon}
              onClick={this._showHelpModal} />
          </Stack>
          <TextField id="lname"
            placeholder='Last Name'
            value={this.state.lName}
            onChange={this._onTextChange}
            errorMessage={this.state.lNameError}>
          </TextField>

          {/* Email  */}
          <Stack horizontal>
            <Label required>Email :</Label>
            <IconButton
              iconProps={helpIcon}
              onClick={this._showHelpModal} />
          </Stack>
          <TextField id="email"
            placeholder='Email'
            value={this.state.email}
            onChange={this._onTextChange}
            errorMessage={this.state.emailError}>
          </TextField>

          {/* Gender */}
          <Stack horizontal>
            <ChoiceGroup options={options} selectedKey={this.state.gender} required onChange={this._genderChoiceChanged} label="Gender" />
          </Stack>

          {/* Dropdown */}
          <Dropdown
            placeholder='Desegnation'
            label="Desegnation"
            options={options2}
            selectedKey={this.state.designation}
            required
            onChange={this._onDesignationChange}
            errorMessage={this.state.designationError}
          />

          {/* Passowrd */}
          <Label required>Password : </Label>
          <TextField
            id="pass"
            placeholder='Password'
            type="password"
            canRevealPassword
            revealPasswordAriaLabel="Show password"
            value={this.state.pass}
            onChange={this._onTextChange}
            errorMessage={this.state.passError}>
          </TextField>

          {/* Confirm Password */}
          <Label required>Confirm Password : </Label>
          <TextField id="confirmPass"
            placeholder='Confirm Password'
            type="password"
            canRevealPassword
            revealPasswordAriaLabel="Show password"
            value={this.state.cPass}
            onChange={this._onTextChange}
            errorMessage={this.state.cPassError}>
          </TextField>

          {/* Submit Button Stack */}
          <Stack horizontal className={styles.buttonClass} tokens={token}>
            {this.state.submitOrUpdateBtn ? <PrimaryButton text="Submit" onClick={this._onSubmitClicked} allowDisabledFocus /> : <PrimaryButton text="Update" onClick={this._onUpdateClicked} allowDisabledFocus />
            }
            <DefaultButton text="Clear" onClick={this.clearValues} allowDisabledFocus />
          </Stack>
        </Stack>

        {/* Error Modal Box */}
        <Modal
          isOpen={this.state.modalVisible}
          onDismiss={this._hideModal}
        >
          <div className={contentStyles.header}>
            <span >Error !!!</span>
            <IconButton
              styles={iconButtonStyles}
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={this._hideModal}
            />
          </div>
          <div className={contentStyles.body}>
            <p>
              Please Enter All the feilds
            </p>
          </div>
        </Modal>

        {/* Success Modal Box */}
        < Modal
          isOpen={this.state.modalSucessVisible}
          onDismiss={this._hideModal}
        >
          <div className={contentStyles.header}>
            <span >Success !!!</span>
            <IconButton
              styles={iconButtonStyles}
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={this._hideModal}
            />
          </div>
          <div className={contentStyles.body}>
            <p>
              Sucessfully Posted values in Sharepoint lists
            </p>
          </div>
        </Modal >

        {/* Help Modal */}
        < Modal
          isOpen={this.state.helpModalVisible}
          onDismiss={this._hideModal}
        >
          <div className={contentStyles.header}>
            <span >Need Help ?</span>
            <IconButton
              styles={iconButtonStyles}
              iconProps={cancelIcon}
              ariaLabel="Close popup modal"
              onClick={this._hideModal}
            />
          </div>
          <div className={contentStyles.body}>
            <p>
              You will find Help Here
            </p>
          </div>
        </Modal >
        {/* Dialogue for Send or dont send verification */}
        < Dialog
          hidden={this.state.saveDialogue}
          onDismiss={this._hideModal}
          dialogContentProps={dialogContentProps}
        >
          <DialogFooter>
            <PrimaryButton onClick={this._submitValues} text="Send" />
            <DefaultButton onClick={this._hideModal} text="Don't send" />
          </DialogFooter>
        </Dialog >
        <div>
          <ListExapmle sp={this.props.context} edit={this._childEditFunction} delete={this._onDeleteClicked}></ListExapmle>
          {/* <DetailsListDocumentsExample sp={this.props.context}/> */}
        </div>
      </div >

    );
  }
}
