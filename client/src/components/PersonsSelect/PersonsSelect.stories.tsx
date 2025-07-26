import { PersonsSelect } from "./PersonsSelect";

export default {
    title: "PersonsSelect",
    component: PersonsSelect,
};

export const Default = () => <PersonsSelect onSelect={() => {}} />;

export const Disabled = () => (
    <PersonsSelect disabledPersons={["professor", "ninja", "pencil", "goose", "dragon"]} onSelect={() => {}} />
);

export const Selected = () => (
    <PersonsSelect selectedPerson="girl" onSelect={() => {}} />
);