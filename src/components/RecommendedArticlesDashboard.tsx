'use client';

import { useState } from 'react';
import { ArrowLeft, Upload, Download, Plus, X } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
}

interface RecommendedArticlesDashboardProps {
  onBackToLanding: () => void;
}

export default function RecommendedArticlesDashboard({ onBackToLanding }: RecommendedArticlesDashboardProps) {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'The Evolution of Music Distribution',
      category: 'INDUSTRY INSIGHTS',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=280&fit=crop'
    },
    {
      id: '2',
      title: 'Live Performances in the Digital Age',
      category: 'CREATOR SPOTLIGHT',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=280&fit=crop'
    },
    {
      id: '3',
      title: 'Inside the Modern Recording Studio',
      category: 'TECHNOLOGY',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=280&fit=crop'
    }
  ]);

  const handleTitleChange = (articleId: string, newTitle: string) => {
    setArticles(prev => prev.map(a => 
      a.id === articleId ? { ...a, title: newTitle } : a
    ));
  };

  const handleCategoryChange = (articleId: string, newCategory: string) => {
    setArticles(prev => prev.map(a => 
      a.id === articleId ? { ...a, category: newCategory } : a
    ));
  };

  const handleReadTimeChange = (articleId: string, newReadTime: string) => {
    setArticles(prev => prev.map(a => 
      a.id === articleId ? { ...a, readTime: newReadTime } : a
    ));
  };

  const handleImageUpload = (articleId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setArticles(prev => prev.map(a => 
          a.id === articleId ? { ...a, image: imageUrl } : a
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddArticle = () => {
    const newArticle: Article = {
      id: Date.now().toString(),
      title: 'New Article Title',
      category: 'CATEGORY',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=280&fit=crop'
    };
    setArticles(prev => [...prev, newArticle]);
  };

  const handleDeleteArticle = (articleId: string) => {
    if (articles.length > 1) {
      setArticles(prev => prev.filter(a => a.id !== articleId));
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(articles, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recommended-articles.json';
    link.click();
  };

  return (
    <div 
      className="min-h-screen flex"
      style={{
        backgroundColor: '#1a1a1a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Left Side - Preview */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-[40px]">
          {/* Header */}
          <div className="mb-[40px] flex items-center justify-between">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-[12px] px-[20px] py-[12px] rounded-[8px] transition-all hover:opacity-80"
              style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                color: '#f1f0eb',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>

            <h1 
              className="text-[32px] font-bold"
              style={{ color: '#f1f0eb' }}
            >
              RECOMMENDED ARTICLES
            </h1>

            <button
              onClick={handleExport}
              className="flex items-center gap-[12px] px-[20px] py-[12px] rounded-[8px] transition-all hover:opacity-80"
              style={{
                backgroundColor: '#11ff49',
                color: '#1a1a1a',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <Download size={16} />
              Export JSON
            </button>
          </div>

          {/* Preview */}
          <div 
            className="w-full py-[60px] px-[40px] rounded-[12px]"
            style={{ backgroundColor: '#0d0d0d' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="group cursor-pointer"
                >
                  {/* Article Image */}
                  <div className="w-full h-[280px] rounded-[12px] overflow-hidden mb-[20px] relative bg-[#1a1a1a] border border-[#2a2a2a]">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(17, 255, 73, 0.1)' }}
                    >
                      <span 
                        className="text-[14px] font-semibold px-[24px] py-[12px] rounded-full"
                        style={{ 
                          backgroundColor: '#11ff49',
                          color: '#1a1a1a'
                        }}
                      >
                        Read Article
                      </span>
                    </div>
                  </div>

                  {/* Article Info */}
                  <div>
                    <div className="flex items-center gap-[12px] mb-[12px]">
                      <span 
                        className="text-[11px] font-bold tracking-wider"
                        style={{ color: '#a79755' }}
                      >
                        {article.category}
                      </span>
                      <span 
                        className="text-[11px]"
                        style={{ color: '#9e9e9d' }}
                      >
                        •
                      </span>
                      <span 
                        className="text-[11px]"
                        style={{ color: '#9e9e9d' }}
                      >
                        {article.readTime}
                      </span>
                    </div>
                    <h3 
                      className="text-[22px] font-bold transition-colors group-hover:text-[#11ff49]"
                      style={{ color: '#f1f0eb' }}
                    >
                      {article.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Properties Panel */}
      <div 
        className="w-[400px] overflow-y-auto border-l"
        style={{
          backgroundColor: '#0d0d0d',
          borderColor: '#2a2a2a'
        }}
      >
        <div className="p-[30px]">
          {/* Panel Header */}
          <div className="mb-[30px]">
            <h2 
              className="text-[18px] font-bold mb-[8px]"
              style={{ color: '#f1f0eb' }}
            >
              Article Properties
            </h2>
            <p
              className="text-[13px]"
              style={{ color: '#9e9e9d' }}
            >
              Edit article details
            </p>
          </div>

          {/* Add Article Button */}
          <button
            onClick={handleAddArticle}
            className="w-full flex items-center justify-center gap-[8px] py-[12px] px-[16px] rounded-[8px] mb-[30px] transition-all hover:opacity-80"
            style={{
              backgroundColor: '#11ff49',
              color: '#1a1a1a',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            <Plus size={16} />
            Add Article
          </button>

          {/* Articles List */}
          <div className="space-y-[30px]">
            {articles.map((article, index) => (
              <div 
                key={article.id}
                className="pb-[30px] border-b"
                style={{ borderColor: '#2a2a2a' }}
              >
                {/* Article Header */}
                <div className="flex items-center justify-between mb-[16px]">
                  <h3 
                    className="text-[14px] font-bold"
                    style={{ color: '#11ff49' }}
                  >
                    Article {index + 1}
                  </h3>
                  {articles.length > 1 && (
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="p-[6px] rounded-[4px] transition-all hover:bg-[#2a2a2a]"
                      style={{ color: '#9e9e9d' }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Image Preview */}
                <div 
                  className="w-full h-[150px] rounded-[8px] overflow-hidden mb-[12px]"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a'
                  }}
                >
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Upload Button */}
                <label 
                  className="flex items-center justify-center gap-[8px] w-full py-[10px] px-[12px] rounded-[6px] mb-[12px] cursor-pointer transition-all hover:opacity-80"
                  style={{
                    backgroundColor: '#3a3a3a',
                    color: '#f1f0eb',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}
                >
                  <Upload size={14} />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(article.id, e)}
                    className="hidden"
                  />
                </label>

                {/* Title Input */}
                <div className="mb-[12px]">
                  <label 
                    className="block mb-[8px]"
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#9e9e9d'
                    }}
                  >
                    Title
                  </label>
                  <textarea
                    value={article.title}
                    onChange={(e) => handleTitleChange(article.id, e.target.value)}
                    className="w-full px-[12px] py-[10px] rounded-[6px] border resize-none"
                    rows={2}
                    style={{
                      backgroundColor: '#1a1a1a',
                      borderColor: '#3a3a3a',
                      color: '#f1f0eb',
                      fontSize: '14px',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                    placeholder="Article Title"
                  />
                </div>

                {/* Category Input */}
                <div className="mb-[12px]">
                  <label 
                    className="block mb-[8px]"
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#9e9e9d'
                    }}
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    value={article.category}
                    onChange={(e) => handleCategoryChange(article.id, e.target.value.toUpperCase())}
                    className="w-full px-[12px] py-[10px] rounded-[6px] border"
                    style={{
                      backgroundColor: '#1a1a1a',
                      borderColor: '#3a3a3a',
                      color: '#a79755',
                      fontSize: '14px',
                      fontWeight: '700',
                      outline: 'none'
                    }}
                    placeholder="CATEGORY"
                  />
                </div>

                {/* Read Time Input */}
                <div>
                  <label 
                    className="block mb-[8px]"
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#9e9e9d'
                    }}
                  >
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={article.readTime}
                    onChange={(e) => handleReadTimeChange(article.id, e.target.value)}
                    className="w-full px-[12px] py-[10px] rounded-[6px] border"
                    style={{
                      backgroundColor: '#1a1a1a',
                      borderColor: '#3a3a3a',
                      color: '#9e9e9d',
                      fontSize: '14px',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                    placeholder="5 min read"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
