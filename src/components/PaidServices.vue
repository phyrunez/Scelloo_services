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
        paidData() {
            this.$store.state.data.map(d => {
                if(d.paymentStatus.status_tag === 'Paid') {
                    return this.data.push(d)
                }
            })
        }
    },
    mounted: function() {
        this.paidData()
        console.log(this.userData)
    },
}
</script>
