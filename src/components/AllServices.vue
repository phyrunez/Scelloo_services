<template>
    <TableHeader :data=data />
</template>

<script>
import TableHeader from "../slot/TableHeader.vue";
import userData from "@/data/data"

export default {
    components: {
        TableHeader
    },
    data() {
        return {
            data: userData
        }
    },
}
</script>
