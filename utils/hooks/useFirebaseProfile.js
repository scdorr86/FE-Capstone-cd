import { useEffect, useState } from 'react';

import { getAllProfiles } from '../../api/profileData';
import { useAuth } from '../context/authContext';

function useFirebaseProfile() {
  const [profile, setProfile] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    console.log("the userid", user.uid);
    if (user.uid) {
      const fetchAllProfiles = async () => {
        const profiles = await getAllProfiles();
        const foundProfile = profiles.filter((index) => index.uid === user.uid);
        if (foundProfile.length > 0) {
          setProfile(foundProfile[0]);
        }
      };
      fetchAllProfiles();
    }
  }, [user]);
  return profile;
}

export { useFirebaseProfile }
