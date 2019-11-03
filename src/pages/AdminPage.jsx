import React from 'react';
import { observer, inject } from 'mobx-react';
import { Container, Typography, Card, CardHeader, CardContent, CardActions, Button } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';

import { AdminStore } from '../common/stores';

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
        const { viewStore } = this.props;
        const { step, next, previous } = viewStore;
        return (
            <Container>
                <Typography variant="h5" component="h3">
                    Admin page
                </Typography>
                <Card>
                    <CardHeader title="Step" subheader="Use this to change question" />
                    <CardContent>
                        Current question: {step}
                    </CardContent>
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
            </Container>
        );
    }
}

export default AdminPage;