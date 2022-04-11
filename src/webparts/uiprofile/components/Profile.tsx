import * as React from 'react';
import styles from './Uiprofile.module.scss';

// const logo = require('./img_avatar.png');


export interface IProfileProps {
    image: any;
    Name: string;
    email: string;
    webSite: string;
}


export default class ProfileComponent extends React.Component<IProfileProps, {}>{
    constructor(props: IProfileProps) {
        super(props);

    }
    public componentWillMount(){
        alert("UI profile File is running");
    }
    public render(): React.ReactElement<{}> {
        return (
            <div className={styles.profile}>
                {/* <h1>Profile HERE</h1> */}
                <div className={styles.container}>
                    {/* <img src={require('./img_avatar.png')} className={styles.imagebox} alt="Avatar"></img> */}
                    <img src={this.props.image} className={styles.imagebox} alt="Avatar"></img>

                    <h1> {this.props.Name}</h1>
                    <div className={styles.cardBox}>
                        <span className={styles.span} ></span>

                        <h3>Email : {this.props.email}</h3>
                        <h3>Website :<a> {this.props.webSite}</a></h3>
                        <p>------------------------------------------------</p>
                        <div className={styles.iconDiv}>
                            <img src="https://img.icons8.com/color/30/000000/facebook-new.png" />
                            <img src="https://img.icons8.com/color/30/000000/twitter--v1.png" />
                            <img src="https://img.icons8.com/color/30/000000/whatsapp--v6.png" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}