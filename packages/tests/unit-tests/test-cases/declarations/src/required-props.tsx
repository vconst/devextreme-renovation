import {
  Component,
  OneWay,
  ComponentBindings,
  JSXComponent,
} from "@devextreme-generator/declarations";

function view():JSX.Element|null {
  return null;
}

@ComponentBindings()
class WidgetInput {
  @OneWay() size!: {
    width: number;
    height: number;
  };

  @OneWay() type!: string;
}

@Component({
  view: view,
})
export default class Widget extends JSXComponent<
  WidgetInput,
  "size" | "type"
>() {
  get getHeight(): number {
    return this.props.size.height;
  }

  get type(): string {
    const { type } = this.props;
    return type;
  }
}
