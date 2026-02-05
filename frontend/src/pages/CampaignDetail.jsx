import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCampaign, updateCampaignStatus, getStats, simulateCampaign } from "../api/campaignApi";
import { ArrowLeft } from "lucide-react";
import Loading from "../components/Loading";

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCampaignData = async () => {
    try {
      setLoading(true);
      const campaignData = await getCampaign(id);
      setCampaign(campaignData);
    } catch (error) {
      alert("Erreur lors du chargement de la campagne");
    } finally {
      setLoading(false);
    }
  };

  const fetchStatsData = async () => {
    try {
      const statsData = await getStats(id);
      setStats(statsData);
    } catch (error) {
      console.log("Erreur lors du chargement des statistiques");
    }
  };

  const fetchAllData = async () => {
    await fetchCampaignData();
    await fetchStatsData();
  };

  useEffect(() => {
    fetchAllData();

    const interval = setInterval(async () => {
      try {
        const simulatedCampaign = await simulateCampaign(id);
        const statsData = await getStats(id);
        setCampaign(simulatedCampaign);
        setStats(statsData);
      } catch (error) {
        console.log("Erreur de simulation");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [id]);

  const handleToggleStatus = async () => {
    if (campaign.status === "finished") return;

    try {
      const newStatus = campaign.status === "active" ? "paused" : "active";
      await updateCampaignStatus(id, newStatus);
      await fetchAllData();
    } catch (error) {
      alert("Erreur lors du changement de statut");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const translateStatus = (status) => {
    switch (status) {
      case "active": return "Actif";
      case "paused": return "En pause";
      case "finished": return "Terminé";
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "finished":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getButtonText = (status) => {
    switch (status) {
      case "active":
        return "Mettre en pause";
      case "paused":
        return "Activer";
      case "finished":
        return "Terminé";
      default:
        return "Modifier";
    }
  };

  const getButtonColor = (status) => {
    switch (status) {
      case "active":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "finished":
        return "bg-gray-300 cursor-not-allowed";
      default:
        return "bg-green-500 hover:bg-green-600";
    }
  };
  const handleBack = () => {
    navigate("/campaigns");
  };


  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
           <button
            onClick={handleBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Retour aux campagnes
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-5 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {campaign.name}
          </h1>
          <p className="text-gray-600 mb-4">{campaign.advertiser}</p>

          <div className="flex flex-wrap items-center gap-4">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                campaign.status
              )}`}
            >
              {translateStatus(campaign.status)}
            </span>

            <button
              onClick={handleToggleStatus}
              disabled={campaign.status === "finished"}
              className={`px-5 py-2 rounded font-medium text-white ${getButtonColor(
                campaign.status
              )}`}
            >
              {getButtonText(campaign.status)}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informations
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Budget</span>
                <span className="font-bold">
                  {campaign.budget.toLocaleString()} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date de début</span>
                <span>{formatDate(campaign.startDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date de fin</span>
                <span>{formatDate(campaign.endDate)}</span>
              </div>
            </div>
          </div>

          {stats && (
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Statistiques
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">CTR (Taux de clics)</span>
                  <span className="font-bold">
                    {(stats.ctr * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CPC (Coût par clic)</span>
                  <span className="font-bold">{stats.cpc.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impressions</span>
                  <span className="font-bold">
                    {campaign.impressions?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Clics</span>
                  <span className="font-bold">
                    {campaign.clicks?.toLocaleString() || 0}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;