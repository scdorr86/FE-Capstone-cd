import { useEffect, useState } from 'react';

import { getAllProfiles } from '../../api/profileData';
import { useAuth } from '../context/authContext';

function useFirebaseProfile() {
  const [profile, setProfile] = useState(null);
  const [userId] = useState(useAuth()?.userId);

  useEffect(() => {
    if (userId) {
      const fetchAllProfiles = async () => {
        const profiles = await getAllProfiles();
        const foundProfile = profiles.filter((index) => index.uid === userId);
        if (foundProfile.length > 0) {
          setProfile(foundProfile[0]);
        }
      };
      fetchAllProfiles();
    }
  }, [userId]);
  return profile;
}

export { useFirebaseProfile }
