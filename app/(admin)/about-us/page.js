import React from "react";

function AboutUs() {
  return (
    <div className="flex-1 flex-col items-center justify-center md:flex-row md:space-x-10 bg-white m-10 rounded-md px-0 md:p-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#F4A261] animate__animated animate__fadeIn animate__delay-1s">
            About Us
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            We are passionate about making healthcare accessible and easy to
            manage.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 mb-16">
          <div className="mb-8 lg:mb-0 shadow-lg border rounded-xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-[#F4A261] hover:duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-[#F4A261]">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Our mission is to empower healthcare providers and patients with
              easy-to-use, efficient tools that streamline the patient
              registration process. We aim to simplify data collection and
              improve overall healthcare workflows.
            </p>
          </div>

          <div className="mb-8 lg:mb-0 shadow-lg border rounded-xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-[#F4A261] hover:duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-[#F4A261]">
              Our Vision
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              We envision a world where managing patient data is seamless and
              secure, making healthcare more efficient and accessible to
              everyone. We strive to be the leading platform for healthcare
              providers to offer exceptional care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
