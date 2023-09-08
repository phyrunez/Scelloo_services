import Vue from "vue";
import VueRouter from "vue-router";

import AllView from "../views/AllView.vue";
import PaidView from "../views/PaidView.vue";
import UnpaidView from "../views/UnpaidView.vue";
import OverdueView from "../views/OverdueView.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: { path: "/all_services" } },
  {
    path: "/all_services",
    name: "all",
    component: AllView,
  },
  {
    path: "/paid_services",
    name: "paid",
    component: PaidView,
  },
  {
    path: "/unpaid_services",
    name: "unpaid",
    component: UnpaidView,
  },
  {
    path: "/overdue_services",
    name: "overdue",
    component: OverdueView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
