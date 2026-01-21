import type { ReactNode } from "react";
import { observer } from "mobx-react";

import { EPageTypes } from "@/helpers/authentication.helper";


type TPageType = EPageTypes;

type TAuthenticationWrapper = {
  children: ReactNode;
  pageType?: TPageType;
};



export const AuthenticationWrapper = observer(function AuthenticationWrapper(props: TAuthenticationWrapper) {


  return <>{props.children}</>;
});
