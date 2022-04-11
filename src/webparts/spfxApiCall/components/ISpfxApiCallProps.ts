import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpfxApiCallProps {
  description: string;
  context: WebPartContext;
  url: string;
  // pageContexts: PageContext;
}
