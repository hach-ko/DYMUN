import React, { useState, useEffect } from "react";
import User from '../Entities/User.json';
import { useNavigate } from "react-router-dom";
import Delegate from '../Entities/Delegate.json';
import Committee from '../Entities/Committee.json';
import { createPageUrl } from "../lib/utils";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/Alert";
import { Badge } from "../components/ui/Badge";
// Change from: import { something } from "../lib/utils";
import { cn } from "../lib/utils"; // Up two levels: Pages → src → lib
import { 
  User as UserIcon, School, Phone, Mail, Globe, GraduationCap, AlertCircle, CheckCircle, FileText, Info, Loader2
} from "lucide-react";
import { Skeleton } from "../components/ui/Skeleton";
import Layout from "../Layout";

const PreferenceCard = ({ number, committees, value, onChange, placeholder, required }) => {
  const levelColors = {
    "Primary": "border-green-200 bg-green-50/50",
    "Middle": "border-yellow-200 bg-yellow-50/50", 
    "Advanced": "border-red-200 bg-red-50/50"
  };

  const selectedCommittee = committees.find(c => c.name === value);
  
  return (
    <div className={`p-5 border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${selectedCommittee ? levelColors[selectedCommittee.level] : 'bg-slate-50/50 border-slate-200'}`}>
      <Label className="font-bold text-slate-700 flex items-center mb-3">
        <span className="flex items-center justify-center w-7 h-7 mr-3 text-sm font-bold text-white bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg">{number}</span>
        Committee Preference {required && '*'}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="bg-white/80 border-2 hover:border-blue-300 transition-colors">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          <div className="p-2">
            <div className="mb-2">
              <Badge className="bg-green-100 text-green-800 mb-1">Primary School (Grades 3-5)</Badge>
              {committees.filter(c => c.level === "Primary").map((committee) => (
                <SelectItem key={committee.id} value={committee.name} className="ml-2 my-1">
                  <div>
                    <div className="font-semibold">{committee.name}</div>
                    <div className="text-xs text-slate-500 truncate">{committee.full_name}</div>
                  </div>
                </SelectItem>
              ))}
            </div>
            <div className="mb-2">
              <Badge className="bg-yellow-100 text-yellow-800 mb-1">Middle School (Grades 6-8)</Badge>
              {committees.filter(c => c.level === "Middle").map((committee) => (
                <SelectItem key={committee.id} value={committee.name} className="ml-2 my-1">
                  <div>
                    <div className="font-semibold">{committee.name}</div>
                    <div className="text-xs text-slate-500 truncate">{committee.full_name}</div>
                  </div>
                </SelectItem>
              ))}
            </div>
            <div className="mb-2">
              <Badge className="bg-red-100 text-red-800 mb-1">High School (Grades 9-12)</Badge>
              {committees.filter(c => c.level === "Advanced").map((committee) => (
                <SelectItem key={committee.id} value={committee.name} className="ml-2 my-1">
                  <div>
                    <div className="font-semibold">{committee.name}</div>
                    <div className="text-xs text-slate-500 truncate">{committee.full_name}</div>
                  </div>
                </SelectItem>
              ))}
            </div>
          </div>
        </SelectContent>
      </Select>
      {selectedCommittee && (
        <div className="mt-3 p-3 bg-white/60 rounded-lg border">
          <p className="text-sm font-semibold text-slate-800">{selectedCommittee.full_name}</p>
          <p className="text-xs text-slate-600 mt-1">{selectedCommittee.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={`text-xs ${selectedCommittee.level === "Primary" ? "bg-green-100 text-green-800" : selectedCommittee.level === "Middle" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
              {selectedCommittee.level} School
            </Badge>
          </div>
        </div>
      )}
    </div>
  )
};



export default function Register() {
  return (
    <Layout currentPageName="Register">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="ml-64 w-full flex flex-col items-center justify-center">
          <Card className="max-w-xl w-full border-none shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold text-slate-900 mb-2">Delegate Registration</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-700 mb-6 text-base leading-relaxed">
                Register now to join DYMUN and experience two days of real-world MUN, debate, and diplomacy with students from diverse schools. All are welcome!
              </p>
              <Button
                asChild
                size="large"
                variant="primary"
                className="w-full font-bold text-lg py-4 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg transition-all duration-300"
                style={{ minWidth: 220, fontSize: "1.25rem", letterSpacing: "0.02em" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="https://forms.gle/Mc6bXdwYeK4KTJ557"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  Register as Delegate
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
