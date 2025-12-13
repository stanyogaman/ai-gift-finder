'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/layout/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Link } from '@/lib/i18n/navigation';
import {
  File,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Loader2,
  FileText,
  Shield,
  Cookie,
  Scale,
  Users,
} from 'lucide-react';

interface StaticPage {
  id: string;
  slug: string;
  title_en: string;
  title_ru: string;
  content_en: string;
  content_ru: string;
  metaTitle_en?: string;
  metaTitle_ru?: string;
  metaDescription_en?: string;
  metaDescription_ru?: string;
  updatedAt: string;
}

const PAGE_ICONS: Record<string, React.ElementType> = {
  terms: Scale,
  privacy: Shield,
  cookies: Cookie,
  'affiliate-disclosure': Users,
};

export default function AdminPagesPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [pages, setPages] = useState<StaticPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<StaticPage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/admin/pages');
      if (response.ok) {
        const data = await response.json();
        setPages(data.pages || []);
      }
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePage = async (page: StaticPage) => {
    try {
      const method = page.id ? 'PUT' : 'POST';
      const response = await fetch('/api/admin/pages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page),
      });

      if (response.ok) {
        await fetchPages();
        setIsDialogOpen(false);
        setEditingPage(null);
      }
    } catch (error) {
      console.error('Failed to save page:', error);
    }
  };

  const handleDeletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page? This cannot be undone.')) return;

    try {
      const response = await fetch(`/api/admin/pages?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchPages();
      }
    } catch (error) {
      console.error('Failed to delete page:', error);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <File className="h-8 w-8 text-green-500" />
        <h1 className="text-3xl font-bold">Static Pages</h1>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Edit legal pages and other static content.
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gradient"
              onClick={() => {
                setEditingPage(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPage ? 'Edit Page' : 'Create New Page'}
              </DialogTitle>
            </DialogHeader>
            <PageForm
              page={editingPage}
              onSave={handleSavePage}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingPage(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {pages.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No static pages yet.</p>
            </CardContent>
          </Card>
        ) : (
          pages.map((page) => {
            const IconComponent = PAGE_ICONS[page.slug] || FileText;
            return (
              <Card key={page.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-green-100 text-green-600">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{page.title_en}</h3>
                      <p className="text-sm text-muted-foreground">{page.title_ru}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="font-mono text-xs">
                          /legal/{page.slug}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Updated: {new Date(page.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingPage(page);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeletePage(page.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <Card className="mt-8">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Important Legal Pages</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Make sure these pages exist and are properly configured for compliance:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Terms of Service</span>
              {pages.some((p) => p.slug === 'terms') ? (
                <Badge variant="default" className="ml-auto">✓</Badge>
              ) : (
                <Badge variant="destructive" className="ml-auto">Missing</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Privacy Policy</span>
              {pages.some((p) => p.slug === 'privacy') ? (
                <Badge variant="default" className="ml-auto">✓</Badge>
              ) : (
                <Badge variant="destructive" className="ml-auto">Missing</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Cookie className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Cookie Policy</span>
              {pages.some((p) => p.slug === 'cookies') ? (
                <Badge variant="default" className="ml-auto">✓</Badge>
              ) : (
                <Badge variant="destructive" className="ml-auto">Missing</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Affiliate Disclosure</span>
              {pages.some((p) => p.slug === 'affiliate-disclosure') ? (
                <Badge variant="default" className="ml-auto">✓</Badge>
              ) : (
                <Badge variant="destructive" className="ml-auto">Missing</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface PageFormProps {
  page: StaticPage | null;
  onSave: (page: StaticPage) => void;
  onCancel: () => void;
}

function PageForm({ page, onSave, onCancel }: PageFormProps) {
  const [formData, setFormData] = useState<StaticPage>(
    page || {
      id: '',
      slug: '',
      title_en: '',
      title_ru: '',
      content_en: '',
      content_ru: '',
      metaTitle_en: '',
      metaTitle_ru: '',
      metaDescription_en: '',
      metaDescription_ru: '',
      updatedAt: new Date().toISOString(),
    }
  );

  const [activeTab, setActiveTab] = useState<'en' | 'ru'>('en');

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string, locale: 'en' | 'ru') => {
    const updates: Partial<StaticPage> = {
      [`title_${locale}`]: value,
    };
    if (locale === 'en' && !page) {
      updates.slug = generateSlug(value);
    }
    setFormData({ ...formData, ...updates });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="slug">URL Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="terms, privacy, cookies, etc."
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Page will be available at /legal/{formData.slug || 'slug'}
        </p>
      </div>

      <div className="flex gap-2 border-b">
        <button
          type="button"
          className={`px-4 py-2 -mb-px ${
            activeTab === 'en'
              ? 'border-b-2 border-purple-500 font-medium'
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('en')}
        >
          English
        </button>
        <button
          type="button"
          className={`px-4 py-2 -mb-px ${
            activeTab === 'ru'
              ? 'border-b-2 border-purple-500 font-medium'
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('ru')}
        >
          Russian
        </button>
      </div>

      {activeTab === 'en' ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title_en">Title (English)</Label>
            <Input
              id="title_en"
              value={formData.title_en}
              onChange={(e) => handleTitleChange(e.target.value, 'en')}
              placeholder="Terms of Service"
              required
            />
          </div>
          <div>
            <Label htmlFor="metaTitle_en">Meta Title (English)</Label>
            <Input
              id="metaTitle_en"
              value={formData.metaTitle_en || ''}
              onChange={(e) =>
                setFormData({ ...formData, metaTitle_en: e.target.value })
              }
              placeholder="Terms of Service | AI Gift Finder"
            />
          </div>
          <div>
            <Label htmlFor="metaDescription_en">Meta Description (English)</Label>
            <Textarea
              id="metaDescription_en"
              value={formData.metaDescription_en || ''}
              onChange={(e) =>
                setFormData({ ...formData, metaDescription_en: e.target.value })
              }
              placeholder="Read our terms of service..."
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="content_en">Content (English) - Markdown</Label>
            <Textarea
              id="content_en"
              value={formData.content_en}
              onChange={(e) =>
                setFormData({ ...formData, content_en: e.target.value })
              }
              placeholder="# Terms of Service&#10;&#10;Last updated: ..."
              rows={15}
              className="font-mono text-sm"
              required
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label htmlFor="title_ru">Title (Russian)</Label>
            <Input
              id="title_ru"
              value={formData.title_ru}
              onChange={(e) => handleTitleChange(e.target.value, 'ru')}
              placeholder="Условия использования"
            />
          </div>
          <div>
            <Label htmlFor="metaTitle_ru">Meta Title (Russian)</Label>
            <Input
              id="metaTitle_ru"
              value={formData.metaTitle_ru || ''}
              onChange={(e) =>
                setFormData({ ...formData, metaTitle_ru: e.target.value })
              }
              placeholder="Условия использования | AI Gift Finder"
            />
          </div>
          <div>
            <Label htmlFor="metaDescription_ru">Meta Description (Russian)</Label>
            <Textarea
              id="metaDescription_ru"
              value={formData.metaDescription_ru || ''}
              onChange={(e) =>
                setFormData({ ...formData, metaDescription_ru: e.target.value })
              }
              placeholder="Прочтите наши условия использования..."
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="content_ru">Content (Russian) - Markdown</Label>
            <Textarea
              id="content_ru"
              value={formData.content_ru}
              onChange={(e) =>
                setFormData({ ...formData, content_ru: e.target.value })
              }
              placeholder="# Условия использования&#10;&#10;Последнее обновление: ..."
              rows={15}
              className="font-mono text-sm"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="gradient">
          {page ? 'Update Page' : 'Create Page'}
        </Button>
      </div>
    </form>
  );
}
