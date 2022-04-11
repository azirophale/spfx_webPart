import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxApiCallWebPartStrings';
import SpfxApiCall from './components/SpfxApiCall';
import { ISpfxApiCallProps } from './components/ISpfxApiCallProps';

export interface ISpfxApiCallWebPartProps {
  description: string;
}

export default class SpfxApiCallWebPart extends BaseClientSideWebPart<ISpfxApiCallWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxApiCallProps> = React.createElement(
      SpfxApiCall,
      {
        description: this.properties.description,
        context:this.context,
        url:this.context.pageContext.web.absoluteUrl,
        // pageContext: this.context.pageContext
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
