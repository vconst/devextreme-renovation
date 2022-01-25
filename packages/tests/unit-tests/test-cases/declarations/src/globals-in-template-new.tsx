import { COMPONENT_INPUT_CLASS } from "./component-input";
import { WidgetTwo as ExternalComponent } from "./component-pass-two";

export const PREFIX = "dx";
export const CLASS_NAME = PREFIX + "c1" + "c2" + COMPONENT_INPUT_CLASS;

export type Item = {
  text: string;
  key: number;
};

const getKey = (item: Item) => item.key;

export function WidgetWithGlobals({ items = [] }: { items: Item[] }) {
  return (
    <div className={CLASS_NAME}>
      <span className={CLASS_NAME}></span>
      <ExternalComponent />
      {items.map((item) => (
        <div key={getKey(item)}></div>
      ))}
    </div>
  );
}
