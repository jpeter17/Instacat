/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline() {
  // need to get logged in user's photos
  const { photos } = usePhotos();
  // on loading the photos, we need to use react skeleton
  // if we have photos, render them (create a post component)
  // if the user has no photos, tell them to create some photos
  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos!</p>
      )}
    </div>
  );
}
