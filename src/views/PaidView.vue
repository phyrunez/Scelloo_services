<template>
  <div class="home">
    <PaidServices />
  </div>
</template>

<script>
// @ is an alias to /src
import PaidServices from "@/components/PaidServices.vue";

export default {
  name: "AllView",
  components: {
    PaidServices,
  },
};
</script>
