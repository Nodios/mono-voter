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
        if (!this.question) {
            return {
                total: 0,
                yes: 0,
                no: 0
            }
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
        }, {
            total: 0,
            yes: 0,
            no: 0
        });
    }

    _dbUnsubscriber;
    _db;

    @action.bound
    castVote = (vote, userId) => {
        // TODO: check if voted
        // if (vote === 'yes') {
        //     this._submitVote('yes');
        // }
        // else if (vote === 'no') {
        //     this._submitVote('no');
        // }

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
    init(step) {
        this.step = step;

        this.answer = localStorage.getItem(this.step);

        this._dbUnsubscriber = Firebase.firestore().collection('questions')
            .where('sortOrder', '==', step)
            .limit(1)
            .onSnapshot(snapshot => {
                if (snapshot.size === 1) {
                    this.questionRef = snapshot.docs[0].ref;

                    const question = snapshot.docs[0].data()
                    this.question = question;
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
}

export default QuestionStore;