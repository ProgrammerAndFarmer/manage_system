import Vue from 'vue'
import './assets/js/axios'
import App from './App.vue'
import './assets/css/global.css'
import { Button, Container, Header, Aside, Main, Footer, Menu, Submenu, MenuItemGroup, MenuItem, Dropdown, DropdownMenu, DropdownItem, Table, TableColumn, RadioButton, Pagination, Input, Breadcrumb, BreadcrumbItem, Dialog, Form, FormItem, Message, Popconfirm } from 'element-ui'
import router from './router'
import VueRouter from 'vue-router'
import store from './store'

Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.component(Container.name, Container)
Vue.component(Header.name, Header)
Vue.component(Aside.name, Aside)
Vue.component(Main.name, Main)
Vue.component(Footer.name, Footer)
Vue.component(Menu.name, Menu)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(RadioButton.name, RadioButton)
Vue.component(Pagination.name, Pagination)
Vue.component(Input.name, Input)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Popconfirm.name, Popconfirm)
Vue.prototype.$message = Message
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
