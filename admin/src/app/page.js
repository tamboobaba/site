'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Navbar} from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FiSun, FiCloud, FiZap, FiSmile, FiChevronRight, FiCalendar, FiUsers} from 'react-icons/fi';
import Link from 'next/link';

const quotes = [
  "Great things never come from comfort zones.",
  "Stay positive, work hard, make it happen.",
  "Every day is a fresh start.",
  "Success is not for the lazy.",
  "Dream big, work bigger.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you."
];

const weatherData = [
  { icon: <FiSun />, temp: "32°C", desc: "Sunny" },
  { icon: <FiCloud />, temp: "28°C", desc: "Cloudy" },
  { icon: <FiZap />, temp: "30°C", desc: "Stormy" }
];

export default function HomePage() {
  const [quote, setQuote] = useState('');
  const [photo, setPhoto] = useState('');
  const [weather, setWeather] = useState(weatherData[0]);

useEffect(() => {
  // Set a random quote
  setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

  // Set a random Unsplash photo initially
  const updatePhoto = () => {
    setPhoto(`https://picsum.photos/800/600?random=${Date.now()}`);
    // setPhoto(`https://loremflickr.com/800/600/courage,growth,tech?random=${Date.now()}`);

  };
  updatePhoto(); // Initial load
  const interval = setInterval(updatePhoto, 60000); // Every 60 seconds

  // Fetch real weather data
  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Ludhiana&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      const data = await res.json();
      const condition = data.weather[0].main.toLowerCase();
      let icon = <FiSun />;
      if (condition.includes("cloud")) icon = <FiCloud />;
      else if (condition.includes("rain") || condition.includes("storm")) icon = <FiZap />;

      setWeather({
        icon,
        temp: `${Math.round(data.main.temp)}°C`,
        desc: data.weather[0].description,
      });
    } catch (error) {
      console.error("Weather fetch failed:", error);
    }
  };

  fetchWeather();

  return () => clearInterval(interval); // Cleanup on unmount
}, []);



  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row gap-8 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {/* Left: Welcome and Actions */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            <FiSmile className="inline-block" /> Welcome, Admin!
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Manage your events and brand alliances with ease. Here’s to a productive and happy day!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/events">
              <div className="bg-gray-900/70 hover:bg-yellow-400/10 border border-yellow-400/40 rounded-lg p-6 flex items-center gap-4 transition cursor-pointer">
                <FiCalendar className="text-3xl" />
                <div>
                  <div className="font-semibold text-yellow-400 text-lg">Event Management</div>
                  <div className="text-gray-400 text-sm">Create, edit, and manage all events.</div>
                </div>
                <FiChevronRight className="ml-auto text-yellow-400" />
              </div>
            </Link>
            <Link href="/brandalliances">
              <div className="bg-gray-900/70 hover:bg-yellow-400/10 border border-yellow-400/40 rounded-lg p-6 flex items-center gap-4 transition cursor-pointer">
               <FiUsers className="text-3xl" />
                <div>
                  <div className="font-semibold text-yellow-400 text-lg">Brand Alliances</div>
                  <div className="text-gray-400 text-sm">View and process alliance requests.</div>
                </div>
                <FiChevronRight className="ml-auto text-yellow-400" />
              </div>
            </Link>
          </div>
        </div>

        {/* Right: Dynamic Content */}
        <div className="flex flex-col items-center justify-center gap-8 w-full md:w-96 mt-8 md:mt-0">
          {/* Weather Widget */}
          <div className="bg-gray-900/70 border border-yellow-400/40 rounded-lg p-6 flex flex-col items-center w-full">
            <div className="text-4xl text-yellow-400 mb-2">{weather.icon}</div>
            <div className="text-2xl font-bold">{weather.temp}</div>
            <div className="text-gray-400">{weather.desc}</div>
            <div className="mt-2 text-xs text-gray-500">Ludhiana, IN</div>
          </div>
          {/* Random Unsplash Photo */}
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-white/10 shadow-lg">
            {photo && (
              <Image
                src={photo}
                alt="Dashboard Visual"
                  onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop
                        e.target.src = "/fallbackofficeimg.png";
                      }}
                fill
                className="object-cover"
                style={{ filter: 'brightness(0.95)' }}
                unoptimized
                priority
              />
            )}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-950/80 to-transparent p-2">
              <span className="text-xs text-yellow-400">A new vibe, every time you log in.</span>
            </div>
          </div>
          {/* Random Quote */}
          <div className="bg-gray-900/70 border border-yellow-400/40 rounded-lg p-4 text-center text-lg text-yellow-400 font-semibold italic shadow">
            “{quote}”
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
