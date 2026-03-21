import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface PlatformStats {
    totalAnalyses: bigint;
    accuracy: number;
}
export interface ImageUpload {
    status: string;
    filename: string;
    timestamp: Time;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface backendInterface {
    addContactSubmission(name: string, email: string, message: string): Promise<boolean>;
    addImageUpload(filename: string, status: string): Promise<boolean>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getImageUploadByFilename(filename: string): Promise<ImageUpload | null>;
    getImageUploads(): Promise<Array<ImageUpload>>;
    getStats(): Promise<PlatformStats | null>;
    updateStats(totalAnalyses: bigint, accuracy: number): Promise<boolean>;
}
