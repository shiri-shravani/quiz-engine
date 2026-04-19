import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Certificate() {
  const { certificateId } = useParams();
  const [message, setMessage] = useState('Preparing your certificate...');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const downloadCertificate = async () => {
      try {
        const response = await api.get(`/certificates/${certificateId}/download`, {
          responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `certificate-${certificateId}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setMessage('Your certificate download has started.');
      } catch (err) {
        setError('Unable to download certificate.');
      }
    };
    downloadCertificate();
  }, [certificateId]);

  return (
    <div className="glass-card">
      <div className="hero-bar">
        <div>
          <h1>Certificate</h1>
          <p>{error || message}</p>
        </div>
      </div>
      <button className="button-secondary" onClick={() => navigate('/')}>Back to Dashboard</button>
    </div>
  );
}
