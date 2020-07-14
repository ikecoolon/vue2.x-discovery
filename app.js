import {Vue} from './vue';
import {Router} from "./router/router";

const route = [{
    path: '/',
    name: 'index',
    meta: {
        title: '首页'
    },
    component: '<div>我是首页</div>'

},

    {
        path: '/page1',
        name: 'page1',
        meta: {
            title: '首页'
        },
        component: '<div>我是page1</div>'

    },
    {
        path: '/page2',
        name: 'page2',
        meta: {
            title: '首页'
        },
        component: '<div>我是page2</div>'

    },
    {
        path: '/page3',
        name: 'page3',
        meta: {
            title: '首页'
        },
        component: '<div>我是page3</div>'

    },


];


let vue = new Vue({
    data: {a: 3, b: 4},
    el: '#app',
});


let router = new Router(
    {route, mode: 'hash'}
);


// setTimeout(()=>{
//     vue.$data.a=1;
//     // console.log(vue.$data);
// },1000);
