import { useEffect, useState } from 'react';

import { getAllProfiles } from '../../api/profileData';
import { useAuth } from '../context/authContext';

function useFirebaseProfile() {
  const [profile, setProfile] = useState(null);
  const [allProfiles, setAllProfiles] = useState([]);
  const [userId] = useState(useAuth()?.userId);

  useEffect(() => {
    if (userId) {
      getAllProfiles().then(setAllProfiles);
      const foundProfile = allProfiles.filter((index) => index.uid === userId);
      if (foundProfile.length > 0) {
        setProfile(foundProfile[0]);
      }
    }
  }, [userId]);
  return profile;
}

export { useFirebaseProfile }
