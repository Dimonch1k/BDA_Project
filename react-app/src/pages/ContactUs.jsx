import { ContactForm } from "../components/";

const contactDetails = [
  { label: "Phone", value: "+38 (032) 123-4567" },
  { label: "Email", value: "info@bda-library.com" },
  { label: "Address", value: "BDA Library, Central St., Drohobych, Ukraine" },
];

const ContactUs = () => {
  return (
    <div className="relative flex items-center justify-center lg:min-h-full min-h-screen">
      <div className="absolute inset-0 opacity-20 z-0 bg-gradient-to-br from-green-400 to-yellow-300"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-yellow-200 opacity-30 filter blur-2xl animate-pulse hidden md:block"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-green-400 opacity-20 filter blur-3xl hidden md:block"></div>

      <div className="container mx-auto px-6 lg:px-20 text-gray-900 relative z-10">
        <h1 className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-600 mb-12">
          Contact Us
        </h1>

        <div className="flex lg:flex-row flex-col items-start justify-between lg:gap-16 gap-8">
          <div className="lg:w-1/2 mb-3 lg:mb-0">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Get in Touch
            </h2>
            <div className="space-y-6 text-lg text-gray-700">
              {contactDetails.map((detail, index) => (
                <p key={index}>
                  <strong className="text-gray-900">{detail.label}:</strong>{" "}
                  {detail.value}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <ContactForm />
          </div>
        </div>

        <div className="mt-16 lg:flex justify-center hidden">
          <div className="w-40 h-1 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
