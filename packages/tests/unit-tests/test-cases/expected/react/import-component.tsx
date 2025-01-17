import Base, { WidgetProps } from "./component-input";
function view(model: Child) {
  return <Base height={model.getProps().height} />;
}

export declare type ChildInputType = typeof WidgetProps & {
  height: number;
  onClick: (a: number) => void;
};
const ChildInput: ChildInputType = {
  ...WidgetProps,
  height: 10,
  onClick: () => {},
};
import * as React from "react";
import { useCallback } from "react";

declare type RestProps = {
  className?: string;
  style?: { [name: string]: any };
  key?: any;
  ref?: any;
};
interface Child {
  props: typeof ChildInput & RestProps;
  getProps: () => typeof WidgetProps;
  restAttributes: RestProps;
}

export default function Child(props: typeof ChildInput & RestProps) {
  const __getProps = useCallback(
    function __getProps(): typeof WidgetProps {
      return { height: props.height } as typeof WidgetProps;
    },
    [props.height]
  );
  const __restAttributes = useCallback(
    function __restAttributes(): RestProps {
      const { children, height, onClick, width, ...restProps } = props;
      return restProps;
    },
    [props]
  );

  return view({
    props: { ...props },
    getProps: __getProps,
    restAttributes: __restAttributes(),
  });
}

Child.defaultProps = {
  ...ChildInput,
};
