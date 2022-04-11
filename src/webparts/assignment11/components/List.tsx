import { Announced, DetailsList, IColumn, TextField, Toggle } from "@fluentui/react";
import { sp } from "@pnp/sp";
import { MarqueeSelection } from "office-ui-fabric-react";
import * as React from "react";
import * as  react from "react";
import { ListProps } from "./ListProps";

let items: any[] = [];

export default class ListExapmle extends React.Component<ListProps, {}> {
    constructor(props: ListProps) {
        super(props);
        sp.setup({
            spfxContext: this.props.sp
        });
    }


    public componentWillMount = async () => {
        let data: any;
        let results: any = await sp.web.lists.getByTitle("Employee").items().then(dt => {
            dt.map(itm =>
                // this.setState({})
                // data.push(itm),
                items.push({
                    Id: itm.Id,
                    Name: itm.Name,
                    LastName: itm.LastName,
                    Update: <button type="button" id={itm.Id} onClick={() => this.props.edit(itm.Id, items)}>Edit</button>,
                    Delete: <button type="button"  onClick={() => this.props.delete(itm.Id)}>Delete</button>,
                    Email: itm.Email,
                    Gender: itm.Gender,
                    Designation: itm.Designation,
                })
            );
        });
        console.log(items);
    }
    // public _editButton(event: any) {
    //     alert("Button Clicked")
    //     console.log(event.target.id);

    // }

    public render() {
        return (
            <div>
                {/* <div className={classNames.controlWrapper}> */}
                <div>
                    {/* <Toggle
                        // label="Enable compact mode"
                        // checked={isCompactMode}
                        // onChange={this._onChangeCompactMode}
                        // onText="Compact"
                        // offText="Normal"
                    // styles={controlStyles}
                    />
                    <Toggle
                        // label="Enable modal selection"
                        // checked={isModalSelection}
                        // onChange={this._onChangeModalSelection}
                        // onText="Modal"
                        // offText="Normal"
                    // styles={controlStyles}
                    // /> */}
                    {/* <TextField label="Filter by name:" onChange={this._onChangeText} styles={controlStyles} /> */}
                    {/* <TextField label="Filter by name:" />
                    <Announced message={`Number of items after filter applied: ${items.length}.`} /> */}
                    {/* <button type="button" onClick={this._componentWillMount}>Click Here</button> */}
                </div>
                {/* <div> */}
                {/* <div className={classNames.selectionDetails}>{selectionDetails}</div> */}
                {/* <Announced message={selectionDetails} /> */}
                {/* {announcedMessage ? <Announced message={announcedMessage} /> : undefined} */}
                {/* {isModalSelection ? ( */}
                {/* <MarqueeSelection selection={this._selection}> */}
                <MarqueeSelection selection={undefined} >
                    <DetailsList
                        items={items}
                        compact={true}
                        // columns={columns}
                        // selectionMode={SelectionMode.multiple}
                        // getKey={this._getKey}
                        setKey="multiple"
                        // layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        // selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                        // onItemInvoked={this._onItemInvoked}
                        enterModalSelectionOnTouch={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="select row"
                    />
                </MarqueeSelection>
                {/* <DetailsList
                    items={items}
                    //   compact={isCompactMode}
                    //   columns={columns}
                    //   selectionMode={SelectionMode.none}
                    //   getKey={this._getKey}
                    setKey="none"
                    //   layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    data-is-scrollable={true}
                //   onItemInvoked={this._onItemInvoked}
                /> */}
                
            </div>
        );
    }



}

