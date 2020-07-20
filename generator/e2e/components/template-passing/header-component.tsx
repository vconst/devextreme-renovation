import {
  Component,
  ComponentBindings,
  JSXComponent,
  Event,
  Fragment,
  OneWay,
} from "../../../component_declaration/common";
import Button from "../button.tsx";

function view({ props: { text }, click }: HeaderComponent) {
  return (
    <Fragment>
      <span>{text}</span>
      <Button id="header-component-button" onClick={click}>
        Touch me!
      </Button>
    </Fragment>
  );
}

@ComponentBindings()
class HeaderComponentProps {
  @OneWay() text?: string;
  @Event() onClick? = () => void 0;
}

@Component({
  view,
})
export default class HeaderComponent extends JSXComponent(
  HeaderComponentProps
) {
  click() {
    this.props.onClick();
  }
}