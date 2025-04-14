// frontend/src/hooks/useImageGeneration.ts
import { useState, useEffect } from 'react';

export function useImageGeneration() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Save the latest imageUrl to local storage whenever it updates
  useEffect(() => {
    if (imageUrl) {
      localStorage.setItem('latestImageUrl', imageUrl);
    }
  }, [imageUrl]);

  const pollForResult = async (predictionId: string) => {
    setStatusMessage('Image generation is in progress...');
    const pollInterval = 3000;
    const intervalId = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/prediction/${predictionId}`);
        const data = await res.json();
        console.log('[useImageGeneration] Polling data:', data);
        if (data.status === 'succeeded') {
          clearInterval(intervalId);
          const url = Array.isArray(data.output) ? data.output[0] : data.output;
          setImageUrl(url);
          setStatusMessage('');
        } else if (data.status === 'failed') {
          clearInterval(intervalId);
          setStatusMessage('Image generation failed: ' + (data.error || 'Unknown error'));
        } else {
          setStatusMessage(`Current status: ${data.status}`);
        }
      } catch (err: any) {
        clearInterval(intervalId);
        setStatusMessage('Error while polling: ' + err.message);
      }
    }, pollInterval);
  };

  const generateImage = async (prompt: string) => {
    setStatusMessage('Generating image, please wait...');
    setImageUrl(null);
    try {
      const response = await fetch('http://localhost:3000/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspect_ratio: '1:1',
          negative_prompt: '',
          safety_filter_level: 'block_medium_and_above'
        })
      });
      const data = await response.json();
      console.log('[useImageGeneration] POST response:', { status: response.status, data });
      if (response.status === 202 && data.predictionId) {
        pollForResult(data.predictionId);
      } else if (response.status === 200 && data.success) {
        setImageUrl(data.imageUrl);
        setStatusMessage('');
      } else {
        setStatusMessage('Error: ' + (data.error || 'Unexpected error occurred'));
      }
    } catch (err: any) {
      setStatusMessage('Error generating image: ' + err.message);
    }
  };

  return { imageUrl, statusMessage, generateImage };
}
