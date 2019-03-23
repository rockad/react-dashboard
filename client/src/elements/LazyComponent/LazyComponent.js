import React, {Suspense} from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

function LazyComponent(dynamicImportFn) {
    const Component = React.lazy(dynamicImportFn);

    return function inner(props) {
        return (
            <Suspense fallback={<LinearProgress />}>
                <Component {...props} />
            </Suspense>
        );
    };
}

export default LazyComponent;
