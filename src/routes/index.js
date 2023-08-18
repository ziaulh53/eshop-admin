import { createRouter, createWebHistory } from "vue-router";
import {
  ProductList,
  SignUp,
  SignIn,
  ForgetPassword,
  ResetPassword,
  Dashboard,
  Notfound,
  Customers,
  Category,
  Settings
} from "../views";
import { useAuthStore } from "../store";

const routes = [
  {
    path: "/",
    name: "signin",
    component: SignIn,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/forget-password",
    name: "forget",
    component: ForgetPassword,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/reset-password",
    name: "reset",
    component: ResetPassword,
    meta: {
      requireAuth: false,
    },
  },
  
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/customers",
    name: "customers",
    component: Customers,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/category",
    name: "category",
    component: Category,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/category/:id",
    name: "product",
    component: ProductList,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: Notfound
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404"
  }
];

// const isAuthenticated = JSON.parse(localStorage.getItem("auth"))?.isAuthenticated;

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useAuthStore();
  const { isAuthenticated } = userStore.user;
  if ( to.meta.requireAuth && !isAuthenticated) {
    next("/");
  } else if (
    !to.meta.requireAuth &&
    isAuthenticated
  ) {
    next("/dashboard");
  } else next();
});

export default router;
