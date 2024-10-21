import bdaLogo from "../data/images/bda_logo.png";
import "../styles/pages/AboutUs.scss";

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
    <div className="about-us">
      <div className="about-us__container">
        <div className="about-us__background-circle-1"></div>
        <div className="about-us__background-circle-2"></div>

        <h1 className="about-us__title">About Us</h1>

        <div className="about-us__flex-container">
          <div className="about-us__logo">
            <img src={bdaLogo} alt="BDA Logo" />
          </div>

          <div className="about-us__content">
            {aboutUsContent.map((section, index) => (
              <Section
                key={index}
                title={section.title}
                content={section.content}
              />
            ))}
          </div>
        </div>

        <div className="about-us__divider">
          <div className="about-us__divider__line"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
