import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  email: string;
  username: string;
  parish: string;
  community: string;
  profilePicture: string;
}

export const loginUser = async (email: string, password: string): Promise<User> => {
  // Simulating an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: User) => u.email === email);
      if (user) {
        // In a real app, you would verify the password on the server
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000); // Simulate network delay
  });
};

export const registerUser = async (
  email: string,
  password: string,
  username: string,
  parish: string,
  community: string,
  profilePicture: File | null
): Promise<User> => {
  // Simulating an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((u: User) => u.email === email)) {
        reject(new Error('User with this email already exists'));
      } else {
        let profilePictureUrl = '';
        if (profilePicture) {
          // In a real app, you would upload this to a server and get a URL back
          profilePictureUrl = URL.createObjectURL(profilePicture);
        }

        const newUser: User = {
          id: uuidv4(),
          email,
          username,
          parish,
          community,
          profilePicture: profilePictureUrl,
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        resolve(newUser);
      }
    }, 1000); // Simulate network delay
  });
};