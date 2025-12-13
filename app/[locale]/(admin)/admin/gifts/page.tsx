'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/layout/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Gift, Plus, Edit, Trash2, Loader2, Search } from 'lucide-react';

interface GiftTemplate {
  id: string;
  title_en: string;
  title_ru: string | null;
  description_en: string;
  description_ru: string | null;
  imageUrl: string | null;
  productUrl: string | null;
  merchant: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  tags: string[];
  profitabilityScore: number;
  isActive: boolean;
}

export default function AdminGiftsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [gifts, setGifts] = useState<GiftTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingGift, setEditingGift] = useState<GiftTemplate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Fetch gifts - for demo, use sample data
    setGifts(getSampleGifts());
    setIsLoading(false);
  }, []);

  const filteredGifts = gifts.filter(
    (gift) =>
      gift.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleToggleActive = (id: string) => {
    setGifts(
      gifts.map((g) => (g.id === id ? { ...g, isActive: !g.isActive } : g))
    );
  };

  if (loading || isLoading) {
    return (
      <div className="container py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Gift className="h-8 w-8 text-pink-500" />
          <h1 className="text-3xl font-bold">Gift Templates</h1>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add Gift
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingGift ? 'Edit Gift Template' : 'Add Gift Template'}
              </DialogTitle>
            </DialogHeader>
            <GiftForm
              gift={editingGift}
              onSave={(gift) => {
                if (editingGift) {
                  setGifts(gifts.map((g) => (g.id === gift.id ? gift : g)));
                } else {
                  setGifts([...gifts, { ...gift, id: Date.now().toString() }]);
                }
                setIsDialogOpen(false);
                setEditingGift(null);
              }}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingGift(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Gifts Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Gift</th>
                  <th className="text-left p-4 font-medium">Price Range</th>
                  <th className="text-left p-4 font-medium">Tags</th>
                  <th className="text-left p-4 font-medium">Score</th>
                  <th className="text-left p-4 font-medium">Active</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGifts.map((gift) => (
                  <tr key={gift.id} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {gift.imageUrl && (
                          <img
                            src={gift.imageUrl}
                            alt=""
                            className="h-10 w-10 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{gift.title_en}</p>
                          <p className="text-sm text-muted-foreground">
                            {gift.merchant || 'No merchant'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      ${gift.minPrice || 0} - ${gift.maxPrice || 0}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {gift.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">{gift.profitabilityScore}</td>
                    <td className="p-4">
                      <Switch
                        checked={gift.isActive}
                        onCheckedChange={() => handleToggleActive(gift.id)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingGift(gift);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500"
                          onClick={() =>
                            setGifts(gifts.filter((g) => g.id !== gift.id))
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function GiftForm({
  gift,
  onSave,
  onCancel,
}: {
  gift: GiftTemplate | null;
  onSave: (gift: GiftTemplate) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<GiftTemplate>>(
    gift || {
      title_en: '',
      title_ru: '',
      description_en: '',
      description_ru: '',
      imageUrl: '',
      productUrl: '',
      merchant: '',
      minPrice: 0,
      maxPrice: 100,
      tags: [],
      profitabilityScore: 0.5,
      isActive: true,
    }
  );
  const [tagsInput, setTagsInput] = useState(formData.tags?.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: gift?.id || '',
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
    } as GiftTemplate);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Title (English) *</Label>
          <Input
            value={formData.title_en}
            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Title (Russian)</Label>
          <Input
            value={formData.title_ru || ''}
            onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label>Description (English) *</Label>
        <Textarea
          value={formData.description_en}
          onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>Description (Russian)</Label>
        <Textarea
          value={formData.description_ru || ''}
          onChange={(e) => setFormData({ ...formData, description_ru: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Image URL</Label>
          <Input
            value={formData.imageUrl || ''}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div>
          <Label>Product URL (Affiliate Link)</Label>
          <Input
            value={formData.productUrl || ''}
            onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Merchant</Label>
          <Input
            value={formData.merchant || ''}
            onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
            placeholder="Amazon, Etsy, etc."
          />
        </div>
        <div>
          <Label>Min Price ($)</Label>
          <Input
            type="number"
            value={formData.minPrice || 0}
            onChange={(e) => setFormData({ ...formData, minPrice: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <Label>Max Price ($)</Label>
          <Input
            type="number"
            value={formData.maxPrice || 0}
            onChange={(e) => setFormData({ ...formData, maxPrice: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <Label>Tags (comma-separated)</Label>
        <Input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="tech, gadgets, minimalist"
        />
      </div>

      <div>
        <Label>Profitability Score (0-1)</Label>
        <Input
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={formData.profitabilityScore}
          onChange={(e) => setFormData({ ...formData, profitabilityScore: parseFloat(e.target.value) })}
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="gradient">
          {gift ? 'Update Gift' : 'Create Gift'}
        </Button>
      </div>
    </form>
  );
}

function getSampleGifts(): GiftTemplate[] {
  return [
    {
      id: '1',
      title_en: 'Smart Reusable Notebook',
      title_ru: 'Умный многоразовый блокнот',
      description_en: 'Digitize notes instantly. Perfect for organized colleagues.',
      description_ru: 'Мгновенная оцифровка заметок. Идеально для организованных коллег.',
      imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400',
      productUrl: 'https://amazon.com/s?k=smart+notebook',
      merchant: 'Amazon',
      minPrice: 25,
      maxPrice: 35,
      tags: ['tech', 'office', 'practical'],
      profitabilityScore: 0.7,
      isActive: true,
    },
    {
      id: '2',
      title_en: 'Premium Coffee Subscription',
      title_ru: 'Премиум подписка на кофе',
      description_en: 'Monthly delivery of hand-picked beans from roasters worldwide.',
      description_ru: 'Ежемесячная доставка отборных зерен от обжарщиков со всего мира.',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      productUrl: 'https://amazon.com/s?k=coffee+subscription',
      merchant: 'Various',
      minPrice: 40,
      maxPrice: 60,
      tags: ['food', 'subscription', 'coffee'],
      profitabilityScore: 0.8,
      isActive: true,
    },
  ];
}
