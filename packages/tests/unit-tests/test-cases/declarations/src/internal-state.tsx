import {
  Component,
  InternalState,
} from "@devextreme-generator/declarations";

function view(model: Widget):JSX.Element|null {
  return <span></span>;
}

@Component({
  view,
})
export default class Widget {
  @InternalState() _hovered: Boolean = false;

  updateState() {
    this._hovered = !this._hovered;
  }
}
