import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found! - Instacat';
  }, []);
  return (
    <div className="bg-gray-background">
      <div className="mx-auth">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
}
