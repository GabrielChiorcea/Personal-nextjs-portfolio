import FaqItem from "@/blocks/FaqItem";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Markdown from "@/components/ReactMarkdown";
import { getSinglePage } from "@/libs/getSinglePage";
import { useState } from "react";

const Contact = ({ contactPage }) => {
  const { title, subtitle, contactForm, faq } = contactPage.frontMatter;
  const { email, mailSubject, successMessage, errorMessage } = contactForm;

  // Handler Form Submit
  const [submitted, setSubmitted] = useState("");
  const [loading, setLoading] = useState(false);
  const formsubmitURL = `https://formsubmit.co/ajax/${email}`;

  const formHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(formsubmitURL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        _subject: mailSubject,
        name: full_name.value,
        email: email.value,
        message: message.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setSubmitted("success");
        e.target.reset();
      })
      .catch((error) => {
        setLoading(false);
        setSubmitted("error");
      });
  };

  return (
    <Layout metaTitle={title}>
      <PageHeader title={title} subtitle={subtitle} />

      <section className="py-28 bg-white text-dark rounded-b-2xl">
        <div className="container">
          <div className="row justify-center">
            <div
              className="md:col-10 lg:col-5 mb-24 lg:mb-0"
              data-aos="fade-up-sm"
            >
              {contactForm && (
                <div className="mb-10">
                  <h2 className="text-3xl font-medium mb-3 -mt-[6px]">{contactForm.title}</h2>
                </div>
              )}
              <form
                className="pr-0 lg:pr-8"
                method="POST"
                onSubmit={formHandler}
              >
                <input
                  className="hidden"
                  type="hidden"
                  name="_subject"
                  value={mailSubject}
                />
                <div className="mb-6">
                  <label htmlFor="full_name" className="block mb-2 text-black">Name</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    placeholder="Charlie Edward"
                    className="border border-light/90 rounded-lg bg-white h-12 w-full px-4 py-4 focus:border-dark/50 outline-none focus-visible:outline-none focus-visible:shadow-none transition-all duration-300"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 text-black">Contact email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="charlie.edward@email.app"
                    className="border border-light/90 rounded-lg bg-white h-12 w-full px-4 py-4 focus:border-dark/50 outline-none focus-visible:outline-none focus-visible:shadow-none transition-all duration-300"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-black">Additional info</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="border border-light/90 rounded-lg bg-white w-full px-4 py-4 focus:border-dark/50 outline-none focus-visible:outline-none focus-visible:shadow-none transition-all duration-300"
                    placeholder="Be as detailed as possible..."
                  ></textarea>
                </div>

                {submitted === "success" && (
                  <div className="mb-6 text-green-600">
                    <Markdown
                      inline="false"
                      content={successMessage}
                    />
                  </div>
                )}
                {submitted === "error" && (
                  <div className="mb-6 text-red-600">
                    <Markdown
                      inline="false"
                      content={errorMessage}
                    />
                  </div>
                )}

                <button
                  className="button button-dark mt-2"
                  title="Send your Message"
                  type="submit"
                  aria-label="Send Message"
                >
                  <span>{!loading ? "Send Message" : "Sending.."}</span>
                </button>
              </form>
            </div>
            <div
              className="md:col-10 lg:col-5"
              data-aos="fade-up-sm"
              data-aos-delay="100"
            >
              <div className="pl-0 lg:pl-8">
                <div className="mb-10">
                  <h2 className="text-3xl font-medium mb-3 -mt-[6px]">{faq.title}</h2>
                  <p className="text-black/75">{faq.subtitle}</p>
                </div>
                {faq.qaLists.map((item, index) => (
                  <FaqItem key={index} index={index} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

// Export Props
export const getStaticProps = () => {
  const contact = getSinglePage("content/contact.md");

  return {
    props: {
      contactPage: contact,
    },
  };
};
