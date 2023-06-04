<script lang="ts">
import { getDetail } from "@/api/detail";

import detail from "./components/detail.vue";
export default defineComponent({
  name: "List",
  components: {
    detail
  },
  setup() {
    const isActive = ref(true);
    const state = reactive({
      detail: {
        title: "Nike Air Max 270",
        img: "https://www.nike.com/snkrs-static/telemetry/assets/sneaker/b42cbf9d-d70e-4402-b1eb-406c1122790e.png",
        description:
          "The Nike Air Max 270 combines the exaggerated tongue from the Air Max 180 and classic elements from the Air Max 93. It features Nike’s biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks.",
        parameters: {
          Color: "White/Black/Laser Orange",
          Style: "CU0676-101",
          Country: "Vietnam"
        },
        reviews: [
          {
            author: "John Smith",
            date: "2022-05-01",
            comment: "I love these shoes! They are very comfortable and look great."
          },
          {
            author: "Jane Doe",
            date: "2022-04-25",
            comment: "I have been wearing these shoes for a few weeks now and they are the best sneakers I have ever owned!"
          }
        ]
      },
      total: 0,
      queryForm: { pageNo: 1, pageSize: 20, title: "" },
      layout: "total, sizes, prev, pager, next, jumper",
      listLoading: true,
      emptyShow: true
    });

    const fetchData = async () => {
      state.listLoading = true;
      const {
        data: { detail }
      } = await getDetail(state.queryForm);
      state.detail = detail;
      state.listLoading = false;
      state.emptyShow = false;
    };
    onMounted(() => {
      fetchData();
    });

    return {
      isActive,
      ...toRefs(state)
    };
  }
});
</script>

<template>
  <div class="mc-main-container">
    <detail :product="detail" />
  </div>
</template>
