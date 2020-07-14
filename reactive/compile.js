/**
 * 依赖收集
 * 更新视图
 * 订阅
 *
 */
import {CompileUtils} from "./compileUtils";

export class Compile {
    constructor(el, vm) {
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        this.vm = vm;
        //解析模板
        if (this.el) {

            const fragment = this.node2Fragment(this.el);
            //解析
            this.compile(fragment);

            //更新视图
            this.el.appendChild(fragment);
        }
    }

    /**
     * 将挂载点内的所有节点存储到DocumentFragment中
     *
     * DocumentFragments 是DOM节点。
     * 它们不是主DOM树的一部分。
     * 通常的用例是创建文档片段，将元素附加到文档片段，
     * 然后将文档片段附加到DOM树。
     * 因为文档片段存在于内存中，并不在DOM树中，
     * 所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。
     * 因此，使用文档片段通常会带来更好的性能。
     *
     * @param node
     * @returns {DocumentFragment}
     */
    node2Fragment(node) {
        let fragment = document.createDocumentFragment();
        let childNodes = node.childNodes;
        //处理类数组 因为 document.querySelector(el)得到的是类数组
        Array.from(childNodes).forEach(node => {
            fragment.appendChild(node);
        });
        return fragment;

    }

    compile(fragment) {
        let childNodes = fragment.children;
        Array.from(childNodes).forEach(node => {
            // 元素节点解析
            // if (this.isElementNode(node)) {
            //     this.compileElementNode(node);
            // }
            //文本节点解析
            if (CompileUtils.isTextNode(node)) {
                CompileUtils.text(node, this.vm);
            }
            if(CompileUtils.isVModel(node)){
                CompileUtils.model(node, this.vm);

            }
            //递归往下解析
            if (node.children && node.children.length > 0) {
                this.compile(node);
            }

        })
    }

}

