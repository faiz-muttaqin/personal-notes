import React from 'react';
 
const LanguageContext = React.createContext();
 
export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;

export const LANGUAGES = [
        { code: "id", label: "Indonesia" },
        { code: "en", label: "English" },
        { code: "fr", label: "France" },
        { code: "ja", label: "Japan" },
];

export const translations = {
    id: {
        dashboard: "Dasbor",
        archived: "Arsip",
        add: "Tambah",
        active_notes: "Catatan Aktif",
        title: "Judul",
        fill: "Isi",
        remaining_character: "Sisa Karakter",
        no_notes: "Tidak ada catatan",
    },
    en: {
        dashboard: "Dashboard",
        archived: "Archive",
        add: "Add",
        active_notes: "Active Notes",
        title: "Title",
        fill: "Fill",
        remaining_character: "Remaining Character",
        no_notes: "No Notes",
    },
    fr: {
        dashboard: "Tableau",
        archived: "Archive",
        add: "Ajouter",
        active_notes: "Notes Actives",
        title: "Titre",
        fill: "Remplir",
        remaining_character: "Caractère restant",
        no_notes: "Aucune note",
    },
    ja: {
        dashboard: "ダッシュボード",
        archived: "アーカイブ",
        add: "追加",
        active_notes: "アクティブノート",
        title: "タイトル",
        fill: "記入する",
        remaining_character: "キャラクター",
        no_notes: "ノートがありません",
    },
};
export default LanguageContext;