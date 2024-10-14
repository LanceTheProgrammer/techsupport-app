import React from "react";
import { HeartIcon, PhoneIcon, MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">TechCare Services</h3>
            <p className="mb-4">Professional tech support for all your needs</p>
            <p className="flex items-center">
              <HeartIcon className="w-5 h-5 mr-2" />
              Made with care
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="flex items-center mb-2">
              <PhoneIcon className="w-5 h-5 mr-2" />
              (123) 456-7890
            </p>
            <p className="flex items-center">
              <MailIcon className="w-5 h-5 mr-2" />
              support@techcare.com
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Hours</h3>
            <p className="mb-2">Monday - Friday: 9am - 6pm</p>
            <p>Saturday: 10am - 4pm</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>
            &copy; {new Date().getFullYear()} TechCare Services. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
