import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import Cart from "@/views/Cart.vue";
import Manager from "@/views/Manager.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: '/products',
        name: "Products",
        component: Products,
        meta: {
            reload: true,
          },
    },
    {
        path: '/cart',
        name: "Cart",
        component: Cart,
        meta: {
            reload: true,
        },
    },
    {
        path: '/manager',
        name: "manager",
        component: Manager,
    },
    {
        path: "/manager/:id",
        name: "manager.edit",
        component: () => import("@/views/ManagerEdit.vue"),
        props: true,
    },
    {
        path: "/manager/add",
        name: "manager.add",
        component: () => import("@/views/ManagerAdd.vue"),        
    },
    {
        path: '/order',
        name: "Order",
        component: import("@/views/Order.vue"),  
    },
    {
        path: '/signup',
        name: "Signup",
        component: import("@/views/Signup.vue"),  
    },
    {
        path: '/signin',
        name: "Signin",
        component: import("@/views/Login.vue"),  
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
      },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router;