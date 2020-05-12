import { EventEmitter } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
export declare type IsVisibleProps<E> = {
    event: E;
    element: HTMLImageElement | HTMLDivElement;
    offset: number;
    scrollContainer?: HTMLElement;
};
export declare type SetLoadedImageProps = {
    element: HTMLImageElement | HTMLDivElement;
    imagePath: string;
    useSrcset?: boolean;
};
export declare type SetErrorImageProps = {
    element: HTMLImageElement | HTMLDivElement;
    errorImagePath?: string;
    useSrcset?: boolean;
};
export declare type LoadImageProps = {
    element: HTMLImageElement | HTMLDivElement;
    imagePath: string;
    useSrcset?: boolean;
    decode?: boolean;
};
export declare type StateChange = {
    reason: 'setup' | 'observer-emit' | 'start-loading' | 'mount-image' | 'loading-failed' | 'loading-succeeded' | 'finally';
    data?: unknown;
};
export declare type Attributes<T = any> = {
    element: HTMLImageElement | HTMLDivElement;
    imagePath: string;
    defaultImagePath?: string;
    errorImagePath?: string;
    useSrcset?: boolean;
    offset: number;
    scrollContainer?: HTMLElement;
    customObservable?: Observable<T>;
    decode?: boolean;
    onStateChange: EventEmitter<StateChange>;
};
export declare type ObsEvent<T> = {
    event: T;
    attributes: Attributes;
};
export declare type IsVisibleFn<E> = (args: IsVisibleProps<E>, getWindow?: () => Window) => boolean;
export declare type LoadImageFn = (args: LoadImageProps) => ObservableInput<string>;
export declare type SetLoadedImageFn = (args: SetLoadedImageProps) => void;
export declare type SetErrorImageFn = (args: SetErrorImageProps) => void;
export declare type SetupFn = (attributes: Attributes) => void;
export declare type FinallyFn = (attributes: Attributes) => void;
export declare type GetObservableFn<E> = (attributes: Attributes) => Observable<E>;
export declare type IsBotFn = (navigator: Navigator | undefined, platformId: Object) => boolean;
export interface HookSet<E> {
    getObservable: GetObservableFn<E>;
    isVisible: IsVisibleFn<E>;
    loadImage: LoadImageFn;
    setLoadedImage: SetLoadedImageFn;
    setErrorImage: SetErrorImageFn;
    setup: SetupFn;
    finally: FinallyFn;
    isBot: IsBotFn;
}
export interface ModuleOptions<T = any> extends Partial<HookSet<T>> {
    preset?: HookSet<T>;
}
