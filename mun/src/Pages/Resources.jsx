import React, { useState, useEffect } from 'react';
import Resource from '../Entities/Resource.json';
import Committee from '../Entities/Committee.json';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { FileText, BookOpen, Video, ExternalLink } from 'lucide-react';
import Layout from "../Layout";

const ResourceItem = ({ resource }) => {
  const icons = {
    rop: <FileText className="w-6 h-6 text-blue-500" />,
    guide: <BookOpen className="w-6 h-6 text-green-500" />,
    article: <FileText className="w-6 h-6 text-purple-500" />,
    video: <Video className="w-6 h-6 text-red-500" />,
  };

  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">{icons[resource.type]}</div>
          <div>
            <CardTitle>{resource.title}</CardTitle>
            <p className="text-sm text-slate-500 capitalize">{resource.type}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 mb-4">{resource.description}</p>
        <Button asChild variant="outline">
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            Open Resource <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resData, comData] = await Promise.all([
          Resource.list(),
          Committee.list()
        ]);
        setResources(resData);
        setCommittees(comData);
      } catch (e) {
        console.error("Failed to fetch data", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const filteredResources = resources.filter(r => {
    if (filter === 'All') return true;
    if (filter === 'General') return !r.committee_name;
    return r.committee_name === filter;
  });

  return (
    <Layout currentPageName="Resources">
      <div
        className="
          min-h-screen
          bg-gradient-to-br from-slate-50 to-blue-50
          px-4 md:px-10 py-10
          md:ml-[320px]
          transition-all duration-300
        "
        style={{
          maxWidth: "1200px",
          marginRight: "auto",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Resource Center</h1>
          <p className="text-xl text-slate-600 mb-8">
            Comprehensive guides, articles, and documents to help you prepare for DYMUN 2025.
          </p>
          
          <div className="mb-6 flex flex-wrap gap-2">
            <Button 
              variant={filter === 'All' ? 'default' : 'outline'} 
              onClick={() => setFilter('All')}
            >
              All Resources
            </Button>
            <Button 
              variant={filter === 'General' ? 'default' : 'outline'} 
              onClick={() => setFilter('General')}
            >
              General
            </Button>
            {committees.map(c => (
              <Button 
                key={c.id} 
                variant={filter === c.name ? 'default' : 'outline'} 
                onClick={() => setFilter(c.name)}
              >
                {c.name}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? 
              Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-60 w-full" />) :
              filteredResources.map(res => <ResourceItem key={res.id} resource={res} />)
            }
          </div>
          
          {!isLoading && filteredResources.length === 0 && (
            <p className="text-slate-500 text-center col-span-full py-12">
              No resources found for this filter.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}