import { Input, TemplateRef } from "@angular/core"
class Props {
    @Input() contentTemplate!: TemplateRef<any>;
}

import { Component, NgModule, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common"

@Component({
    selector: "dx-ref-on-children-template",
    template: `<ng-container *ngTemplateOutlet="contentTemplate; context:{childRef:forwardRef_child}"></ng-container>`
})
export default class RefOnChildrenTemplate extends Props {
    child!: ElementRef<HTMLDivElement>
    __effect(): any {
        this.child.nativeElement.innerHTML += "ParentText"
    }
    get __restAttributes(): any {
        return {}
    }

    get forwardRef_child(): (ref: any) => void {
        if (this.__getterCache["forwardRef_child"] !== undefined) {
            return this.__getterCache["forwardRef_child"];
        }
        return this.__getterCache["forwardRef_child"] = ((): (ref: any) => void => {
            return (ref) => this.child = ref
        })();
    }

    __destroyEffects: any[] = [];
    __viewCheckedSubscribeEvent: Array<() => void> = [];
    __schedule_effect() {
        this.__destroyEffects[0]?.();
        this.__viewCheckedSubscribeEvent[0] = () => {
            this.__destroyEffects[0] = this.__effect()
        }
    }
    __getterCache: {
        forwardRef_child?: (ref: any) => void
    } = {}

    ngAfterViewInit() {
        this.__destroyEffects.push(this.__effect());
    }
    ngOnChanges(changes: { [name: string]: any }) {
        if (this.__destroyEffects.length && ["child"].some(d => changes[d])) {
            this.__schedule_effect();
        }
    }
    ngOnDestroy() {
        this.__destroyEffects.forEach(d => d && d());
    }
    ngAfterViewChecked() {
        this.__viewCheckedSubscribeEvent.forEach(s => s?.());
        this.__viewCheckedSubscribeEvent = [];
    }
}
@NgModule({
    declarations: [RefOnChildrenTemplate],
    imports: [
        CommonModule
    ],
    exports: [RefOnChildrenTemplate]
})
export class DxRefOnChildrenTemplateModule { }