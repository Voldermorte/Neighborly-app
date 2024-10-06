import { v4 as uuidv4 } from 'uuid';

export interface ServiceProvider {
  id: string;
  name: string;
  description: string;
  category: string;
  community: string;
  imageUrl: string;
  reviews?: Review[];
  status?: string;
}

export interface Review {
  userId: string;
  username: string;
  rating: number;
  text: string;
  date: string;
}

const STORAGE_KEY = 'serviceProviders';

export const createServiceProvider = (data: Omit<ServiceProvider, 'id' | 'imageUrl'>): ServiceProvider => {
  const newProvider: ServiceProvider = {
    ...data,
    id: uuidv4(),
    imageUrl: 'https://via.placeholder.com/150', // placeholder image
    reviews: [],
    status: 'Pending',
  };

  const providers = getServiceProviders();
  providers.push(newProvider);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(providers));
  } catch (error) {
    console.error('Error saving service provider:', error);
  }

  return newProvider;
};

export const getServiceProviders = (): ServiceProvider[] => {
  try {
    const providers = localStorage.getItem(STORAGE_KEY);
    return providers ? JSON.parse(providers) : [];
  } catch (error) {
    console.error('Error retrieving service providers:', error);
    return [];
  }
};

export const getServiceProvidersByCategory = (category: string, community: string): ServiceProvider[] => {
  console.log('Fetching providers for category:', category, 'and community:', community);
  if (!category || !community) {
    console.log('Category or community is missing');
    return [];
  }
  const providers = getServiceProviders();
  console.log('All providers:', providers);
  
  const filteredProviders = providers.filter(provider => {
    if (!provider || typeof provider.category !== 'string' || typeof provider.community !== 'string') {
      console.error('Invalid provider data:', provider);
      return false;
    }
    return provider.category.toLowerCase() === category.toLowerCase() &&
           provider.community.toLowerCase() === community.toLowerCase();
  });
  
  console.log('Filtered providers:', filteredProviders);
  return filteredProviders;
};

export const getServiceProviderById = (id: string): ServiceProvider | null => {
  const providers = getServiceProviders();
  return providers.find(provider => provider.id === id) || null;
};

export const addReview = (serviceId: string, review: Review): void => {
  const providers = getServiceProviders();
  const providerIndex = providers.findIndex(provider => provider.id === serviceId);
  
  if (providerIndex !== -1) {
    if (!providers[providerIndex].reviews) {
      providers[providerIndex].reviews = [];
    }
    providers[providerIndex].reviews!.push(review);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(providers));
  }
};

export const updateServiceStatus = (serviceId: string, newStatus: string): void => {
  const providers = getServiceProviders();
  const providerIndex = providers.findIndex(provider => provider.id === serviceId);
  
  if (providerIndex !== -1) {
    providers[providerIndex].status = newStatus;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(providers));
  }
};

export const initializeMockData = () => {
  const mockProviders: ServiceProvider[] = [
    {
      id: uuidv4(),
      name: "John's Plumbing",
      description: "Expert plumbing services",
      category: "Plumbing",
      community: "Kingston",
      imageUrl: 'https://via.placeholder.com/150',
      reviews: [],
      status: 'Pending',
    },
    {
      id: uuidv4(),
      name: "Sarah's Electrical",
      description: "Professional electrical services",
      category: "Electrical",
      community: "Kingston",
      imageUrl: 'https://via.placeholder.com/150',
      reviews: [],
      status: 'Pending',
    },
  ];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProviders));
    console.log('Mock data initialized');
  } catch (error) {
    console.error('Error initializing mock data:', error);
  }
};