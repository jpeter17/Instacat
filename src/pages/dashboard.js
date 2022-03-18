import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Instacat';
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="grid">
        <p>Dashboard</p>
      </div>
    </div>
  );
}
