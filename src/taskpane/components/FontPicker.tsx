import React, { useMemo, useState } from "react";
import { Combobox, Option, makeStyles } from "@fluentui/react-components";

const COMMON_FONTS = [
  "Calibri",
  "Calibri Light",
  "Cambria",
  "Cambria Math",
  "Candara",
  "Consolas",
  "Constantia",
  "Corbel",
  "Segoe UI",
  "Segoe UI Light",
  "Segoe UI Semibold",
  "Times New Roman",
  "Arial",
  "Arial Black",
  "Arial Narrow",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Georgia",
  "Garamond",
  "Book Antiqua",
  "Palatino Linotype",
  "Courier New",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Century Gothic",
  "Franklin Gothic Medium",
  "Impact",
  "Comic Sans MS",
  "MS Gothic",
  "Roboto",
  "Open Sans",
  "Lato",
  "Merriweather",
  "Source Sans Pro",
  "Montserrat",
  "Helvetica",
  "Helvetica Neue",
];

const useStyles = makeStyles({
  combobox: {
    minWidth: "auto",
    width: "100%",
  },
});

interface FontPickerProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export const FontPicker: React.FC<FontPickerProps> = ({ value, onChange, id }) => {
  const styles = useStyles();
  const [query, setQuery] = useState(value);

  React.useEffect(() => {
    setQuery(value);
  }, [value]);

  const options = useMemo(() => {
    const set = new Set(COMMON_FONTS);
    if (value && !set.has(value)) set.add(value);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((f) => f.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <Combobox
      id={id}
      className={styles.combobox}
      freeform
      value={query}
      selectedOptions={[value]}
      onOptionSelect={(_, data) => {
        if (data.optionValue) {
          onChange(data.optionValue);
          setQuery(data.optionValue);
        }
      }}
      onInput={(e) => {
        const v = (e.target as HTMLInputElement).value;
        setQuery(v);
        onChange(v);
      }}
      placeholder="Rechercher une police..."
    >
      {filtered.map((font) => (
        <Option key={font} value={font} text={font} style={{ fontFamily: `"${font}", sans-serif` }}>
          {font}
        </Option>
      ))}
    </Combobox>
  );
};
