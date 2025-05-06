import React from 'react';
import ShowRoutes from '../Components/ShowRoutes';

export default function Routes({ routes }) {
    return (
        <div>
            <h1>Routes Page</h1>
            <ShowRoutes routes={routes} />
        </div>
    );
}