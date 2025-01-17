import registerComponent from "../../../../jquery-helpers/jquery_component_registrator";
import { JQueryCustomBaseComponent } from "../../../../jquery-helpers/jquery_custom_base_component";
import WidgetComponent, {
  defaultOptions,
} from "../../../../jquery-custom-named-base";

export default class Widget extends JQueryCustomBaseComponent {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: [],
      props: [],
    };
  }

  get _viewComponent() {
    return WidgetComponent;
  }
}

registerComponent("dxWidget", Widget);
Widget.defaultOptions = defaultOptions;
