<template>
  <div>
    <el-tag
      v-for="(item, index) in breadList"
      :key="item.path"
      size="small"
      :closable="item.name !== 'home'"
      :effect="item.name === $route.name ? 'dark' : 'plain'"
      @click="changeMeau(item)"
      @close="closeMeau(index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      breadList: (state) => state.tab.breadList,
    }),
  },
  methods: {
    ...mapMutations(["deleteBread"]),
    // 点击菜单跳转
    changeMeau(item) {
      this.$router.push({ name: item.name });
    },
    //关闭菜单
    closeMeau(index) {
      //删除后标签的变化
      const length = this.breadList.length;
      // 删除非当前标签
      if (this.$route.name !== this.breadList[index].name) {
      } else {
        //删除最后一个标签
        if (length - 1 === index) {
          this.$router.push({ name: this.breadList[index - 1].name });
        } else {
          this.$router.push({ name: this.breadList[index + 1].name });
        }
      }
      // 删除标签
      this.deleteBread(index);
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin: 10px 0;
  margin-left: 15px;
  cursor: pointer;
}
</style>
