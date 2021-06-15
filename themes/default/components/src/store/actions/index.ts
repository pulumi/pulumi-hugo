import { SetLanguage, SetK8sLanguage, SetOS, SetCloud, SetPersona, SetSelfHostedEnv } from "./preferences";
import { DismissBanner } from "./banners";

export enum TypeKeys {

    // Chooser-related action types.
    SET_LANGUAGE = "SET_LANGUAGE",
    SET_K8S_LANGUAGE = "SET_K8S_LANGUAGE",
    SET_INPUT_KIND = "SET_INPUT_KIND",
    SET_OS = "SET_OS",
    SET_CLOUD = "SET_CLOUD",
    SET_PERSONA = "SET_PERSONA",
    SET_SELF_HOSTED_ENV = "SET_SELF_HOSTED_ENV",

    // Banner-related action types.
    DISMISS_BANNER = "DISMISS_BANNER",
}

export type PreferencesAction = SetLanguage | SetK8sLanguage | SetOS | SetCloud | SetPersona | SetSelfHostedEnv;
export type BannersAction = DismissBanner;
