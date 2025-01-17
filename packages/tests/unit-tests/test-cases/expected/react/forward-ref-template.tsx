import { MutableRefObject } from "react";
function view(model: RefOnChildrenTemplate) {
  return (
    <React.Fragment>
      {model.props.contentTemplate({ childRef: model.child })}
    </React.Fragment>
  );
}

export declare type PropsType = {
  contentTemplate: any;
  contentRender?: any;
  contentComponent?: any;
};
const Props: PropsType = {} as any as PropsType;
import * as React from "react";
import { useCallback, useEffect, useRef } from "react";

declare type RestProps = {
  className?: string;
  style?: { [name: string]: any };
  key?: any;
  ref?: any;
};
interface RefOnChildrenTemplate {
  props: typeof Props & RestProps;
  child: any;
  restAttributes: RestProps;
}

const getTemplate = (TemplateProp: any, RenderProp: any, ComponentProp: any) =>
  (TemplateProp &&
    (TemplateProp.defaultProps
      ? (props: any) => <TemplateProp {...props} />
      : TemplateProp)) ||
  (RenderProp &&
    ((props: any) =>
      RenderProp(
        ...("data" in props ? [props.data, props.index] : [props])
      ))) ||
  (ComponentProp && ((props: any) => <ComponentProp {...props} />));

export default function RefOnChildrenTemplate(props: typeof Props & RestProps) {
  const __child: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  const __restAttributes = useCallback(
    function __restAttributes(): RestProps {
      const { contentComponent, contentRender, contentTemplate, ...restProps } =
        props;
      return restProps;
    },
    [props]
  );
  useEffect(() => {
    if (__child.current) {
      __child.current.innerHTML += "ParentText";
    }
  }, []);

  return view({
    props: {
      ...props,
      contentTemplate: getTemplate(
        props.contentTemplate,
        props.contentRender,
        props.contentComponent
      ),
    },
    child: __child,
    restAttributes: __restAttributes(),
  });
}

RefOnChildrenTemplate.defaultProps = {
  ...Props,
};
