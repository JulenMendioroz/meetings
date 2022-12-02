import type { IPickerTerms } from "@pnp/spfx-controls-react";

export interface ITaxField {
  Label: string;
  TermGuid: string;
  WssId: number;
}

export const getTaxField = (item: any, key: keyof typeof item): ITaxField => {
  const { TermGuid, WssId } = item[key];
  const taxAll: any[] = item.TaxCatchAll ?? [];
  const Label = taxAll.find((tax) => tax.ID === WssId)?.Term ?? "";
  return { Label, TermGuid, WssId };
};

export const buildTaxField = ([{ name, key }]: IPickerTerms): ITaxField => ({
  Label: name,
  TermGuid: key,
  WssId: -1,
});
