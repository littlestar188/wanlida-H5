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
var newOrder = require ("../js/components/newOrder.vue");
var state = require ("../js/components/state.vue");
var statebefore = require ("../js/components/statebefore.vue");
/*创建路由*/
var router = new VueRouter({
  routes:[
    // {path:'/',component:model},
    // {path:'/state',component:state},
    // {path:'/order',component:order},
    // {path:'/statebefore',component:statebefore},
    // {name:"router1",path:"/",component:state},
    // // {name:"router2",path:"/",component:order},
    // {name:"router2",path:"/",component:statebefore},
    // {name:"router3",path:"/statebefore",component:order},
    // {name:"router4",path:"/order",component:model}
    {name:"router4",path:'/',component:model,/*redirect:"/home",
     subRoutes:{
        "/home/order":{
          name:"router5",
          component:order
        }
      }*/
    },
    {path:'/statebefore',component:statebefore},
    {name:"router3",path:'/order',component:order},
    {name:"router1",path:"/state",component:state},
    {name:"router2",path:"/",component:state},
    {name:"router5",path:"/newOrder",component:newOrder}
  ]
})

var store = new Vuex.Store({
  state: {
    sn:"",
    openId:"",
    sum: 0,
    free:false,
    list:[],
    model:[]
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
    },
     calmodel(state,arr) {
      state.model = arr
    },
    calopenId(state,str) {
      state.openId = str
    }
  }
})
var test = new Vue({
  data:{
    data1:{
      sn:'',//0095699FA99C
      status:''
    },
    sn:"",
    url:"",
    imgSrc:"",
    openId:"",
    encodeOenId:""
  },
  /*watch:{
    router:"init"{
      handler:function(val,oldVal){
        console.log(val,oldVal)
        this.initIndex();
      },
      deep:true
    }
  },  */
  created:function(){
        this.initIndex();
           
  },
  methods:{
    initIndex:function(){
      var that =this;
        var returnFlag = this.handleHref();
        if(returnFlag){
          this.sendRquest();
        }else{
          this.$http.get("https://wanlida-test.yunext.com/external/getDeviceDetail?sn="+this.sn).then(function(response){
            window.location = response.data.data.url;
            this.handleHref();
            this.handleStateRouter(response.data.unifyStatus);
          })
          
       }
    },
    handleHref:function(){
      
        var arr = [];
        var href = location.href.split("?");      
        var condition = href.slice(1,href.length);
       
        if(condition.length<0){
          alert("SN码不存在！");
          return;
        }else{
           this.sn = condition[0].split("=")[1];
          
        }
        
        console.log(condition[0].toString().indexOf("&")>0)
        if(condition[0].indexOf("&")>0){
          cond = condition[0].split("&");           
          for(var i=0;i<cond.length;i++){
            var name = cond[i].split("=")[0];
            var value = cond[i].split("=")[1];
            arr.push(value)         
          }
          this.sn = arr[0];
         
          this.encodeOenId = arr[1];
          this.openId = this.decode(decodeURIComponent(arr[1]));
          
          console.log("index-----"+this.openId)
          store.commit('calopenId',this.openId);
          console.log(this.openId)
          return true;
        }else{
          return false;                   
        }
                       
    },
    handleHrefPart:function(){
      var href = location.href.split("?");
        var condition = href.slice(1,href.length);

        var cond = condition[0].split("&");
        console.log(cond)

        var arr = []; 
        for(var i=0;i<cond.length;i++){
          var name = cond[i].split("=")[0];
          var value = cond[i].split("=")[1];
          arr.push(value)         
        }
        return arr; 
    },
    handleStateRouter:function(unifyStatus){
        /*switch(unifyStatus){
            case -1:*/
            console.log(unifyStatus)
            if(unifyStatus!==0 && unifyStatus!==(-2)){
              this.$router.push({
                    name:'router1',
                    query:{
                          sn:this.sn,
                          openId:decodeURIComponent(this.encodeOenId)
                        },
                    params:{
                        sn:this.sn,
                        status:unifyStatus,
                        openId:this.openId
                    }
                });
              
            }

            if(unifyStatus==(-2)){
              console.log("-2-----openId"+this.openId)
              this.$router.push({
                    name:'router5',
                    query:{
                      sn:this.sn,
                      openId:decodeURIComponent(this.encodeOenId)
                    },
                    params:{
                        sn:this.sn,
                        status:unifyStatus,
                        handleOpenId:this.openId
                    }
                });
            
            }
                
            /*break;*/    
       
    },
    decode:function(input){
         // private property
         console.log("parent component ----" +input)
      _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
 
      var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;

    },
    _utf8_decode:function(utftext){
      var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    },
    sendRquest:function(){
       //wanlida/test.json
      var that = this; 
      this.$http.get("https://wanlida-test.yunext.com/external/getDeviceDetail?sn="+this.sn).then(function(response){
              if(response.data.status==10000){
                test.data1 = response.data.data;
                /*store.commit('calsum',response.data.sum);
                store.commit('calfree',response.data.free);
                store.commit('calexpense',response.data.expensesList);*/  
                store.commit('calstatus',response.data.data.unifyStatus);
                store.commit('calmodel',response.data.data.modeList);
/*
                if(response.data.data.unifyStatus !=0 && response.data.data.unifyStatus!==-2){
                 
                    this.$router.push({
                        name:'router1',
                        query:{
                          sn:this.sn,
                          openId:decodeURIComponent(this.encodeOenId)
                        },
                        params:{
                          status:response.data.data.unifyStatus,
                          openId:this.openId
                        }
                    })        
                }

                if(response.data.data.unifyStatus==(-2)){
                  console.log(this.encodeOenId,this.openId)
                  this.$router.push({
                        name:'router5',
                        query:{
                          sn:this.sn,
                          openId:decodeURIComponent(this.encodeOenId)
                        },
                        params:{
                            status:response.data.data.unifyStatus,
                            handleOpenId:this.openId
                        }
                    });
                
                }*/
               that.handleStateRouter(response.data.data.unifyStatus);

              }else{
                alert("请求失败");
              }
              
              
          });
          
    }
   
  },
  store,
  components: {
      'my-header':header/*,
      'my-footer': footer*/
  },
  router
}).$mount('#app');