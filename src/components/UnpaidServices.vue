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
        unpaidData() {
            this.$store.state.data.map(d => {
                if(d.paymentStatus.status_tag === 'Unpaid') {
                    return this.data.push(d)
                }
            })
        }
    },
    mounted: function() {
        this.unpaidData()
        console.log(this.userData)
    },
}
</script>
