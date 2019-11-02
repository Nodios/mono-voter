import { observable, action, runInAction } from 'mobx';

import Firebase from '../firebase';

class QuestionsStore {
    @observable step = 0;
    @observable isAuthenticated = false;
    @observable userId;

    constructor(rootStore) {
        const db = Firebase.firestore();

        const auth = Firebase.auth().signInAnonymously().then(rsp => {
            runInAction(() => {
                this.userId = rsp.user.uid;
                this.isAuthenticated = true;
            });
        });

        const stepsId = "k1UWLoF47u9t7jVu36aR";

        db.collection('steps')
            .doc(stepsId)
            .onSnapshot(doc => {
                const stepsObj = doc.data();
                this.step = stepsObj.questionStep;
            });


    }
}

export default QuestionsStore;