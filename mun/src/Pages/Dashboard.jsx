import React, { useState, useEffect } from "react";
import Delegate from '../Entities/Delegate.json';
import User from '../Entities/User.json';
import Committee from '../Entities/Committee.json';
import Resource from '../Entities/Resource.json';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/Alert";
import { Skeleton } from "../components/ui/Skeleton";
import { 
  User as UserIcon, School, Globe, Calendar, CheckCircle, Clock, AlertTriangle, Mail, Phone, GraduationCap, FileText, BookOpen, ExternalLink, Video, Users
} from "lucide-react";
import { createPageUrl } from "../lib/utils";
import { Link } from "react-router-dom";
// Change from: import { something } from "../lib/utils";
import { cn } from "../lib/utils"; // Up two levels: Pages → src → lib
import Layout from "../Layout";

const ResourceItem = ({ resource }) => {
  const icons = {
    rop: <FileText className="w-4 h-4 text-blue-500" />,
    guide: <BookOpen className="w-4 h-4 text-green-500" />,
    article: <FileText className="w-4 h-4 text-purple-500" />,
    video: <Video className="w-4 h-4 text-red-500" />,
  };

  return (
    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 hover:bg-slate-100 rounded-lg transition-colors">
      <div className="flex-shrink-0">{icons[resource.type]}</div>
      <div>
        <p className="font-semibold text-slate-800">{resource.title}</p>
        <p className="text-sm text-slate-500">{resource.description}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
    </a>
  );
};

export default function Dashboard() {
  const [delegate, setDelegate] = useState(null);
  const [committee, setCommittee] = useState(null);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const user = await User.me();
        const delegates = await Delegate.filter({ email: user.email });
        
        if (delegates.length === 0) {
          setIsLoading(false);
          return;
        }

        const currentDelegate = delegates[0];
        setDelegate(currentDelegate);

        // Load committee and resources if delegate is confirmed
        if (currentDelegate.assigned_committee) {
          const committees = await Committee.filter({ name: currentDelegate.assigned_committee });
          if (committees.length > 0) {
            setCommittee(committees[0]);
          }
          
          const committeeResources = await Resource.filter({ committee_name: currentDelegate.assigned_committee });
          const generalResources = await Resource.filter({ committee_name: '' });
          setResources([...committeeResources, ...generalResources]);
        } else {
          const generalResources = await Resource.filter({ committee_name: '' });
          setResources(generalResources);
        }
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'confirmed': 
        return { 
          color: 'bg-green-100 text-green-800 border-green-200', 
          icon: <CheckCircle className="w-4 h-4" />, 
          text: 'Confirmed' 
        };
      case 'waitlisted': 
        return { 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
          icon: <Clock className="w-4 h-4" />, 
          text: 'Waitlisted' 
        };
      case 'pending': 
        return { 
          color: 'bg-blue-100 text-blue-800 border-blue-200', 
          icon: <Clock className="w-4 h-4" />, 
          text: 'Pending Review' 
        };
      case 'declined': 
        return { 
          color: 'bg-red-100 text-red-800 border-red-200', 
          icon: <AlertTriangle className="w-4 h-4" />, 
          text: 'Declined' 
        };
      default: 
        return { 
          color: 'bg-slate-100 text-slate-800 border-slate-200', 
          icon: <AlertTriangle className="w-4 h-4" />, 
          text: 'Unknown' 
        };
    }
  };
  
  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="w-full h-96" />
      </div>
    );
  }

  if (!delegate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <Card className="max-w-md border-none shadow-xl bg-white/90 backdrop-blur-sm text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl">No Registration Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">You haven't registered for DYMUN 2025 yet.</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to={createPageUrl("Register")}>Register Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const statusInfo = getStatusInfo(delegate.registration_status);

  // Show pending status message if not confirmed
  if (delegate.registration_status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, {delegate.full_name}!</h1>
            <p className="text-xl text-slate-600">Your DYMUN 2025 registration status</p>
          </div>
          
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-sm text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Registration Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-3 mb-6">
                <Badge className={`${statusInfo.color} border flex items-center gap-2 text-base px-4 py-2`}>
                  {statusInfo.icon}
                  {statusInfo.text}
                </Badge>
              </div>
              <p className="text-slate-600 mb-4 text-lg">
                Thank you for registering for DYMUN 2025! Your application is currently being reviewed by our organizing committee.
              </p>
              <p className="text-slate-500 mb-6">
                You will receive an email notification once your registration has been accepted. This usually takes 2-3 business days.
              </p>
              <div className="text-sm text-slate-400">
                Registered on {new Date(delegate.created_date).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Layout currentPageName="Dashboard">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, {delegate.full_name}!</h1>
            <p className="text-xl text-slate-600">Your DYMUN 2025 registration dashboard</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Registration Status */}
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      Registration Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className={`${statusInfo.color} border flex items-center gap-2`}>
                        {statusInfo.icon}
                        {statusInfo.text}
                      </Badge>
                      <span className="text-sm text-slate-600">
                        Registered on {new Date(delegate.created_date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {delegate.registration_status === 'confirmed' && (
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800 font-bold">Congratulations!</AlertTitle>
                        <AlertDescription className="text-green-700">
                          Your registration is confirmed. We're excited to have you at DYMUN 2025!
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
              </Card>

              {/* Committee Assignment */}
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Globe className="w-5 h-5 text-blue-600" />
                    Committee Assignment
                  </CardTitle>
                </CardHeader>
                
                {delegate.registration_status !== 'confirmed' || !committee ? (
                  <CardContent>
                    <p className="text-slate-600">
                      Your committee will be assigned once your registration is confirmed.
                    </p>
                  </CardContent>
                ) : (
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm text-slate-500">You have been assigned to:</p>
                      <h3 className="text-2xl font-bold text-slate-800">
                        {committee.full_name} ({committee.name})
                      </h3>
                      <p className="text-slate-600 mt-1">{committee.description}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-slate-700 mb-2">Committee Leadership</h4>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span className="text-sm">Chair: {committee.chair}</span>
                          </div>
                          {committee.co_chair && (
                            <div className="flex items-center gap-3">
                              <Users className="w-4 h-4 text-slate-400" />
                              <span className="text-sm">Co-Chair: {committee.co_chair}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-700 mb-2">Your Assignment</h4>
                        <p className="font-bold text-blue-600 text-lg">
                          {delegate.assigned_country || "Country assignment pending"}
                        </p>
                      </div>
                    </div>
                    
                    {committee.oc_members && committee.oc_members.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-slate-700 mb-2">Organizing Committee</h4>
                        <div className="flex flex-wrap gap-2">
                          {committee.oc_members.map((member, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {member}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Resources */}
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Useful Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {resources.length > 0 ? (
                      resources.slice(0, 5).map(resource => (
                        <ResourceItem key={resource.id} resource={resource} />
                      ))
                    ) : (
                      <p className="text-slate-500 text-sm">No resources available yet.</p>
                    )}
                    
                    {resources.length > 5 && (
                      <div className="pt-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={createPageUrl("Resources")}>
                            View All Resources
                          </Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
              </Card>

              {/* Delegate Information */}
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <UserIcon className="w-5 h-5 text-blue-600" />
                    Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <School className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{delegate.school_name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">Grade {delegate.grade_year}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{delegate.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{delegate.email}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}