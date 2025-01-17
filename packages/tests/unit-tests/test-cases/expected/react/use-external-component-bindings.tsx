import Props from "./component-bindings-only";
function view(model: Widget) {
  return <div>{model.props.height}</div>;
}

import {
  convertRulesToOptions,
  Rule,
} from "../../../../jquery-helpers/default_options";
import * as React from "react";
import { useCallback } from "react";

declare type RestProps = {
  className?: string;
  style?: { [name: string]: any };
  key?: any;
  ref?: any;
};
interface Widget {
  props: typeof Props & RestProps;
  restAttributes: RestProps;
}

export default function Widget(props: typeof Props & RestProps) {
  const __restAttributes = useCallback(
    function __restAttributes(): RestProps {
      const { data, height, info, ...restProps } = props;
      return restProps;
    },
    [props]
  );

  return view({ props: { ...props }, restAttributes: __restAttributes() });
}

function __createDefaultProps() {
  return {
    ...Props,
  };
}
Widget.defaultProps = __createDefaultProps();

type WidgetOptionRule = Rule<typeof Props>;

const __defaultOptionRules: WidgetOptionRule[] = [];
export function defaultOptions(rule: WidgetOptionRule) {
  __defaultOptionRules.push(rule);
  Widget.defaultProps = {
    ...__createDefaultProps(),
    ...convertRulesToOptions<typeof Props>(__defaultOptionRules),
  };
}
