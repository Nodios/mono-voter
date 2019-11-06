import { RouterState } from "mobx-state-router";

export const routes = [
    {
        name: 'home',
        pattern: '/'
    },
    {
        name: 'questions',
        pattern: '/questions'
    },
    {
        name: 'admin',
        pattern: '/admin',
        // beforeEnter: (from, to, routerStore) => {
        //     let password = prompt("Enter password");

        //     if (password !== "xyc") {
        //         return Promise.reject(new RouterState('home'));
        //     }

        //     return Promise.resolve();
        // }
    }
]