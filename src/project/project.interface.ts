interface IProjectStylesProps {
  backgroundImage: string;
  brandColor: string;
}

interface IProjectTechnologyProps {
  name: string;
  icon: {
    name: string;
    className: string;
    fill?: string;
  };
}

export interface IProjectProps {
  styles: IProjectStylesProps;
  title: string;
  shortDescription: string;
  technologies: IProjectTechnologyProps[];
  image: string;
  liveSite: string;
  clientRepo: string;
  serverRepo: string;
  isVisible?: boolean;
}

export interface IQueryProps {
  page?: number;
  limit?: number;
  sort?: string;
  visible?: boolean;
}
