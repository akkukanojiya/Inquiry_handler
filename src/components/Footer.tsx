 

function Footer() {
  return (
    <footer className="bg-[#63589F] border-t ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
          <div className="text-sm text-white text-center sm:text-left">
            © {new Date().getFullYear()} Inquiry Handler. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-white">Privacy Policy</a>
            <a href="#" className="text-sm text-white">Terms of Service</a>
            <a href="#" className="text-sm text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
