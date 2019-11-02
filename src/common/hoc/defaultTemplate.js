import { observer } from 'mobx-react';

export function defaultTemplate(Component) {
    return observer(Component);
}