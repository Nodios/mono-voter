import React from 'react';
import { observer, inject } from 'mobx-react';
import {
    Container,
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    TextField,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';
import { ArrowBack, ArrowForward, Visibility } from '@material-ui/icons';

import { AdminStore } from '../common/stores';

const styles = theme => ({
    card: {
        marginTop: theme.spacing(2)
    }
});

@inject(i => {
    const viewStore = new AdminStore();

    return {
        viewStore
    };
})
@observer
class AdminPage extends React.Component {
    async componentDidMount() {
        await this.props.viewStore.init();
    }
    render() {
        const { viewStore, classes } = this.props;
        const { step, displayStep, next, previous, questions, form, updateField, submit } = viewStore;
        return (
            <Container>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h5" component="h3">
                            Admin page
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardHeader title="Questions management" subheader="Use this to change question" />
                    {/* <CardContent>
                        {question &&
                            <Typography variant="body2" component="p">
                                {displayStep}. {question.question}
                            </Typography>
                        }
                    </CardContent> */}
                    <CardActions>
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<ArrowBack />}
                            disabled={step < 1}
                            onClick={e => previous()}
                        >
                            Previous question
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            endIcon={<ArrowForward />}
                            onClick={e => next()}
                        >
                            Next question
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.card}>
                    <CardHeader title="List of questions" />
                    <CardContent>
                        <List>
                            {questions.map((q, idx) => {
                                // <Typography variant="body2" component="p">{q.sortOrder + 1}. {q.question}</Typography>
                                return (
                                    <ListItem key={idx}>
                                        {q.sortOrder === step && <ListItemIcon>
                                            <Visibility />
                                        </ListItemIcon>}
                                        <ListItemText primary={q.question} secondary={"Sort order: " + q.sortOrder} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </CardContent>
                </Card>
                <Card className={classes.card}>
                    <CardHeader title="Add new question" />
                    <CardContent>
                        <form onSubmit={submit} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    required
                                    name="question"
                                    label="Question"
                                    margin="normal"
                                    value={form.question}
                                    onChange={updateField}
                                />
                            </div>
                            <div>
                                <TextField
                                    required
                                    type="number"
                                    name="sortOrder"
                                    label="Sort order"
                                    margin="normal"
                                    value={form.sortOrder}
                                    onChange={updateField}
                                    inputProps={{
                                        min: 1
                                    }}
                                />
                                <Button type="submit">Add question</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        );
    }
}

export default withStyles(styles)(AdminPage);