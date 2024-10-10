function Home() {
    return (
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Professional Tech Support Services</h1>
          <p className="text-xl text-gray-600">Expert solutions for all your technology needs</p>
        </section>
        
        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">PC Setup & Optimization</h3>
            <p className="text-gray-600">Professional computer setup and performance optimization</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Virus Removal</h3>
            <p className="text-gray-600">Comprehensive malware and virus removal services</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Hardware Installation</h3>
            <p className="text-gray-600">Expert hardware installation and upgrades</p>
          </div>
        </section>
      </div>
    );
  }
  
  export default Home;