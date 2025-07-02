'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function EventsDisplay() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const eventRefs = useRef([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        setEvents(data);
        setLoading(false);
        
        // Animate events after loading
        setTimeout(() => {
          eventRefs.current.forEach((ref, i) => {
            gsap.from(ref, {
              scrollTrigger: {
                trigger: ref,
                start: "top 80%"
              },
              y: 100,
              opacity: 0,
              duration: 0.8,
              delay: i * 0.1,
              ease: "power3.out"
            });
          });
        }, 100);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="text-center py-12 text-gray-400">
        No upcoming events at the moment. Check back soon!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event, index) => (
        <div 
          key={event._id}
          ref={el => eventRefs.current[index] = el}
          className="relative group overflow-hidden rounded-2xl h-96 border border-white/10 hover:border-yellow-400/30 transition-all duration-500"
        >
          {/* Event Image Background */}
          <div className="absolute inset-0 z-0">
            {event.imageUrl && (
              <Image
                src={event.imageUrl}
                alt={event.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500"></div>
          </div>
          
          {/* Event Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-6">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-yellow-400/90 text-black rounded-full text-sm font-medium">
                {event.organization}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
            <p className="text-gray-300 mb-4 line-clamp-2">
              {event.description}
            </p>
            <div className="flex items-center text-gray-300 mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
            <a 
              href={event.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-yellow-400 group-hover:text-yellow-300 transition-colors"
            >
              Explore Event
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}