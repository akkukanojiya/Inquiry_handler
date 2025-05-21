function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#63589F] border-t text-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
          <div className="text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Inquiry Handler. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:underline">Privacy Policy</a>
            <a href="#" className="text-sm hover:underline">Terms of Service</a>
            <a href="#" className="text-sm hover:underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
