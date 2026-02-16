'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Trash2, Download, Plus, Save, FolderOpen } from 'lucide-react';
import { ProductCarousel } from './ProductCarousel';
import { getKamiProducts, getProductSets, saveProductSet, deleteProductSet } from '../services/api';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  creator?: string;
  collectionId?: string;
}

interface ProductSet {
  id: string;
  name: string;
  products: Product[];
  createdAt: string;
}

interface KamiProduct {
  id: number;
  name: string;
  price: number;
  metadata: string; // JSON string containing image
  collectionId?: number;
  creator?: {
    username: string;
    avatarUrl: string;
  };
}

interface FeaturedProductsDashboardProps {
  onBackToLanding: () => void;
}

export default function FeaturedProductsDashboard({ onBackToLanding }: FeaturedProductsDashboardProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const [kamiProducts, setKamiProducts] = useState<KamiProduct[]>([]);
  const [productSets, setProductSets] = useState<ProductSet[]>([]);
  const [currentSetName, setCurrentSetName] = useState<string>('My Product Set');
  const [currentSetId, setCurrentSetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [categoryQuery, setCategoryQuery] = useState('');
  const [kamiLoading, setKamiLoading] = useState(false);
  const [kamiError, setKamiError] = useState<string | null>(null);

  useEffect(() => {
    loadKamiProducts();
    loadProductSets();
  }, []);

  const loadKamiProducts = async (category?: string) => {
    setKamiLoading(true);
    setKamiError(null);
    try {
      const data = await getKamiProducts(1, 20, category);
      if (data && data.data) {
        setKamiProducts(data.data);
      } else {
        setKamiProducts([]);
      }
    } catch (error) {
      console.error('Failed to load Kami products', error);
      setKamiError('Failed to load products');
    } finally {
      setKamiLoading(false);
    }
  };

  const loadProductSets = async () => {
    try {
      const sets = await getProductSets();
      setProductSets(sets);
    } catch (error) {
      console.error('Failed to load product sets', error);
    }
  };

  const handleLoadSet = (set: ProductSet) => {
    setProducts(set.products);
    setCurrentSetName(set.name);
    setCurrentSetId(set.id);
  };

  const handleSaveSet = async () => {
    if (!currentSetName) return;
    setLoading(true);
    const idToUse = currentSetId || crypto.randomUUID();
    try {
      const payload = {
        id: idToUse,
        name: currentSetName,
        products: products,
        createdAt: new Date().toISOString()
      };
      await saveProductSet(payload);
      await loadProductSets(); // Refresh list
      setCurrentSetId(idToUse);
      alert('Product set saved!');
    } catch (error) {
      console.error('Failed to save set', error);
      alert('Failed to save set');
    } finally {
      setLoading(false);
    }
  };

  const handleNewSet = () => {
    setProducts([]);
    setCurrentSetName('New Product Set');
    setCurrentSetId(null);
  };

  const handleDeleteSet = async () => {
    if (!currentSetId) return;
    if (!confirm('Are you sure you want to delete this set?')) return;
    setLoading(true);
    try {
      await deleteProductSet(currentSetId);
      await loadProductSets();
      handleNewSet(); // Reset UI
      alert('Set deleted');
    } catch (error) {
      console.error('Failed to delete set', error);
      alert('Failed to delete set');
    } finally {
      setLoading(false);
    }
  };

  const handleAddKamiProduct = (kProduct: KamiProduct) => {
    let imageUrl = '';
    try {
      const metadata = JSON.parse(kProduct.metadata);
      imageUrl = metadata.image || '';
    } catch (e) {
      console.error('Error parsing metadata', e);
    }

    const newProduct: Product = {
      id: String(Date.now()), // Generate a unique temp ID for the UI
      name: kProduct.name,
      price: `$${kProduct.price.toFixed(2)}`,
      image: imageUrl || 'https://via.placeholder.com/400',
      creator: kProduct.creator?.username,
      collectionId: kProduct.collectionId != null ? String(kProduct.collectionId) : ''
    };

    setProducts(prev => [...prev, newProduct]);
  };


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

  const handleCollectionIdChange = (productId: string, newCollectionId: string) => {
    setProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, collectionId: newCollectionId } : p
    ));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleSearchByCategory = async () => {
    const trimmed = categoryQuery.trim();
    await loadKamiProducts(trimmed || undefined);
  };

  const handleAddProduct = () => {
    const newId = String(Math.max(...products.map(p => parseInt(p.id))) + 1);
    setProducts(prev => [...prev, {
      id: newId,
      name: 'New Product',
      price: '$0.00',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      collectionId: ''
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
          {/* Product Set Manager */}
          <div className="mb-[32px] border-b border-[#3a3a3a] pb-[24px]">
            <h2 className="text-lg font-bold text-[#f1f0eb] mb-[16px]">Product Sets</h2>
            
            {/* Load Set */}
            <div className="mb-[16px]">
              <label className="block text-xs font-semibold text-[#9e9e9d] mb-[8px]">Load Set</label>
              <div className="relative">
                <select 
                  className="w-full px-[12px] py-[10px] rounded-[6px] border bg-[#1a1a1a] border-[#3a3a3a] text-[#f1f0eb] text-sm font-semibold outline-none appearance-none"
                  onChange={(e) => {
                    const set = productSets.find(s => s.id === e.target.value);
                    if (set) handleLoadSet(set);
                  }}
                  value={currentSetId || ''}
                >
                  <option value="">Select a set...</option>
                  {productSets.map(set => (
                    <option key={set.id} value={set.id}>{set.name}</option>
                  ))}
                </select>
                <FolderOpen className="absolute right-3 top-3 text-[#9e9e9d]" size={16} />
              </div>
            </div>

            {/* Current Set Name */}
            <div className="mb-[16px]">
              <label className="block text-xs font-semibold text-[#9e9e9d] mb-[8px]">Set Name</label>
              <input
                type="text"
                value={currentSetName}
                onChange={(e) => setCurrentSetName(e.target.value)}
                className="w-full px-[12px] py-[10px] rounded-[6px] border bg-[#1a1a1a] border-[#3a3a3a] text-[#f1f0eb] text-sm font-semibold outline-none"
                placeholder="Enter set name"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-[8px]">
              <button
                onClick={handleSaveSet}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-[6px] py-[10px] rounded-[6px] bg-[#11ff49] text-[#1a1a1a] text-sm font-bold hover:opacity-80 transition-all disabled:opacity-50"
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={handleNewSet}
                className="flex-1 flex items-center justify-center gap-[6px] py-[10px] rounded-[6px] bg-[#2a2a2a] border border-[#3a3a3a] text-[#f1f0eb] text-sm font-bold hover:opacity-80 transition-all"
              >
                <Plus size={16} />
                New
              </button>
              {currentSetId && (
                <button 
                  onClick={handleDeleteSet}
                  className="flex items-center justify-center w-[40px] rounded-[6px] bg-[#ff4949] text-white hover:opacity-80 transition-all"
                  title="Delete Set"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Master List */}
          <div className="mb-[32px] border-b border-[#3a3a3a] pb-[24px]">
             <div className="flex items-center justify-between mb-[16px]">
               <h2 className="text-lg font-bold text-[#f1f0eb]">Master List</h2>
               <div className="text-xs font-semibold text-[#9e9e9d]">
                 {kamiLoading ? 'Loading...' : `${kamiProducts.length} Records`}
               </div>
             </div>
             <div className="mb-[12px]">
               <label className="block text-xs font-semibold text-[#9e9e9d] mb-[8px]">Search by category</label>
               <div className="flex gap-[8px]">
                 <input
                   type="text"
                   value={categoryQuery}
                   onChange={(e) => setCategoryQuery(e.target.value)}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                       handleSearchByCategory();
                     }
                   }}
                   className="flex-1 px-[12px] py-[10px] rounded-[6px] border bg-[#1a1a1a] border-[#3a3a3a] text-[#f1f0eb] text-sm font-semibold outline-none"
                   placeholder="music"
                 />
                 <button
                   onClick={handleSearchByCategory}
                   className="px-[12px] py-[10px] rounded-[6px] bg-[#2a2a2a] border border-[#3a3a3a] text-[#f1f0eb] text-xs font-bold hover:opacity-80"
                   disabled={kamiLoading}
                 >
                   Search
                 </button>
               </div>
               {kamiLoading && (
                 <div className="mt-[8px] text-xs text-[#9e9e9d]">Loading...</div>
               )}
               {!kamiLoading && kamiError && (
                 <div className="mt-[8px] text-xs text-[#ff4949]">{kamiError}</div>
               )}
             </div>
             <div className="h-[300px] overflow-y-auto pr-[8px] space-y-[12px]">
              {kamiProducts.map(p => {
                 let img = '';
                 try { img = JSON.parse(p.metadata).image } catch(e){}
                 if (img?.startsWith('ipfs://')) {
                   img = `https://ipfs.io/ipfs/${img.slice('ipfs://'.length)}`;
                 }
                  return (
                    <div key={p.id} className="flex items-center gap-[12px] p-[8px] rounded-[6px] bg-[#2a2a2a] border border-[#3a3a3a]">
                       <div className="w-[40px] h-[40px] rounded-[4px] bg-[#1a1a1a] overflow-hidden flex-shrink-0">
                         {img && <img src={img} className="w-full h-full object-cover" />}
                       </div>
                       <div className="flex-1 min-w-0">
                         <div className="text-sm font-semibold text-[#f1f0eb] truncate">{p.name}</div>
                         <div className="text-xs text-[#9e9e9d]">${p.price}</div>
                       </div>
                       <button 
                         onClick={() => handleAddKamiProduct(p)}
                         className="p-[6px] rounded-[4px] bg-[#11ff49] text-[#1a1a1a] hover:opacity-80 flex-shrink-0"
                       >
                         <Plus size={14} />
                       </button>
                    </div>
                  );
               })}
             </div>
          </div>

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

                {/* Collection ID Input */}
                <div className="mb-[12px]">
                  <label 
                    className="block mb-[8px]"
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#9e9e9d'
                    }}
                  >
                    Collection ID
                  </label>
                  <input
                    type="text"
                    value={product.collectionId || ''}
                    onChange={(e) => handleCollectionIdChange(product.id, e.target.value)}
                    className="w-full px-[12px] py-[10px] rounded-[6px] border"
                    style={{
                      backgroundColor: '#1a1a1a',
                      borderColor: '#3a3a3a',
                      color: '#f1f0eb',
                      fontSize: '14px',
                      fontWeight: '600',
                      outline: 'none'
                    }}
                    placeholder="Enter collection id"
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
