//封装获取订单接口
import httpInstance from "@/utils/http";

/*
params: {
	orderState:0,  //当前tab状态，处于哪个
  page:1,       //当前页数
  pageSize:2     //每页条数
}
*/
export const getUserOrder = (params) => {
  return httpInstance({
    url:'/member/order',
    method:'GET',
    params
  })
}