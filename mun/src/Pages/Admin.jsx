import React, { useState, useEffect } from 'react';
import Delegate from '../Entities/Delegate.json';
import User from '../Entities/User.json';
import { Button } from '../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { Shield, AlertTriangle, Users, CheckCircle, Clock, XCircle } from 'lucide-react';
import Layout from "../Layout";

const statusOptions = ["pending", "confirmed", "waitlisted", "declined"];
const statusColors = {
  pending: "bg-blue-100 text-blue-800 border-blue-300",
  confirmed: "bg-green-100 text-green-800 border-green-300",
  waitlisted: "bg-yellow-100 text-yellow-800 border-yellow-300",
  declined: "bg-red-100 text-red-800 border-red-300",
};

const statusIcons = {
  pending: <Clock className="w-4 h-4" />,
  confirmed: <CheckCircle className="w-4 h-4" />,
  waitlisted: <Clock className="w-4 h-4" />,
  declined: <XCircle className="w-4 h-4" />,
};

export default function Admin() {
  const [delegates, setDelegates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      try {
        const user = await User.me();
        if (user.email === 'gydro@example.com' || user.email === 'gydropump@gmail.com') {
          setIsAdmin(true);
          const data = await Delegate.list('-created_date');
          setDelegates(data);
          
          // Calculate stats
          const statusCounts = data.reduce((acc, delegate) => {
            acc[delegate.registration_status] = (acc[delegate.registration_status] || 0) + 1;
            return acc;
          }, {});
          setStats(statusCounts);
        }
      } catch (e) {
        console.error("Admin check failed:", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkAdminAndFetch();
  }, []);

  const handleStatusChange = async (delegateId, newStatus) => {
    try {
      await Delegate.update(delegateId, { registration_status: newStatus });
      setDelegates(prev => prev.map(d => 
        d.id === delegateId ? { ...d, registration_status: newStatus } : d
      ));
      
      // Update stats
      setStats(prev => {
        const delegate = delegates.find(d => d.id === delegateId);
        const oldStatus = delegate.registration_status;
        
        return {
          ...prev,
          [oldStatus]: (prev[oldStatus] || 0) - 1,
          [newStatus]: (prev[newStatus] || 0) + 1
        };
      });
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };
  
  if (isLoading) {
    return (
      <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton className="w-full h-96 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <Card className="max-w-md border-none shadow-2xl bg-white/90 backdrop-blur-sm text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-slate-900">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-lg">You do not have permission to view this page.</p>
            <p className="text-slate-500 text-sm mt-2">This area is restricted to administrators only.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Layout currentPageName="Admin">
      <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">Admin Dashboard</h1>
            <p className="text-xl text-slate-600">Manage DYMUN 2025 delegate registrations</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {statusOptions.map((status) => (
              <Card key={status} className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${statusColors[status].replace('text-', 'bg-').replace('bg-', 'bg-opacity-20 bg-')}`}>
                      {statusIcons[status]}
                    </div>
                    <Badge className={`${statusColors[status]} border`}>
                      {stats[status] || 0}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-slate-900 capitalize">{status}</p>
                  <p className="text-sm text-slate-500">
                    {status === 'pending' ? 'Awaiting review' : 
                    status === 'confirmed' ? 'Accepted delegates' :
                    status === 'waitlisted' ? 'On waiting list' : 'Rejected applications'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Delegates Table */}
          <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Users className="w-6 h-6 text-blue-600" />
                Delegate Registrations ({delegates.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50">
                      <TableHead className="font-bold text-slate-700">Name</TableHead>
                      <TableHead className="font-bold text-slate-700">School</TableHead>
                      <TableHead className="font-bold text-slate-700">Grade</TableHead>
                      <TableHead className="font-bold text-slate-700">Committee Pref. 1</TableHead>
                      <TableHead className="font-bold text-slate-700">Status</TableHead>
                      <TableHead className="font-bold text-slate-700">Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {delegates.map(delegate => (
                      <TableRow key={delegate.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-semibold text-slate-900">{delegate.full_name}</TableCell>
                        <TableCell className="text-slate-700">{delegate.school_name}</TableCell>
                        <TableCell className="text-slate-700">Grade {delegate.grade_year}</TableCell>
                        <TableCell className="text-slate-700">{delegate.preferred_committee_1}</TableCell>
                        <TableCell>
                          <Select
                            value={delegate.registration_status}
                            onValueChange={(value) => handleStatusChange(delegate.id, value)}
                          >
                            <SelectTrigger className={`w-40 border-2 ${statusColors[delegate.registration_status]} hover:shadow-md transition-all`}>
                              <div className="flex items-center gap-2">
                                {statusIcons[delegate.registration_status]}
                                <SelectValue />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map(opt => (
                                <SelectItem key={opt} value={opt}>
                                  <div className="flex items-center gap-2">
                                    {statusIcons[opt]}
                                    <span className="capitalize">{opt}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-slate-500 text-sm">
                          {new Date(delegate.created_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}