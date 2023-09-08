<template>
  <div class="home">
    <UnpaidServices />
  </div>
</template>

<script>
// @ is an alias to /src
import UnpaidServices from "@/components/UnpaidServices.vue";

export default {
  name: "UnpaidView",
  components: {
    UnpaidServices,
  },
};
</script>
