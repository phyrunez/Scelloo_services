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
        overdueData() {
            this.userData.map(d => {
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
