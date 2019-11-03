import { observable, action, runInAction } from 'mobx';
import Firebase from '../firebase';

const stepId = "k1UWLoF47u9t7jVu36aR";

class AdminStore {
    @observable step = 0;

    _db = Firebase.firestore();
    _stepRef;

    constructor() {

    }

    @action.bound
    async init() {
        this._stepRef = this._db.collection('steps').doc(stepId);

        let step = await this._stepRef.get();
        if (step.exists) {
            runInAction(() => {
                const stepObj = step.data();
                this.step = stepObj.questionStep;
            });
        }

    }

    @action.bound
    async next() {
        const increment = Firebase.firestore.FieldValue.increment(1);

        await this._stepRef.update({ questionStep: increment });

        this.step++;
    }

    @action.bound
    async previous() {
        if (this.step > 0) {
            const decrement = Firebase.firestore.FieldValue.increment(-1);
            await this._stepRef.update({ questionStep: decrement });
            this.step--;
        }
    }
}

export default AdminStore;