import { useEffect, useState } from "react";
import { getCampaigns } from "../api/campaignApi";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;

    const fetchCampaigns = async (p = 1) => {
        try {
            setLoading(true);
            const data = await getCampaigns(p, limit);
            setCampaigns(data.campaigns);
            setTotal(data.total);
            setPage(p);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCampaigns(); }, []);

    const totalPages = Math.ceil(total / limit);

    const handleRowClick = (campaignId) => {
        navigate(`/campaigns/${campaignId}`);
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'finished': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const translateStatus = (status) => {
        switch (status) {
            case "active": return "Actif";
            case "paused": return "En pause";
            case "finished": return "Terminé";
            default: return status;
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Gestion des campagnes
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Gérez et suivez toutes vos campagnes publicitaires
                            </p>
                        </div>

                        <Link
                            to="/campaigns/create"
                            className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-xl shadow-lg"
                        >
                            <PlusCircle className="w-5 h-5 mr-2" />
                            Nouvelle campagne
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Liste des campagnes
                            </h2>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Campagne
                                    </th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Budget
                                    </th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        CTR
                                    </th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Statut
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {campaigns.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="text-gray-500 font-medium">Aucune campagne trouvée</p>
                                                <p className="text-gray-400 text-sm mt-1">Commencez par créer votre première campagne</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    campaigns.map((campaign) => (
                                        <tr
                                            key={campaign._id}
                                            onClick={() => handleRowClick(campaign._id)}
                                            className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">

                                                    <div>
                                                        <p className="font-medium text-gray-900">{campaign.name}</p>
                                                        <p className="text-sm text-gray-500">{campaign.advertiser}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <span className="font-semibold text-gray-900">
                                                        {(campaign.budget || 0).toLocaleString()}
                                                    </span>
                                                    <span className="text-sm text-gray-500 ml-1">Euros</span>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="space-y-1">
                                                    <div className="flex items-center">
                                                        <span className="font-medium text-gray-900">
                                                            {campaign.impressions ?
                                                                ((campaign.clicks / campaign.impressions) * 100).toFixed(2) :
                                                                0}%
                                                        </span>
                                                    </div>
                                                    {campaign.impressions && (
                                                        <p className="text-xs text-gray-500">
                                                            {campaign.clicks || 0} clics / {campaign.impressions} impressions
                                                        </p>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                                                    {translateStatus(campaign.status)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 0 && (
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Page {page} sur {totalPages} • {total} campagnes au total
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => fetchCampaigns(page - 1)}
                                        disabled={page === 1}
                                        className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all ${page === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                            }`}
                                    >
                                        <ChevronLeft className="w-5 h-5 mr-2" />
                                        Précédent
                                    </button>

                                    <div className="flex items-center space-x-1">
                                        {[...Array(totalPages)].map((_, i) => {
                                            const pageNum = i + 1;
                                            if (
                                                pageNum === 1 ||
                                                pageNum === totalPages ||
                                                (pageNum >= page - 1 && pageNum <= page + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => fetchCampaigns(pageNum)}
                                                        className={`w-10 h-10 rounded-lg font-medium transition-all ${page === pageNum
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            } else if (
                                                pageNum === 2 && page > 3 ||
                                                pageNum === totalPages - 1 && page < totalPages - 2
                                            ) {
                                                return <span key={i} className="px-2 text-gray-500">...</span>;
                                            }
                                            return null;
                                        })}
                                    </div>

                                    <button
                                        onClick={() => fetchCampaigns(page + 1)}
                                        disabled={page === totalPages}
                                        className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all ${page === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                                            }`}
                                    >
                                        Suivant
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CampaignList;