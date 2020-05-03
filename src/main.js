import Vue from "vue"
import Layout from "./components/layout"
import router from "./router"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { Layout },
    template: "<Layout/>",
})
/* eslint-enable no-new */
