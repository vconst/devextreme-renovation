import {
  Component,
  OneWay,
  Event,
  ComponentBindings,
  JSXComponent,
} from "@devextreme-generator/declarations";
import Base, { WidgetProps } from "./component-input";

function view(model: Child):JSX.Element|null {
  return <Base height={model.getProps().height} />;
}

@ComponentBindings()
class ChildInput extends WidgetProps {
  @OneWay() height: number = 10;
  @Event() onClick: (a: number) => void = () => {};
}

@Component({ view })
export default class Child extends JSXComponent(ChildInput) {
  getProps(): WidgetProps {
    return { height: this.props.height } as WidgetProps;
  }
}
