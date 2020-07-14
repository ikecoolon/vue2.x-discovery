import {Watcher} from "./watcher";

const VTEXT = 'v-text';
export const CompileUtils = {

    /**
     * 对 data 中的数据取值
     * @param vm
     * @param expr
     * 例如${data.a}、${data.b}
     * <div v-text='data.a'>、<div v-text='data.b.c'>
     *     等等
     */
    getVMData(vm, expr) {
        let data = vm.$data;
        expr.split('.').forEach(key => {
            //执行下句取值 Observe 里面监听的 get 会触发先执行
            data = data[key];
        });
        return data;
    },

    setVMData(vm, expr, value) {
        let data = vm.$data;
        let arr = expr.split('.');
        arr.forEach((key, index) => {
            if (index < arr.length - 1) {
                data = data[key];

            } else {
                data[key] = value;
            }
        })
    },

    /**
     * 解析插值表达式
     * @param node
     * @param vm
     */
    mustache(node, vm) {
        let txt = node.textContent;
        let reg = /\{\{(.+)\}/;
        if (reg.test(txt)) {
            //todo 啥意思？
            let expr = RegExp.$1;
            node.textContent = txt.replace(reg, this.getVMData(vm, expr));

            //监听 expr 值变化，如果变化，执行回调
            new Watcher(vm, expr, newValue => {
                node.textContent = txt.replace(reg, newValue);
            });
        }
    },

    isTextNode(node) {
        return node.hasAttribute('v-text');
    },


    /**
     * 解析 v-text
     * @param node
     * @param vm
     */
    text(node, vm) {
        let expr=node.getAttribute(VTEXT);
        node.textContent = this.getVMData(vm, expr);
        new Watcher(vm, expr, newValue => {
            node.textContent = newValue;
        })
    },

    isVModel(node) {
        return node.hasAttribute('v-model');
    },

    /**
     * 解析 v-model
     * @param node
     * @param vm
     * @param expr
     */
    model(node, vm) {
        let expr=node.getAttribute('v-model');
        let that = this;
        node.value = this.getVMData(vm, expr);
        node.addEventListener('input',  function() {
            //这个做法为何不行？
            //vm.$data[expr]=this.value;
            // debugger;
            this.setVMData(vm, expr, node.value);
        }.bind(this));
        // new Watcher(vm,'v-mode',()=>{
        //
        // })
    },

    eventHandler(node, vm, eventType, expr) {
        //处理 methods 里不存在的 fn 函数
        let fn = vm.$methods && vm.$methods[expr];
        try {
            node.addEventListener(eventType, fn.bind(vm));
        } catch (e) {
            console.error(`${expr} 方法不存在`, e);
        }
    }

};
