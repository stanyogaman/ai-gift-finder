'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/layout/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/lib/i18n/navigation';
import {
  LayoutDashboard,
  HelpCircle,
  Gift,
  FileText,
  File,
  Users,
  Handshake,
  Loader2,
  TrendingUp,
  Eye,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalUsers: 0,
    totalGifts: 0,
    totalPosts: 0,
    newPartners: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
    // TODO: Check admin role
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const menuItems = [
    {
      href: '/admin/quiz',
      icon: HelpCircle,
      label: 'Quiz Management',
      description: 'Manage quiz questions and options',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      href: '/admin/gifts',
      icon: Gift,
      label: 'Gift Templates',
      description: 'Manage gift templates and affiliate links',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      href: '/admin/posts',
      icon: FileText,
      label: 'Blog Posts',
      description: 'Create and manage blog content',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      href: '/admin/pages',
      icon: File,
      label: 'Static Pages',
      description: 'Edit legal and static page content',
      color: 'bg-green-100 text-green-600',
    },
    {
      href: '/admin/partners',
      icon: Handshake,
      label: 'Partnership Requests',
      description: 'View and manage partnership inquiries',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      href: '/admin/users',
      icon: Users,
      label: 'Users',
      description: 'View and manage user accounts',
      color: 'bg-teal-100 text-teal-600',
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="h-8 w-8 text-purple-500" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Quizzes</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.totalQuizzes || '—'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Users</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.totalUsers || '—'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Gift Templates</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.totalGifts || '—'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Blog Posts</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.totalPosts || '—'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">New Partners</span>
            </div>
            <p className="text-2xl font-bold mt-1">{stats.newPartners || '—'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Menu Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-lg ${item.color} mb-4`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
