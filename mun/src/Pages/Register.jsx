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
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [committees, setCommittees] = useState([]);
  const [user, setUser] = useState(null);
  const [lastSubmission, setLastSubmission] = useState(null);
  const [hasExistingRegistration, setHasExistingRegistration] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: "", email: "", school_name: "", phone: "", grade_year: "",
    previous_mun_experience: "none",
    preferred_committee_1: "", preferred_committee_2: "", preferred_committee_3: "",
    country_preference_1: "", country_preference_2: "", country_preference_3: "",
    dietary_requirements: "", emergency_contact: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const committeeData = await Committee.list();
        setCommittees(committeeData);
        
        try {
          const loggedInUser = await User.me();
          setUser(loggedInUser);
          
          // Check if user is admin - prevent registration
          if (loggedInUser.email === 'gydro@example.com' || loggedInUser.email === 'gydropump@gmail.com') {
            setError("Admin accounts cannot register for the conference.");
            return;
          }
          
          // Check if user already has a registration
          const existingRegistrations = await Delegate.filter({ email: loggedInUser.email });
          if (existingRegistrations.length > 0) {
            setHasExistingRegistration(true);
            return;
          }
          
          setFormData(prev => ({
            ...prev,
            full_name: loggedInUser.full_name || '',
            email: loggedInUser.email || '',
          }));
        } catch (e) {
          // Not logged in, which is fine for public registration
        }
      } catch (e) {
        console.error("Failed to fetch data", e);
      }
    };
    fetchData();
  }, []);

  const validatePhone = (phone) => {
    // Remove spaces, dashes, and parentheses
    const cleanedPhone = phone.replace(/[\s\-()]/g, '');
    return cleanedPhone.length >= 10 && cleanedPhone.length <= 15 && /^\+?[1-9]\d{9,14}$/.test(cleanedPhone);
  };

  const validateGrade = (grade) => {
    const gradeNum = parseInt(grade);
    return !isNaN(gradeNum) && gradeNum >= 3 && gradeNum <= 12;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent spam - check if submitted in last 5 minutes
    if (lastSubmission && Date.now() - lastSubmission < 5 * 60 * 1000) {
      setError("Please wait 5 minutes before submitting again to prevent spam.");
      return;
    }

    if (!user) {
        setError("Please log in to register for the event.");
        User.login();
        return;
    }

    // Check admin accounts
    if (user.email === 'gydro@example.com' || user.email === 'gydropump@gmail.com') {
      setError("Admin accounts cannot register for the conference.");
      return;
    }

    // Validation
    if (!validatePhone(formData.phone)) {
      setError("Please enter a valid phone number (10-15 digits with optional country code).");
      return;
    }

    if (!validateGrade(formData.grade_year)) {
      setError("Please enter a valid grade between 3 and 12.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    
    try {
      await Delegate.create({ ...formData, email: user.email });
      setLastSubmission(Date.now());
      setSuccess(true);
    } catch (err) {
      setError("Registration failed. Please check your information and try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasExistingRegistration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <Card className="max-w-md mx-auto border-none shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Already Registered!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-600 mb-4">
              You have already submitted a registration for DYMUN 2025.
            </p>
            <p className="text-sm text-slate-500 mb-4">
              You can only register once per account. Check your email for updates on your registration status.
            </p>
            <Button asChild className="w-full">
              <a href={createPageUrl("Home")}>Return to Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <Card className="max-w-md mx-auto border-none shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Registration Submitted!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-600 mb-4">
              Thank you for registering for DYMUN 2025! Your application has been submitted successfully.
            </p>
            <p className="text-sm text-slate-500 mb-4">
              You will receive an email notification once your registration has been reviewed and accepted by our team. This usually takes 2-3 business days.
            </p>
            <Button asChild className="w-full">
              <a href={createPageUrl("Home")}>Return to Home</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div>
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Register for DYMUN 2025</h1>
            <p className="text-xl text-slate-600">Join us for an unforgettable diplomatic experience</p>
          </div>
          
          {!user && (
            <Alert className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
                <Info className="h-5 w-5 text-blue-700" />
                <AlertTitle className="text-blue-800 font-bold text-lg">Please Log In</AlertTitle>
                <AlertDescription className="text-blue-700 text-base">
                    To register, please <Button variant="link" className="p-0 h-auto text-blue-700 font-bold underline" onClick={() => User.login()}>log in</Button> with your account first. This will link your registration to your profile.
                </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-8 shadow-lg">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-10">
              {/* Personal Information */}
              <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <UserIcon className="w-6 h-6 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                   <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-base font-semibold">Full Name *</Label>
                      <Input 
                        id="full_name" 
                        value={formData.full_name} 
                        onChange={(e) => handleInputChange('full_name', e.target.value)} 
                        required 
                        className="bg-white/70 border-2 hover:border-blue-300 transition-colors h-12" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)} 
                        required 
                        className="bg-white/70 border-2 hover:border-blue-300 transition-colors h-12" 
                        disabled={!!user}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school_name" className="text-base font-semibold">School Name *</Label>
                      <Input 
                        id="school_name" 
                        value={formData.school_name} 
                        onChange={(e) => handleInputChange('school_name', e.target.value)} 
                        required 
                        className="bg-white/70 border-2 hover:border-blue-300 transition-colors h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-semibold">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        value={formData.phone} 
                        onChange={(e) => handleInputChange('phone', e.target.value)} 
                        required 
                        className="bg-white/70 border-2 hover:border-blue-300 transition-colors h-12"
                        placeholder="+1234567890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade_year" className="text-base font-semibold">Grade/Year * (3-12)</Label>
                      <Input 
                        id="grade_year"
                        value={formData.grade_year}
                        onChange={(e) => handleInputChange('grade_year', e.target.value)}
                        required
                        className="bg-white/70 border-2 hover:border-blue-300 transition-colors h-12"
                        placeholder="Enter your grade (3-12)"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* You can add more form sections here, such as committee preferences, etc. */}
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function RegisterWIP() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <Card className="max-w-md mx-auto border-none shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">Work in Progress</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-slate-600 mb-4">
            The registration page is coming soon.<br />
            Please check back later!
          </p>
          <Skeleton className="w-full h-8 mb-2" />
          <Skeleton className="w-2/3 h-8 mx-auto" />
        </CardContent>
      </Card>
    </div>
  );
}
