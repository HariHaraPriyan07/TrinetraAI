import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Github, Twitter, Share2 } from 'lucide-react';
import { Button } from './ui/Button';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Share2, href: '#', label: 'Share' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      {/* Quiz Section */}
      <section id="quiz-section" className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-space-grotesk">
              Knowledge Quiz
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-space-grotesk font-normal">
              This is the Quiz Section - Test your knowledge about misinformation detection and fact-checking techniques.
            </p>
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-md mx-auto">
              <p className="text-gray-700 dark:text-gray-200">
                Interactive quiz content will be implemented here to help users learn about identifying misinformation patterns and developing critical thinking skills.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
            id="about-section"
          >
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-space-grotesk">Trinetra</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Verify. Learn. Share Truth.</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm mx-auto md:mx-0">
              Empowering users to identify and combat misinformation through 
              advanced AI analysis and educational resources.
            </p>
          </motion.div>

          {/* Hackathon Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Built for Innovation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Created as part of a hackathon project to combat misinformation
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                <span>Powered by</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">Google Cloud AI</span>
              </div>
            </div>
          </motion.div>

          {/* Social Links and CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center md:text-right"
            id="extension-section"
          >
            <div className="mb-4">
              <Button className="mb-3 w-full md:w-auto">
                Get Browser Extension
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Available for Chrome, Firefox & Safari
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex justify-center md:justify-end space-x-2">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              © 2025 Trinetra. Built with ❤️ for a better informed world.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
              <a href="#about-section" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#about-section" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
              <a href="#about-section" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                About
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;