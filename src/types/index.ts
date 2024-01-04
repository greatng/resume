export interface IProfileResp {
	intro: IIntro;
	projects: IProject[];
	technologies: ITechnology[];
	languages: ILanguage[];
	workExperiences: IWorkExperience[];
	educations: IEducation[];
	interests: string[];
	resumeUrl: {
		sourceLink: string;
		fullVersionLink: string;
	};
	certificates: ICertificate[];
}
export interface IIntro {
	name: string;
	nickname: string;
	phone: string;
	email: string;
	github: string;
	linkedin: string;
	location: string;
	website: string;
}

export interface IProject {
	name: string;
	details: string;
	url: string;
	hide: boolean;
}

export interface ITechnology {
	section: string;
	details: string;
}

export interface ILanguage {
	language: string;
	level: string;
	details?: string;
}

export interface IWorkExperience {
	position: string;
	company: string;
	url: string;
	years: string[];
	details: string[];
}

export interface IEducation {
	head: string;
	details: string;
}

export interface ICertificate {
	name: string;
	year: string;
	details?: string;
	hide: boolean;
}
