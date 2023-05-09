export interface PropertyType {
  id: number;
  purpose: string;
  price: number;
  rentFrequency: number;
  title: string;
  externalID: string;
  createdAt: number;
  updatedAt: number;
  reactivatedAt: number;
  rooms: number;
  baths: number;
  area: number;
  coverPhoto: {
    id: number;
    externalID: string;
    title: string;
    orderIndex: number;
    nimaScore: number;
    url: string;
    main: true;
  };

  agency: {
    id: number;
    objectID: number;
    name: string;
    name_l1: string;
    name_l2: string;
    externalID: string;
    product: string;
    productScore: number;
    licenses: {
      number: string;
      authority: string;
    }[];

    logo: {
      id: number;
      url: string;
    };
    slug: string;
    slug_l1: string;
    slug_l2: string;
    tr: number;
    tier: number;
    roles: any[];
    active: boolean;
    createdAt: string;
    commercialNumber: number;
    shortNumber: number;
  };

  isVerified: boolean;
  description: string;
  photos: { id: string; url: string }[];
  type: string;
  furnishingStatus: string;
  amenities: [{ amenities: [{ text: string }] }];
}

export interface Location {
  id: string;
  name: string;
  externalID: string;
}
