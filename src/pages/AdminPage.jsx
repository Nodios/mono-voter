import React from 'react';
import { observer, inject } from 'mobx-react';
import { Container, Typography, Card, CardHeader, CardContent, CardActions } from '@material-ui/core';

import { AdminStore } from '../common/stores';

@inject(i => {
    const viewStore = new AdminStore();

    return {
        viewStore
    };
})
@observer
class AdminPage extends React.Component {
    render() {
        return (
            <Container>
                <Typography variant="h5" component="h3">
                    Admin page
                </Typography>
                <Card>
                    <CardHeader title="Step" subheader="Use this to change question" />
                    <CardContent>
                        Current step: 1
                    </CardContent>
                    <CardActions>

                    </CardActions>
                </Card>
            </Container>
        );
    }
}

export default AdminPage;