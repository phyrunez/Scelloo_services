<template>
    <TableHeader :data=data />
</template>

<script>
import TableHeader from "../slot/TableHeader.vue";

export default {
    components: {
        TableHeader
    },
    data() {
        return {
            data: [],
        }
    },
    methods: {
        overdueData() {
            this.$store.state.data.map(d => {
                if(d.paymentStatus.status_tag === 'Overdue') {
                    return this.data.push(d)
                }
            })
        }
    },
    mounted: function() {
        this.overdueData()
        console.log(this.userData)
    },
}
</script>
