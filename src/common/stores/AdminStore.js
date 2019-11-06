import { observable, action, computed, runInAction } from 'mobx';
import Firebase from '../firebase';

const stepId = "k1UWLoF47u9t7jVu36aR";

const defaultForm = {
    question: '',
    sortOrder: 0
}

class AdminStore {
    @observable step = 0;
    @observable questions = [];

    @observable form = defaultForm;

    _db = Firebase.firestore();
    _stepRef;

    constructor() {
    }

    @computed get displayStep() {
        return this.step + 1;
    }

    @action.bound
    async init() {
        const auth = await Firebase.auth().signInAnonymously();

        this._stepRef = this._db.collection('steps').doc(stepId);

        this._stepRef.onSnapshot(doc => {
            const stepObj = doc.data();

            runInAction(() => {
                this.setStep(stepObj.questionStep);
            });
        });

        await this.fetchQuestions();
    }

    @action.bound
    setQuestion(question) {
        this.question = question;
    }

    @action.bound
    setStep(step) {
        this.step = step;
    }

    @action.bound
    async next() {
        const increment = Firebase.firestore.FieldValue.increment(1);

        let newStep = this.step;
        try {
            await this._stepRef.update({ questionStep: increment });
            newStep++;

            const question = await this.fetchQuestion(newStep);

            runInAction(() => {
                this.step = newStep;
                this.question = question;
            });
        }
        catch (e) {

        }
    }

    @action.bound
    async previous() {
        if (this.step > 0) {
            const decrement = Firebase.firestore.FieldValue.increment(-1);

            let newStep = this.step;
            try {
                await this._stepRef.update({ questionStep: decrement });
                newStep--;

                const question = await this.fetchQuestion(newStep);

                runInAction(() => {
                    this.step = newStep;
                    this.question = question;
                });
            }
            catch (e) {

            }
        }
    }

    // FORM
    @action.bound
    updateField(event) {
        const { name, value } = event.target;

        this.form[name] = value;
    }

    @action.bound
    async submit(event) {
        event.preventDefault();

        await this.addQuestion(this.form);

        runInAction(async () => {
            this.form = defaultForm;
            await this.fetchQuestions();
        });

    }

    addQuestion = async (questionObj) => {
        // this generates new document
        const newItemRef = await Firebase.firestore().collection('questions').doc();

        // set new data
        await newItemRef.set({
            question: questionObj.question,
            sortOrder: questionObj.sortOrder,
            votes: {}
        })
    }

    fetchQuestions = async () => {
        this.questions = [];
        const result = await Firebase.firestore().collection('questions')
            .orderBy('sortOrder', 'asc')
            .get();

        runInAction(() => {
            result.forEach(doc => {
                this.questions.push(doc.data());
            });
        });
    }
}

export default AdminStore;