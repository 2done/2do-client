interface Project {
  id: number;
  ordinal: number;
  description: string;
  observation?: string;
  archived: boolean;
  options?: string;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
}
