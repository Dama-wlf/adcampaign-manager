import { useForm } from "react-hook-form";

const CampaignForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto p-6 space-y-6"
        >
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Nouvelle Campagne
                </h2>

            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Nom de la campagne
                    </label>
                    <input
                        {...register("name", { required: true })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Entrez le nom de la campagne"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            Nom requis
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Annonceur
                    </label>
                    <input
                        {...register("advertiser", { required: true })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.advertiser ? "border-red-500" : "border-gray-300"
                            }`}
                        placeholder="Entrez le nom de l'annonceur"
                    />
                    {errors.advertiser && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            Annonceur requis
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Budget (€)
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            €
                        </span>
                        <input
                            type="number"
                            step="0.01"
                            {...register("budget", { required: true, min: 0.01 })}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.budget ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="0.00"
                        />
                    </div>
                    {errors.budget && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                            Budget invalide (minimum 0.01€)
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Date de début
                        </label>
                        <input
                            type="date"
                            {...register("startDate", { required: true })}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.startDate ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.startDate && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                Date de début requise
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Date de fin
                        </label>
                        <input
                            type="date"
                            {...register("endDate", { required: true })}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.endDate ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.endDate && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                Date de fin requise
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none transition-all shadow-md hover:shadow-lg"
                >
                    Créer la campagne
                </button>
                <p className="text-gray-500 text-xs text-center mt-3">
                    Tous les champs sont obligatoires
                </p>
            </div>
        </form>
    );
};

export default CampaignForm;