<template>
  <div id="app" class="container">
    <header class="header">
      <p>TABLE HEADING</p>
    </header>
    <div class="d-flex justify-content-between">
      <nav>
        <router-link to="/all_services">All</router-link>
        <router-link to="/paid_services">Paid</router-link>
        <router-link to="/unpaid_services">Unpaid</router-link>
        <router-link to="/overdue_services">Overdue</router-link>
      </nav>
      <span>Total payable amount: <span id="amount">$900.00</span> USD</span>
    </div>
    <hr class="line" />
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      amountTotalArr: ""
    }
  },
  created() {
    this.amountTotalArr = this.$store.getters.paidTotalAmountResult
    console.log(this.amountTotalArr)
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

body {
  background-color: #c6c2de !important;
}

.header p {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  letter-spacing: 2px;
  color: #6e6893;
  font-size: 14px;
  line-height: 17px;
  width: 150px;
  height: 17px;
  margin-top: 50px;
  margin-left: 100px;
}

nav {
  width: 100px;
  margin: 0 0 0 100px
}

.line {
  width: 1195px !important;
  height: 1px !important;
  background: #c6c2de !important;
  margin: 5px 0 0 100px !important;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 0 13px;
  line-height: 17px;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 500;
}

nav a.router-link-exact-active {
  color: #6d5bd0;
  padding-bottom: 8px;
  border-bottom: 3px solid #6d5bd0;
  transition: ease-in-out;
  transition-duration: 300ms;
}

span {
  font-family: "Inter", sans-serif;
  font-size: 15.5px;
}

#amount {
  color: #6d5bd0;
  font-weight: 900
}
</style>
