import react from 'react'

function ShowRoutes({ routes }) {

    return(
        <div>
            <h1>Available Routes</h1>
            <ul>
                {routes.map((route) => (
                    <li key={route.id}>
                        <h3>{route.title}</h3>
                        <p>{route.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShowRoutes