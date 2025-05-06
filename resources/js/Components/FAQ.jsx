import Accordion from 'react-bootstrap/Accordion';
import '../../css/FAQ.css'; 

function FAQ() {
  return (
    <section className="faq-section py-5 px-4">
      <div className="container">
        <h2 className="text-center mb-16 section-title">Frequently Asked Questions</h2>
        <Accordion defaultActiveKey="0">

          <Accordion.Item eventKey="0" className="mb-3 item first">
            <Accordion.Header>
              How can I find a travel route that suits me?
            </Accordion.Header>
            <Accordion.Body>
              You can search for routes by using filters such as destination city, number of travel days, and average budget. It's quick and personalized.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className="mb-3 item">
            <Accordion.Header>
              Can I create and save my own route?
            </Accordion.Header>
            <Accordion.Body>
              Absolutely! Once you're logged in, you can create your own travel routes, save them to your profile, and revisit or update them anytime.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2" className="mb-3 item">
            <Accordion.Header>
              How do I share a route with others?
            </Accordion.Header>
            <Accordion.Body>
              After creating a route, you can publish it to make it discoverable by other users. Your route will appear in the public lists and popular sections.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3" className="mb-3 item last">
            <Accordion.Header>
              Is RouteCraft free to use?
            </Accordion.Header>
            <Accordion.Body>
              Yes! RouteCraft is completely free to use for all users. There are no hidden charges or subscriptions required.
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
      </div>
    </section>
  );
}

export default FAQ;