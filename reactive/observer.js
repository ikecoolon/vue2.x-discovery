import {Dep} from "./watcher";

export class Observer {
    constructor(values) {
        this.values = values;
        this.walk(values);
        //因为 Observe 只实例化一次，所以在这里声明 dep
        this.dep = new Dep();
    }

    //遍历values 所有数据，劫持 set 和 get
    walk(values) {
        //判断是否是对象
        if (!values || typeof values !== 'object') return;

        Object.keys(values).forEach(key => {
            this.defineReactive(values, key, values[key]);
            //如果是对象/数组 深度劫持
            if (Object.prototype.toString.call(values[key]) === "[object Object]"
                || (Array.isArray(values[key]))) {

                this.walk(values[key]);
            }

        });
    }

    defineReactive(obj, key, val) {

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                // console.log(`${Dep.target}----${key}----get happen`);
                Dep.target && this.dep.addSub(Dep.target);
                return val;
            },
            set: newVal => {
                if (val === newVal) return;

                val = newVal;
                //如果设置的值是对象，劫持对象 set 和 get
                if (Object.prototype.toString.call(newVal) === "[object Object]"
                    || (Array.isArray(newVal))) {
                    this.walk(newVal);
                }

                //watcher.update
                //发布通知，让所有订阅者更新内容
                this.dep.notify();
            }

        });

    }

}


