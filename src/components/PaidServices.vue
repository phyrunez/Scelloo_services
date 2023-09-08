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
            data: [],
            userData: userData
        }
    },
    methods: {
        paidData() {
            this.userData.map(d => {
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
