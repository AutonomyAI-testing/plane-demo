import type { ReactNode } from "react";
import { observer } from "mobx-react";


type TInstanceWrapper = {
  children: ReactNode;
};

const  InstanceWrapper = observer(function InstanceWrapper(props: TInstanceWrapper) {
  const { children } = props;


  return <>{children}</>;
});

export default InstanceWrapper;
