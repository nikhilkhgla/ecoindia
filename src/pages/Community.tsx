import { useState } from 'react';
import { Filter, MessageCircle, MessageSquare, Plus, Search, ThumbsUp } from 'lucide-react';

// Mock questions data
const mockQuestions = [
  {
    id: 1,
    title: "What's the best way to control pests in organic paddy farming?",
    description: "I'm trying to avoid chemical pesticides. Any natural solutions that work well for rice cultivation?",
    author: "Rajesh Kumar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "2 days ago",
    likes: 24,
    answers: 8,
    tags: ["organic", "pest-control", "rice"]
  },
  {
    id: 2,
    title: "Drip irrigation system for 2-acre vegetable farm - recommendations?",
    description: "Looking for cost-effective drip irrigation solutions for my vegetable farm in Karnataka. Budget constraints.",
    author: "Priya Singh",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "1 week ago",
    likes: 15,
    answers: 12,
    tags: ["irrigation", "vegetables", "water-conservation"]
  },
  {
    id: 3,
    title: "When is the best time to sow wheat in Punjab region?",
    description: "First-time wheat farmer here. Considering the changing climate patterns, when should I sow wheat in Punjab?",
    author: "Gurpreet Singh",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "3 days ago",
    likes: 32,
    answers: 15,
    tags: ["wheat", "punjab", "sowing-time"]
  },
  {
    id: 4,
    title: "Soil testing revealed low nitrogen - organic solutions?",
    description: "Recent soil test shows nitrogen deficiency. Looking for organic ways to improve soil fertility before planting tomatoes.",
    author: "Anita Desai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "5 days ago",
    likes: 19,
    answers: 7,
    tags: ["soil-health", "organic-farming", "tomato"]
  },
  {
    id: 5,
    title: "How to identify early signs of blight in potato crops?",
    description: "Had blight issues last season. Want to catch it early this time. What are the first symptoms to watch for?",
    author: "Mohan Verma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    date: "1 day ago",
    likes: 27,
    answers: 9,
    tags: ["potato", "disease-control", "blight"]
  }
];

const Community = () => {
  const [activeTab, setActiveTab] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  // Filter questions based on search and tags
  const filteredQuestions = mockQuestions
    .filter(q => 
      (searchQuery === '' || 
       q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       q.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedTag === '' || q.tags.includes(selectedTag))
    )
    .sort((a, b) => {
      if (activeTab === 'latest') return 0; // Already in latest order
      if (activeTab === 'popular') return b.likes - a.likes;
      if (activeTab === 'unanswered') return a.answers - b.answers;
      return 0;
    });
  
  // Get all unique tags
  const allTags = Array.from(new Set(mockQuestions.flatMap(q => q.tags)));
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Farmer Community</h1>
          <p className="text-gray-600 mt-1">Connect, learn, and share with fellow farmers across India</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          <Plus className="h-5 w-5 mr-2" />
          Ask a Question
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Topics</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('latest')}
          className={`py-2 px-4 font-medium ${
            activeTab === 'latest' 
              ? 'text-green-600 border-b-2 border-green-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Latest
        </button>
        <button
          onClick={() => setActiveTab('popular')}
          className={`py-2 px-4 font-medium ${
            activeTab === 'popular' 
              ? 'text-green-600 border-b-2 border-green-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Most Popular
        </button>
        <button
          onClick={() => setActiveTab('unanswered')}
          className={`py-2 px-4 font-medium ${
            activeTab === 'unanswered' 
              ? 'text-green-600 border-b-2 border-green-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Unanswered
        </button>
      </div>
      
      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map(question => (
            <div key={question.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <img 
                  src={question.avatar}
                  alt={question.author} 
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold hover:text-green-600 cursor-pointer">
                    {question.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{question.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {question.tags.map(tag => (
                      <span 
                        key={tag} 
                        onClick={() => setSelectedTag(tag)}
                        className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full cursor-pointer hover:bg-green-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Asked by <span className="font-medium">{question.author}</span> · {question.date}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-500">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{question.likes}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{question.answers}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No questions found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filter to find what you're looking for</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('');
              }}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      {/* Expert Section */}
      <div className="mt-10 bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Get Expert Advice</h2>
        <p className="text-gray-700 mb-4">
          Connect with agricultural experts and get personalized advice for your specific farming needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" 
              alt="Dr. Agarwal"
              className="h-16 w-16 rounded-full mx-auto"
            />
            <h3 className="text-center font-medium mt-2">Dr. Vikram Agarwal</h3>
            <p className="text-center text-sm text-gray-500">Soil Scientist</p>
            <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white text-sm py-1 rounded-md">
              Book Consultation
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" 
              alt="Dr. Sharma"
              className="h-16 w-16 rounded-full mx-auto"
            />
            <h3 className="text-center font-medium mt-2">Dr. Meena Sharma</h3>
            <p className="text-center text-sm text-gray-500">Crop Disease Specialist</p>
            <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white text-sm py-1 rounded-md">
              Book Consultation
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" 
              alt="Dr. Reddy"
              className="h-16 w-16 rounded-full mx-auto"
            />
            <h3 className="text-center font-medium mt-2">Dr. Venkat Reddy</h3>
            <p className="text-center text-sm text-gray-500">Agricultural Economist</p>
            <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white text-sm py-1 rounded-md">
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
