import {Observer} from "./reactive/observer";
import {Compile} from "./reactive/compile";


export class Vue {

    constructor(options = {}) {

        this._init(options);
        //模板
        this.$el = options.el;
        //数据
        this.$data = options.data;
        // //方法
        // this.$methods = options.methods;
        // debugger;
        /**
         * 将data,method 挂载到实例
         * 就可以直接使用 this.xx(data 中的数据)
         */
        this.proxy(this.$data);
        // this.proxy(this.$methods);
        new Observer(this.$data);
        new Compile(this.$el,this);
        this.initMixin();


    }

    _init(options) {
        //todo 为什么使用 Object.create
        this.options = Object.create(null);
        //todo  为什么放在把 Vue放在_base
        this.options._base = Vue;
        this.$options = this.mergeOptions(Vue.options, options);
        this._renderProxy=this;
        this.initRender();
    }

    initRender() {
        this._vnode = null; // the root of the child tree
        this._staticTrees = null; // v-once cached trees
        let options = this.$options;
        let parentVnode = (this.$vnode = options._parentVnode); // the placeholder node in parent tree
        let renderContext = parentVnode && parentVnode.context;
        this.$scopedSlots = {};
        this._c = function(a, b, c, d) {
            return this.createElement(this, a, b, c, d, false);
        };
        this.$createElement = function(a, b, c, d) {
            return this.createElement(this, a, b, c, d, true);
        };
        let parentData = parentVnode && parentVnode.data;
    }

     createElement(
        context,
        tag,
        data,
        children,
        normalizationType,
        alwaysNormalize
    ) {
        if (Array.isArray(data) || this.isPrimitive(data)) {
            normalizationType = children;
            children = data;
            data = undefined;
        }
        if (isTrue(alwaysNormalize)) {
            normalizationType = ALWAYS_NORMALIZE;
        }
        return _createElement(context, tag, data, children, normalizationType);
    }

    isPrimitive(value) {
        return (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "symbol" ||
            typeof value === "boolean"
        );
    }

    initMixin() {
        let vm = this;

    }

    mergeOptions(parent, child, vm) {
        let options = {};
        for (let key in parent) {
            options[key] = parent[key];
        }
        for (let key in child) {
            if (!Object.hasOwnProperty(options, key)) {
                options[key] = child[key];
            }
        }
        return options;
    }


    proxy(data = {}) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                set(v) {
                    if (data[key] === v) return;
                    return v;
                },
                get: () => data[key]
            })
        })
    }


}

