import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="mt-20">
      {/* Hero Section */}
      <section className="px-6 container mx-auto md:flex md:justify-between items-center my-6 space-x-6">
        <div className="md:w-3/6 text-center md:text-left">
          <h4 className="text-xl font-bold">New Feature</h4>
          <h3 className="text-5xl font-bold mb-5">Coming Up With Fresh Ideas</h3>
          <p className="text-gray-500 mb-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam facere ea totam labore vitae autem.
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-3xl">Create Account</button>
        </div>
        <Image className="md:w-3/6" src="/img/hero.jpg" alt="Hero" width={500} height={300} />
      </section>

      {/* Partner Section */}
      <section className="bg-gray-100 p-10 my-5">
        <div className="container mx-auto grid grid-cols-2 gap-5 justify-items-center md:flex md:justify-around items-center max-w-5xl">
          {["bootstrap", "dribbble", "envato", "instagram", "jquery"].map((logo) => (
            <Image key={logo} className="w-32" src={`/img/${logo}.png`} alt={logo} width={128} height={40} />
          ))}
        </div>
      </section>

      {/* Statistic Section */}
      <section className="container mx-auto space-x-6 md:flex md:justify-between items-center">
        <Image src="/img/stat.jpg" className="w-3/4 md:w-3/6 mx-auto" alt="Statistic" width={500} height={300} />
        <div className="md:w-3/6 text-center md:text-left">
          <h4 className="text-xl font-bold">Statistic</h4>
          <h3 className="text-3xl font-bold mb-5">What We Can Do For You</h3>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel alias cupiditate, dolores sunt similique expedita atque consequuntur obcaecati aspernatur est?
          </p>
          <div className="flex justify-between py-6 max-w-80 mx-auto">
            {[
              { value: "20+", label: "Portfolios" },
              { value: "100+", label: "Clients" },
              { value: "4.8", label: "Rating" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center text-gray-500">
                <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
                <p>{label}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 mb-4">
            <span className="font-bold">info</span> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, voluptatibus?
          </p>
          <button className="bg-red-500 text-white px-4 py-2 rounded-3xl">Detail</button>
        </div>
      </section>

      {/* Testimonies Section */}
      <section className="container mx-auto p-10 my-5 text-center">
        <h4 className="text-xl font-bold">Testimonies</h4>
        <h3 className="text-3xl font-bold mb-5">What They Say About Us</h3>
        <div className="md:flex md:justify-between mt-16 space-x-8">
          {[
            { name: "John Saleh", image: "person1.jpg" },
            { name: "Bob Smith", image: "person2.jpg" },
            { name: "Alex White", image: "person3.jpg" },
          ].map(({ name, image }, index) => (
            <div
              key={name}
              className={`${index > 0 ? "hidden md:inline" : ""
                } bg-gray-100 md:w-1/3 rounded-md border border-gray-200`}
            >
              <Image className="w-16 rounded-full mx-auto -mt-8" src={`/img/${image}`} alt={name} width={64} height={64} />
              <h5 className="font-bold pt-5">{name}</h5>
              <p className="p-5 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, odio.
              </p>
            </div>
          ))}
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-3xl mt-6">See All Testimonies</button>
      </section>

      {/* Footer */}
      <section
        className="px-6 container mx-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:justify-between bg-top bg-no-repeat pb-10 text-gray-500"
        style={{ backgroundImage: "url('/img/footer.png')" }}
      >
        <div className="mb-4">
          <Image src="/img/logo.png" className="w-32" alt="Logo" width={128} height={40} />
          <p className="mt-5">
            halo@flare.com
            <br />
            (0274)433221
          </p>
        </div>
        {[
          "About Us",
          "Resource",
          "Company",
          "Privacy Policy"
        ].map((section, i) => (
          <div className="mb-4" key={i}>
            <h4 className="font-bold text-xl mb-4">{section}</h4>
            <ul className="space-y-2">
              {["Support Center", "Customer Support", "About Us", "History"].map((link) => (
                <li key={link}><a href="">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}