import { PersonsAvatar } from "./PersonsAvatar";

export default {
    title: "PersonsAvatar",
    component: PersonsAvatar,
};

export const Default = () => <PersonsAvatar person="girl" />;

export const Disabled = () => <PersonsAvatar person="girl" disabled />;

export const Selected = () => <PersonsAvatar person="girl" selected />;
