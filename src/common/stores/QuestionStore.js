import { observable, action, computed } from 'mobx';
import Firebase from '../firebase';

const QuestionState = {
    INIT: 0,
    DISPLAY: 1,
    END: 2
}

class QuestionStore {
    @observable questionState = QuestionState.INIT;
    @observable question;
    @observable questionRef;
    @observable step;
    @observable answer;

    @computed get votesCount() {
        let output = {
            total: 0,
            yes: 0,
            no: 0
        };
        if (!this.question) {
            return output;
        }
        return Object.keys(this.question.votes).reduce((acc, uid) => {
            const vote = this.question.votes[uid];
            acc.total++;

            if (vote === 'yes') {
                acc.yes++;
            }
            else if (vote === 'no') {
                acc.no++;
            }

            return acc;
        }, output);
    }

    _dbUnsubscriber;
    _db;

    @action.bound
    castVote = (vote, userId) => {
        if (this.answer !== vote) {
            Firebase.firestore().runTransaction((transaction) => {
                return transaction.get(this.questionRef).then(doc => {
                    // votes is a map
                    const votes = doc.data()['votes'];

                    votes[userId] = vote;

                    transaction.update(this.questionRef, { votes });
                    this.answer = vote;
                    localStorage.setItem(this.step, vote);
                });
            })
        }
    }

    @action.bound
    init(step, userId) {
        this.step = step;
        this.userId = userId;

        this.answer = localStorage.getItem(this.step);

        this._dbUnsubscriber = Firebase.firestore().collection('questions')
            .where('sortOrder', '==', step)
            .limit(1)
            .onSnapshot(snapshot => {
                if (snapshot.size === 1) {
                    this.questionRef = snapshot.docs[0].ref;

                    const question = snapshot.docs[0].data()
                    this.question = question;

                    if (!question.votes[userId]) {
                        this.resetAnswer();
                    }

                    this.questionState = QuestionState.DISPLAY;
                }
                else {
                    this.questionState = QuestionState.END;
                    this.question = null;
                }
            });
    }

    @action.bound
    dispose() {
        if (this._dbUnsubscriber) {
            this._dbUnsubscriber();
            this._dbUnsubscriber = null;
            console.log("disposed");
        }
    }

    @action.bound
    resetAnswer() {
        this.answer = null;
        localStorage.removeItem(this.step);
    }
}

export default QuestionStore;