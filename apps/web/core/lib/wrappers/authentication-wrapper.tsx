import type { ReactNode } from "react";
import { observer } from "mobx-react";

import { EPageTypes } from "@/helpers/authentication.helper";


type TPageType = EPageTypes;

type TAuthenticationWrapper = {
  children: ReactNode;
  pageType?: TPageType;
};

const isValidURL = (url: string): boolean => {
  const disallowedSchemes = /^(https?|ftp):\/\//i;
  return !disallowedSchemes.test(url);
};

export const AuthenticationWrapper = observer(function AuthenticationWrapper(props: TAuthenticationWrapper) {


  return <>{props.children}</>;
});
