import { useState } from 'react';

const SignOutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    
    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      
      if (res.ok) {
        // Redirect the user to the login page or home page after successful logout
        window.location.href = '/login';  // Or any other route
      } else {
        console.error('Sign out failed');
      }
    } catch (error) {
      console.error('Error during sign out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button onClick={handleSignOut} disabled={isLoggingOut}>
      {isLoggingOut ? 'Logging out...' : 'Sign Out'}
    </button>
  );
};

export default SignOutButton;
