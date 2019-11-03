import { observable, action, runInAction } from 'mobx';

import Firebase from '../firebase';

class QuestionsStore {
    @observable step = 0;
    @observable isAuthenticated = false;
    @observable userId;

    constructor(rootStore) {

    }

    @action.bound
    async init() {
        const auth = await Firebase.auth().signInAnonymously();

        runInAction(() => {
            this.userId = auth.user.uid;
            this.isAuthenticated = true;
        });

        const stepsId = "k1UWLoF47u9t7jVu36aR";
        Firebase.firestore().collection('steps')
            .doc(stepsId)
            .onSnapshot(doc => {
                const stepsObj = doc.data();
                this.step = stepsObj.questionStep;
            }, err => {
                console.log("ERROR", err);
            });
    }
}

export default QuestionsStore;