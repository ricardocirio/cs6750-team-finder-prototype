export interface Student {
  id: string;
  name: string;
  type: 'individual' | 'group';
  skills: string[];
  workStyle: string;
}

export interface Avatar {
  id: string;
  name: string;
  icon: React.ReactNode;
}
