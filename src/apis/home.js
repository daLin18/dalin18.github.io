import httpInstance from '@/utils/http'

// home主页轮播图接口
export function getBannerAPI(params = {}){
  // 默认首页为1，商品分类为2
  const {distributionSite = '1'} = params
  return httpInstance({
    url:'/home/banner',
    params:{
      distributionSite,
    }
  })
}
// 主页新鲜好物组件接口
export const findNewAPI = () => {
  return httpInstance({
    url:'/home/new'
  })
}
// 主页人气推荐组件接口
export const getHotAPI = () => {
  return  httpInstance({
    url:'/home/hot'})
}

// 获取所有商品
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}