'use client';

import { useState } from 'react';
import { X, Upload, Trash2, Download, Plus } from 'lucide-react';
import { ProductCarousel } from './ProductCarousel';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface FeaturedProductsDashboardProps {
  onBackToLanding: () => void;
}

export default function FeaturedProductsDashboard({ onBackToLanding }: FeaturedProductsDashboardProps) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Guitar',
      price: '$499.00',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      name: 'Drums',
      price: '$799.00',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      name: 'Microphone',
      price: '$29.99',
      image: 'https://images.unsplash.com/photo-1572584642822-6f8de0243c93?w=400&h=400&fit=crop'
    },
    {
      id: '4',
      name: 'Keyboard',
      price: '$149.00',
      image: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=400&h=400&fit=crop'
    },
    {
      id: '5',
      name: 'Headphones',
      price: '$35.00',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop'
    },
    {
      id: '6',
      name: 'Amplifier',
      price: '$299.00',
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop'
    },
    {
      id: '7',
      name: 'Turntable',
      price: '$399.00',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop'
    },
    {
      id: '8',
      name: 'Speaker',
      price: '$449.00',
      image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop'
    }
  ]);

  const handleImageUpload = (productId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProducts(prev => prev.map(p => 
          p.id === productId ? { ...p, image: imageUrl } : p
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceChange = (productId: string, newPrice: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, price: newPrice } : p
    ));
  };

  const handleNameChange = (productId: string, newName: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, name: newName } : p
    ));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddProduct = () => {
    const newId = String(Math.max(...products.map(p => parseInt(p.id))) + 1);
    setProducts(prev => [...prev, {
      id: newId,
      name: 'New Product',
      price: '$0.00',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
    }]);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'featured-products.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex"
      style={{ 
        backgroundColor: '#1a1a1a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Main Preview Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div 
          className="sticky top-0 z-10 flex items-center justify-between px-[40px] py-[20px] border-b"
          style={{
            backgroundColor: '#1a1a1a',
            borderColor: '#3a3a3a'
          }}
        >
          <h1 
            className="m-0"
            style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#f1f0eb'
            }}
          >
            Featured Products Dashboard
          </h1>
          <div className="flex gap-[12px]">
            <button
              onClick={handleExport}
              className="flex items-center gap-[8px] px-[16px] py-[10px] rounded-[6px] transition-all hover:opacity-80"
              style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                color: '#f1f0eb',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <Download size={16} />
              Export
            </button>
            <button
              onClick={onBackToLanding}
              className="flex items-center justify-center w-[40px] h-[40px] rounded-[6px] transition-all hover:opacity-80"
              style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                color: '#f1f0eb'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="p-[40px]">
          <ProductCarousel products={products} />
        </div>
      </div>

      {/* Properties Panel */}
      <div 
        className="w-[400px] border-l overflow-y-auto"
        style={{
          backgroundColor: '#1a1a1a',
          borderColor: '#3a3a3a'
        }}
      >
        <div className="p-[24px]">
          <div className="flex items-center justify-between mb-[24px]">
            <h2 
              className="m-0"
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#f1f0eb'
              }}
            >
              Product Properties
            </h2>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-[6px] px-[12px] py-[8px] rounded-[6px] transition-all hover:opacity-80"
              style={{
                backgroundColor: '#11ff49',
                color: '#1a1a1a',
                fontSize: '12px',
                fontWeight: '700'
              }}
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          {/* Product List */}
          <div className="flex flex-col gap-[16px]">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="p-[16px] rounded-[8px] border"
                style={{
                  backgroundColor: '#2a2a2a',
                  borderColor: '#3a3a3a'
                }}
              >
                {/* Product Header */}
                <div className="flex items-center justify-between mb-[12px]">
                  <h3 
                    className="m-0"
                    style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#f1f0eb'
                    }}
                  >
                    Product {index + 1}
                  </h3>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-[6px] rounded-[4px] transition-all hover:bg-[#3a3a3a]"
                    style={{
                      color: '#ff4949'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Image Preview */}
                <div 
                  className="w-full h-[160px] rounded-[6px] overflow-hidden mb-[12px] flex items-center justify-center"
                  style={{ backgroundColor: '#1a1a1a' }}
                >
                  <img 
                    src={product.image} 
                    alt="" 
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
                    onChange={(e) => handleImageUpload(product.id, e)}
                    className="hidden"
                  />
                </label>

                {/* Name Input */}
                <div className="mb-[12px]">
                  <label 
                    className="block mb-[8px]"
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#9e9e9d'
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleNameChange(product.id, e.target.value)}
                    className="w-full px-[12px] py-[10px] rounded-[6px] border"
                    style={{
                      backgroundColor: '#1a1a1a',
                      borderColor: '#3a3a3a',
                      color: '#f1f0eb',
                      fontSize: '14px',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                    placeholder="Product Name"
                  />
                </div>

                {/* Price Input */}
                <div>
                  <label 
                    className="block mb-[8px]"
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#9e9e9d'
                    }}
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    value={product.price}
                    onChange={(e) => handlePriceChange(product.id, e.target.value)}
                    className="w-full px-[12px] py-[10px] rounded-[6px] border"
                    style={{
                      backgroundColor: '#1a1a1a',
                      borderColor: '#3a3a3a',
                      color: '#11ff49',
                      fontSize: '14px',
                      fontWeight: '700',
                      outline: 'none'
                    }}
                    placeholder="$0.00"
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