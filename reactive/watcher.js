import {CompileUtils} from "./compileUtils";

export class Watcher {
    /**
     *
     * @param vm 当前 vue 实例
     * @param expr data 中数据的名字
     * @param callback 数据改变发生的回调
     */
    constructor(vm, expr, callback) {
        this.vm = vm;
        this.expr = expr;
        this.callback = callback;

        Dep.target = this;
        this.oldValue = CompileUtils.getVMData(vm, expr);
        Dep.taget = null;
    }

    update() {
        let oldValue = this.oldValue;
        let newValue = CompileUtils.getVMData(this.vm, this.expr);
        if (oldValue !== newValue) {
            this.callback(newValue, oldValue);
        }
    }
}

/**
 * 依赖容器
 */
export class Dep {
    constructor() {
        //set 可以去重
        this.subs = new Set();
    }

    /**
     * 添加订阅者
     * @param watcher
     */
    addSub(watcher) {
        this.subs.add(watcher);
    }

    /**
     * 通知所有订阅者
     */
    notify() {
        // console.log(this.subs);
        this.subs.forEach(sub => {
            sub.update();
        })
    }

}
