import bdaLogo from "../data/images/bda_logo.png";

const Section = ({ title, content }) => (
  <div className="mb-16">
    <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-300 mb-8">
      {title}
    </h2>
    {content.map((paragraph, index) => (
      <p
        key={index}
        className="text-lg text-gray-700 leading-relaxed mt-4 transform transition duration-500 hover:scale-105"
      >
        {paragraph}
      </p>
    ))}
  </div>
);

const aboutUsContent = [
  {
    title: "Welcome to BDA Library",
    content: [
      "Located in Drohobych, BDA Library offers a vast collection of books and resources for curious minds. Our mission is to spread knowledge through easy access to resources spanning multiple genres.",
      "We provide a space for academic research, leisure reading, and digital exploration. At BDA, we believe in lifelong learning and community growth.",
      "Join our library, immerse yourself in our curated collections, and let knowledge shape your world.",
    ],
  },
];

const AboutUs = () => {
  return (
    <div className="relative h-full bg-gradient-to-b from-green-100 via-white to-green-50 py-24">
      <div className="container mx-auto px-6 lg:px-20 text-gray-900 relative z-10">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-green-300 opacity-50 filter blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-yellow-300 opacity-70 filter blur-3xl animate-pulse"></div>

        <h1 className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-yellow-400 mb-16 transform transition duration-700 hover:scale-110">
          About Us
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="md:w-1/2 mb-12 md:mb-0 relative z-10">
            <img
              src={bdaLogo}
              alt="BDA Logo"
              className="w-full h-auto rounded-xl shadow-2xl transition-transform duration-700 hover:rotate-6 hover:scale-110"
            />
          </div>

          <div className="md:w-1/2 md:pl-12 relative z-10">
            {aboutUsContent.map((section, index) => (
              <Section
                key={index}
                title={section.title}
                content={section.content}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="w-40 h-1 bg-gradient-to-r from-green-400 to-yellow-300 rounded-full shadow-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
