import React from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress } from '@material-ui/core';
import { Question } from '../common/components';

@inject(i => {
    const viewStore = i.rootStore.questionsStore;
    return {
        viewStore: viewStore
    }
})
@observer
class QuestionsPage extends React.Component {
    render() {
        const { step, isAuthenticated, userId } = this.props.viewStore;

        if (!isAuthenticated) {
            return (
                <div>
                    <CircularProgress />
                </div>
            )
        }

        return (
            <Question step={step} userId={userId} />
        );
    }
}

export default QuestionsPage;