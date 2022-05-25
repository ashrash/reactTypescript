export interface columnSchema {
    displayName?: string;
    selector?: string | any;
    identity?: boolean;
    type?: string;
    display?: boolean;
    input?: boolean;
    cellIcon?: any;
    headerAction?: string;
    cellAction?: string;
    clickable?: boolean;
}
