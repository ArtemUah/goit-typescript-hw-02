export interface Photo {
    description: string;
    urls: {
        full: string;
        small: string;
    };
    user: {
        name: string;
    };
    id:string;
    total_pages: number;
}

export interface ModalInterface {
    urls: {
        full: string;
    };
    description: string;
    user: {
        name:string;
    };
}