import Navbar from '../Components/Navbar';
import RoutesHero from '../Components/RoutesHero';
import '../../css/Routes.css';

function Routes() {
  return (
    <>
      <Navbar />
      <RoutesHero />
      <section className="routes-page py-5 px-4">
        <div className="container">
        </div>
      </section>
    </>
  );
}

export default Routes;
