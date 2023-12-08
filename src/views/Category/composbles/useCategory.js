// 封装分类数据业务相关代码
import { onMounted, ref } from "vue";
import { getCAtegoryAPI } from "@/apis/category";
import { useRoute } from "vue-router";
import { onBeforeRouteUpdate } from "vue-router";

export function useCategory(){

// 获取分类数据
const categoryData = ref({});
const route = useRoute();

const getCategory = async (id = route.params.id) => {
  const res = await getCAtegoryAPI(id);
  categoryData.value = res.result;
};

//目标 : 路由参数发生变化时，可以把分类数据接口重新发送
onBeforeRouteUpdate((to) => {
  getCategory(to.params.id);
});

onMounted(() => getCategory(route.params.id));

return{categoryData}

}