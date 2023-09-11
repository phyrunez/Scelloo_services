<template>
    <div id="main_div">
        <slot name="background">
            <slot name="header">
                <div class="d-flex justify-content-between px-3 py-4">
                    <div class="d-flex">
                        <div class="funnel border border-secondary rounded" v-on:click="toggleFilterDropdown">
                            <b-icon icon="funnel-fill" class="funnel_icon"></b-icon>
                            <span class="funnel_span">Filter</span>
                        </div>
                        <div v-show="filterDropdown" class="filter_dropdown">
                            <div>
                                <h5>SORT BY:</h5>
                                <ul>
                                    <li v-for="sort in sortBy" :key="sort" class="d-flex justify-content-between">
                                        <span>{{ sort }}</span>
                                        <input type="radio" name="" id="">
                                    </li>
                                </ul>
                            </div>
                            <hr class="seperator_line">
                            <div>
                                <h5>USERS:</h5>
                                <ul>
                                    <li v-for="user in users" :key="user" class="d-flex justify-content-between">
                                        <span>{{ user }}</span>
                                        <span><input type="radio" name="" id=""></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="d-flex search_div">
                           <b-icon icon="search" class="cursor-pointer"></b-icon>
                           <input 
                                type="text" 
                                v-model="search" 
                                placeholder="Search Users by Name, Email or Date"
                            />
                        </div>
                    </div>
                    <div>
                        <b-button @click="handleSelected" class="w-150 pay_dues">PAY DUES</b-button>
                    </div>
                </div>
            </slot>
            <slot name="table">
                <div class="mt-1 table-responsive">
                    <table v-if="!noRecord" class="table" :per-page="perPage" :current-page="currentPage">
                        <thead class="thead-light">
                            <tr class="table_heading">
                                <th scope="col">
                                    <input type="checkbox" width="100px" height="100px" name="" class="checkbox">
                                </th>
                                <th class="tick"></th>
                                <th scope="col">NAME</th>
                                   <th scope="col">USER STATUS</th>
                                <th scope="col" class="align-right">PAYMENT STATUS</th>
                                <th scope="col">AMOUNT</th>
                                <th class="tick_two"></th>
                                <th scope="col">
                                    <b-icon icon="three-dots-vertical" class="header_dot" animation="cylon-vertical" font-scale="1.5"></b-icon>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-for="item in items" :key="item.id">
                            <tr role="button" @click="toggle(item.id)" class="table_data accordion-toggle" data-toggle="collapse" data-target="#demo1">
                                <th scope="col" class="data_th">
                                    <span class="checked" :class="{ 'checked': item.mark_paid }"></span>
                                    <input 
                                        type="checkbox" 
                                        v-model="item.mark_paid"
                                        :checked="item.mark_paid"
                                        class="checkbox checked"
                                    />
                                </th>
                                <td class="tick_td"><span class="tick"><b-icon icon="check-circle"></b-icon></span></td>
                                <td>
                                    <h6 class="user_name">{{ item.first_name }} {{ item.last_name }}</h6>
                                    <p class="user_email">{{ item.email }}</p>
                                </td>
                                <td>
                                    <div v-if="item.userStatus.status_tag === 'Active'" class="user_status_active">
                                        <b-icon icon="dot" class="user_status_active_icon" font-scale="1"></b-icon>
                                        <span>{{ item.userStatus.status_tag }}</span>
                                    </div>
                                    <div v-else class="user_status_inactive">
                                        <b-icon icon="dot" class="user_status_inactive_icon" font-scale="1"></b-icon>
                                        <span>{{ item.userStatus.status_tag }}</span>
                                    </div>
                                    <p class="last_login">Last login: {{ item.userStatus.last_login }}</p>
                                </td>
                                <td>
                                    <div v-if="item.paymentStatus.status_tag === 'Paid'">
                                        <div class="payment_status_div">
                                            <b-icon icon="dot" class="payment_status" font-scale="1"></b-icon>
                                            <span>{{ item.paymentStatus.status_tag }}</span>
                                        </div>
                                        <p class="user_paid">Paid on {{ item.paymentStatus.paid_on }}</p>
                                    </div>
                                    <div v-else-if="item.mark_paid">
                                        <div class="payment_status_div">
                                            <b-icon icon="dot" class="payment_status" font-scale="1"></b-icon>
                                            <span>Paid</span>
                                        </div>
                                        <p class="user_paid">Paid on {{ item.paymentStatus.paid_on }}</p>
                                    </div>
                                    <div v-else-if="item.paymentStatus.status_tag === 'Unpaid'">
                                        <div class="payment_status_unpaid">
                                            <b-icon icon="dot" class="payment_status_unpaid" font-scale="1"></b-icon>
                                            <span>{{ item.paymentStatus.status_tag }}</span>
                                        </div>
                                        <p class="user_dues">Dues on {{ item.paymentStatus.paid_on }}</p>
                                    </div>
                                    <div v-else>
                                        <div class="payment_status_overdue">
                                            <b-icon icon="dot" class="payment_status_overdue" font-scale="1"></b-icon>
                                            <span>{{ item.paymentStatus.status_tag }}</span>
                                        </div>
                                        <p class="user_dued">Dued on {{ item.paymentStatus.paid_on }}</p>
                                    </div>
                                </td>
                                <td class="amount_currency">
                                    <div class="text-align-right">
                                        <span>${{ item.amount }}</span>
                                    </div>
                                    <p class="user_email">{{ item.currency }}</p>
                                </td>
                                <td class="view_td"><span class="view">View More</span></td>
                                <td>
                                    <div>
                                        <b-dropdown id="dropdown-1" text="Dropdown Button" variant="outline" class="m-md-2" no-caret>
                                            <template #button-content>
                                                <b-icon icon="three-dots-vertical" id="tooltip-target-1" v-on:click="toggleViewMoreDropdown" font-scale="1"></b-icon>
                                            </template>
                                            <b-dropdown-item class="default_css">Edit</b-dropdown-item>
                                            <b-dropdown-item class="default_css">View Profile</b-dropdown-item>
                                            <b-dropdown-item variant="success" class="activate">Activate User</b-dropdown-item>
                                            <b-dropdown-divider></b-dropdown-divider>
                                            <b-dropdown-item variant="danger" class="deleted">Delete</b-dropdown-item>
                                            <span class="cancel_drop"><b-icon icon="x"></b-icon></span>
                                        </b-dropdown>

                                        <b-tooltip target="tooltip-target-1" triggers="hover" placement="right">
                                            I am tooltip <b>component</b> content!
                                        </b-tooltip>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="opened.includes(item.id)" class="accordian-body collapse" id="demo1">
                                <td colspan="2" class="hiddenRow">
							        <div> 
                                        <table class="table table-striped">
                                            <thead>
                                                <tr class="info">
													<th>DATE</th>
													<th>USER ACTIVITY</th>
													<th>DETAIIL</th>		
												</tr>
											</thead>	
											<tbody>					
                                                <tr data-toggle="collapse" class="accordion-toggle" data-target="#demo1">
													<td> <a href="#">Enginner Software</a></td>
													<td>Google</td>
													<td>U$8.00000 </td>
													<td> 2016/09/27</td>
													<td> 2017/09/27</td>
													
												</tr>
                                            </tbody>   
               	                        </table>
                                    </div> 
                                </td>
                            </tr>
                        </tbody>
               	    </table>
                </div> 
            </slot>
        </slot>
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            perPage: 8,
            currentPage: 1,
            items: this.data,
            defaultItems: this.data,
            filterDropdown: false,
            search: "",
            viewMoreDropdown: false,
            opened: [],
            noRecord: false,
            checked: false,
            tableDrop: false,
            sortBy: ["Default", "First Name", "Last Name", "Due Date", "Last Login"],
            users: ["All", "Active", "Inactive"],
            user_status: "Active",
            payment_status: "Paid"
        }
    },
    updated() {
        console.log(this.search)
        this.searchHandler
        if(this.search === "") return this.defaultItems
    },
    mounted: function() {
        this.searchHandler
        console.log(this.data)
    },
    methods: {
        toggleFilterDropdown() {
            return this.filterDropdown = !this.filterDropdown
        },
        toggleViewMoreDropdown() {
            return this.viewMoreDropdown = !this.viewMoreDropdown
        },
        handleSelected() {
            console.log('Working')
            this.checked = true
        },
        toggle(id) {
            console.log("display")
            const index = this.opened.indexOf(id);
            if (index > -1) {
                this.opened.splice(index, 1)
            } else {
                this.opened.push(id)

            }
        }
    },
    
    computed: {
        searchHandler() {
    
            let filteredServices = this.items.filter(item => {
                return item.first_name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
            })
            console.log(filteredServices)           
            
            this.items = filteredServices
            if(this.search === "") return this.items = this.defaultItems
        }
    }
}
</script>

<style>
    #main_div{
        background: hsl(0, 0%, 100%);
        width: 1190px;
        margin: 20px 0 0 100px !important;
        border-radius: 10px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2)
    }
    .selected_checkbox{
        border-left: 3px solid #c6c2de !important;
    }
    .paginated_div {
        background: #c6c2de !important;
        float: right !important;
        border: none !important;
        height: 45px;
        margin: 0px;
        width: 100% !important;
        padding: 0 10px;
    }
    .seperator_line {
        background: #F2F0F9;
        width: 180px;
        margin: auto !important;
        padding: auto !important;
        padding: 5px 0;
    }
    .header_dot {
        margin-left: 20px !important;
    }
    .checked {
        background: #6d5bd0 !important;
        cursor: pointer;
        color: #fff;
    }
    .checked::before {
        content: "|";
        margin-left: -10px !important;
        max-width: 10px !important;
    }
    #dropdown-1 {
        height: 10px !important;
        width: 13px !important;
        margin-left: 180px;
    }
    .dropdown-menu {
        border: none !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        /* position: relative !important; */
    }
    .default_css,
    .activate, .deleted {
        font-family: Inter !important;
        font-size: 14px !important;
        font-weight: 400 !important;
        line-height: 17px !important;
        letter-spacing: 0.05em !important;
        text-align: left !important;
    }
    .cancel_drop {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        padding-top: -5px !important;
        top: 0 !important;
        right: 0 !important;
        margin: -13px -8px 0 10px !important;
        position: absolute !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .funnel {
        padding: 5px 10px 5px 10px !important;
        cursor: pointer;
        margin-top: 1px;
        height: 45.5px !important;
        position: relative;
    }
    .hiddenRow { padding: 0 !important; }
    .funnel:hover {
        color: #6d5bd0 !important;
        border: 2px solid#6d5bd0 !important;
    }
    .funnel_icon {
        color: #c6c2de;
        height: 23px;
        width: 23px;
        margin-top: 5px;
    }
    .funnel_span {
        font-family: "Inter", sans-serif;
        padding-left: 10px;
        font-size: 17px;
        margin-top: -5px;
    }
    .search_div {
        margin-left: 20px;
        background: #f4f2ff;
        width: 430px;
        padding: 8px 0 !important;
        border-radius: 10px;
    }
    .search_div:hover {
        border: 1px solid #6d5bd0 !important;
    }
    .search_div input {
        width: inherit !important;
        margin-left: 14px !important;
        padding: 5px 0 5px -5px !important;
        border-radius: 10px !important;
        border: none !important;
        font-size: 12px;
        font-family: "Inter", sans-serif;
        line-height: 15px;
        background: transparent !important;
        outline: none !important;
    }
    .filter_dropdown {
        border: 1px solid #6d5bd0;
        border-radius: 10px;
        z-index: 5;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        width: 200px;
        background: white;
        padding: 20px 0 10px 0;
        position: absolute;
        margin-top: 56px;
    }
    .filter_dropdown h5 {
        font-family: "Inter", sans-serif;
        font-size: 10px;
        font-weight: 400;
        line-height: 15px;
        margin-left: 18px;
        letter-spacing: 0.05em;
    }
    .filter_dropdown ul {
        width: 100%;
    }
    .filter_dropdown ul li {
        color: #25213B;
        font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        padding: 5px 15px;
        margin-left: -30px;
        line-height: 17px;
        letter-spacing: 0.05em;
        text-align: left;
    }
    .no_record {
        text-align: center;
        padding: 30px !important;
        font-family: "Inter", sans-serif;
        font-weight: bold;
        font-size: 30px;
    }
    .pay_dues {
        font-size: 20px !important;
        background: #6d5bd0 !important;
        border: #6d5bd0 !important;
        font-family: "Inter", sans-serif !important;
    }
    .table {
        height: 60px;
        width: 1190px;
    }
    thead tr, tbody tr {
        margin: auto;
        width: 1200px !important;
    }
    table .table_heading th {
        font-family: "Inter", sans-serif;
        font-size: 12.5px;
        font-weight: 600;
        color: #6E6893;
        line-height: 15px;
        letter-spacing: 0.05em;
        background: #f4f2ff;
        padding: 20px 0;
        padding-left: 18px;
    }
    table .table_data th,
    table .table_data td {
        font-family: "Inter", sans-serif;
        font-size: 12px;
        font-weight: 600;
        line-height: 15px;
        letter-spacing: 0.05em;
        padding: 20px 0; 
        padding-left: 18px;
    }
    table tfooter > div {
        background-color:#F4F2FF !important;
        width: 100%;
    }
    .checkbox {
        height: 18px;
        width: 18px;
        padding: 15px 0 0 0 
    }
    .b-icon.bi-dot {
        border-color: #4A4AFF;
        color: #4A4AFF;
        font-size: 23px !important;
    }
    .bi-search {
        color: #6E6893;
        font-size: 22px;
        margin: 5px 0 5px 10px;
    }
    .bi-check-circle,
    .bi-three-dots-vertical {
        color: #6E6893;
    }
    /* .bi-three-dots-vertical {
        position: relative;
    } */
    .view_more_dropdown {
        width: 154px;
        height: 129px;
        top: 12px;
        left: 15px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: -5 !important;
    }
    
    .view_more_dropdown ul li a {
        font-family: "Inter", sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0.05em;
        padding: 3px 0;
        text-align: left;
        
    }
    .bi-three-dots-vertical:hover {
        transition: ease-in-out;
        cursor: pointer;
        transition-duration: 150ms;
        color: black;
    }
    .user_name {
        font-family: "Inter", sans-serif;
        font-size: 14px;
        font-weight: bold;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
    }
    .user_email, .last_login, .user_paid, .user_dues, .user_dued {
        font-family: "Inter", sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 10px;
        letter-spacing: 0.05em;
        text-align: left;
        margin: 5px 0 -10px 0 !important;
    }
    .user_email {
        color: #6E6893 !important;
    }
    .last_login {
        color: #6E6893;
        font-size: 12px;
    }
    .user_dued,
    .user_dues,
    .user_paid {
        color: #25213B;
        font-family: "Inter", sans-serif;
        font-weight: bold;
        font-size: 12px;
    }
    .user_status_active_icon,
    .user_status_inactive_icon {
        font-family: Inter;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: 0em;
        text-align: left;
    }
    .user_status_active, 
    .user_status_inactive,
    .payment_status_div,
    .payment_status_unpaid,
    .payment_status_overdue {
        background-color: #E6E6F2 !important;
        width: 70px;
        display: flex;
        padding: 0 0 2px 0;
        border-radius: 50px;
    }
    .user_status_inactive {
        width: 80px !important;
    }
    .payment_status_div {
        background-color: #CDFFCD !important;
        width: 55px;
    }
    .payment_status_unpaid {
        background-color: #FFECCC !important;
        width: 77px;
    }
    .payment_status_overdue {
        background-color: #FFE0E0 !important;
        width: 80px;
    }
    .user_status_active span,
    .user_status_inactive span,
    .payment_status_div span,
    .payment_status_unpaid span,
    .payment_status_overdue span {
        padding-top: 9px !important;
        font-family: Inter;
        font-size: 12px;
        color: #4A4AFF;
        line-height: 8px
    }
    .user_status_inactive span { color: #6E6893; }
    .user_status_inactive .b-icon.bi-dot {
        border-color: #6E6893;
        color: #6E6893;
        font-size: 23px !important;
    }
    .payment_status_div span {
        color: #007F00;
    }
    .payment_status_div .b-icon.bi-dot {
        border-color: #007F00;
        color: #007F00;
        font-size: 20px !important;
    }
    .payment_status_unpaid span { 
        color: #965E00; 
        padding-right: 10px;
    }
    .payment_status_unpaid .b-icon.bi-dot {
        border-color: #965E00;
        color: #965E00;
        font-size: 23px !important;
    }
    .payment_status_overdue span {
        color: #D30000;
        padding-right: 10px;
    }
    .payment_status_overdue .b-icon.bi-dot {
        border-color: #D30000;
        color: #D30000;
        font-size: 23px !important;
    }
    .tick {
        padding-right: 20px !important;
        width: 20px !important;
    }
    .tick_td {
        padding-top: 31px !important;
    }
    .tick_two {
        padding-right: 80px !important;
        width: 50px !important;
        padding-top: -380px !important;
        width: 20px !important;
    }
    .view {
        font-size: 12px;
        width: 50px !important;
        transition: ease-in-out;
        color: #6E6893;
        transition-duration: 150ms;
    }
    .view_td {
        padding-top: 35px !important;
    }
    .data_th{
        padding-top: 30px !important;
    }
    .amount_currency p {
        padding: 2px 0 0 11px !important;
    }
    button {
        border: none !important;
        background: transparent;
    }
    .view:hover {
        color: #6D5BD0;
        background:#f4f2ff;
        cursor: pointer;
        padding: 5px; 
        border-radius: 5px;
    }
</style>