<script setup>
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
import { onMounted } from "vue";
import { useCategoryStore } from "@/stores/category";

// 触发获取导航栏列表的 action
const categoryState = useCategoryStore();

onMounted(() => {
  categoryState.getCategory();
});
</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />

  <!-- 添加key，破坏组件复用，强制销毁重建 -->
  <!-- <RouterView :key="$router.fullPath" />    性能不好 -->
  <RouterView />

  <LayoutFooter />
</template>
@/stores/categoryStore
