import { IPickerTerms } from "@pnp/spfx-controls-react";

export interface ITaxField {
  guid: string;
  term: string;
}

const getTaxList = (item: any): any => {
  const taxAll: { ID: number; Term: string }[] = item?.TaxCatchAll;
  if (!taxAll || !taxAll.length) return;
  const taxAllEntries = taxAll.map(({ ID, Term }) => [ID, Term]);
  return Object.fromEntries(taxAllEntries);
};

export const getTaxField = (item: any, key: string): ITaxField => {
  const taxList = getTaxList(item);
  const { WssId, TermGuid } = item[key];
  return { guid: TermGuid, term: taxList[WssId] };
};

export const getMultiTaxField = (item: any, key: string): ITaxField[] => {
  const taxList = getTaxList(item);

  const multiTaxFieldData: { WssId: number; TermGuid: string }[] = item[key];
  return multiTaxFieldData.map(({ WssId, TermGuid }) => ({
    guid: TermGuid,
    term: taxList[WssId],
  }));
};

export const buildTaxField = ([{ name, key }]: IPickerTerms): any => ({
  Label: name,
  TermGuid: key,
  WssId: "-1",
});

export const buildMultiTaxField = (terms: IPickerTerms): string[] => {
  const serialized = terms
    .map(({ key, name }) => `-1;#${name}|${key}`)
    .join(";#");
  return [serialized];
};
