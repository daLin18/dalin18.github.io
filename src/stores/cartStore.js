//封装购物车模块

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user"
import { delCartAPI, findNewCartListAPI, insertCartAPI } from "@/apis/cart"

export const useCartStore = defineStore('caet',()=>{

  // 获取登录信息
  const userStore = useUserStore()
  const isLogin = computed(()=>userStore.userInfo.token)

  // 获取最新购物车列表
  const updateNewList = async () => {
    const res =await  findNewCartListAPI()
    cartList.value = res.result
  }

  const cartList = ref([])
  // 定义action
    // 1, 添加购物车操作
  const addCart = async  (goods) =>{
    const { skuId, count } = goods

    // 判断是否登录
    if(isLogin.value){
      //登录之后添加购物车逻辑
      await insertCartAPI({ skuId, count })
      updateNewList()
    }
    else {
      // 添加过  - count+1
      // 没有添加过  - 直接push + 1
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item)=> goods.skuId === item.skuId)
        if(item){
          // 有就是添加过
          item.count++
        }else{
        // 没添加过
         cartList.value.push(goods)
      }
    }

    
  }
  // 2, 删除购物车
  const delCart = async (skuId) =>{
    if(isLogin.value){
      // 调用接口实现接口购物车删除
      await delCartAPI([skuId])

      updateNewList()
    }else{
      const idx = cartList.value.findIndex((item) => skuId === item.skuId )
      cartList.value.splice(idx,1)
    }
  }

// 退出登录时，清除购物车
const cleanCart = () =>{
  cartList.value = []
}



  // 3, 计算属性 (计算价格)
  // 总的数量  所有count之和
  const allCount =  computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))

  // 总价  所有项的count * price 之和
  const allPrice =  computed(()=>cartList.value.reduce((a,c)=>a+c.count * c.price,0))

  // 4,单选功能
  const singleCheck = (skuId,selected) => {
    //通过skuId找到要修改的那一项，然后把它的selected修改为传过来的selected
    const item = cartList.value.find((item)=>item.skuId === skuId)
    item.selected = selected 
  }
  // 5，是否全选(计算属性)
  const isAll = computed(() =>cartList.value.every((item)=>item.selected))
  // 全选
  const allCheck = (selected) =>{
    cartList.value.forEach((item)=>item.selected = selected)
  }

  // 6. 购物车已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
 // 7. 购物车已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))


  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    cleanCart,
    updateNewList
  }
}, {
  persist: true,
})