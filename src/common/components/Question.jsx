import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import {
    Fab,
    withStyles,
    LinearProgress,
    Container,
    Card,
    CardHeader,
    CardContent,
    Typography,
    createMuiTheme,
    MuiThemeProvider
} from '@material-ui/core';
import { Done, Close } from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';

import { QuestionStore } from '../stores';

const buttonsTheme = createMuiTheme({
    palette: {
        primary: green,
        secondary: red
    }
});

const styles = theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    fab: {
        selected: {
            color: "green"
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(2)
    },
    card: {
        marginTop: theme.spacing(2)
    }
});

@inject(i => ({ viewStore: new QuestionStore() }))
@observer
class Question extends React.Component {
    componentDidMount() {
        const { step, viewStore, userId } = this.props;

        viewStore.init(step, userId);
    }

    componentDidUpdate(prevProps) {
        const { step, viewStore, userId } = this.props;

        // re-init only on new step
        if (prevProps.step !== step) {
            viewStore.dispose();
            viewStore.init(step, userId);
        }
    }

    componentWillUnmount() {
        this.props.viewStore.dispose();
    }

    render() {
        const { classes, viewStore, userId } = this.props
        const { question, questionState, castVote, answer, votesCount } = viewStore;

        let innerComponent;
        if (questionState < 1) {
            innerComponent = (
                <div>
                    Loading...
                </div>
            );
        }
        else if (questionState > 1) {
            innerComponent = (
                <div>
                    The end.
                </div>
            )
        }
        else {
            // const totalVotes = question.yes + question.no;
            const yesPercentage = ((votesCount.yes / votesCount.total) * 100) || 0;
            const noPercentage = ((votesCount.no / votesCount.total) * 100) || 0;

            innerComponent = (
                <Container>
                    <h3>{question.question}</h3>
                    <MuiThemeProvider theme={buttonsTheme}>
                        <Fab
                            variant="extended"
                            size="large"
                            color="primary"
                            aria-label="Yes"
                            className={classes.margin}
                            disabled={answer === 'no'}
                            onClick={e => castVote('yes', userId)}
                        >
                            <Done className={classes.extendedIcon} /> Yes
                        </Fab>
                        <Fab
                            variant="extended"
                            size="large"
                            color="secondary"
                            aria-label="Yes"
                            className={classes.margin}
                            disabled={answer === 'yes'}
                            onClick={e => castVote('no', userId)}
                        >
                            <Close className={classes.extendedIcon} /> No
                    </Fab>
                        <div>
                            <Card className={classes.card}>
                                <CardHeader title="Results"></CardHeader>
                                <CardContent>
                                    <Typography>
                                        Yes ({yesPercentage.toFixed(0)} %)
                                </Typography>
                                    <LinearProgress color="primary" variant="determinate" value={yesPercentage} />
                                    <Typography>
                                        No ({noPercentage.toFixed(0)} %)
                                </Typography>
                                    <LinearProgress color="secondary" variant="determinate" value={noPercentage} />
                                </CardContent>
                            </Card>
                        </div>
                    </MuiThemeProvider>
                </Container>
            );
        }

        return innerComponent;
    }
}

Question.propTypes = {
    step: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired
}

export default withStyles(styles)(Question);