import polyglotI18nProvider from "ra-i18n-polyglot";
import { messages } from "../i18n";

export const i18nProvider = polyglotI18nProvider(locale => messages[locale], "pt-br");
