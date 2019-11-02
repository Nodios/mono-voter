import React from 'react';
import { observer } from 'mobx-react';

@observer
class WelcomePage extends React.Component {
    render() {
        return (
            <div>
                Welcome
            </div>
        )
    }
}

export default WelcomePage;