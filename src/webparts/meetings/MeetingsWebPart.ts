import * as React from "react";
import * as ReactDom from "react-dom";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { Version } from "@microsoft/sp-core-library";

import { IMeetingsProps } from "./components/IMeetingsProps";
import Meetings from "./components/Meetings";
import { setContext } from "../../spConfig";

export default class MeetingsWebPart extends BaseClientSideWebPart<void> {
  public render(): void {
    const element: React.ReactElement<IMeetingsProps> = React.createElement(
      Meetings,
      {
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    setContext(this.context);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
}
