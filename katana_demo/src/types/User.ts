export type User = {
    email: string;
    password: string;
    isSubscriber: boolean;
    apiCallCount?: number;
}