import Navbar from '../Components/Navbar';
import RoutesHero from '../Components/RoutesHero';
import React from 'react';
import ShowRoutes from '../Components/ShowRoutes';
import '../../css/Routes.css';

function Routes({ routes, sortBy, sortOrder }) {

  return (
    <>
      <Navbar />
      <RoutesHero />
      <section className="routes-page py-5 px-4">
        <div className="container">
          {/*Add .map() for creating cards*/}
          <ShowRoutes routes={routes} />
        </div>
      </section>
    </>
  );
}

export default Routes;
