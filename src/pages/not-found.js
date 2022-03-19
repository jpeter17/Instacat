import { useEffect } from 'react';
import Header from '../components/header';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found! - Instacat';
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auth">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
}
