import {
  Form,
  ActionPanel,
  Action,
  open,
  getPreferenceValues,
} from "@raycast/api";
import pkg from "../package.json";



type Values = {
  language: string,
  code: string,
};

interface Preferences {
  defaultLanguage: string;
}

export default function Command() {
  const languages = pkg.preferences.find((preference) => preference.name === 'defaultLanguage')!.data;
  const { defaultLanguage } = getPreferenceValues<Preferences>();

  function handleSubmit(values: Values) {
    const { language, code } = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, encodeURIComponent(value)])
    );
    const url = `https://github.com/search?l=${language}&q=${encodeURIComponent(code)}&type=Code`;
    return open(url);
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.Description text="Search GitHub with advanced options" />
      <Form.TextArea id="code" title="Code" placeholder="Enter code" />
      <Form.Dropdown defaultValue={defaultLanguage} id="language" title="Language">
        {languages.map((language) => (
          <Form.Dropdown.Item
            key={language.value}
            value={language.value}
            title={language.title}
          />
        ))}
      </Form.Dropdown>
    </Form>
  );
}
