const ContactForm = () => (
  <form className="bg-white shadow-lg rounded-xl p-8">
    {[
      { label: "Your Name", type: "text", id: "name", placeholder: "John Doe" },
      {
        label: "Your Email",
        type: "email",
        id: "email",
        placeholder: "you@example.com",
      },
    ].map((field, index) => (
      <div className="mb-8" key={index}>
        <label
          className="block text-xl font-semibold text-gray-800 mb-3"
          htmlFor={field.id}
        >
          {field.label}
        </label>
        <input
          type={field.type}
          id={field.id}
          className="w-full p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-green-400 transition duration-300"
          placeholder={field.placeholder}
        />
      </div>
    ))}
    <div className="mb-8">
      <label
        className="block text-xl font-semibold text-gray-800 mb-3"
        htmlFor="message"
      >
        Message
      </label>
      <textarea
        id="message"
        rows="4"
        className="w-full p-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:border-green-400 transition duration-300"
        placeholder="Your message here..."
      ></textarea>
    </div>
    <button className="w-full bg-gradient-to-r from-green-400 to-yellow-300 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-transform transform hover:scale-105 duration-300">
      Send Message
    </button>
  </form>
);

export default ContactForm;
