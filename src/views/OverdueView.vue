<template>
  <div class="home">
    <OverdueServices />
  </div>
</template>

<script>
// @ is an alias to /src
import OverdueServices from "@/components/OverdueServices.vue";

export default {
  name: "AllView",
  components: {
    OverdueServices,
  },
};
</script>
