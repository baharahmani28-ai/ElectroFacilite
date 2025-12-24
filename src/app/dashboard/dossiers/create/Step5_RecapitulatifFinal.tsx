'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Step5Props {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

export default function Step5_RecapitulatifFinal({ onNext, onBack, initialData }: Step5Props) {
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmation) {
      onNext({ confirmed: true });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Récapitulatif Final et Soumission
      </h2>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
        <h3 className="font-bold text-blue-900 mb-2">📋 Vérification finale</h3>
        <p className="text-blue-800 text-sm">
          Assurez-vous que toutes les informations sont correctes avant de soumettre le dossier.
          Une fois soumis, le dossier sera envoyé à l'administrateur pour révision.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Confirmation checkbox */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmation}
              onChange={(e) => setConfirmation(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            <span className="text-gray-700">
              <strong>Je certifie que :</strong>
              <ul className="mt-2 space-y-1 text-sm">
                <li>✓ Toutes les informations fournies sont exactes et véridiques</li>
                <li>✓ Tous les documents requis ont été téléchargés</li>
                <li>✓ J'ai vérifié l'identité du client</li>
                <li>✓ Le client comprend les conditions de financement</li>
              </ul>
            </span>
          </label>
        </div>

        {/* Info box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 text-sm">
            🎉 Une fois soumis, le dossier sera visible dans la section "En révision" et l'administrateur sera notifié.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-all flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Précédent
          </button>

          <button
            type="submit"
            disabled={!confirmation}
            className={`px-8 py-3 font-bold rounded-lg transition-all flex items-center gap-2 ${
              confirmation
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            ✓ Soumettre le Dossier
            <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
