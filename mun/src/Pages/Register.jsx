import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import Layout from "../Layout";

export default function Register() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout currentPageName="Register">
      <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 w-full px-4 sm:px-6 py-6">
        <style>
          {`
            @keyframes fadeScaleIn {
              0% {
                opacity: 0;
                transform: scale(0.95);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
            @keyframes shimmer {
              0% {
                background-position: -200% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
            .animate-fadeScaleIn {
              animation: fadeScaleIn 0.5s ease-out forwards;
            }
            .animate-shimmer {
              background: linear-gradient(
                90deg,
                rgba(203, 213, 225, 0.2) 25%,
                rgba(203, 213, 225, 0.4) 50%,
                rgba(203, 213, 225, 0.2) 75%
              );
              background-size: 200% 100%;
              animation: shimmer 2s infinite linear;
            }
            .button-glow:hover {
              box-shadow: 0 0 15px rgba(37, 99, 235, 0.5);
            }
          `}
        </style>
        {isLoading ? (
          <Skeleton
            className="max-w-xl w-full h-64 rounded-3xl shadow-2xl animate-shimmer mx-auto"
          />
        ) : (
          <Card
            className="max-w-xl w-full mx-auto border-none shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl animate-fadeScaleIn"
          >
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
                Delegate Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-700 mb-6 text-base leading-relaxed">
                Register now to join DYMUN and experience two days of real-world
                MUN, debate, and diplomacy with students from diverse schools. All
                are welcome!
              </p>
              <a
                href="https://forms.gle/Mc6bXdwYeK4KTJ557"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
                className="w-full block"
              >
                <Button
                  size="large"
                  variant="primary"
                  className="w-full font-bold text-lg py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-98 button-glow"
                  style={{ minWidth: 220, fontSize: "1.25rem", letterSpacing: "0.02em" }}
                >
                  Register as Delegate
                </Button>
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}