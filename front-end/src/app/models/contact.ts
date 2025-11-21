export interface ContactPhone {
  phone: string; 
}

export interface Contact {
  contactId?: number;
  name: string;
  email: string;
  phones: ContactPhone[];
}