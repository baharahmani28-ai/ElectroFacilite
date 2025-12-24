'use client';

import { useEffect, useState } from 'react';
import { filesAPI, customersAPI, branchesAPI } from '@/lib/api';
import { Users, FileText, TrendingUp, Clock, CheckCircle, XCircle, Upload, Settings, Building2, Package, BarChart3, Activity } from 'lucide-react';
import Link from 'next/link';
import { getUser } from '@/lib/utils';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState<any[]>([]);
  const user = getUser();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const requests = [
        filesAPI.getStats(),
        customersAPI.getAll(),
      ];
      
      // Only fetch branches if user is admin
      if (user?.role === 'admin') {
        requests.push(branchesAPI.getAll());
      }
      
      const responses = await Promise.all(requests);
      const [fileStatsRes, customersRes, branchesRes] = responses;

      // Filter customers by status for branches
      const customers = customersRes.data || [];
      const pendingCustomers = customers.filter((c: any) => c.status === 'pending').length;
      const approvedCustomers = customers.filter((c: any) => c.status === 'approved').length;

      setStats({
        files: fileStatsRes.data || {},
        totalCustomers: customers.length,
        pendingCustomers,
        approvedCustomers,
      });
      
      if (branchesRes) {
        setBranches(branchesRes.data || []);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
      // Set default empty stats to prevent undefined errors
      setStats({
        files: { total: 0, under_review: 0, accepted: 0, rejected: 0, completed: 0 },
        totalCustomers: 0,
        pendingCustomers: 0,
        approvedCustomers: 0,
      });
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Chargement du tableau de bord...</div>;
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isAdmin ? 'Tableau de Bord Admin' : 'Mon Tableau de Bord'}
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Clients - Only for branches */}
        {!isAdmin && (
          <Link href="/dashboard/clients">
            <div className="card hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-primary">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Clients</p>
                  <p className="text-3xl font-bold text-gray-800">{stats?.totalCustomers || 0}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                  <Users className="text-primary" size={28} />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Pending Customers (for branches) */}
        {!isAdmin && (
          <div className="card border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">En Attente</p>
                <p className="text-3xl font-bold text-gray-800">{stats?.pendingCustomers || 0}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-full">
                <Clock className="text-yellow-600" size={28} />
              </div>
            </div>
          </div>
        )}

        {/* Approved Customers (for branches) */}
        {!isAdmin && (
          <div className="card border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Approuvés</p>
                <p className="text-3xl font-bold text-gray-800">{stats?.approvedCustomers || 0}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <TrendingUp className="text-green-600" size={28} />
              </div>
            </div>
          </div>
        )}

        {/* Total Files */}
        <Link href="/dashboard/files">
          <div className="card hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Dossiers</p>
                <p className="text-3xl font-bold text-gray-800">{stats?.files?.total || 0}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <FileText className="text-purple-600" size={28} />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* File Status Overview */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Aperçu des Statuts des Dossiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{stats?.files?.under_review || 0}</p>
            <p className="text-sm text-gray-600 mt-1">En Révision</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats?.files?.accepted || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Acceptés</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{stats?.files?.rejected || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Rejetés</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{stats?.files?.completed || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Complétés</p>
          </div>
        </div>
      </div>

      {/* Quick Actions - Only for branches */}
      {!isAdmin && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/dashboard/clients">
            <div className="card hover:shadow-lg transition-shadow cursor-pointer text-center">
              <Users className="mx-auto text-primary mb-3" size={40} />
              <h3 className="text-lg font-semibold text-gray-800">Ajouter un Client</h3>
              <p className="text-sm text-gray-600 mt-2">Créer un nouveau profil client</p>
            </div>
          </Link>

          <Link href="/dashboard/dossiers">
            <div className="card hover:shadow-lg transition-shadow cursor-pointer text-center">
              <FileText className="mx-auto text-green-600 mb-3" size={40} />
              <h3 className="text-lg font-semibold text-gray-800">Créer un Dossier</h3>
              <p className="text-sm text-gray-600 mt-2">Créer une demande de financement</p>
            </div>
          </Link>
        </div>
      )}

      {/* Admin Control Panel */}
      {isAdmin && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Panneau de Contrôle Administrateur</h2>
          
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Pending Files */}
            <Link href="/dashboard/dossiers?status=under_review">
              <div className="card hover:shadow-xl transition-all cursor-pointer border-l-4 border-yellow-500 bg-gradient-to-br from-yellow-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">En Attente</p>
                    <p className="text-4xl font-bold text-yellow-600">{stats?.files?.under_review || 0}</p>
                    <p className="text-xs text-gray-500 mt-1">Dossiers à réviser</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-full">
                    <Clock className="text-yellow-600" size={28} />
                  </div>
                </div>
              </div>
            </Link>

            {/* Accepted Files */}
            <Link href="/dashboard/dossiers?status=accepted">
              <div className="card hover:shadow-xl transition-all cursor-pointer border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Acceptés</p>
                    <p className="text-4xl font-bold text-green-600">{stats?.files?.accepted || 0}</p>
                    <p className="text-xs text-gray-500 mt-1">Dossiers approuvés</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="text-green-600" size={28} />
                  </div>
                </div>
              </div>
            </Link>

            {/* Rejected Files */}
            <Link href="/dashboard/dossiers?status=rejected">
              <div className="card hover:shadow-xl transition-all cursor-pointer border-l-4 border-red-500 bg-gradient-to-br from-red-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Rejetés</p>
                    <p className="text-4xl font-bold text-red-600">{stats?.files?.rejected || 0}</p>
                    <p className="text-xs text-gray-500 mt-1">Nécessitent révision</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-full">
                    <XCircle className="text-red-600" size={28} />
                  </div>
                </div>
              </div>
            </Link>

            {/* Total Files */}
            <Link href="/dashboard/dossiers">
              <div className="card hover:shadow-xl transition-all cursor-pointer border-l-4 border-blue-500 bg-gradient-to-br from-blue-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">Total</p>
                    <p className="text-4xl font-bold text-blue-600">{stats?.files?.total || 0}</p>
                    <p className="text-xs text-gray-500 mt-1">Tous les dossiers</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-full">
                    <FileText className="text-blue-600" size={28} />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Branches Overview */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Building2 className="text-indigo-600" size={24} />
                Vue d'ensemble des Branches
              </h3>
              <Link href="/dashboard/branches">
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1">
                  Gérer tout
                  <Activity size={16} />
                </button>
              </Link>
            </div>
            <div className="card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <Building2 className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Branches</p>
                    <p className="text-2xl font-bold text-indigo-600">{branches.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Branches Actives</p>
                    <p className="text-2xl font-bold text-green-600">
                      {branches.filter(b => b.is_active).length}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <XCircle className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Branches Inactives</p>
                    <p className="text-2xl font-bold text-gray-600">
                      {branches.filter(b => !b.is_active).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Management Actions */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Settings className="text-purple-600" size={24} />
              Actions de Gestion
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* All Files Management */}
              <Link href="/dashboard/dossiers">
                <div className="card hover:shadow-lg transition-shadow cursor-pointer text-center border-t-4 border-pink-500">
                  <FileText className="mx-auto text-pink-600 mb-3" size={36} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Tous les Dossiers</h3>
                  <p className="text-3xl font-bold text-pink-600 my-2">{stats?.files?.total || 0}</p>
                  <p className="text-xs text-gray-600">Contrôle global</p>
                </div>
              </Link>

              {/* Manage Products */}
              <Link href="/dashboard/products">
                <div className="card hover:shadow-lg transition-shadow cursor-pointer text-center border-t-4 border-purple-500">
                  <Package className="mx-auto text-purple-600 mb-3" size={36} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Produits</h3>
                  <p className="text-sm text-gray-600 mt-3">Gérer le catalogue</p>
                </div>
              </Link>

              {/* Manage Branches */}
              <Link href="/dashboard/branches">
                <div className="card hover:shadow-lg transition-shadow cursor-pointer text-center border-t-4 border-indigo-500">
                  <Building2 className="mx-auto text-indigo-600 mb-3" size={36} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Branches</h3>
                  <p className="text-sm text-gray-600 mt-3">Gérer les succursales</p>
                </div>
              </Link>

              {/* Import Data */}
              <Link href="/dashboard/import">
                <div className="card hover:shadow-lg transition-shadow cursor-pointer text-center border-t-4 border-blue-500">
                  <Upload className="mx-auto text-blue-600 mb-3" size={36} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">Importer</h3>
                  <p className="text-sm text-gray-600 mt-3">Télécharger fichiers</p>
                </div>
              </Link>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
