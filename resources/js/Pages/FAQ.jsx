import '../../css/FAQ.css';

function FAQ() {
  return (
    <section className="faq-section py-5 px-4">
      <div className="container">
        <h2 className="text-center mb-5 section-title">Frequently Asked Questions</h2>
        <div className="accordion accordion-lg" id="faqAccordion">
          <div className="accordion-item mb-4">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                How can I find a travel route that suits me?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                You can search for routes by using filters such as destination city, number of travel days, and average budget. It's quick and personalized.
              </div>
            </div>
          </div>

          <div className="accordion-item mb-4">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
              >
                Can I create and save my own route?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Absolutely! Once you're logged in, you can create your own travel routes, save them to your profile, and revisit or update them anytime.
              </div>
            </div>
          </div>

          <div className="accordion-item mb-4">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
              >
                How do I share a route with others?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                After creating a route, you can publish it to make it discoverable by other users. Your route will appear in the public lists and popular sections.
              </div>
            </div>
          </div>

          <div className="accordion-item mb-4">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
              >
                Is RouteCraft free to use?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Yes! RouteCraft is completely free to use for all users. There are no hidden charges or subscriptions required.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
