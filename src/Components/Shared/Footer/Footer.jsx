

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Company Info */}
        <div>
          <h3 className="text-3xl font-bold mb-4">Company Name</h3>
          <p className="text-lg">
            Providing exceptional delivery services nationwide. Your parcels are in safe hands.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Services</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
            <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-4">Phone: +88 0123456789</p>
          <p className="text-gray-300">Email: support@company.com</p>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12.1C22 5.5 17.6 0 12 0 6.4 0 2 5.5 2 12.1 2 18.6 6.4 24 12 24c4.6 0 8.7-3 10.3-7.1h-2c-1.3 3-4.4 5.2-8.3 5.2-4.7 0-8.5-3.8-8.5-8.4s3.8-8.4 8.5-8.4c2.3 0 4.4.8 6.1 2.3h2.6V12.1z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.4 0 0 5.4 0 12c0 4.8 3.5 8.9 8.1 10.3v-7.3h-2.4v-2.9h2.4v-2.1c0-2.3 1.3-3.5 3.4-3.5 1.5 0 2.9.1 3.2.2v3.5h-2c-1.6 0-1.9.8-1.9 1.9v2.5h3.8l-.6 2.9h-3.2v7.2c4.6-1.3 8.1-5.4 8.1-10.3C24 5.4 18.6 0 12 0z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 5.4c0-.3-.1-.6-.3-.8-.2-.2-.5-.3-.8-.3-.3 0-.5.1-.8.3l-3.3 3.3C16.1 7.1 14.1 6 12 6 6.5 6 2 10.5 2 15s4.5 9 10 9 10-4.5 10-9c0-.8-.1-1.5-.3-2.2l3.3-3.3c.2-.2.3-.5.3-.8z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center text-gray-300">
        <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
