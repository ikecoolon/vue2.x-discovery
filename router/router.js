/**
 * 路由本质上是使用 window.onhashchange 捕捉变化实现
 */
export class Router {

    constructor({route: routes = {}}) {
        this.routers = {};
        routes.forEach(val => {
            this.register(val.path, () => {
                // debugger;
                let html = document.querySelector('router-view');
                html.innerHTML = val.component;
            });
        });

        this.reload().call();
        window.addEventListener('hashchange', this.reload());

    }


    /**
     * 首页回调
     */
    index() {
        return this.routers['/'];
    }

    /**
     * 其他页的回调方法
     * @param hash
     * @param callback
     */
    register(hash, callback) {
        return this.routers[hash] = callback;

    }

    reload() {

        // debugger;
        return () => {

            let callback;
            let hash = location.hash.slice(1);
            !hash ? callback = this.index() :
                callback = this.routers[hash];
            callback();
        }

    }


}

