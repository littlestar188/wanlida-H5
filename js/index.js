var Vue = require ("vue");
var VueRouter = require ("vue-router");
var Vuex = require("vuex");
var Mint = require('mint-ui');
var Resource = require('vue-resource');

//声明引用插件
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Mint);
Vue.use(Resource);


/*import { Swipe, SwipeItem } from 'mint-ui';
import { Loadmore } from 'mint-ui';*/

/*Vue.component("mt-swipe", Swipe);
Vue.component("mt-swipe-item", SwipeItem);
Vue.component("mt-loadMore", Loadmore);*/

//引用组件
var header = require ("../js/components/header.vue");
var footer = require ("../js/components/footer.vue");
var model = require ("../js/components/model.vue");
var order = require ("../js/components/order.vue");
var state = require ("../js/components/state.vue");
/*创建路由*/
var router = new VueRouter({
  routes:[
    {path:'/',component:model},
    {path:'/state',component:state},
    {path:'/order',component:order},
    {name:"router1",path:"/",component:state}
  ]
})


// new Vue({
//   components: {
//       'my-header':header,
//       'my-footer': footer,
//   },
            
//   router
// }).$mount('#app');
// Vue.component('my-header',{
//   props:['message'],
//   template:header
//   // data:function(){
//   //   return {testdata : this.message}
//   // }
// })
var store = new Vuex.Store({
  state: {
    sum: 0,
    free:false,
    list:[]
  },
  mutations:{
    calsum (state,num) {
      state.sum = num
    },
    calfree(state,status) {
      state.free = status
    },
    calexpense(state,arr) {
      state.list = arr
    },
    calstatus(state,num) {
      state.status = num
    }/*,
    calimg(state,str) {
      state.status = str
    }*/
  }
})
var test = new Vue({
  created:function(){
    var that =this;
     var href = location.href.split("?");
         var condition = href.slice(1,href.length);
         //console.log(condition,href)      
         if(condition.length==0){
            alert("SN码不存在！");
            return;
         }else{
            this.sn = condition[0].split("=")[1];
            this.$http.get("https://wanlida-test.yunext.com/external/getDeviceDetail?sn="+this.sn).then(function(response){
              test.data1 = response.data;
              store.commit('calsum',response.data.sum);
              store.commit('calfree',response.data.free);
              store.commit('calexpense',response.data.expensesList);
              store.commit('calstatus',response.data.status);

              switch(response.data.status){
                case -1:
                this.$router.push({
                        name:'router1',
                        params:{
                          imgSrc:"img/img_maintain@1x.png"
                        }
                })        
              }

              //store.commit('calimg',this.imgSrc);
            })
        }    
  },
  data:{
    data1:{
      sn:'',
      status:''
    },
    sn:"",
    imgSrc:""
  },
  store,
  components: {
      'my-header':header,
      'my-footer': footer
  },
  router
}).$mount('#app');


