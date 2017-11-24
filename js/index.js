var Vue = require ("vue");
var VueRouter = require ("vue-router");
var Mint = require('mint-ui');
var Resource = require('vue-resource');

//声明引用插件
Vue.use(VueRouter);
Vue.use(Mint);
Vue.use(Resource);


import { Swipe, SwipeItem } from 'mint-ui';
import { Loadmore } from 'mint-ui';

Vue.component("mt-swipe", Swipe);
Vue.component("mt-swipe-item", SwipeItem);
Vue.component("mt-loadMore", Loadmore);

//引用组件
var header = require ("../js/components/header.vue");
var home = require ("../js/components/home.vue");
var order = require ("../js/components/order.vue");
var state = require ("../js/components/state.vue");
/*创建路由*/
var router = new VueRouter({
  routes:[
  	// {path:'/',redirect:"/home"},//重定向
    {path:'/',component:home},
    {path:'/state',component:state},
    {path:'/order',component:order},     
    /*{name:"router1",path:"/cart",component:result}*/
    //{name:"router2",path:"/result",component:result}
  ]
})

new Vue({
  components:{"app-header":header},
  router
}).$mount('#app');


