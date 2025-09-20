import React, { useState, useEffect } from 'react';
import { Users, Globe, Award } from 'lucide-react';
import { Skeleton } from '../components/ui/Skeleton';
import Layout from "../Layout";

const SIDEBAR_WIDTH = 260; // Ensure consistency with sidebar width

const teamMembers = [
  { 
    name: 'Aayan Kumar', 
    role: 'Secretary General', 
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300',
    bio: 'Leading DYMUN with 5+ years of MUN experience and passion for diplomacy.'
  },
  { 
    name: 'Yuvraj Behera', 
    role: 'Deputy Joint Secretary General', 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300',
    bio: 'Coordinating committee operations and ensuring smooth conference execution.'
  },
  { 
    name: 'Suvirr Menon', 
    role: 'Deputy Joint Secretary General', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
    bio: 'Managing logistics and creating an unforgettable experience for all delegates.'
  }
];

const ocMembers = [
  { name: 'Alice Johnson', role: 'Social Media' },
  { name: 'Mike Chen', role: 'IT Team' },
  { name: 'Sarah Davis', role: 'Content Management / Editing Team' },
  { name: 'Alex Rodriguez', role: 'Logistics' },
  { name: 'Emma Thompson', role: 'Hospitality' },
  { name: 'David Kim', role: 'Events Coordinator' }
];

const chairs = [
  { name: 'Dr. Maria Garcia', committee: 'UNSC', experience: 'Former UN diplomat with 15 years experience' },
  { name: 'Prof. James Miller', committee: 'WHO', experience: 'Public health expert and MUN veteran' },
  { name: 'Ms. Priya Patel', committee: 'UNESCO', experience: 'Education policy specialist and debate coach' },
  { name: 'Mr. Ahmed Hassan', committee: 'ECOSOC', experience: 'Economics professor with extensive MUN background' }
];

export default function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout currentPageName="AboutUs">
      <style>
        {`
          @keyframes popIn {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-popIn {
            animation: popIn 500ms ease-out forwards;
          }
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeSlideUp {
            animation: fadeSlideUp 500ms ease-out forwards;
          }
        `}
      </style>
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full px-6 py-6"
        style={{
          paddingLeft: 32,
          paddingRight: 24,
          maxWidth: "1400px",
        }}
      >
        {/* Hero */}
        <section className="relative py-24 text-center bg-blue-700 text-white rounded-xl shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?&auto=format&fit=crop&w=1200')" }}
          />
          <div className="relative max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold">About DYMUN</h1>
            <p className="mt-4 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Fostering diplomacy, dialogue, and critical thinking in the leaders of tomorrow.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20 max-w-5xl mx-auto">
          {isLoading ? (
            <div>
              <Skeleton className="h-10 w-1/3 mx-auto mb-4 animate-pulse" />
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <Skeleton className="h-32 w-full animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Array(3).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-28 w-full rounded-xl animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4 animate-fadeSlideUp" data-index="0">
                  Our Mission
                </h2>
                <p
                  className="text-slate-600 text-lg leading-relaxed animate-fadeSlideUp"
                  data-index="0.5"
                  style={{ animationDelay: "100ms" }}
                >
                  DYMUN offers an exciting platform for students to sharpen their Model United Nations (MUN) skills in a real-world setting. 
                  Over the course of two immersive days, delegates step into the shoes of global leaders—negotiating, debating, and 
                  collaborating on some of the world's most pressing issues.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Globe className="h-10 w-10 mx-auto text-blue-600 mb-2" />, title: "Global Awareness" },
                  { icon: <Users className="h-10 w-10 mx-auto text-blue-600 mb-2" />, title: "Community Building", offset: true },
                  { icon: <Award className="h-10 w-10 mx-auto text-blue-600 mb-2" />, title: "Skill Development" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-6 bg-white rounded-xl shadow-lg text-center animate-popIn ${item.offset ? 'mt-8' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-index={index}
                  >
                    {item.icon}
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Meet the Secretariat */}
        <section className="py-20 bg-white/50 backdrop-blur-md max-w-5xl mx-auto rounded-xl">
          {isLoading ? (
            <div className="text-center">
              <Skeleton className="h-10 w-1/3 mx-auto mb-12 animate-pulse" />
              <div className="grid md:grid-cols-3 gap-8">
                {Array(3).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-4xl font-bold text-slate-900 mb-12 animate-fadeSlideUp" data-index="1" style={{ animationDelay: "100ms" }}>
                Meet the Secretariat
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.name}
                    className="group animate-popIn"
                    style={{ animationDelay: "0ms" }}
                    data-index={index}
                  >
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden shadow-lg transform group-hover:scale-110 transition-transform">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-slate-800">{member.name}</h3>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                    <p className="text-slate-600 text-sm mt-2 px-4">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Committee Chairs */}
        <section className="py-20 max-w-5xl mx-auto">
          {isLoading ? (
            <div className="text-center">
              <Skeleton className="h-10 w-1/3 mx-auto mb-12 animate-pulse" />
              <div className="grid md:grid-cols-2 gap-6">
                {Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-36 w-full rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center animate-fadeSlideUp" data-index="2" style={{ animationDelay: "200ms" }}>
                Our Distinguished Chairs/Co-Chairs
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {chairs.map((chair, index) => (
                  <div
                    key={chair.name}
                    className="bg-white p-6 rounded-xl shadow-lg animate-popIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-index={index}
                  >
                    <h3 className="text-xl font-bold text-slate-900">{chair.name}</h3>
                    <p className="text-blue-600 font-medium">{chair.committee} Chair</p>
                    <p className="text-slate-600 mt-2">{chair.experience}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Organizing Committee */}
        <section className="py-20 bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
          {isLoading ? (
            <div className="text-center max-w-5xl mx-auto px-6">
              <Skeleton className="h-10 w-1/3 mx-auto mb-12 animate-pulse" />
              <div className="grid md:grid-cols-3 gap-8">
                {Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-28 w-full rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center max-w-5xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center animate-fadeSlideUp" data-index="3" style={{ animationDelay: "300ms" }}>
                Organizing Committee
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {ocMembers.map((member, index) => (
                  <div
                    key={member.name}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center animate-popIn"
                    style={{ animationDelay: `${index * 100}ms` }}
                    data-index={index}
                  >
                    <h3 className="font-semibold text-lg text-slate-900 text-center">{member.name}</h3>
                    <p className="text-slate-600 text-sm mt-1 text-center">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}