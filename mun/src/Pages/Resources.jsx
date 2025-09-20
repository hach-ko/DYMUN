import React, { useState, useEffect } from 'react';
import Resource from '../Entities/Resource.json';
import Committee from '../Entities/Committee.json';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { FileText, BookOpen, Video, ExternalLink } from 'lucide-react';
import Layout from "../Layout";

// Committee data (unique, grouped)
const committeeGroups = [
  {
    group: "Primary School (Grades 3-5)",
    committees: [
      { name: "Harry Potter", label: "Harry Potter: Rebuilding the Wizarding World" },
      { name: "Disney", label: "Disney: Regulating the Use of Magic" },
      { name: "FIFA", label: "FIFA: Combating Discrimination in Football" },
    ],
  },
  {
    group: "Middle School (Grades 6-8)",
    committees: [
      { name: "CTC", label: "CTC (Counter-Terrorism Committee)" },
      { name: "UNOOSA", label: "UNOOSA (Outer Space Affairs)" },
      { name: "IPL", label: "IPL (Indian Premier League): AUCTION" },
      { name: "SDG 5", label: "SDG 5 (Gender Equality)" },
    ],
  },
  {
    group: "High School (Grades 9-12)",
    committees: [
      { name: "ECOFIN", label: "ECOFIN (Economic and Financial Committee)" },
      { name: "UNSC", label: "UNSC (Security Council)" },
      { name: "AIPPM", label: "AIPPM (All India Political Party Meet)" },
      { name: "ICJ", label: "ICJ (International Court of Justice)" },
      { name: "HCC", label: "HCC (Historical Crisis Committee)" },
      { name: "IP", label: "IP (International Press)" },
    ],
  },
];

const allCommitteeNames = committeeGroups.flatMap(g => g.committees.map(c => c.name));

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
    return r.committee_name === filter;
  });

  // Button style: slight border always, white bg with black text by default, black bg with white text when selected
  const baseBtn =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 border border-input";
  const selectedBtn =
    baseBtn + " bg-black text-white hover:bg-black/90";
  const unselectedBtn =
    baseBtn + " bg-white text-black hover:bg-white/90";

  return (
    <Layout currentPageName="Resources">
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full px-4 md:px-10 py-10 transition-all duration-300"
        style={{
          maxWidth: "1200px",

          overflowX: "hidden",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Resource Center</h1>
          <p className="text-xl text-slate-600 mb-8">
            Comprehensive guides, articles, and documents to help you prepare for DYMUN 2025.
          </p>
          
          {/* Filter Buttons */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              className={filter === 'All' ? selectedBtn : unselectedBtn}
              onClick={() => setFilter('All')}
            >
              All Resources
            </button>
            {allCommitteeNames.map(name => (
              <button
                key={name}
                className={filter === name ? selectedBtn : unselectedBtn}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Example: Show committee info if selected */}
          {filter !== 'All' && (
            <Card className="mb-8 border shadow bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>
                  {committeeGroups
                    .flatMap(g => g.committees)
                    .find(c => c.name === filter)?.label || filter}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Resources for <span className="font-semibold">{filter}</span> will appear here.
                </p>
              </CardContent>
            </Card>
          )}

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