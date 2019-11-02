// import { observable, runInAction } from 'mobx';
import { RouterState, RouterStore } from 'mobx-state-router';

import { routes } from '../router/routes';
import { QuestionsStore } from './';

const notFound = new RouterState('notFound');

class RootStore {
    constructor() {
        this.routerStore = new RouterStore(this, routes, notFound);

        this.questionsStore = new QuestionsStore(this);
    }
}

export default RootStore;