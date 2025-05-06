import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ShowRoutes from '../Components/ShowRoutes';

export default function Routes({ routes, sortBy, sortOrder }) {
    const [sort, setSort] = useState({ sortBy, sortOrder });

    const handleSortChange = (e) => {
        const [newSortBy, newSortOrder] = e.target.value.split(':');
        setSort({ sortBy: newSortBy, sortOrder: newSortOrder });
        window.location.href = route('routes.index', { sort_by: newSortBy, sort_order: newSortOrder });
    };

    return (
        <div>
            <h1>Routes Page</h1>
            <div>
                <label htmlFor="sort">Sort By:</label>
                <select id="sort" value={`${sort.sortBy}:${sort.sortOrder}`} onChange={handleSortChange}>
                    <option value="created_at:desc">Newest</option>
                    <option value="created_at:asc">Oldest</option>
                    <option value="likes:desc">Most Liked</option>
                    <option value="likes:asc">Least Liked</option>
                </select>
            </div>
            <ShowRoutes routes={routes} />
        </div>
    );
}