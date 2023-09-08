<template>
  <div class="home">
    <AllServices />
  </div>
</template>

<script>
// @ is an alias to /src
import AllServices from "@/components/AllServices.vue";

export default {
  name: "AllView",
  components: {
    AllServices,
  },
};
</script>
