import * as React from 'react';
import styles from './Uiprofile.module.scss';
import { IUiprofileProps } from './IUiprofileProps';
import ProfileComponent from "./Profile";

const IMG1=require("./images/jarvis.jpg");
const IMG2=require('./images/vision.png');
const IMG3=require('./images/ironMan.png');

export default class Uiprofile extends React.Component<IUiprofileProps, {}> {
  public render(): React.ReactElement<IUiprofileProps> {
    return (
      <div className={styles.uiprofile}>
        <div className={styles.uishow}>
          <ProfileComponent image={IMG1}
            Name="Jarvis Patil"
            email="helloJarvis@gmail.com"
            webSite="https//:www.Jarvis.com" />

          <ProfileComponent image={IMG2}
            Name="Vision Sawant"
            email="WandaVision@gmail.com"
            webSite="https//:www.Great-Vision.com" />

          <ProfileComponent image={IMG3}
            Name="Iron Manus"
            email="iron man@gmail.com"
            webSite="https//:www.I-am-IronMan.com" />
        </div>
      </div >
    );
  }
}


// details={
//   Name:"Jarvis Patil",
// email="helloJarvis@gmail.com",
// webSite="https//:www.Jarvis.com"}