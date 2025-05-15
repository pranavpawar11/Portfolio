import React from "react";
import { motion } from "framer-motion";
import diplomalogo from "../../assets/images/diploma-logo.jpeg"; 
import collegelogo from "../../assets/images/college-logo.jpeg"; 
import ssclogo from "../../assets/images/ssc-logo.jpeg"; 
const EducationCard = ({ title, institution, duration, description, logo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="bg-light-card dark:bg-dark-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300
                 border border-light-border dark:border-dark-border relative overflow-hidden group"
    >
      {/* Top ribbon */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500"></div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-primary-200 dark:border-primary-900">
            {logo ? (
              <img
                src={logo}
                alt={institution}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="flex-grow">
          {/* Duration badge */}
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full mb-2">
            {duration}
          </span>

          <h3 className="font-bold text-xl text-light-text dark:text-dark-text mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>

          <h4 className="text-gray-600 dark:text-gray-300 font-medium mb-3">
            {institution}
          </h4>

          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Education = () => {
  const educationData = [
    {
      title: "BE in Information Technology",
      institution: "Sinhgad College of Engineering",
      duration: "Sept 2023 - Present",
      description:
        "Current CGPA: 9.04. Pursuing a degree in Information Technology with a focus on web development, database management, and software engineering principles.",
      logo:collegelogo,
    },
    {
      title: "Diploma in Computer Engineering",
      institution: "Government Polytechnic Avassari",
      duration: "Dec 2020 - May 2023",
      description:
        "Completed with 88.23%. Gained hands-on experience in computer engineering and web development during the course.",
      logo: diplomalogo,
    },
    {
      title: "SSC",
      institution: "Jay Mahar Vidyalay Delawadi",
      duration: "Mar 2020",
      description:
        "Completed with 92.80%. Focused on foundational education with distinction.",
      logo: ssclogo,
    },
  ];

  return (
    <section
      id="education"
      className="py-7 md:py-5 bg-light-background dark:bg-dark-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl opacity-5"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500 rounded-full filter blur-3xl opacity-5"></div>

      <div className="section-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-4"
          >
            <div className="w-10 h-1 bg-primary-500 mr-3"></div>
            <p className="text-light-text dark:text-dark-text font-medium">
              Academic Journey
            </p>
            <div className="w-10 h-1 bg-primary-500 ml-3"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            Education{" "}
            <span className="text-primary-600 dark:text-primary-400">&</span>{" "}
            Qualifications
          </motion.h2>

          {/* <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            My academic background has equipped me with a strong foundation in
            Information Technology, along with problem-solving skills and
            technical knowledge needed for software development.
          </motion.p> */}
        </div>

        <div className="space-y-8">
          {educationData.map((item, index) => (
            <EducationCard
              key={index}
              title={item.title}
              institution={item.institution}
              duration={item.duration}
              description={item.description}
              logo={item.logo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
