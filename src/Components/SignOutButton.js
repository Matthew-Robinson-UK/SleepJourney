import React, { useContext } from 'react';
import { Button } from 'react-native';
import { AuthContext } from '../Navigation/AuthProvider';

const SignOutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Button 
      title="Sign Out" 
      onPress={logout}
    />
  );
};

export default SignOutButton;