import react from 'react'
import RouteCard from './RouteCard'

function ShowRoutes({ routes }) {

    return(
        <div>
            <h1>Available Routes</h1>
            {routes.map(route => <RouteCard route={route}/>)}
        </div>
    )
}

export default ShowRoutes