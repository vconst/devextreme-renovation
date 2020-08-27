import registerComponent from "../../../../component_declaration/jquery_component_registrator";
import BaseComponent from "../../../../component_declaration/jquery_base_component";
import WidgetComponent from "../../../../jquery-props-info";

export default class Widget extends BaseComponent {
  get _propsInfo() {
    return {
      twoway: [
        ["state1", false, "state1Change"],
        ["state2", "default value", "state2Change"],
        [
          "state3",
          (e: any) => {
            return e.num;
          },
          "state3Change",
        ],
        ["state4", undefined, "state4Change"],
      ],
      allowNull: ["prop1", "defaultState4", "state4"],
    };
  }

  get _viewComponent() {
    return WidgetComponent;
  }
}

registerComponent("dxWidget", Widget);