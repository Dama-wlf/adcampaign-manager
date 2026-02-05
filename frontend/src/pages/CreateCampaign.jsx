import { useNavigate } from "react-router-dom";
import CampaignForm from "../components/CampaignForm";
import { createCampaign } from "../api/campaignApi";
import { ArrowLeft } from "lucide-react";

const CreateCampaign = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
      await createCampaign(data);
      navigate("/campaigns");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBack = () => {
    navigate("/campaigns");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux campagnes
          </button>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Créer une nouvelle campagne
              </h1>
            </div>
            <p className="text-gray-600 ml-8">
              Remplissez tous les champs pour lancer votre campagne publicitaire
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CampaignForm onSubmit={handleCreate} />
        </div>

       
      </div>
    </div>
  );
};

export default CreateCampaign;