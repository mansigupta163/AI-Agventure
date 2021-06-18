import { Observable } from 'rxjs';

export interface IBusy {
    busy: Promise<any> | Observable<any>;
    message?: string;
    fullScreen?: boolean;
}
