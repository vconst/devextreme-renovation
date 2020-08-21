import { Property as BaseProperty } from "../../../base-generator/expressions/class-members";
import { Decorators } from "../../../component_declaration/decorators";
import SyntaxKind from "../../../base-generator/syntaxKind";
import {
  compileType,
  capitalizeFirstLetter,
} from "../../../base-generator/utils/string";
import { toStringOptions } from "../../../base-generator/types";
import { Identifier } from "../../../base-generator/expressions/common";

export function getLocalStateName(
  name: Identifier | string,
  componentContext: string = ""
) {
  return `${componentContext}__state_${name}`;
}

export function getPropName(
  name: Identifier | string,
  componentContext: string = "",
  scope = "props."
) {
  return `${componentContext}${scope}${name}`;
}

export function stateSetter(stateName: Identifier | string) {
  return `__state_set${capitalizeFirstLetter(stateName)}`;
}

export class Property extends BaseProperty {
  defaultProps() {
    return this.defaultDeclaration();
  }

  typeDeclaration() {
    let type = this.type;

    if (this.isSlot) {
      type = "React.ReactNode";
    }
    if (
      this.decorators.find(
        (d) => d.name === Decorators.Ref || d.name === Decorators.ApiRef
      )
    ) {
      type = "any";
    }
    if (this.isRefProp || this.isForwardRefProp) {
      type = `RefObject<${this.type}>`;
    }

    const questionOrExclamationToken =
      this.questionOrExclamationToken === SyntaxKind.ExclamationToken ||
      type === "any"
        ? ""
        : this.questionOrExclamationToken;

    const typeString = compileType(type.toString(), questionOrExclamationToken);

    return `${this.name}${typeString}`;
  }

  getter(componentContext?: string) {
    componentContext = this.processComponentContext(componentContext);
    const scope = this.processComponentContext(this.scope);
    if (this.isInternalState) {
      return getLocalStateName(this.name, componentContext);
    } else if (
      this.decorators.some(
        (d) =>
          d.name === Decorators.OneWay ||
          d.name === Decorators.Event ||
          d.name === Decorators.Template ||
          d.name === Decorators.Slot
      )
    ) {
      return getPropName(this.name, componentContext, scope);
    } else if (
      this.decorators.some(
        (d) =>
          d.name === Decorators.Ref ||
          d.name === Decorators.ApiRef ||
          d.name === Decorators.RefProp ||
          d.name === Decorators.ForwardRefProp
      )
    ) {
      if (componentContext === "") {
        return `${scope}${this.name}${
          scope ? this.questionOrExclamationToken : ""
        }.current!`;
      }
      return getPropName(this.name, componentContext, scope);
    } else if (this.isState) {
      const propName = getPropName(this.name, componentContext, scope);
      return `(${propName}!==undefined?${propName}:${getLocalStateName(
        this.name,
        componentContext
      )})`;
    } else if (this.isNested) {
      return `__getNested${capitalizeFirstLetter(this.name)}()`;
    } else if (this.isProvider || this.isConsumer) {
      return this.name;
    }
    throw `Can't parse property: ${this._name}`;
  }

  getDependency() {
    if (this.isInternalState) {
      return [getLocalStateName(this.name)];
    } else if (
      this.decorators.some(
        (d) =>
          d.name === Decorators.OneWay ||
          d.name === Decorators.Event ||
          d.name === Decorators.Template ||
          d.name === Decorators.Slot
      )
    ) {
      return [getPropName(this.name)];
    } else if (
      this.decorators.some(
        (d) =>
          d.name === Decorators.Ref ||
          d.name === Decorators.ApiRef ||
          d.name === Decorators.RefProp ||
          d.name === Decorators.ForwardRefProp
      )
    ) {
      const scope = this.processComponentContext(this.scope);
      return this.questionOrExclamationToken === "?"
        ? [
            `${scope}${this.name.toString()}${
              scope ? this.questionOrExclamationToken : ""
            }.current`,
          ]
        : [];
    } else if (this.isState) {
      return [getPropName(this.name), getLocalStateName(this.name)];
    } else if (this.isNested) {
      return [getPropName(this.name), getPropName("children")];
    } else if (this.isProvider || this.isConsumer) {
      return [this.name];
    }
    throw `Can't parse property: ${this._name}`;
  }

  inherit() {
    return new Property(
      this.decorators,
      this.modifiers,
      this._name,
      this.questionOrExclamationToken,
      this.type,
      this.initializer,
      true
    );
  }

  toString(options?: toStringOptions) {
    if (!options) {
      return super.toString();
    }
    const type = `${this.type}${
      this.questionOrExclamationToken === SyntaxKind.QuestionToken
        ? " | undefined"
        : ""
    }`;
    if (this.isState) {
      const propName = getPropName(this.name);
      const defaultExclamationToken =
        this.initializer &&
        this.questionOrExclamationToken !== SyntaxKind.QuestionToken
          ? SyntaxKind.ExclamationToken
          : "";

      return `const [${getLocalStateName(this.name)}, ${stateSetter(
        this.name
      )}] = useState<${type}>(()=>${propName}!==undefined?${propName}:props.default${capitalizeFirstLetter(
        this.name
      )}${defaultExclamationToken})`;
    }

    if (this.isConsumer) {
      return `const ${this.name} = useContext(${this.context})`;
    }

    if (this.isProvider) {
      return `const [${this.name}] = useState(${this.initializer})`;
    }

    return `const [${getLocalStateName(this.name)}, ${stateSetter(
      this.name
    )}] = useState<${type}>(${this.initializer})`;
  }

  get canBeDestructured() {
    if (this.isState || this.isRefProp || this.isNested) {
      return false;
    }
    return super.canBeDestructured;
  }
}