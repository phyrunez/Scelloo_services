<template data-app>
    <TableHeader :data=data />
</template>

<script>
import TableHeader from "../slot/TableHeader.vue";
// import userData from "@/data/data"

export default {
    components: {
        TableHeader
    },
    data() {
        return {
            data: []
        }
    },
    created() {
        this.data = this.$store.state.data
    },
}
</script>
