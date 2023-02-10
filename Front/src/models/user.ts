export interface User {
    email:          string;
    password:       string;
    avatar:         string;
    username:       string;
    publications:   string[];
    following:      string[];
    roles:          boolean;
}